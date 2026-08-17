import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminProductById, getAdminCategories } from "@/lib/data/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import { notFound } from "next/navigation";
import type { Category } from "@prisma/client";

export const dynamic = "force-dynamic";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireAdmin();
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getAdminCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      mode="edit"
      categories={categories.map((c: Category) => ({ id: c.id, name: c.name, slug: c.slug }))}
      initialData={product}
    />
  );
}
