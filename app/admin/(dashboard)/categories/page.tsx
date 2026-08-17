import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminCategories } from "@/lib/data/admin";
import { CategoryTable } from "@/components/admin/categories/CategoryTable";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import Link from "next/link";
import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  await requireAdmin();
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage machine categories displayed on the website.
          </p>
        </div>

        <Button render={<Link href="/admin/categories/new" />} size="sm" className="gap-1.5 self-start !text-white sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Create machine categories to group your products."
          actionHref="/admin/categories/new"
          actionLabel="Add Category"
          icon={<Tag className="h-10 w-10 text-muted-foreground" />}
        />
      ) : (
        <CategoryTable categories={categories} />
      )}
    </div>
  );
}
