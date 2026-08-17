"use client";

import React, { useState } from "react";
import type { CatalogueProduct } from "@/lib/catalogue/types";
import { ImageIcon } from "lucide-react";

interface ProductGalleryProps {
  product: CatalogueProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] flex flex-col items-center justify-center text-[#8892A0]">
        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
        <span className="text-xs font-medium">No images available</span>
      </div>
    );
  }

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Active Image Display */}
      <div className="relative w-full aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden border border-[#E7EAEE] bg-slate-900 group shadow-md">
        <img
          src={selectedImage}
          alt={`${product.name} - View ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((url, idx) => (
            <button
              key={`${url}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? "border-1 shadow-sm"
                  : ""
              }`}
            >
              <img
                src={url}
                alt={`${product.name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
