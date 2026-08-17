/**
 * queries.ts — Pure query functions over CatalogueData.
 * All functions are synchronous. Import getCatalogue() to load data.
 */
import "server-only";
import { getCatalogue } from "./data";

import type { CatalogueProduct, CatalogueCategory, CatalogueService } from "./types";

// ── Products ──────────────────────────────────────────────────────────────────

/** All active products (status = active). */
export function getAllProducts(): CatalogueProduct[] {
  return getCatalogue().products.filter((p) => p.status === "active");
}

/** Alias for getAllProducts */
export const getActiveProducts = getAllProducts;

/** Active products where featured = true. */
export function getFeaturedProducts(): CatalogueProduct[] {
  return getAllProducts().filter((p) => p.featured);
}

/** Find a single active product by its slug. Returns undefined if not found or inactive. */
export function getProductBySlug(slug: string): CatalogueProduct | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

/** All active products belonging to a given category_id. */
export function getProductsByCategory(categoryId: string): CatalogueProduct[] {
  return getAllProducts().filter((p) => p.category_id === categoryId);
}

/**
 * Products related to a given product — same category, excluding itself.
 * @param product The source product
 * @param limit   Max number of related products to return (default 4)
 */
export function getRelatedProducts(
  product: CatalogueProduct,
  limit = 4
): CatalogueProduct[] {
  return getAllProducts()
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, limit);
}

// ── Categories ────────────────────────────────────────────────────────────────

/** All active categories sorted by sort_order. */
export function getAllCategories(): CatalogueCategory[] {
  return getCatalogue()
    .categories.filter((c) => c.status === "active")
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Find a category by its slug. Returns undefined if not found. */
export function getCategoryBySlug(slug: string): CatalogueCategory | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

// ── Services ──────────────────────────────────────────────────────────────────

/** All active services sorted by sort_order. */
export function getServices(): CatalogueService[] {
  return getCatalogue()
    .services.filter((s) => s.status === "active")
    .sort((a, b) => a.sort_order - b.sort_order);
}

/** Find a service by its slug. Returns undefined if not found. */
export function getServiceBySlug(slug: string): CatalogueService | undefined {
  return getServices().find((s) => s.slug === slug);
}
