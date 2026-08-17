import { z } from "zod";

export const EnquirySchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(30).optional().default(""),
  company: z.string().max(200).optional().default(""),
  subject: z.string().max(300).optional().default(""),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  productId: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;
