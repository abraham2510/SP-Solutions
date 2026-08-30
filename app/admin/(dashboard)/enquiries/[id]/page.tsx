import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminEnquiryById } from "@/lib/data/admin";
import { notFound } from "next/navigation";
import { EnquiryDetailView } from "@/components/admin/enquiries/EnquiryDetailView";

export const dynamic = "force-dynamic";

interface EnquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EnquiryDetailPage({
  params,
}: EnquiryDetailPageProps) {
  await requireAdmin();
  const { id } = await params;

  const enquiry = await getAdminEnquiryById(id);
  if (!enquiry) {
    notFound();
  }

  return <EnquiryDetailView enquiry={enquiry} />;
}
