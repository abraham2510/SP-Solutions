import React from "react";
import { requireAdmin } from "@/lib/auth-helpers";
import { getAdminProducts, getAdminCategories } from "@/lib/data/admin";
import { ProductTable } from "@/components/admin/products/ProductTable";
import { SearchInput } from "@/components/admin/ui/SearchInput";
import { FilterDropdown } from "@/components/admin/ui/FilterDropdown";
import { Pagination } from "@/components/admin/ui/Pagination";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Status } from "@prisma/client";

export const dynamic = "force-dynamic";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  await requireAdmin();
  const params = await searchParams;

  const page = parseInt(params.page || "1", 10);
  const search = params.search;
  const categoryId = params.categoryId;
  const status = (params.status?.toUpperCase() as Status) || undefined;

  const [{ products, total, totalPages, perPage }, categories] = await Promise.all([
    getAdminProducts({ search, categoryId, status, page, perPage: 15 }),
    getAdminCategories(),
  ]);

  const categoryOptions = categories.map((c) => ({ label: c.name, value: c.id }));
  const statusOptions = [
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "INACTIVE", value: "INACTIVE" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your SP SOLUTIONS machinery catalogue.
          </p>
        </div>

        <Button render={<Link href="/admin/products/new" />} size="sm" className="gap-1.5 !text-white self-start sm:self-auto">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-card p-4 rounded-lg border border-border shadow-xs">
        <SearchInput placeholder="Search product name or model..." defaultValue={search} />
        <FilterDropdown paramName="categoryId" label="All Categories" options={categoryOptions} defaultValue={"Categories"} />
        <FilterDropdown paramName="status" label="All Statuses" options={statusOptions} defaultValue={"Statuses"} />
      </div>

      {/* Table / Empty State */}
      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="No machine products match your current filters. Try resetting search or filters."
          actionHref="/admin/products/new"
          actionLabel="Add New Product"
          icon={<Package className="h-10 w-10 text-muted-foreground" />}
        />
      ) : (
        <div className="space-y-4">
          <ProductTable products={products} />
          <Pagination page={page} totalPages={totalPages} total={total} perPage={perPage} />
        </div>
      )}
    </div>
  );
}
