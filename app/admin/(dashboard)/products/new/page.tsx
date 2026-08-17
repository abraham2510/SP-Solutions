import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminCategories } from "@/lib/data/admin";
import { ProductForm } from "@/components/admin/products/ProductForm";
import type { Category } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await getAdminCategories();

  return (
    <ProductForm
      mode="create"
      categories={categories.map((c: Category) => ({ id: c.id, name: c.name, slug: c.slug }))}
    />
  );
}
