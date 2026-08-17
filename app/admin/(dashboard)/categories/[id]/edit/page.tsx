import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminCategoryById } from "@/lib/data/admin";
import { CategoryForm } from "@/components/admin/categories/CategoryForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditCategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  await requireAdmin();
  const { id } = await params;

  const category = await getAdminCategoryById(id);
  if (!category) {
    notFound();
  }

  return <CategoryForm mode="edit" initialData={category} />;
}
