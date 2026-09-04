export type BlogPostStatus = "DRAFT" | "PUBLISHED";

export interface BlogGalleryItem {
  url: string;
  caption?: string;
  sortOrder?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string;
  author: string | null;
  tags: string[];
  gallery: BlogGalleryItem[];
  externalLink: string | null;
  externalLinkText: string | null;
  status: BlogPostStatus;
  featured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostCardData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  author: string | null;
  tags: string[];
  status: BlogPostStatus;
  featured: boolean;
  publishedAt: Date;
  readTimeMinutes?: number;
}

export const BLOG_CATEGORIES = [
  "New Product",
  "Product Launch",
  "Innovation",
  "Company News",
  "Events",
  "Exhibition",
  "Achievement",
  "Announcement",
  "Industry Update",
  "Other",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
