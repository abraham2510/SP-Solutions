import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate cache every 60 seconds

export async function GET() {
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

    const formattedCategories = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      type: cat.type,
      description: cat.description || "",
      imageUrl: cat.imageUrl,
      productCount: cat._count.products,
    }));

    const formattedServices = services.map((srv) => ({
      id: srv.id,
      name: srv.name,
      slug: srv.slug,
      shortDescription: srv.shortDescription || "",
      description: srv.description || srv.shortDescription || "",
      imageUrl: srv.imageUrl,
      featured: srv.featured,
    }));

    return NextResponse.json({
      success: true,
      categories: formattedCategories,
      services: formattedServices,
    });
  } catch (error) {
    console.error("Failed to fetch navigation data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch navigation data",
        categories: [],
        services: [],
      },
      { status: 500 }
    );
  }
}
