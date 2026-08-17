"use client";

import { useRef } from "react";
import Link from "next/link";
import type { CatalogueCategory } from "@/lib/catalogue/types";
import ProductCategoryCard from "./ProductCategoryCard";

interface Props {
  categories: CatalogueCategory[];
  productCounts: Record<string, number>;
}

export default function Products({ categories, productCounts }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -390 : 390;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#E7EAEE]" id="products">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">THE PRODUCT LINE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              {categories.length} machine families. One line that doesn&apos;t stop.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              Every category below is built to run alongside the others — pick one machine or spec a full end-of-line system.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end md:self-auto">
            <Link
              href="/machines"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00266A] border border-[#D5DEF0] px-4 py-2 rounded-full hover:border-[#00266A] hover:bg-[#F4F6FA] transition-all mr-1"
            >
              View all
            </Link>
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
              aria-label="Previous category"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
              aria-label="Next category"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={sliderRef}
          data-lenis-prevent
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-proximity sm:snap-mandatory scroll-smooth pb-6 pt-2 touch-pan-x [webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <ProductCategoryCard
              key={category.id}
              category={category}
              count={productCounts[category.id] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
