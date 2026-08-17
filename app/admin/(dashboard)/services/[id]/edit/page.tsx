import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminServiceById } from "@/lib/data/admin";
import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  await requireAdmin();
  const { id } = await params;

  const service = await getAdminServiceById(id);
  if (!service) {
    notFound();
  }

  return <ServiceForm mode="edit" initialData={service} />;
}
