"use client";

import { useEffect, useRef } from "react";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Factory,
  CheckCircle2,
} from "lucide-react";
import type { PresentationVideoOptions } from "../options";

interface PresentationVideoProps {
  presentation: PresentationVideoOptions;
}

export default function PresentationVideo({
  presentation,
}: PresentationVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  const getHighlightIcon = (name: string) => {
    switch (name) {
      case "Zap":
        return <Zap className="w-4 h-4 text-[#00266A]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-4 h-4 text-[#00266A]" />;
      case "Cpu":
        return <Cpu className="w-4 h-4 text-[#00266A]" />;
      case "Factory":
        return <Factory className="w-4 h-4 text-[#00266A]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00266A]" />;
    }
  };

  return (
    <section
      id="machinery-showcase"
      className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#FAFBFD] via-[#FFFFFF] to-[#FAFBFD] relative overflow-hidden border-b border-[#E7EAEE]"
    >
      {/* Background Subtle Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00266A 1px, transparent 1px), linear-gradient(90deg, #00266A 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 mb-3 text-[#00266A] text-[11px] font-bold tracking-widest uppercase shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00266A]" />
            <span>{presentation.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10151C] tracking-tight leading-tight">
            {presentation.title}{" "}
            <span className="text-[#00266A] relative inline-block">
              {presentation.highlightWord}
              <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#C1FF72]/50 -z-10 rounded-full" />
            </span>
          </h2>

          <p className="text-[#5B6572] text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed">
            {presentation.subtitle}
          </p>
        </div>

        {/* Ambient Video Showcase Card */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black border border-[#00266A]/15 aspect-video max-h-[640px]">
          {/* Autoplay Looping Muted Video */}
          <video
            ref={videoRef}
            src={presentation.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* 4 Technical Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6 sm:mt-8">
          {presentation.highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7EAEE] shadow-xs hover:border-[#00266A]/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#00266A]/6 border border-[#00266A]/10 flex items-center justify-center mb-3">
                  {getHighlightIcon(item.iconName)}
                </div>
                <h4 className="text-sm font-bold text-[#10151C] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-[#5B6572] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
