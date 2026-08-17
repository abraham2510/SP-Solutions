import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  type: z.string().min(1).max(50).default("machine"),
  description: z.string().max(2000).optional().default(""),
  imageUrl: z.string().optional().default(""),
  images: z.array(z.string()).default([]),
  sortOrder: z.number().int().min(0).max(9999).default(0),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type CategoryInput = z.infer<typeof CategorySchema>;
