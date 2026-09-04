"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Eye, Image as ImageIcon } from "lucide-react";
import type { BlogGalleryItem } from "@/lib/types/blog";

interface NewsGalleryLightboxProps {
  gallery: BlogGalleryItem[];
  postTitle: string;
}

export function NewsGalleryLightbox({ gallery = [], postTitle }: NewsGalleryLightboxProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + gallery.length) % gallery.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % gallery.length);
  };

  return (
    <section className="my-10 space-y-4 pt-8 border-t border-[#E7EAEE]">
      <div className="flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-[#00266A]" />
        <h3 className="text-xl sm:text-2xl font-bold text-[#10151C]">
          Event &amp; Photo Gallery ({gallery.length})
        </h3>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIdx(index)}
            className="group relative rounded-2xl overflow-hidden border border-[#E7EAEE] bg-white shadow-xs hover:border-[#D5BD66] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.caption || `${postTitle} - Photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-[#00266A] flex items-center justify-center shadow-md">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </div>

            {item.caption && (
              <div className="p-3 bg-white border-t border-slate-100">
                <p className="text-xs font-medium text-slate-700 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
          onClick={() => setActiveIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
            title="Close Lightbox (Esc)"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation left */}
          {gallery.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Active Image Box */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gallery[activeIdx].url}
              alt={gallery[activeIdx].caption || `Gallery photo ${activeIdx + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Caption & Counter */}
            <div className="mt-3 text-center px-4 max-w-2xl">
              {gallery[activeIdx].caption && (
                <p className="text-sm font-medium text-white/90">
                  {gallery[activeIdx].caption}
                </p>
              )}
              <span className="text-xs text-white/60 font-mono mt-1 block">
                {activeIdx + 1} / {gallery.length}
              </span>
            </div>
          </div>

          {/* Navigation right */}
          {gallery.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer z-50"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
