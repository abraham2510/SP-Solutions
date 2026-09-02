"use client";

import React from "react";
import { Film, Play, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { parseVideoUrl } from "@/lib/video-helpers";

interface ProductVideosProps {
  videos?: string[];
  videoUrl?: string;
  productName: string;
}

export default function ProductVideos({
  videos,
  videoUrl,
  productName,
}: ProductVideosProps) {
  const allVideos = (
    videos && videos.length > 0 ? videos : videoUrl ? [videoUrl] : []
  ).filter(Boolean);

  if (allVideos.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6 wrap px-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7EAEE]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00266A]/8 text-[#00266A] flex items-center justify-center font-bold shrink-0">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-[#10151C] tracking-tight">
              Machine Demonstration &amp; Live Videos
            </h2>
            <p className="text-xs text-[#8892A0]">
              Watch {productName} live trials, packaging speed &amp; sealing
              operation
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 text-[#00266A] text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {allVideos.length}{" "}
            {allVideos.length === 1 ? "Video Demonstration" : "Demonstrations"}
          </span>
        </span>
      </div>

      {/* Videos Grid */}
      <div
        className={`grid gap-6 ${
          allVideos.length === 1
            ? "grid-cols-1 max-w-4xl mx-auto"
            : "grid-cols-1 lg:grid-cols-2"
        }`}
      >
        {allVideos.map((url, idx) => {
          const parsed = parseVideoUrl(url);

          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#E7EAEE] bg-white p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {parsed.type === "youtube" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      YouTube Video
                    </span>
                  ) : parsed.type === "instagram" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      Instagram Reel
                    </span>
                  ) : url.includes("cloudinary.com") ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      Factory Demonstration
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Machine Demonstration
                    </span>
                  )}
                  <span className="text-xs font-semibold text-[#10151C] truncate max-w-[200px] sm:max-w-[260px]">
                    {productName}
                  </span>
                </div>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00266A] hover:underline shrink-0"
                  title="Open original video link in new tab"
                >
                  <span>Open Video</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Video Embed */}
              <div
                className={`relative w-full rounded-xl overflow-hidden bg-black shadow-inner ${
                  parsed.type === "instagram"
                    ? "aspect-[4/5] sm:aspect-video"
                    : "aspect-video"
                }`}
              >
                {parsed.type === "youtube" && parsed.embedUrl ? (
                  <iframe
                    src={parsed.embedUrl}
                    title={`${productName} Video demonstration ${idx + 1}`}
                    className="w-full h-full border-0 pointer-events-none scale-105"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                  />
                ) : parsed.type === "instagram" && parsed.embedUrl ? (
                  <iframe
                    src={parsed.embedUrl}
                    title={`${productName} Instagram Reel ${idx + 1}`}
                    className="w-full h-full bg-black border-0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : parsed.type === "direct" && parsed.embedUrl ? (
                  <video
                    src={parsed.embedUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-slate-900">
                    <Play className="w-12 h-12 mb-2 text-white opacity-80" />
                    <p className="text-sm font-semibold">{productName}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#00266A] text-white text-xs font-bold hover:bg-[#001D52] transition-colors"
                    >
                      <span>Watch Live Demonstration</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Live Machine note */}
              <div className="mt-3 pt-2.5 border-t border-[#E7EAEE] flex items-center justify-between text-[11px] text-[#8892A0]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  SP Solutions Factory Demonstration
                </span>
                <span className="font-semibold text-[#00266A]">
                  Padi, Chennai
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
