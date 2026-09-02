/**
 * lib/data/public.ts — Public read queries (server-only)
 *
 * All functions filter status = ACTIVE.
 * Used by public-facing pages: /machines, /services, homepage.
 * Maps Prisma models directly to CatalogueProduct / CatalogueCategory / CatalogueService interfaces.
 */
import "server-only";
import { prisma } from "@/lib/prisma";
import type {
  CatalogueProduct,
  CatalogueCategory,
  CatalogueService,
} from "@/lib/catalogue/types";

// ── Mappers ──────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCategory(c: any): CatalogueCategory {
  const categoryImages = c.images && c.images.length > 0 ? c.images : c.imageUrl ? [c.imageUrl] : [];
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    type: c.type || "machine",
    description: c.description || "",
    image: categoryImages[0] || c.imageUrl || "",
    images: categoryImages,
    sort_order: c.sortOrder ?? 0,
    status: c.status === "ACTIVE" ? "active" : "inactive",
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(p: any): CatalogueProduct {
  const productImages = p.images && p.images.length > 0 ? p.images : p.imageUrl ? [p.imageUrl] : [];
  const productVideos = p.videos && p.videos.length > 0 ? p.videos : p.videoUrl ? [p.videoUrl] : [];
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    model: p.model || "",
    type: "machine",
    category_id: p.category?.slug || "",
    category_name: p.category?.name || "",
    short_description: p.shortDescription || "",
    description: p.description || "",
    image: productImages[0] || p.imageUrl || "",
    images: productImages,
    video_url: productVideos[0] || p.videoUrl || "",
    videos: productVideos,
    featured: p.featured,
    status: p.status === "ACTIVE" ? "active" : "inactive",
    features: p.features ? p.features.map((f: { feature: string }) => f.feature) : [],
    applications: p.applications ? p.applications.map((a: { application: string }) => a.application) : [],
    specifications: p.specifications
      ? Object.fromEntries(
          p.specifications.map((s: { specification: string; value: string; unitOrNote: string | null }) => [
            s.specification,
            [s.value, s.unitOrNote].filter(Boolean).join(" "),
          ])
        )
      : {},
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapService(s: any): CatalogueService {
  return {
    id: s.id,
    name: s.name,
    slug: s.slug,
    type: "repair",
    short_description: s.shortDescription || "",
    description: s.description || "",
    image: s.imageUrl || "",
    images: s.images && s.images.length > 0 ? s.images : (s.imageUrl ? [s.imageUrl] : []),
    featured: s.featured,
    status: s.status === "ACTIVE" ? "active" : "inactive",
    sort_order: s.sortOrder ?? 0,
  };
}

// ── Categories ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<CatalogueCategory[]> {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
    orderBy: { updatedAt: "desc" },
  });
  return categories.map(mapCategory);
}

export async function getCategoryBySlug(slug: string): Promise<CatalogueCategory | null> {
  const category = await prisma.category.findFirst({
    where: { slug, status: "ACTIVE" },
  });
  return category ? mapCategory(category) : null;
}

// ── Products ────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<CatalogueProduct[]> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
    include: {
      category: true,
      features: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
    },
  });
  return products.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<CatalogueProduct | null> {
  const product = await prisma.product.findFirst({
    where: { slug, status: "ACTIVE" },
    include: {
      category: true,
      features: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
    },
  });
  return product ? mapProduct(product) : null;
}

export async function getProductsByCategory(categorySlug: string): Promise<CatalogueProduct[]> {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      category: { slug: categorySlug, status: "ACTIVE" },
    },
    orderBy: { name: "asc" },
    include: {
      category: true,
      features: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
    },
  });
  return products.map(mapProduct);
}

export async function getFeaturedProducts(): Promise<CatalogueProduct[]> {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    orderBy: { name: "asc" },
    take: 12,
    include: {
      category: true,
      features: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
    },
  });
  return products.map(mapProduct);
}

// ── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<CatalogueService[]> {
  const services = await prisma.service.findMany({
    where: { status: "ACTIVE" },
    orderBy: { sortOrder: "asc" },
  });
  return services.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<CatalogueService | null> {
  const service = await prisma.service.findFirst({
    where: { slug, status: "ACTIVE" },
  });
  return service ? mapService(service) : null;
}

export async function getFeaturedServices(): Promise<CatalogueService[]> {
  const services = await prisma.service.findMany({
    where: { status: "ACTIVE" },
    orderBy: { sortOrder: "asc" },
    take: 8,
  });
  return services.map(mapService);
}
