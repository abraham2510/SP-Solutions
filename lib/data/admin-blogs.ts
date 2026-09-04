import "server-only";
import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogGalleryItem, BlogPostStatus } from "@/lib/types/blog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAdminPost(p: any): BlogPost {
  let gallery: BlogGalleryItem[] = [];
  if (Array.isArray(p.gallery)) {
    gallery = p.gallery;
  } else if (typeof p.gallery === "string") {
    try {
      gallery = JSON.parse(p.gallery);
    } catch {
      gallery = [];
    }
  }

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    coverImage: p.coverImage,
    category: p.category,
    author: p.author || "SP Solutions Team",
    tags: Array.isArray(p.tags) ? p.tags : [],
    gallery,
    externalLink: p.externalLink,
    externalLinkText: p.externalLinkText,
    status: p.status,
    featured: p.featured,
    publishedAt: p.publishedAt,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

export interface GetAdminBlogsOptions {
  search?: string;
  category?: string;
  status?: BlogPostStatus | "ALL";
  page?: number;
  limit?: number;
}

export async function getAllAdminBlogPosts(options: GetAdminBlogsOptions = {}) {
  const { search, category, status = "ALL", page = 1, limit = 50 } = options;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (category && category !== "All") {
    where.category = category;
  }

  if (search && search.trim()) {
    where.OR = [
      { title: { contains: search.trim(), mode: "insensitive" } },
      { slug: { contains: search.trim(), mode: "insensitive" } },
      { excerpt: { contains: search.trim(), mode: "insensitive" } },
      { author: { contains: search.trim(), mode: "insensitive" } },
      { category: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  try {
    const [posts, total, publishedCount, draftCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.blogPost.count({ where: { status: "DRAFT" } }),
    ]);

    return {
      posts: posts.map(mapAdminPost),
      total,
      publishedCount,
      draftCount,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in getAllAdminBlogPosts:", error);
    return {
      posts: [],
      total: 0,
      publishedCount: 0,
      draftCount: 0,
      totalPages: 1,
      currentPage: page,
    };
  }
}

export async function getAdminBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    return post ? mapAdminPost(post) : null;
  } catch (error) {
    console.error("Error in getAdminBlogPostById:", error);
    return null;
  }
}

