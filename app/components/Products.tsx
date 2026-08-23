"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CatalogueCategory } from "@/lib/catalogue/types";
import ProductCategoryCard from "./ProductCategoryCard";

interface Props {
  categories: CatalogueCategory[];
  productCounts: Record<string, number>;
}

export default function Products({ categories, productCounts }: Props) {
  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#E7EAEE]" id="products">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">THE PRODUCT LINE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              {categories.length} machine families. One line that doesn&apos;t stop.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              Every category below is built to run alongside the others — pick one machine or spec a full end-of-line system.
            </p>
          </div>

          <div className="shrink-0 self-start md:self-end">
            <Link
              href="/machines"
              className="btn btn-outline flex items-center gap-2 !px-5 !py-2.5 !rounded-full !text-[13.5px] font-semibold hover:!bg-[#00266A] hover:!text-white hover:!border-[#00266A] transition-all shadow-xs"
            >
              <span>View all catalogues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Dynamic Centered Grid Layout */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc((100%-4rem)/3)] flex shrink-0"
            >
              <ProductCategoryCard
                category={category}
                count={productCounts[category.id] ?? 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
