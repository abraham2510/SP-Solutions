"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { CatalogueCategory } from "@/lib/catalogue/types";

interface ProductCategoryCardProps {
  category: CatalogueCategory;
  count: number;
}

/**
 * Auto-cycling multi-image slider for category product cards
 */
function AutoImageSlider({
  images,
  title,
  count,
}: {
  images: string[];
  title: string;
  count: number;
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
      className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] overflow-hidden bg-[#F4F6FA] shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background subtle gradient */}
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
            className="w-16 h-16 text-[#00266A]/20"
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
          <span className="text-xs font-semibold text-[#5B6572]">SP Solutions Machinery</span>
        </div>
      )}

      {/* Top Floating Category Tag */}
      <div className="absolute top-3.5 left-3.5 z-20">
        <span className="text-[10px] tracking-[0.08em] font-bold uppercase text-white bg-[#00266A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
          Industrial Family
        </span>
      </div>

      {/* Bottom Machine Count Badge */}
      <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1.5 bg-[#00143B]/85 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#bfee90] animate-pulse" />
        <span className="text-[11px] font-bold text-white tracking-wide">
          {count} {count === 1 ? "machine" : "machines"}
        </span>
      </div>
    </div>
  );
}

export default function ProductCategoryCard({
  category,
  count,
}: ProductCategoryCardProps) {
  // Collect all images for the multi-image slider
  const imagesList =
    category.images && category.images.length > 0
      ? category.images
      : category.image
      ? [category.image]
      : [];

  return (
    <Link
      href={`/machines/${category.slug}`}
      className="w-[85vw] sm:w-[350px] md:w-[370px] snap-start flex-shrink-0 flex flex-col rounded-2xl bg-white border border-[#E7EAEE] hover:border-[#D5BD66]/70 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.15)] group overflow-hidden"
    >
      {/* Big Media with Multi-Image Auto-Scroll */}
      <AutoImageSlider
        images={imagesList}
        title={category.name}
        count={count}
      />

      {/* Compact Info Section */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-grow bg-white">
        <h3 className="text-[15.5px] sm:text-[16.5px] font-bold text-[#10151C] mb-1 group-hover:text-[#00266A] transition-colors leading-tight line-clamp-1">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-[#5B6572] text-[12px] leading-relaxed mb-2.5 line-clamp-1">
            {category.description}
          </p>
        )}
        <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors">
            <span>Explore machines</span>
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
