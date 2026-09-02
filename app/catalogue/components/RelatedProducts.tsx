"use client";

import Link from "next/link";
import type { CatalogueProduct } from "@/lib/catalogue/types";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

interface Props {
  products: CatalogueProduct[];
}

function RelatedProductCard({ product }: { product: CatalogueProduct }) {
  const href = `/machines/${product.category_id}/${product.slug}`;
  const displayImage =
    (product.images && product.images.length > 0 && product.images[0]) ||
    product.image ||
    "";

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white border border-[#E7EAEE] hover:border-[#00266A]/30 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.12)] overflow-hidden h-full"
    >
      {/* Image Container with Controlled Proportions (800x600 4:3 Ratio) */}
      <div className="relative w-full aspect-[4/3] bg-[#F4F6FA] overflow-hidden shrink-0">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 z-10 pointer-events-none opacity-80 group-hover:opacity-60 transition-opacity" />

        {displayImage ? (
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00266A]/8 via-[#D5DEF0]/30 to-[#D5BD66]/10 flex flex-col items-center justify-center gap-2">
            <span className="text-xs font-semibold text-[#5B6572]">
              Machine Preview
            </span>
          </div>
        )}

        {/* Category Tag */}
        {product.category_name && (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] tracking-[0.06em] font-bold uppercase text-white bg-[#00266A]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
              {product.category_name}
            </span>
          </div>
        )}

        {/* Model Tag */}
        {product.model && (
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] font-semibold text-[#00266A] bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-[#E7EAEE] shadow-xs">
              {product.model}
            </span>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors leading-snug line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {product.short_description && (
            <p className="text-[#5B6572] text-[12.5px] leading-relaxed line-clamp-2 mb-4">
              {product.short_description}
            </p>
          )}
        </div>

        {/* Footer Action Link */}
        <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#00266A] group-hover:text-[#8CB843] transition-colors">
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="text-[11px] font-medium text-[#8892A0]">
            Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Shows related products in the same category with clean modern UI. */
export default function RelatedProducts({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 wrap border-t border-[#E7EAEE]/90">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-[#00266A] bg-[#00266A]/6 px-3 py-1 rounded-full border border-[#00266A]/12 mb-3">
            <Sparkles className="w-3 h-3 text-[#00266A]" />
            Similar Equipment
          </div>
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#10151C] tracking-tight leading-tight">
            Related Machines & Solutions
          </h2>
          <p className="text-[13.5px] text-[#5B6572] mt-1">
            Explore related high-performance machinery designed for your line.
          </p>
        </div>

        <Link
          href="/catalogue"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#00266A] hover:text-[#001D53] hover:underline shrink-0 group self-start sm:self-auto"
        >
          <span>Browse All Machinery</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5.5">
        {products.map((product) => (
          <RelatedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
