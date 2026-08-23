import { z } from "zod";

// Strict validation patterns
export const NAME_REGEX = /^[a-zA-Z\s.'-]+$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const EnquirySchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .regex(NAME_REGEX, "Please enter a valid name using letters and spaces only"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address")
    .regex(EMAIL_REGEX, "Please enter a valid email format (e.g., name@company.com)"),
  phone: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const digits = val.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 14;
      },
      {
        message: "Please enter a valid 10-digit phone number",
      }
    )
    .optional(),
  company: z
    .string()
    .max(200, "Company name cannot exceed 200 characters")
    .optional(),
  inquiryType: z
    .enum([
      "Machine Purchase",
      "Repair & Technical Service",
      "Annual Maintenance Contract (AMC)",
      "Custom Line Automation",
      "Spare Parts & Consumables",
      "General Inquiry",
    ])
    .optional(),
  subject: z.string().max(300).optional(),
  message: z
    .string()
    .min(10, "Please provide at least 10 characters detailing your requirement")
    .max(5000, "Message cannot exceed 5000 characters"),
  productId: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
});

export type EnquiryInput = z.infer<typeof EnquirySchema>;
