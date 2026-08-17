import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  await requireAdmin();
  return <CategoryForm mode="create" />;
}
