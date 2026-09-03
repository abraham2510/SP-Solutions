"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { CatalogueProduct } from "@/lib/catalogue/types";
import { parseVideoUrl, ParsedVideo } from "@/lib/video-helpers";
import {
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Film,
  ExternalLink,
} from "lucide-react";

interface ProductGalleryProps {
  product: CatalogueProduct;
}

export type MediaItem =
  | { type: "image"; url: string }
  | {
      type: "video";
      url: string;
      parsed: ParsedVideo;
      thumbnail?: string;
    };

export default function ProductGallery({ product }: ProductGalleryProps) {
  const rawImages = (
    product.images && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : []
  ).filter(Boolean);

  const rawVideos = (
    product.videos && product.videos.length > 0
      ? product.videos
      : product.video_url
        ? [product.video_url]
        : []
  ).filter(Boolean);

  // Build unified media items (photos followed by demonstration videos)
  const mediaItems: MediaItem[] = [
    ...rawImages.map((url) => ({ type: "image" as const, url })),
    ...rawVideos.map((url) => {
      const parsed = parseVideoUrl(url);
      let thumbnail: string | undefined = undefined;
      if (parsed.type === "youtube" && parsed.videoId) {
        thumbnail = `https://img.youtube.com/vi/${parsed.videoId}/hqdefault.jpg`;
      } else if (url.includes("/video/upload/")) {
        thumbnail = url.replace(/\.(mp4|webm|mov|ogg)$/i, ".jpg");
      }
      return { type: "video" as const, url, parsed, thumbnail };
    }),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalCount = mediaItems.length;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (totalCount === 0) return;
      setSelectedIndex((prev) => (prev - 1 + totalCount) % totalCount);
    },
    [totalCount],
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (totalCount === 0) return;
      setSelectedIndex((prev) => (prev + 1) % totalCount);
    },
    [totalCount],
  );

  // Keyboard navigation for modal lightbox
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + totalCount) % totalCount);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % totalCount);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, totalCount]);

  if (totalCount === 0) {
    return (
      <div className="w-full aspect-video max-h-[300px] rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] flex flex-col items-center justify-center text-[#8892A0]">
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-medium">No media available</span>
      </div>
    );
  }

  const activeItem = mediaItems[selectedIndex] || mediaItems[0];
  const prevIndex = (selectedIndex - 1 + totalCount) % totalCount;
  const nextIndex = (selectedIndex + 1) % totalCount;
  const prevItem = mediaItems[prevIndex];
  const nextItem = mediaItems[nextIndex];

  return (
    <div className="space-y-4 w-full">
      {/* Minimalist Full-Width Gallery Carousel Container */}
      <div className="relative w-full rounded-2xl bg-[#F8FAFC]/60 p-2 sm:p-3 border border-[#E7EAEE]/80 overflow-hidden">
        <div className="relative flex items-center justify-center w-full">
          {/* Bleeding 3-Card Carousel Track */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
            {/* Left Side Bleeding Peek Card (4:3 Ratio) */}
            {totalCount > 1 && (
              <div
                onClick={handlePrev}
                className="hidden sm:block w-[240px] sm:w-[280px] md:w-[320px] shrink-0 -ml-[90px] sm:-ml-[140px] md:-ml-[160px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7EAEE] opacity-60 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-xs relative group bg-slate-900"
              >
                {prevItem.type === "image" ? (
                  <img
                    src={prevItem.url}
                    alt={`${product.name} previous view`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                    {prevItem.thumbnail && (
                      <img
                        src={prevItem.thumbnail}
                        alt="Previous video preview"
                        className="w-full h-full object-cover opacity-60"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            )}

            {/* Central Main Active Frame (4:3 Aspect Ratio) */}
            <div
              className={`relative ${
                totalCount > 1
                  ? "w-full sm:w-[72%] md:w-[68%]"
                  : "w-full"
              } shrink-0 aspect-[4/3] max-w-[680px] rounded-2xl overflow-hidden border border-[#E7EAEE] shadow-md bg-white group transition-all duration-300`}
            >
              {activeItem.type === "image" ? (
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-full h-full relative cursor-pointer"
                >
                  <img
                    src={activeItem.url}
                    alt={`${product.name} - Photo ${selectedIndex + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Expand Overlay for Images */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-white/20 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C1FF72]" />
                      Preview Fullscreen
                    </span>
                  </div>
                </div>
              ) : (
                /* Video Player Active Frame */
                <div className="relative w-full h-full bg-black flex items-center justify-center">
                  {activeItem.parsed.type === "youtube" && activeItem.parsed.embedUrl ? (
                    <iframe
                      src={activeItem.parsed.embedUrl}
                      title={`${product.name} - Demonstration Video`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : activeItem.parsed.type === "instagram" && activeItem.parsed.embedUrl ? (
                    <iframe
                      src={activeItem.parsed.embedUrl}
                      title={`${product.name} - Instagram Reel`}
                      className="w-full h-full border-0 bg-black"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : activeItem.parsed.type === "direct" && activeItem.parsed.embedUrl ? (
                    <video
                      src={activeItem.parsed.embedUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain bg-black"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center text-white">
                      <Play className="w-12 h-12 text-white/80 mb-2" />
                      <p className="text-sm font-semibold mb-3">{product.name}</p>
                      <a
                        href={activeItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00266A] text-white text-xs font-bold hover:bg-[#001D52] transition-colors"
                      >
                        <span>Open Video Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                  {/* Top Floating Badge on Active Video */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none flex items-center gap-2">
                    {activeItem.parsed.type === "youtube" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-md border border-red-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        YouTube Demonstration
                      </span>
                    ) : activeItem.parsed.type === "instagram" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-md border border-purple-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Instagram Reel
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/90 text-white text-[11px] font-bold shadow-md backdrop-blur-md border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Machine Video
                      </span>
                    )}
                  </div>

                  {/* Top Right Fullscreen Expand Button for Video */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                    title="Expand video to fullscreen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Counter Badge */}
              {totalCount > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow-xs pointer-events-none flex items-center gap-1">
                  {activeItem.type === "video" ? (
                    <Film className="w-3 h-3 text-[#C1FF72]" />
                  ) : (
                    <ImageIcon className="w-3 h-3 text-sky-400" />
                  )}
                  <span>
                    {selectedIndex + 1} / {totalCount}
                  </span>
                </div>
              )}
            </div>

            {/* Right Side Bleeding Peek Card (4:3 Ratio) */}
            {totalCount > 1 && (
              <div
                onClick={handleNext}
                className="hidden sm:block w-[240px] sm:w-[280px] md:w-[320px] shrink-0 -mr-[90px] sm:-mr-[140px] md:-mr-[160px] aspect-[4/3] rounded-2xl overflow-hidden border border-[#E7EAEE] opacity-60 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-xs relative group bg-slate-900"
              >
                {nextItem.type === "image" ? (
                  <img
                    src={nextItem.url}
                    alt={`${product.name} next view`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                    {nextItem.thumbnail && (
                      <img
                        src={nextItem.thumbnail}
                        alt="Next video preview"
                        className="w-full h-full object-cover opacity-60"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            )}
          </div>

          {/* Floating Prev / Next Navigation Arrows */}
          {totalCount > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 sm:p-2.5 rounded-full shadow-md border border-slate-200/80 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer flex items-center justify-center"
                aria-label="Previous item"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-700 p-2 sm:p-2.5 rounded-full shadow-md border border-slate-200/80 hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer flex items-center justify-center"
                aria-label="Next item"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Unified Thumbnail Selector Strip (Photos + Videos) */}
      {totalCount > 1 && (
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto py-1 max-w-full scrollbar-none">
          {mediaItems.map((item, idx) => (
            <button
              key={`${item.url}-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-14 w-18 sm:h-16 sm:w-22 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                selectedIndex === idx
                  ? "border-[#00266A] ring-2 ring-[#00266A]/20 shadow-sm scale-105"
                  : "border-[#E7EAEE] opacity-70 hover:opacity-100 hover:border-slate-300"
              }`}
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={`${product.name} photo thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover opacity-70"
                    />
                  ) : (
                    <Film className="w-5 h-5 text-slate-400" />
                  )}
                  {/* Play badge overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-6 h-6 rounded-full bg-[#00266A] text-white flex items-center justify-center shadow-xs border border-white/40">
                      <Play className="w-3 h-3 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* Little video type badge tag */}
              {item.type === "video" && (
                <span className="absolute bottom-1 left-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded leading-none flex items-center gap-0.5">
                  <Film className="w-2.5 h-2.5 text-[#C1FF72]" />
                  VIDEO
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal (Images + Videos) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
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
              {totalCount > 1 && (
                <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full text-white/90 font-medium flex items-center gap-1.5">
                  {activeItem.type === "video" ? (
                    <>
                      <Film className="w-3.5 h-3.5 text-[#C1FF72]" />
                      Video {selectedIndex + 1} / {totalCount}
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                      Photo {selectedIndex + 1} / {totalCount}
                    </>
                  )}
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

          {/* Modal Central Media View */}
          <div
            className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden w-full max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[72vh] sm:max-h-[78vh] aspect-[4/3] max-w-[860px] flex items-center justify-center rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              {activeItem.type === "image" ? (
                <img
                  src={activeItem.url}
                  alt={`${product.name} preview full`}
                  className="w-full h-full object-contain p-2 sm:p-4 transition-all duration-300"
                />
              ) : activeItem.parsed.type === "youtube" && activeItem.parsed.embedUrl ? (
                <iframe
                  src={activeItem.parsed.embedUrl}
                  title={`${product.name} Fullscreen Video`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : activeItem.parsed.type === "instagram" && activeItem.parsed.embedUrl ? (
                <iframe
                  src={activeItem.parsed.embedUrl}
                  title={`${product.name} Fullscreen Reel`}
                  className="w-full h-full border-0 bg-black"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>

            {/* Modal Navigation Arrows */}
            {totalCount > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl transition-all cursor-pointer z-20"
                  aria-label="Previous item"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 active:bg-white/40 text-white p-3 sm:p-4 rounded-2xl backdrop-blur-md border border-white/20 shadow-2xl transition-all cursor-pointer z-20"
                  aria-label="Next item"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
                </button>
              </>
            )}
          </div>

          {/* Modal Bottom Thumbnail Strip */}
          {totalCount > 1 && (
            <div
              className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 z-10 scrollbar-none"
              onClick={(e) => e.stopPropagation()}
            >
              {mediaItems.map((item, idx) => (
                <button
                  key={`modal-thumb-${item.url}-${idx}`}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-slate-900 ${
                    selectedIndex === idx
                      ? "border-white scale-110 shadow-lg opacity-100"
                      : "border-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full bg-slate-900 flex items-center justify-center">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt="Video thumb"
                          className="w-full h-full object-cover opacity-60"
                        />
                      ) : null}
                      <Play className="w-4 h-4 text-white fill-white absolute" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
