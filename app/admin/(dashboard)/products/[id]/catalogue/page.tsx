import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminProductById } from "@/lib/data/admin";
import { notFound } from "next/navigation";
import { ProductCatalogueDocument } from "@/components/catalogue/ProductCatalogueDocument";
import { ProductCatalogueToolbar } from "@/components/catalogue/ProductCatalogueToolbar";

export const dynamic = "force-dynamic";

interface AdminProductCataloguePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProductCataloguePage({
  params,
}: AdminProductCataloguePageProps) {
  await requireAdmin();
  const { id } = await params;

  const product = await getAdminProductById(id);
  if (!product) {
    notFound();
  }

  const exportData = {
    name: product.name,
    model: product.model,
    category_name: product.category?.name,
    category: product.category,
    short_description: product.shortDescription,
    description: product.description,
    imageUrl: product.imageUrl,
    images: product.images,
    features: product.features,
    applications: product.applications,
    specifications: product.specifications,
  };

  return (
    <div className="min-h-screen bg-[#c8d8b0]">
      {/* Top Floating Toolbar */}
      <ProductCatalogueToolbar
        product={exportData}
        backHref="/admin/products"
      />

      {/* Catalogue Template View */}
      <ProductCatalogueDocument product={exportData} />
    </div>
  );
}
