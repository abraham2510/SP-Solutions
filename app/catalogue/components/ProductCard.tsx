"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { CatalogueProduct } from "@/lib/catalogue/types";

interface Props {
  product: CatalogueProduct;
  categorySlug?: string;
}

/**
 * Auto-scrolling multi-image slider for individual machine product cards
 */
function AutoProductImageSlider({
  images,
  title,
  categoryName,
  model,
}: {
  images: string[];
  title: string;
  categoryName: string;
  model?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Filter out any empty strings
  const validImages = images.filter((img) => Boolean(img && img.trim()));

  useEffect(() => {
    if (validImages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [validImages.length, isHovered]);

  return (
    <div
      className="relative w-full h-[280px] sm:h-[320px] md:h-[340px] overflow-hidden bg-[#F4F6FA] shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00143B]/60 via-transparent to-black/10 z-10 pointer-events-none" />

      {validImages.length > 0 ? (
        validImages.map((src, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} - image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#00266A]/8 via-[#D5DEF0]/30 to-[#D5BD66]/10 flex flex-col items-center justify-center gap-3">
          <svg
            className="w-14 h-14 text-[#00266A]/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.5 1.5M19.8 15l1.5 1.5m-3 0l1.5-1.5m-1.5 1.5v3.75m-9-3.75H6m12 0h1.5m-1.5 0v3.75"
            />
          </svg>
          <span className="text-xs font-semibold text-[#5B6572]">Machine Image</span>
        </div>
      )}

      {/* Top Floating Category Badge */}
      {categoryName && (
        <div className="absolute top-3.5 left-3.5 z-20">
          <span className="text-[10px] tracking-[0.08em] font-bold uppercase text-white bg-[#00266A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
            {categoryName}
          </span>
        </div>
      )}

      {/* Top Right Model Badge */}
      <div className="absolute top-3.5 right-3.5 z-20">
        <span className="text-[10px] font-semibold text-[#00266A] bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-[#D5DEF0] shadow-sm">
          {model ? `Model: ${model}` : "Industrial Grade"}
        </span>
      </div>
    </div>
  );
}

export default function ProductCard({ product, categorySlug }: Props) {
  const href = `/machines/${categorySlug ?? product.category_id}/${product.slug}`;

  // Gather all available product images
  const imagesList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl bg-white border border-[#E7EAEE] hover:border-[#D5BD66]/70 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.15)] overflow-hidden focus-visible:outline-2 focus-visible:outline-[#D5BD66]"
    >
      {/* Big Media with Multi-Image Auto-Scroll */}
      <AutoProductImageSlider
        images={imagesList}
        title={product.name}
        categoryName={product.category_name}
        model={product.model}
      />

      {/* Compact Info Section */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-grow bg-white">
        <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#10151C] mb-1 group-hover:text-[#00266A] transition-colors leading-tight line-clamp-1">
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-[#5B6572] text-[12px] leading-relaxed mb-2.5 line-clamp-1">
            {product.short_description}
          </p>
        )}
        <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors">
            <span>Explore machine</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
          <span className="text-[11px] font-medium text-[#8892A0]">
            Overview &amp; Specs
          </span>
        </div>
      </div>
    </Link>
  );
}
