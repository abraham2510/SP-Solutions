"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { EnquirySchema } from "@/lib/validations/enquiry";
import { sendEnquiryNotificationEmails } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { detectSpam, isRateLimited } from "@/lib/spam-detector";
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
    // 1. IP Rate Limiting
    let clientIp = "unknown";
    try {
      const headerList = await headers();
      const forwarded = headerList.get("x-forwarded-for");
      clientIp = forwarded ? forwarded.split(",")[0].trim() : headerList.get("x-real-ip") || "unknown";
    } catch {
      // Header extraction fallback
    }

    if (isRateLimited(clientIp)) {
      console.warn(`[submitEnquiry RateLimit] Blocked request from ${clientIp}`);
      return { success: false, error: "Too many submissions. Please wait a few minutes before trying again." };
    }

    // 2. Anti-Spam Detection (Honeypot, Speed, Heuristics, Gibberish)
    const spamCheck = detectSpam({
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      subject: parsed.data.subject,
      website_url: parsed.data.website_url,
      formLoadedAt: parsed.data.formLoadedAt,
    });

    if (spamCheck.isSpam) {
      console.warn(`[submitEnquiry SPAM BLOCKED] Reason: ${spamCheck.reason} | IP: ${clientIp} | Name: ${parsed.data.name}`);
      // Deceptive success response: return simulated reference ID so bots believe they succeeded
      // but DO NOT write to database and DO NOT dispatch notification emails.
      const fakeRefId = "cm" + Math.random().toString(36).substring(2, 10) + "fake";
      return { success: true, id: fakeRefId };
    }

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

    // Await email dispatch so serverless runtimes (Vercel/Lambda) complete SMTP handshake
    try {
      const mailResult = await sendEnquiryNotificationEmails({
        id: enquiry.id,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        company: enquiry.company,
        subject: enquiry.subject,
        message: enquiry.message,
        inquiryType: parsed.data.inquiryType,
      });
      if (mailResult.error) {
        console.error("[submitEnquiry] Notification email issue:", mailResult.error);
      } else {
        console.log(`[submitEnquiry] Notification emails completed successfully (admin: ${mailResult.adminSent}, customer: ${mailResult.customerSent})`);
      }
    } catch (mailErr) {
      console.error("[submitEnquiry Fatal] Email dispatch exception:", mailErr);
    }

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
