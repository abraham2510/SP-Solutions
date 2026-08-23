"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { EnquirySchema } from "@/lib/validations/enquiry";
import { sendEnquiryNotificationEmails } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import type { EnquiryStatus } from "@prisma/client";
import { z } from "zod";

type ActionResult = { success: true; id: string } | { success: false; error: string };

function formatZodError(err: z.ZodError): string {
  return err.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`).join(", ");
}

// ── Public: submit enquiry from website ───────────────────────────────────────

export async function submitEnquiry(data: unknown): Promise<ActionResult> {
  const parsed = EnquirySchema.safeParse(data);
  if (!parsed.success) return { success: false, error: formatZodError(parsed.error) };

  try {
    const subject = parsed.data.subject
      ? `[${parsed.data.inquiryType || "Inquiry"}] ${parsed.data.subject}`
      : parsed.data.inquiryType || null;

    const enquiry = await prisma.enquiry.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        company: parsed.data.company || null,
        subject: subject,
        message: parsed.data.message,
        productId: parsed.data.productId || null,
        serviceId: parsed.data.serviceId || null,
      },
    });

    // Send emails asynchronously (to admin receiver and customer sender)
    sendEnquiryNotificationEmails({
      id: enquiry.id,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      company: enquiry.company,
      subject: enquiry.subject,
      message: enquiry.message,
      inquiryType: parsed.data.inquiryType,
    }).catch((mailErr) => {
      console.error("[submitEnquiry] Email dispatch error:", mailErr);
    });

    revalidatePath("/admin/enquiries");
    return { success: true, id: enquiry.id };
  } catch (err) {
    console.error("submitEnquiry error:", err);
    return { success: false, error: "Failed to submit enquiry. Please try again." };
  }
}

// ── Admin: update enquiry status ──────────────────────────────────────────────

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<ActionResult> {
  await requireAdmin();

  const validStatuses: EnquiryStatus[] = ["NEW", "CONTACTED", "CLOSED"];
  if (!validStatuses.includes(status)) {
    return { success: false, error: "Invalid status value." };
  }

  try {
    await prisma.enquiry.update({ where: { id }, data: { status } });
    revalidatePath("/admin/enquiries");
    return { success: true, id };
  } catch (err) {
    console.error("updateEnquiryStatus error:", err);
    return { success: false, error: "Failed to update enquiry status." };
  }
}

// ── Admin: delete enquiry ─────────────────────────────────────────────────────

export async function deleteEnquiry(id: string): Promise<ActionResult> {
  await requireAdmin();

  try {
    await prisma.enquiry.delete({ where: { id } });
    revalidatePath("/admin/enquiries");
    return { success: true, id };
  } catch (err) {
    console.error("deleteEnquiry error:", err);
    return { success: false, error: "Failed to delete enquiry." };
  }
}
