"use server";

import { prisma } from "@/lib/prisma";

export interface NavApiCategory {
  id: string;
  name: string;
  slug: string;
  type?: string;
  description: string;
  imageUrl: string | null;
  images?: string[];
  productCount: number;
}

export interface NavApiService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl: string | null;
  images?: string[];
  featured: boolean;
}

export interface NavigationData {
  categories: NavApiCategory[];
  services: NavApiService[];
}

export async function getNavigationData(): Promise<NavigationData> {
  try {
    const [categories, services] = await Promise.all([
      prisma.category.findMany({
        where: { status: "ACTIVE" },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          description: true,
          imageUrl: true,
          images: true,
          _count: {
            select: {
              products: {
                where: { status: "ACTIVE" },
              },
            },
          },
        },
      }),
      prisma.service.findMany({
        where: { status: "ACTIVE" },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          description: true,
          imageUrl: true,
          images: true,
          featured: true,
        },
      }),
    ]);

    return {
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        type: c.type,
        description: c.description || "",
        imageUrl: c.imageUrl || (c.images && c.images[0]) || null,
        images: c.images && c.images.length > 0 ? c.images : (c.imageUrl ? [c.imageUrl] : []),
        productCount: c._count.products,
      })),
      services: services.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        shortDescription: s.shortDescription || "",
        description: s.description || s.shortDescription || "",
        imageUrl: s.imageUrl || (s.images && s.images[0]) || null,
        images: s.images && s.images.length > 0 ? s.images : (s.imageUrl ? [s.imageUrl] : []),
        featured: s.featured,
      })),
    };
  } catch (error) {
    console.error("getNavigationData error:", error);
    return { categories: [], services: [] };
  }
}
