"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { CategorySchema } from "@/lib/validations/category";
import { uploadMultipleImagesAction } from "@/actions/upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult = { success: true; id: string } | { success: false; error: string };

function formatZodError(err: z.ZodError): string {
  return err.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

export async function createCategory(data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = CategorySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };

  const existing = await prisma.category.findFirst({ where: { slug: parsed.data.slug } });
  if (existing) return { success: false, error: "A category with this slug already exists." };

  let images = parsed.data.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "categories");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || parsed.data.imageUrl || null;
  const videos = parsed.data.videos || [];
  const primaryVideoUrl = parsed.data.videoUrl || videos[0] || null;

  const { name, slug, description, type, sortOrder, status } = parsed.data;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        type,
        description: description || null,
        imageUrl: primaryImageUrl,
        images: images,
        videoUrl: primaryVideoUrl,
        videos: videos,
        sortOrder,
        status,
      },
    });
    revalidatePath("/machines");
    revalidatePath("/");
    return { success: true, id: category.id };
  } catch (err) {
    console.error("createCategory error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create category.",
    };
  }
}

export async function updateCategory(id: string, data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = CategorySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };

  const existing = await prisma.category.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (existing) return { success: false, error: "A category with this slug already exists." };

  let images = parsed.data.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "categories");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || parsed.data.imageUrl || null;
  const videos = parsed.data.videos || [];
  const primaryVideoUrl = parsed.data.videoUrl || videos[0] || null;
  const { name, slug, description, type, sortOrder, status } = parsed.data;

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        type,
        description: description || null,
        imageUrl: primaryImageUrl,
        images: images,
        videoUrl: primaryVideoUrl,
        videos: videos,
        sortOrder,
        status,
      },
    });
    revalidatePath("/machines");
    revalidatePath(`/machines/${category.slug}`);
    revalidatePath("/");
    return { success: true, id: category.id };
  } catch (err) {
    console.error("updateCategory error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update category.",
    };
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (!category) return { success: false, error: "Category not found." };

    if (category._count.products > 0) {
      return {
        success: false,
        error: `Cannot delete category: it has ${category._count.products} product(s). Remove or reassign products first.`,
      };
    }

    await prisma.category.delete({ where: { id } });
    revalidatePath("/machines");
    revalidatePath("/");
    return { success: true, id };
  } catch (err) {
    console.error("deleteCategory error:", err);
    return { success: false, error: "Failed to delete category." };
  }
}
