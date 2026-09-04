"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { BlogPostSchema } from "@/lib/validations/blog";
import { uploadImageAction, uploadMultipleImagesAction } from "@/actions/upload";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { BlogPostStatus } from "@/lib/types/blog";

type ActionResult =
  | { success: true; id: string; slug?: string }
  | { success: false; error: string };

function formatZodError(err: z.ZodError): string {
  return err.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

export async function createBlogPost(data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = BlogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  const {
    title,
    slug,
    excerpt,
    content,
    category,
    author,
    tags,
    externalLink,
    externalLinkText,
    status,
    featured,
    publishedAt,
  } = parsed.data;

  // Check unique slug
  const existing = await prisma.blogPost.findUnique({ where: { slug } });
  if (existing) {
    return { success: false, error: "A post with this slug URL already exists. Please choose a unique slug." };
  }

  // Handle cover image upload
  let coverImageUrl = parsed.data.coverImage || null;
  if (coverImageUrl && coverImageUrl.startsWith("data:image/")) {
    const uploadRes = await uploadImageAction(coverImageUrl, "blogs/covers");
    if (!uploadRes.success || !uploadRes.url) {
      return { success: false, error: uploadRes.error || "Failed to upload cover image to Cloudinary." };
    }
    coverImageUrl = uploadRes.url;
  }

  // Handle gallery images upload
  let galleryItems = parsed.data.gallery || [];
  const base64GalleryImages = galleryItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.url && item.url.startsWith("data:image/"));

  if (base64GalleryImages.length > 0) {
    const imagesToUpload = base64GalleryImages.map((b) => b.item.url);
    const uploadRes = await uploadMultipleImagesAction(imagesToUpload, "blogs/gallery");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload gallery images to Cloudinary." };
    }
    base64GalleryImages.forEach(({ index }, i) => {
      galleryItems[index] = {
        ...galleryItems[index],
        url: uploadRes.urls![i],
      };
    });
  }

  try {
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImageUrl,
        category,
        author: author || "SP Solutions Team",
        tags,
        gallery: galleryItems.length > 0 ? (galleryItems as unknown as object) : undefined,
        externalLink: externalLink || null,
        externalLinkText: externalLinkText || null,
        status,
        featured,
        publishedAt: publishedAt || new Date(),
      },
    });

    revalidatePath("/news");
    revalidatePath(`/news/${post.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/sitemap.xml");

    return { success: true, id: post.id, slug: post.slug };
  } catch (err) {
    console.error("createBlogPost error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create blog post.",
    };
  }
}

export async function updateBlogPost(id: string, data: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = BlogPostSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: formatZodError(parsed.error) };
  }

  const {
    title,
    slug,
    excerpt,
    content,
    category,
    author,
    tags,
    externalLink,
    externalLinkText,
    status,
    featured,
    publishedAt,
  } = parsed.data;

  // Check unique slug for other posts
  const existing = await prisma.blogPost.findFirst({
    where: { slug, NOT: { id } },
  });
  if (existing) {
    return { success: false, error: "A post with this slug URL already exists. Please choose a unique slug." };
  }

  // Handle cover image upload
  let coverImageUrl = parsed.data.coverImage || null;
  if (coverImageUrl && coverImageUrl.startsWith("data:image/")) {
    const uploadRes = await uploadImageAction(coverImageUrl, "blogs/covers");
    if (!uploadRes.success || !uploadRes.url) {
      return { success: false, error: uploadRes.error || "Failed to upload cover image to Cloudinary." };
    }
    coverImageUrl = uploadRes.url;
  }

  // Handle gallery images upload
  let galleryItems = parsed.data.gallery || [];
  const base64GalleryImages = galleryItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.url && item.url.startsWith("data:image/"));

  if (base64GalleryImages.length > 0) {
    const imagesToUpload = base64GalleryImages.map((b) => b.item.url);
    const uploadRes = await uploadMultipleImagesAction(imagesToUpload, "blogs/gallery");
    if (!uploadRes.success || !uploadRes.urls) {
      return { success: false, error: uploadRes.error || "Failed to upload gallery images to Cloudinary." };
    }
    base64GalleryImages.forEach(({ index }, i) => {
      galleryItems[index] = {
        ...galleryItems[index],
        url: uploadRes.urls![i],
      };
    });
  }

  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImageUrl,
        category,
        author: author || "SP Solutions Team",
        tags,
        gallery: galleryItems.length > 0 ? (galleryItems as unknown as object) : undefined,
        externalLink: externalLink || null,
        externalLinkText: externalLinkText || null,
        status,
        featured,
        publishedAt: publishedAt || new Date(),
      },
    });

    revalidatePath("/news");
    revalidatePath(`/news/${post.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/sitemap.xml");

    return { success: true, id: post.id, slug: post.slug };
  } catch (err) {
    console.error("updateBlogPost error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update blog post.",
    };
  }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return { success: false, error: "Blog post not found." };
    }

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/news");
    revalidatePath(`/news/${post.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/sitemap.xml");

    return { success: true, id };
  } catch (err) {
    console.error("deleteBlogPost error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete blog post.",
    };
  }
}

export async function toggleBlogPostStatus(
  id: string,
  newStatus: BlogPostStatus
): Promise<ActionResult> {
  await requireAdmin();

  try {
    const post = await prisma.blogPost.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/news");
    revalidatePath(`/news/${post.slug}`);
    revalidatePath("/admin/blogs");
    revalidatePath("/sitemap.xml");

    return { success: true, id: post.id, slug: post.slug };
  } catch (err) {
    console.error("toggleBlogPostStatus error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to change post status.",
    };
  }
}
