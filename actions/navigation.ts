"use server";

import { prisma } from "@/lib/prisma";

export interface NavApiCategory {
  id: string;
  name: string;
  slug: string;
  type?: string;
  description: string;
  imageUrl: string | null;
  productCount: number;
}

export interface NavApiService {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl: string | null;
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
        imageUrl: c.imageUrl,
        productCount: c._count.products,
      })),
      services: services.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        shortDescription: s.shortDescription || "",
        description: s.description || s.shortDescription || "",
        imageUrl: s.imageUrl,
        featured: s.featured,
      })),
    };
  } catch (error) {
    console.error("getNavigationData error:", error);
    return { categories: [], services: [] };
  }
}
