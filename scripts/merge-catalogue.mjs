/**
 * merge-catalogue.mjs
 * Converts the multi-sheet products.xlsx into a single flat "Catalogue" sheet.
 *
 * Column layout of the merged sheet:
 *   id | name | slug | type | category_id | category_name | short_description |
 *   description | image | featured | status | sort_order | applications |
 *   features | specifications
 *
 * type values:
 *   category   → from Categories sheet
 *   machine    → from Products sheet (type = machine)
 *   service    → from Services sheet
 *   consumable → from Spares & Consumables sheet
 *
 * Run: node scripts/merge-catalogue.mjs
 */

import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = path.join(__dirname, "../public/data/products.xlsx");

// ── Read source workbook ──────────────────────────────────────────────────────
const wb = XLSX.readFile(XLSX_PATH);

const toArr = (sheetName) =>
  wb.Sheets[sheetName]
    ? XLSX.utils.sheet_to_json(wb.Sheets[sheetName])
    : [];

const productRows    = toArr("Products");
const categoryRows   = toArr("Categories");
const serviceRows    = toArr("Services");
const featureRows    = toArr("Features");
const appRows        = toArr("Applications");
const specRows       = toArr("Specifications");
const sparesRows     = toArr("Spares & Consumables");

// ── Build lookup maps ─────────────────────────────────────────────────────────

// features:      productId → string[]
const featuresMap = {};
for (const r of featureRows) {
  const id = String(r.product_id ?? "").trim();
  if (!id) continue;
  featuresMap[id] = featuresMap[id] ?? [];
  if (r.feature) featuresMap[id].push(String(r.feature).trim());
}

// applications:  productId → string[]
const appsMap = {};
for (const r of appRows) {
  const id = String(r.product_id ?? "").trim();
  if (!id) continue;
  appsMap[id] = appsMap[id] ?? [];
  if (r.application) appsMap[id].push(String(r.application).trim());
}

// specifications: productId → "Key:Value|Key:Value" string
const specsMap = {};
for (const r of specRows) {
  const id = String(r.product_id ?? "").trim();
  if (!id || !r.specification) continue;
  const key = String(r.specification).trim();
  const val = [r.value, r.unit_or_note].filter(Boolean).join(" ").trim();
  const pair = `${key}:${val}`;
  specsMap[id] = specsMap[id] ? `${specsMap[id]}|${pair}` : pair;
}

// ── Build merged rows ─────────────────────────────────────────────────────────

const rows = [];

// 1. Categories
for (const r of categoryRows) {
  rows.push({
    id:                String(r.id ?? "").trim(),
    name:              String(r.name ?? "").trim(),
    slug:              String(r.slug ?? "").trim(),
    type:              "category",
    category_id:       "",
    category_name:     "",
    short_description: String(r.description ?? "").trim(),
    description:       String(r.description ?? "").trim(),
    image:             String(r.image ?? "").trim(),
    featured:          "",
    status:            String(r.status ?? "active").trim(),
    sort_order:        r.sort_order ?? "",
    applications:      "",
    features:          "",
    specifications:    "",
  });
}

// 2. Products / Machines
for (const r of productRows) {
  const id = String(r.id ?? "").trim();
  rows.push({
    id,
    name:              String(r.name ?? "").trim(),
    slug:              String(r.slug ?? "").trim(),
    type:              String(r.type ?? "machine").trim(),
    category_id:       String(r.category_id ?? "").trim(),
    category_name:     String(r.category_name ?? "").trim(),
    short_description: String(r.short_description ?? "").trim(),
    description:       String(r.description ?? "").trim(),
    image:             String(r.image ?? "").trim(),
    featured:          String(r.featured ?? "FALSE").trim().toUpperCase(),
    status:            String(r.status ?? "active").trim(),
    sort_order:        "",
    applications:      (appsMap[id] ?? []).join("|"),
    features:          (featuresMap[id] ?? []).join("|"),
    specifications:    specsMap[id] ?? "",
  });
}

// 3. Services
for (const r of serviceRows) {
  rows.push({
    id:                String(r.id ?? "").trim(),
    name:              String(r.name ?? "").trim(),
    slug:              String(r.slug ?? "").trim(),
    type:              String(r.type ?? "service").trim(),
    category_id:       "",
    category_name:     "",
    short_description: String(r.short_description ?? "").trim(),
    description:       String(r.description ?? "").trim(),
    image:             String(r.image ?? "").trim(),
    featured:          String(r.featured ?? "FALSE").trim().toUpperCase(),
    status:            String(r.status ?? "active").trim(),
    sort_order:        r.sort_order ?? "",
    applications:      "",
    features:          "",
    specifications:    "",
  });
}

// 4. Spares & Consumables
for (const r of sparesRows) {
  rows.push({
    id:                String(r.id ?? "").trim(),
    name:              String(r.name ?? "").trim(),
    slug:              String(r.slug ?? "").trim(),
    type:              String(r.type ?? "consumable").trim(),
    category_id:       "",
    category_name:     "",
    short_description: String(r.description ?? "").trim(),
    description:       String(r.description ?? "").trim(),
    image:             String(r.image ?? "").trim(),
    featured:          "FALSE",
    status:            String(r.status ?? "active").trim(),
    sort_order:        "",
    applications:      "",
    features:          "",
    specifications:    "",
  });
}

// ── Write new workbook with a single "Catalogue" sheet ────────────────────────

const newWb = XLSX.utils.book_new();
const ws    = XLSX.utils.json_to_sheet(rows);
XLSX.utils.book_append_sheet(newWb, ws, "Catalogue");
XLSX.writeFile(newWb, XLSX_PATH);

console.log(`✓  Merged ${rows.length} rows into single "Catalogue" sheet`);
console.log(`   Breakdown:`);
console.log(`     Categories:  ${categoryRows.length}`);
console.log(`     Products:    ${productRows.length}`);
console.log(`     Services:    ${serviceRows.length}`);
console.log(`     Consumables: ${sparesRows.length}`);
console.log(`   Written to: ${XLSX_PATH}`);
