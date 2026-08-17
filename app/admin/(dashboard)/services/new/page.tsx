import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { ServiceForm } from "@/components/admin/services/ServiceForm";

export const dynamic = "force-dynamic";

export default async function NewServicePage() {
  await requireAdmin();
  return <ServiceForm mode="create" />;
}
