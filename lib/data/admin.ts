/**
 * lib/data/admin.ts — Admin read queries (server-only)
 *
 * Full access — includes INACTIVE records.
 * Always call requireAdmin() before using these in page components.
 */
import "server-only";
import { prisma } from "@/lib/prisma";
import type { Status, EnquiryStatus, Prisma } from "@prisma/client";

// ── Dashboard ────────────────────────────────────────────────────────────────

export type DashboardRecentProduct = Prisma.ProductGetPayload<{
  include: { category: { select: { name: true } } };
}>;

export type DashboardRecentEnquiry = Prisma.EnquiryGetPayload<{
  include: {
    product: { select: { name: true } };
    service: { select: { name: true } };
  };
}>;

export type DashboardStats = {
  totalProducts: number;
  activeProducts: number;
  featuredProducts: number;
  totalCategories: number;
  totalServices: number;
  newEnquiries: number;
  recentProducts: DashboardRecentProduct[];
  recentEnquiries: DashboardRecentEnquiry[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [
    totalProducts,
    activeProducts,
    totalCategories,
    totalServices,
    newEnquiries,
    recentProducts,
    recentEnquiries,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: "ACTIVE" } }),
    prisma.category.count(),
    prisma.service.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.product.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { category: { select: { name: true } } },
    }),
    prisma.enquiry.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { name: true } },
        service: { select: { name: true } },
      },
    }),
  ]);

  return {
    totalProducts,
    activeProducts,
    featuredProducts: activeProducts,
    totalCategories,
    totalServices,
    newEnquiries,
    recentProducts,
    recentEnquiries,
  };
}

// ── Products ─────────────────────────────────────────────────────────────────

export type ProductFilters = {
  search?: string;
  categoryId?: string;
  status?: Status;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
};

export async function getAdminProducts(filters: ProductFilters = {}) {
  const {
    search,
    categoryId,
    status,
    page = 1,
    perPage = 20,
    sortBy = "updatedAt",
    sortDir = "desc",
  } = filters;

  const where = {
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { model: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(status ? { status } : {}),
  };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { [sortBy]: sortDir },
      include: { category: { select: { id: true, name: true, slug: true } } },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getAdminProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      features: { orderBy: { sortOrder: "asc" } },
      applications: { orderBy: { sortOrder: "asc" } },
      specifications: { orderBy: { sortOrder: "asc" } },
    },
  });
}

// ── Categories ───────────────────────────────────────────────────────────────

export async function getAdminCategories() {
  return prisma.category.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { products: true } },
    },
  });
}

export async function getAdminCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

// ── Services ─────────────────────────────────────────────────────────────────

export async function getAdminServices() {
  return prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
  });
}

export async function getAdminServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

// ── Enquiries ────────────────────────────────────────────────────────────────

export type EnquiryFilters = {
  status?: EnquiryStatus;
  search?: string;
  page?: number;
  perPage?: number;
};

export async function getAdminEnquiries(filters: EnquiryFilters = {}) {
  const { status, search, page = 1, perPage = 20 } = filters;

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { company: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: "desc" },
      include: {
        product: { select: { id: true, name: true, slug: true } },
        service: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.enquiry.count({ where }),
  ]);

  return { enquiries, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getAdminEnquiryById(id: string) {
  return prisma.enquiry.findUnique({
    where: { id },
    include: {
      product: { select: { id: true, name: true, slug: true, category: { select: { slug: true } } } },
      service: { select: { id: true, name: true, slug: true } },
    },
  });
}
