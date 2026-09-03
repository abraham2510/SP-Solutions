"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { ServiceSchema } from "@/lib/validations/service";
import { uploadMultipleImagesAction } from "@/actions/upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ActionResult = { success: true; id: string } | { success: false; error: string };

function formatZodError(err: z.ZodError): string {
  return err.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

export async function createService(data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = ServiceSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };

  const existing = await prisma.service.findFirst({ where: { slug: parsed.data.slug } });
  if (existing) return { success: false, error: "A service with this slug already exists." };

  let images = parsed.data.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "services");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || parsed.data.imageUrl || null;
  const videos = parsed.data.videos || [];
  const primaryVideoUrl = parsed.data.videoUrl || videos[0] || null;

  const { name, slug, shortDescription, description, featured, status, sortOrder } = parsed.data;

  try {
    const service = await prisma.service.create({
      data: {
        name,
        slug,
        shortDescription: shortDescription || null,
        description: description || null,
        imageUrl: primaryImageUrl,
        images: images,
        videoUrl: primaryVideoUrl,
        videos: videos,
        featured,
        status,
        sortOrder,
      },
    });
    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, id: service.id };
  } catch (err) {
    console.error("createService error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create service.",
    };
  }
}

export async function updateService(id: string, data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = ServiceSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };

  const existing = await prisma.service.findFirst({
    where: { slug: parsed.data.slug, NOT: { id } },
  });
  if (existing) return { success: false, error: "A service with this slug already exists." };

  let images = parsed.data.images || [];
  if (images.some((img) => img.startsWith("data:image/"))) {
    const uploadRes = await uploadMultipleImagesAction(images, "services");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload images to Cloudinary." };
    }
    images = uploadRes.urls;
  }

  const primaryImageUrl = images[0] || parsed.data.imageUrl || null;
  const videos = parsed.data.videos || [];
  const primaryVideoUrl = parsed.data.videoUrl || videos[0] || null;
  const { name, slug, shortDescription, description, featured, status, sortOrder } = parsed.data;

  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        name,
        slug,
        shortDescription: shortDescription || null,
        description: description || null,
        imageUrl: primaryImageUrl,
        images: images,
        videoUrl: primaryVideoUrl,
        videos: videos,
        featured,
        status,
        sortOrder,
      },
    });
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath("/");
    return { success: true, id: service.id };
  } catch (err) {
    console.error("updateService error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update service.",
    };
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    const service = await prisma.service.findUnique({
      where: { id },
      include: { _count: { select: { enquiries: true } } },
    });
    if (!service) return { success: false, error: "Service not found." };

    if (service._count.enquiries > 0) {
      await prisma.service.update({ where: { id }, data: { status: "INACTIVE" } });
    } else {
      await prisma.service.delete({ where: { id } });
    }

    revalidatePath("/services");
    revalidatePath("/");
    return { success: true, id };
  } catch (err) {
    console.error("deleteService error:", err);
    return { success: false, error: "Failed to delete service." };
  }
}
