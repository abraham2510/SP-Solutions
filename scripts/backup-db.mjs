import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const backupDir = path.join(projectRoot, 'backup');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

function escapeLiteral(val, colInfo) {
  if (val === null || val === undefined) {
    return 'NULL';
  }

  const udtName = colInfo?.udt_name || '';
  const dataType = colInfo?.data_type || '';

  // JSON / JSONB columns
  if (dataType === 'json' || dataType === 'jsonb' || udtName === 'json' || udtName === 'jsonb') {
    const jsonStr = typeof val === 'string' ? val : JSON.stringify(val);
    const escaped = jsonStr.replace(/'/g, "''");
    return `'${escaped}'::jsonb`;
  }

  // Postgres native arrays (e.g., _text, _int4)
  if (dataType === 'ARRAY' || udtName.startsWith('_')) {
    if (!Array.isArray(val)) {
      return `'${String(val).replace(/'/g, "''")}'`;
    }
    const items = val.map(item => {
      if (item === null || item === undefined) return 'NULL';
      const escaped = String(item).replace(/'/g, "''");
      return `'${escaped}'`;
    });
    const elemType = udtName.startsWith('_') ? udtName.substring(1) : 'text';
    return `ARRAY[${items.join(', ')}]::${elemType}[]`;
  }

  if (typeof val === 'boolean') {
    return val ? 'TRUE' : 'FALSE';
  }

  if (typeof val === 'number') {
    return Number.isFinite(val) ? val.toString() : 'NULL';
  }

  if (val instanceof Date) {
    return `'${val.toISOString()}'`;
  }

  if (typeof val === 'object') {
    const jsonStr = JSON.stringify(val).replace(/'/g, "''");
    return `'${jsonStr}'::jsonb`;
  }

  // String / text / varchar / enum / uuid
  const str = String(val).replace(/'/g, "''");
  return `'${str}'`;
}

async function run() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('Neither DIRECT_URL nor DATABASE_URL found in environment.');
  }

  console.log('Connecting to database...');
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();

  console.log('Fetching database schema via Prisma...');
  let ddl = '';
  try {
    ddl = execSync('npx prisma migrate diff --from-empty --to-config-datasource --script', {
      cwd: projectRoot,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (err) {
    console.warn('Could not run prisma migrate diff, falling back:', err.message);
  }

  // Get all tables in public schema
  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      AND table_name NOT IN ('_prisma_migrations')
    ORDER BY table_name;
  `);

  const tables = tablesRes.rows.map(r => r.table_name);
  console.log(`Found ${tables.length} tables:`, tables.join(', '));

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const fileName = `sp_solutions_backup_${timestamp}.sql`;
  const filePath = path.join(backupDir, fileName);
  const latestPath = path.join(backupDir, 'latest_backup.sql');

  const stream = fs.createWriteStream(filePath, { encoding: 'utf-8' });

  // Header
  stream.write(`-- ==========================================================\n`);
  stream.write(`-- SP Solutions PostgreSQL Database Full Backup\n`);
  stream.write(`-- Generated at: ${now.toISOString()}\n`);
  stream.write(`-- Host: aws-0-ap-northeast-2.pooler.supabase.com\n`);
  stream.write(`-- Database: postgres (public schema)\n`);
  stream.write(`-- Total Tables: ${tables.length}\n`);
  stream.write(`-- ==========================================================\n\n`);
  stream.write(`SET statement_timeout = 0;\n`);
  stream.write(`SET lock_timeout = 0;\n`);
  stream.write(`SET client_encoding = 'UTF8';\n`);
  stream.write(`SET standard_conforming_strings = on;\n`);
  stream.write(`SET check_function_bodies = false;\n`);
  stream.write(`SET xmloption = content;\n`);
  stream.write(`SET client_min_messages = warning;\n`);
  stream.write(`SET row_security = off;\n\n`);

  if (ddl && ddl.trim().length > 0) {
    stream.write(`-- ==========================================================\n`);
    stream.write(`-- 1. SCHEMA DEFINITIONS (TYPES, TABLES, INDEXES, CONSTRAINTS)\n`);
    stream.write(`-- ==========================================================\n\n`);
    stream.write(ddl.trim() + `\n\n`);
  }

  stream.write(`-- ==========================================================\n`);
  stream.write(`-- 2. DATA INSERT STATEMENTS\n`);
  stream.write(`-- ==========================================================\n\n`);
  stream.write(`-- Bypass trigger and foreign key checks during data restoration\n`);
  stream.write(`SET session_replication_role = 'replica';\n\n`);

  let totalRows = 0;

  for (const table of tables) {
    // Get column names & metadata
    const colRes = await client.query(`
      SELECT column_name, udt_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1 
      ORDER BY ordinal_position;
    `, [table]);

    const cols = colRes.rows;
    const colNames = cols.map(c => `"${c.column_name}"`).join(', ');

    const rowsRes = await client.query(`SELECT * FROM "public"."${table}";`);
    const rows = rowsRes.rows;
    totalRows += rows.length;

    console.log(`Table "${table}": ${rows.length} rows`);

    stream.write(`-- Table: public."${table}" (${rows.length} rows)\n`);
    if (rows.length > 0) {
      for (const row of rows) {
        const values = cols.map(col => {
          const val = row[col.column_name];
          return escapeLiteral(val, col);
        }).join(', ');

        stream.write(`INSERT INTO "public"."${table}" (${colNames}) VALUES (${values});\n`);
      }
    }
    stream.write(`\n`);
  }

  stream.write(`-- Restore standard replication role\n`);
  stream.write(`SET session_replication_role = 'origin';\n\n`);
  stream.write(`-- ==========================================================\n`);
  stream.write(`-- BACKUP COMPLETE (${totalRows} total rows)\n`);
  stream.write(`-- ==========================================================\n`);

  await new Promise(resolve => stream.end(resolve));
  await client.end();

  // Copy to latest_backup.sql for conveniece
  fs.copyFileSync(filePath, latestPath);

  console.log(`\nBackup successfully completed!`);
  console.log(`Files created in ${backupDir}:`);
  console.log(` - ${fileName}`);
  console.log(` - latest_backup.sql`);
  console.log(`Total tables: ${tables.length}`);
  console.log(`Total rows: ${totalRows}`);
}

run().catch(err => {
  console.error('Backup failed:', err);
  process.exit(1);
});
