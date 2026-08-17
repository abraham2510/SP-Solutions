/**
 * parser.ts — Build-time only.
 * Reads the single "Catalogue" sheet from products.xlsx and returns typed CatalogueData.
 *
 * Sheet: Catalogue
 * Columns: id | name | slug | type | category_id | category_name |
 *          short_description | description | image | featured | status |
 *          sort_order | applications | features | specifications
 *
 * type values:
 *   category   → CatalogueCategory
 *   machine    → CatalogueProduct  (type field preserved)
 *   repair / service / consumable → CatalogueService
 */
import "server-only";
import * as XLSX from "xlsx";
import path from "path";
import fs from "fs";
import type {
  CatalogueData,
  CatalogueProduct,
  CatalogueCategory,
  CatalogueService,
} from "./types";

const XLSX_PATH = path.join(process.cwd(), "public", "data", "products.xlsx");

// ── Helpers ───────────────────────────────────────────────────────────────────

function str(v: unknown): string {
  if (v === undefined || v === null) return "";
  return String(v).trim();
}

function parseBool(v: unknown): boolean {
  const s = str(v).toUpperCase();
  return s === "TRUE" || s === "1" || s === "YES";
}

function parseStatus(v: unknown): "active" | "inactive" {
  return str(v).toLowerCase() === "active" ? "active" : "inactive";
}

function parsePipe(v: unknown): string[] {
  const s = str(v);
  if (!s) return [];
  return s.split("|").map((x) => x.trim()).filter(Boolean);
}

function parseSpecifications(v: unknown): Record<string, string> {
  const s = str(v);
  if (!s) return {};
  const result: Record<string, string> = {};
  for (const pair of s.split("|")) {
    const colonIdx = pair.indexOf(":");
    if (colonIdx === -1) continue;
    const key = pair.slice(0, colonIdx).trim();
    const val = pair.slice(colonIdx + 1).trim();
    if (key) result[key] = val;
  }
  return result;
}

function parseOrder(v: unknown): number {
  const n = parseInt(str(v), 10);
  return isNaN(n) ? 999 : n;
}

// ── Row → typed records ───────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToProduct(row: Record<string, any>): CatalogueProduct {
  const imgStr = str(row.image);
  const imagesArr = Array.isArray(row.images)
    ? row.images.map(str)
    : typeof row.images === "string" && row.images
    ? row.images.split(",").map((s: string) => s.trim())
    : imgStr
    ? [imgStr]
    : [];

  return {
    id:                str(row.id),
    name:              str(row.name),
    slug:              str(row.slug),
    model:             str(row.model),
    type:              str(row.type) || "machine",
    category_id:       str(row.category_id),
    category_name:     str(row.category_name),
    short_description: str(row.short_description),
    description:       str(row.description),
    image:             imagesArr[0] || imgStr,
    images:            imagesArr,
    featured:          parseBool(row.featured),
    status:            parseStatus(row.status),
    applications:      parsePipe(row.applications),
    features:          parsePipe(row.features),
    specifications:    parseSpecifications(row.specifications),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToCategory(row: Record<string, any>): CatalogueCategory {
  const imgStr = str(row.image);
  const imagesArr = Array.isArray(row.images)
    ? row.images.map(str)
    : typeof row.images === "string" && row.images
    ? row.images.split(",").map((s: string) => s.trim())
    : imgStr
    ? [imgStr]
    : [];

  return {
    id:          str(row.id),
    name:        str(row.name),
    slug:        str(row.slug),
    type:        str(row.type) || "machine",
    description: str(row.description) || str(row.short_description),
    image:       imagesArr[0] || imgStr,
    images:      imagesArr,
    sort_order:  parseOrder(row.sort_order),
    status:      parseStatus(row.status),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToService(row: Record<string, any>): CatalogueService {
  return {
    id:                str(row.id),
    name:              str(row.name),
    slug:              str(row.slug),
    type:              str(row.type) || "service",
    short_description: str(row.short_description),
    description:       str(row.description),
    image:             str(row.image),
    images:            row.images ? (Array.isArray(row.images) ? row.images : [str(row.images)]) : (row.image ? [str(row.image)] : []),
    featured:          parseBool(row.featured),
    status:            parseStatus(row.status),
    sort_order:        parseOrder(row.sort_order),
  };
}

// ── Service-type classifier ───────────────────────────────────────────────────
// Anything that is NOT "category" and NOT "machine" is treated as a service/repair/consumable
const PRODUCT_TYPES = new Set(["machine"]);
const CATEGORY_TYPES = new Set(["category"]);

function isCategory(type: string) { return CATEGORY_TYPES.has(type); }
function isProduct(type: string) { return PRODUCT_TYPES.has(type); }
// everything else (repair, service, consumable, …) → service
function isService(type: string) { return !isCategory(type) && !isProduct(type); }

// ── Validation ────────────────────────────────────────────────────────────────

function validate(data: CatalogueData): void {
  const errors: string[] = [];

  // Products
  const productIds   = new Set<string>();
  const productSlugs = new Set<string>();
  const categoryIds  = new Set(data.categories.map((c) => c.id));

  for (const p of data.products) {
    if (!p.id)   errors.push(`Product "${p.name}" is missing an id`);
    if (!p.name) errors.push(`Product id "${p.id}" is missing a name`);
    if (!p.slug) errors.push(`Product "${p.id}" is missing a slug`);
    if (p.id && productIds.has(p.id))     errors.push(`Duplicate product id: "${p.id}"`);
    if (p.slug && productSlugs.has(p.slug)) errors.push(`Duplicate product slug: "${p.slug}"`);
    if (p.id)   productIds.add(p.id);
    if (p.slug) productSlugs.add(p.slug);
    if (p.category_id && !categoryIds.has(p.category_id)) {
      errors.push(`Product "${p.id}" references unknown category_id: "${p.category_id}"`);
    }
  }

  // Categories
  const catIds   = new Set<string>();
  const catSlugs = new Set<string>();
  for (const c of data.categories) {
    if (!c.id) errors.push(`Category "${c.name}" is missing an id`);
    if (c.id && catIds.has(c.id))     errors.push(`Duplicate category id: "${c.id}"`);
    if (c.slug && catSlugs.has(c.slug)) errors.push(`Duplicate category slug: "${c.slug}"`);
    if (c.id)   catIds.add(c.id);
    if (c.slug) catSlugs.add(c.slug);
  }

  // Services
  const svcIds   = new Set<string>();
  const svcSlugs = new Set<string>();
  for (const s of data.services) {
    if (!s.id) errors.push(`Service "${s.name}" is missing an id`);
    if (s.id && svcIds.has(s.id))     errors.push(`Duplicate service id: "${s.id}"`);
    if (s.slug && svcSlugs.has(s.slug)) errors.push(`Duplicate service slug: "${s.slug}"`);
    if (s.id)   svcIds.add(s.id);
    if (s.slug) svcSlugs.add(s.slug);
  }

  if (errors.length > 0) {
    throw new Error(
      `[SP Solutions Catalogue] Validation errors in products.xlsx:\n` +
      errors.map((e) => `  • ${e}`).join("\n")
    );
  }
}

// ── Main parse function ───────────────────────────────────────────────────────

export function parseCatalogue(): CatalogueData {
  const buffer   = fs.readFileSync(XLSX_PATH);
  const workbook = XLSX.read(buffer, { type: "buffer" });

  // Single sheet: "Catalogue"
  const sheetName = workbook.SheetNames.includes("Catalogue")
    ? "Catalogue"
    : workbook.SheetNames[0]; // fallback to first sheet

  const allRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    workbook.Sheets[sheetName]
  );

  // Partition into 3 buckets by type
  const data: CatalogueData = {
    products:   [],
    categories: [],
    services:   [],
  };

  for (const row of allRows) {
    const type = str(row.type);
    if (!type) continue;

    if (isCategory(type)) {
      data.categories.push(rowToCategory(row));
    } else if (isProduct(type)) {
      data.products.push(rowToProduct(row));
    } else if (isService(type)) {
      data.services.push(rowToService(row));
    }
    // unknown types are silently skipped
  }

  validate(data);
  return data;
}
