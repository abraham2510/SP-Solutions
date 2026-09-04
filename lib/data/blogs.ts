import "server-only";
import { prisma } from "@/lib/prisma";
import type { BlogPost, BlogPostCardData, BlogGalleryItem } from "@/lib/types/blog";

function calculateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(p: any): BlogPost {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCard(p: any): BlogPostCardData {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    category: p.category,
    author: p.author || "SP Solutions Team",
    tags: Array.isArray(p.tags) ? p.tags : [],
    status: p.status,
    featured: p.featured,
    publishedAt: p.publishedAt,
    readTimeMinutes: calculateReadTime(p.content || ""),
  };
}

export interface GetPublishedBlogsOptions {
  category?: string;
  tag?: string;
  search?: string;
  limit?: number;
  page?: number;
}

export async function getPublishedBlogPosts(options: GetPublishedBlogsOptions = {}) {
  const { category, tag, search, limit = 12, page = 1 } = options;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    status: "PUBLISHED",
    publishedAt: { lte: new Date() },
  };

  if (category && category !== "All") {
    where.category = category;
  }

  if (tag) {
    where.tags = { has: tag };
  }

  if (search && search.trim()) {
    where.OR = [
      { title: { contains: search.trim(), mode: "insensitive" } },
      { excerpt: { contains: search.trim(), mode: "insensitive" } },
      { content: { contains: search.trim(), mode: "insensitive" } },
      { category: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts: posts.map(mapCard),
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      currentPage: page,
    };
  } catch (error) {
    console.error("Error in getPublishedBlogPosts:", error);
    return {
      posts: [],
      total: 0,
      totalPages: 1,
      currentPage: page,
    };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const normalizedSlug = decodeURIComponent(slug || "").trim();
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: normalizedSlug,
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
    });

    return post ? mapPost(post) : null;
  } catch (error) {
    console.error("Error in getBlogPostBySlug:", error);
    return null;
  }
}


export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPostCardData[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
      orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });

    return posts.map(mapCard);
  } catch (error) {
    console.error("Error in getFeaturedBlogPosts:", error);
    return [];
  }
}

export async function getRelatedBlogPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPostCardData[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        slug: { not: currentSlug },
        category,
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    if (posts.length < limit) {
      const additional = await prisma.blogPost.findMany({
        where: {
          slug: { notIn: [currentSlug, ...posts.map((p) => p.slug)] },
          status: "PUBLISHED",
          publishedAt: { lte: new Date() },
        },
        orderBy: { publishedAt: "desc" },
        take: limit - posts.length,
      });
      return [...posts, ...additional].map(mapCard);
    }

    return posts.map(mapCard);
  } catch (error) {
    console.error("Error in getRelatedBlogPosts:", error);
    return [];
  }
}

export async function getBlogCategoriesWithCounts(): Promise<{ category: string; count: number }[]> {
  try {
    const counts = await prisma.blogPost.groupBy({
      by: ["category"],
      where: {
        status: "PUBLISHED",
        publishedAt: { lte: new Date() },
      },
      _count: {
        _all: true,
      },
    });

    return counts.map((c) => ({
      category: c.category,
      count: c._count._all,
    }));
  } catch (error) {
    console.error("Error in getBlogCategoriesWithCounts:", error);
    return [];
  }
}

