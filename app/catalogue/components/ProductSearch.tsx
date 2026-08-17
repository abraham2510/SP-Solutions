"use client";

import { useState, useMemo } from "react";
import type { CatalogueProduct, CatalogueCategory } from "@/lib/catalogue/types";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

interface Props {
  products: CatalogueProduct[];
  categories: CatalogueCategory[];
}

export default function ProductSearch({ products, categories }: Props) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Product counts per category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat.id] = products.filter(
        (p) =>
          p.category_id === cat.slug ||
          p.category_id === cat.id ||
          p.category_name?.toLowerCase() === cat.name?.toLowerCase()
      ).length;
    }
    return counts;
  }, [products, categories]);

  const filtered = useMemo(() => {
    let result = products;

    // Filter by Category
    if (categoryId && categoryId !== "" && categoryId !== "all") {
      const selectedCat = categories.find((c) => c.id === categoryId || c.slug === categoryId);
      const targetSlug = selectedCat?.slug || categoryId;
      const targetId = selectedCat?.id || categoryId;
      const targetName = selectedCat?.name?.toLowerCase();

      result = result.filter(
        (p) =>
          p.category_id === targetSlug ||
          p.category_id === targetId ||
          p.category_id === categoryId ||
          (targetName && p.category_name?.toLowerCase() === targetName)
      );
    }

    // Filter by Search Query
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.category_name.toLowerCase().includes(q) ||
          (p.model && p.model.toLowerCase().includes(q)) ||
          (Array.isArray(p.features) && p.features.some((f) => f.toLowerCase().includes(q)))
      );
    }

    return result;
  }, [products, categories, categoryId, query]);

  const hasFilters = query.trim() !== "" || (categoryId !== "" && categoryId !== "all");
  const selectedCategoryObj = categories.find((c) => c.id === categoryId || c.slug === categoryId);

  const clearFilters = () => {
    setQuery("");
    setCategoryId("");
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar: Search + Category Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search input */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A0] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
              />
            </svg>
            <input
              id="product-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by machine name, model, spec..."
              className="w-full pl-10 pr-9 h-11 rounded-xl border border-[#D5DEF0] bg-white text-[13.5px] text-[#10151C] placeholder:text-[#8892A0] focus:outline-none focus:bg-white focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/10 transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8892A0] hover:text-[#10151C] p-1 rounded-md text-xs transition-colors"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Dropdown Filter */}
          <CategoryFilter
            categories={categories}
            selected={categoryId}
            onChange={setCategoryId}
            productCounts={productCounts}
          />
        </div>

        {/* Clear filters action */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            id="clear-filters-btn"
            className="self-start sm:self-center text-[12.5px] font-semibold text-[#00266A] hover:text-[#D5BD66] underline underline-offset-2 transition-colors cursor-pointer shrink-0"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Active Filter Chips & Results Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[#5B6572] px-1">
        <p className="font-medium">
          Showing <strong className="text-[#10151C] font-bold">{filtered.length}</strong> of {products.length} packaging machines
        </p>

        {/* Active Filter Badges */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2">
            {selectedCategoryObj && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00266A]/10 text-[#00266A] border border-[#00266A]/20">
                <span>Category: {selectedCategoryObj.name}</span>
                <button
                  type="button"
                  onClick={() => setCategoryId("")}
                  className="hover:text-red-600 transition-colors ml-0.5"
                  aria-label="Remove category filter"
                >
                  ✕
                </button>
              </span>
            )}
            {query.trim() && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00266A]/10 text-[#00266A] border border-[#00266A]/20">
                <span>Search: &quot;{query}&quot;</span>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="hover:text-red-600 transition-colors ml-0.5"
                  aria-label="Remove search query"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={filtered}
        emptyState={
          <div className="flex flex-col items-center gap-4 py-20 px-4 text-center bg-white rounded-2xl border border-[#E7EAEE] shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#F4F6FA] flex items-center justify-center text-[#8892A0]">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
              </svg>
            </div>
            <div>
              <p className="text-[#10151C] text-lg font-bold mb-1">No machines match your filter</p>
              <p className="text-[#5B6572] text-sm max-w-sm">
                Try adjusting your search query or selecting a different machinery category from the dropdown above.
              </p>
            </div>
            <button
              onClick={clearFilters}
              className="btn btn-primary btn-sm mt-2"
            >
              Reset Filters &amp; Show All Machines
            </button>
          </div>
        }
      />
    </div>
  );
}
