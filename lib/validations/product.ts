import { z } from "zod";

export const SpecificationSchema = z.object({
  id: z.string().optional(), // existing record
  specification: z.string().min(1, "Specification name is required").max(200),
  value: z.string().min(1, "Value is required").max(200),
  unitOrNote: z.string().max(100).optional().default(""),
  sortOrder: z.number().int().default(0),
});

export const ProductSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  categoryId: z.string().min(1, "Category is required"),
  model: z.string().max(100).optional().default(""),
  shortDescription: z.string().max(500).optional().default(""),
  description: z.string().max(10000).optional().default(""),
  imageUrl: z.string().optional().default(""),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  features: z.array(z.string().min(1).max(500)).max(30).default([]),
  applications: z.array(z.string().min(1).max(500)).max(30).default([]),
  specifications: z.array(SpecificationSchema).max(50).default([]),
});

export type ProductInput = z.infer<typeof ProductSchema>;
