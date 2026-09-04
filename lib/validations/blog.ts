import { z } from "zod";

export const BlogGalleryItemSchema = z.object({
  url: z.string().min(1, "Image URL or data is required"),
  caption: z.string().max(300).optional().default(""),
  sortOrder: z.number().int().default(0),
});

export const BlogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(250, "Title cannot exceed 250 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(250)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().max(1000, "Excerpt cannot exceed 1000 characters").optional().default(""),
  content: z.string().min(5, "Content must be at least 5 characters"),
  coverImage: z.string().optional().nullable().default(null),
  category: z.string().min(1, "Category is required").default("Company News"),
  author: z.string().max(100).optional().default("SP Solutions Team"),
  tags: z.array(z.string()).default([]),
  gallery: z.array(BlogGalleryItemSchema).default([]),
  externalLink: z
    .string()
    .refine((val) => !val || val.startsWith("http://") || val.startsWith("https://") || val.startsWith("/"), {
      message: "External link must start with https://, http://, or /",
    })
    .optional()
    .nullable()
    .default(null),
  externalLinkText: z.string().max(100).optional().nullable().default(null),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  featured: z.boolean().default(false),
  publishedAt: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;
