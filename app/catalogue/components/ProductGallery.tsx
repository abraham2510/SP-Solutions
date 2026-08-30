"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { CatalogueProduct } from "@/lib/catalogue/types";
import {
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

interface ProductGalleryProps {
  product: CatalogueProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) => (prev + 1) % images.length);
    },
    [images.length],
  );

  // Keyboard navigation for modal lightbox
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-video max-h-[300px] rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] flex flex-col items-center justify-center text-[#8892A0]">
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-medium">No images available</span>
      </div>
    );
  }

  const prevIndex = (selectedIndex - 1 + images.length) % images.length;
  const nextIndex = (selectedIndex + 1) % images.length;

  return (
    <div className="space-y-4 w-full">
      {/* Minimalist Full-Width Gallery Carousel Container */}
      <div className="relative w-full rounded-2xl bg-[#F8FAFC]/60 p-2 sm:p-3 border border-[#E7EAEE]/80 overflow-hidden">
        <div className="relative flex items-center justify-center w-full">
          {/* Bleeding 3-Card Carousel Track (Center Image Uncompressed) */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
            {/* Left Side Bleeding Peek Image (Taller Height) */}
            {images.length > 1 && (
              <div
                onClick={handlePrev}
                className="hidden sm:block w-[240px] sm:w-[300px] md:w-[340px] shrink-0 -ml-[90px] sm:-ml-[140px] md:-ml-[160px] h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-[#E7EAEE] opacity-60 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-xs relative group bg-white"
              >
                <img
                  src={images[prevIndex]}
                  alt={`${product.name} previous view`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
            )}

            {/* Central Main Active Image (Uncompressed Fixed Width) */}
            <div
              onClick={() => setIsModalOpen(true)}
              className={`relative ${
                images.length > 1
                  ? "w-full sm:w-[72%] md:w-[68%]"
                  : "w-full"
              } shrink-0 aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-[#E7EAEE] shadow-md bg-white cursor-pointer group transition-all duration-300`}
            >
              <img
                src={images[selectedIndex]}
                alt={`${product.name} - View ${selectedIndex + 1}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              {/* Minimalist Hover Expand Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C1FF72]" />
                  Preview Fullscreen
                </span>
              </div>

              {/* Image Counter Badge */}
              {images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow-xs pointer-events-none">
                  {selectedIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Right Side Bleeding Peek Image (Taller Height) */}
            {images.length > 1 && (
              <div
                onClick={handleNext}
                className="hidden sm:block w-[240px] sm:w-[300px] md:w-[340px] shrink-0 -mr-[90px] sm:-mr-[140px] md:-mr-[160px] h-[320px] sm:h-[400px] md:h-[460px] rounded-2xl overflow-hidden border border-[#E7EAEE] opacity-60 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-xs relative group bg-white"
              >
                <img
                  src={images[nextIndex]}
                  alt={`${product.name} next view`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
            )}
          </div>

          {/* Minimalist Floating Side Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 sm:p-2.5 rounded-full shadow-md border border-slate-200/80 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer flex items-center justify-center"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 sm:p-2.5 rounded-full shadow-md border border-slate-200/80 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer flex items-center justify-center"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Sleek Minimalist Thumbnail Selector Row */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1 max-w-full scrollbar-none">
          {images.map((url, idx) => (
            <button
              key={`${url}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-14 w-18 sm:h-16 sm:w-22 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                selectedIndex === idx
                  ? "border-[#00266A] ring-2 ring-[#00266A]/20 shadow-sm scale-105"
                  : "border-[#E7EAEE] opacity-60 hover:opacity-100 hover:border-slate-300"
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

      {/* Fullscreen Image Preview Lightbox Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-base sm:text-lg text-white truncate max-w-xs sm:max-w-md">
                {product.name}
              </h3>
              {images.length > 1 && (
                <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full text-white/90 font-medium">
                  {selectedIndex + 1} / {images.length}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-white/15"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Modal Image View (Uniform Consistent Frame Sizing) */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden w-full max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[70vh] sm:max-h-[76vh] aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
              <img
                src={images[selectedIndex]}
                alt={`${product.name} preview full`}
                className="w-full h-full object-contain p-2 sm:p-4 transition-all duration-300"
              />
            </div>

            {/* Modal Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl transition-all cursor-pointer z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl transition-all cursor-pointer z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                </button>
              </>
            )}
          </div>

          {/* Modal Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div
              className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((url, idx) => (
                <button
                  key={`modal-thumb-${url}-${idx}`}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedIndex === idx
                      ? "border-white scale-110 shadow-lg opacity-100"
                      : "border-transparent opacity-40 hover:opacity-80"
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
