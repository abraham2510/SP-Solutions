"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { ProductSchema } from "@/lib/validations/product";
import { uploadMultipleImagesAction } from "@/actions/upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult = { success: true; id: string } | { success: false; error: string };

// ── helpers ───────────────────────────────────────────────────────────────────

function formatZodError(err: z.ZodError): string {
  return err.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

async function checkSlugUnique(slug: string, excludeId?: string) {
  const existing = await prisma.product.findFirst({
    where: { slug, NOT: excludeId ? { id: excludeId } : undefined },
  });
  return !existing;
}

function revalidateProductPaths(categorySlug?: string, productSlug?: string) {
  revalidatePath("/machines");
  revalidatePath("/");
  if (categorySlug) revalidatePath(`/machines/${categorySlug}`);
  if (productSlug && categorySlug)
    revalidatePath(`/machines/${categorySlug}/${productSlug}`);
}

// ── createProduct ─────────────────────────────────────────────────────────────

export async function createProduct(data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  const { features, applications, specifications, ...productData } = parsed.data;

  // Check slug uniqueness
  const slugOk = await checkSlugUnique(productData.slug);
  if (!slugOk) {
    return { success: false, error: "A product with this slug already exists." };
  }

  let images = productData.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "products");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || productData.imageUrl || null;

  try {
    const product = await prisma.product.create({
      data: {
        ...productData,
        imageUrl: primaryImageUrl,
        images: images,
        model: productData.model || null,
        shortDescription: productData.shortDescription || null,
        description: productData.description || null,
        features: {
          createMany: {
            data: features.map((f, i) => ({ feature: f, sortOrder: i })),
          },
        },
        applications: {
          createMany: {
            data: applications.map((a, i) => ({ application: a, sortOrder: i })),
          },
        },
        specifications: {
          createMany: {
            data: specifications.map((s) => ({
              specification: s.specification,
              value: s.value,
              unitOrNote: s.unitOrNote || null,
              sortOrder: s.sortOrder,
            })),
          },
        },
      },
      include: { category: { select: { slug: true } } },
    });

    revalidateProductPaths(product.category.slug, product.slug);
    return { success: true, id: product.id };
  } catch (err) {
    console.error("createProduct error:", err);
    return { success: false, error: "Failed to create product. Please try again." };
  }
}

// ── updateProduct ─────────────────────────────────────────────────────────────

export async function updateProduct(id: string, data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  const { features, applications, specifications, ...productData } = parsed.data;

  const slugOk = await checkSlugUnique(productData.slug, id);
  if (!slugOk) {
    return { success: false, error: "A product with this slug already exists." };
  }

  let images = productData.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "products");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || productData.imageUrl || null;

  try {
    const product = await prisma.$transaction(async (tx) => {
      // Delete existing related records
      await tx.productFeature.deleteMany({ where: { productId: id } });
      await tx.productApplication.deleteMany({ where: { productId: id } });
      await tx.productSpecification.deleteMany({ where: { productId: id } });

      // Update product and recreate related records
      return tx.product.update({
        where: { id },
        data: {
          ...productData,
          imageUrl: primaryImageUrl,
          images: images,
          model: productData.model || null,
          shortDescription: productData.shortDescription || null,
          description: productData.description || null,
          features: {
            createMany: {
              data: features.map((f, i) => ({ feature: f, sortOrder: i })),
            },
          },
          applications: {
            createMany: {
              data: applications.map((a, i) => ({ application: a, sortOrder: i })),
            },
          },
          specifications: {
            createMany: {
              data: specifications.map((s) => ({
                specification: s.specification,
                value: s.value,
                unitOrNote: s.unitOrNote || null,
                sortOrder: s.sortOrder,
              })),
            },
          },
        },
        include: { category: { select: { slug: true } } },
      });
    });

    revalidateProductPaths(product.category.slug, product.slug);
    return { success: true, id: product.id };
  } catch (err) {
    console.error("updateProduct error:", err);
    return { success: false, error: "Failed to update product. Please try again." };
  }
}

// ── deleteProduct ─────────────────────────────────────────────────────────────

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        _count: { select: { enquiries: true } },
        category: { select: { slug: true } },
      },
    });

    if (!product) {
      return { success: false, error: "Product not found." };
    }

    // If product has enquiries, soft-delete (set INACTIVE) rather than hard delete
    if (product._count.enquiries > 0) {
      await prisma.product.update({
        where: { id },
        data: { status: "INACTIVE" },
      });
    } else {
      await prisma.product.delete({ where: { id } });
    }

    revalidateProductPaths(product.category.slug, product.slug);
    return { success: true, id };
  } catch (err) {
    console.error("deleteProduct error:", err);
    return { success: false, error: "Failed to delete product. Please try again." };
  }
}
