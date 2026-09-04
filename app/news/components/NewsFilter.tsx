"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NewsFilterProps {
  categoriesWithCounts: { category: string; count: number }[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalArticles: number;
}

export function NewsFilter({
  categoriesWithCounts = [],
  selectedCategory = "All",
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  totalArticles = 0,
}: NewsFilterProps) {
  // Map category counts
  const countMap = new Map<string, number>();
  categoriesWithCounts.forEach((c) => countMap.set(c.category, c.count));

  return (
    <div className="space-y-4">
      {/* Search & Meta Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search news, launches, exhibitions..."
            className="pl-9.5 pr-8 text-xs sm:text-sm h-10 bg-white border-[#D5DEF0] rounded-full focus-visible:ring-[#00266A]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Showing Count */}
        <span className="text-xs font-semibold text-[#5B6572] self-end sm:self-center">
          Showing <b>{totalArticles}</b>{" "}
          {totalArticles === 1 ? "article" : "articles"}
        </span>
      </div>

      {/* Category Pills Scroller — Only render categories that exist in database */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* 'All' button */}
        <button
          type="button"
          onClick={() => onSelectCategory("All")}
          className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === "All"
              ? "bg-[#00266A] text-white shadow-xs"
              : "bg-white text-[#5B6572] border border-[#E7EAEE] hover:border-[#00266A] hover:text-[#00266A]"
          }`}
        >
          All Updates
        </button>

        {/* Only categories that exist in the database */}
        {categoriesWithCounts
          .filter((c) => c.count > 0)
          .map(({ category: cat, count }) => {
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#00266A] text-white shadow-xs font-bold"
                    : "bg-white text-[#5B6572] border border-[#E7EAEE] hover:border-[#00266A] hover:text-[#00266A]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#F1F5F9] text-[#00266A]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
      </div>
    </div>
  );
}
