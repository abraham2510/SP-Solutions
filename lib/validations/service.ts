import { z } from "zod";

export const ServiceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  shortDescription: z.string().max(500).optional().default(""),
  description: z.string().max(10000).optional().default(""),
  imageUrl: z.string().optional().default(""),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

export type ServiceInput = z.infer<typeof ServiceSchema>;
