"use client";

import { useState, useEffect, useRef } from "react";
import ScrollExpand from "../../components/ScrollExpand";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function About() {
  // Start false → SSR + hydration safe
  const [isLarge, setIsLarge] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLarge(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isLarge && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [isLarge]);

  const shared = {
    title: "Built to scale",
    scrollHint: "Scroll to expand",
    useWindowScroll: true,
    startWidth: 44,
    startHeight: 58,
    startRadius: 24,
    endRadius: 0,
    mediaZoom: 1,
    scrollDistance: 0.5,
    holdDistance: 0.05,
    smoothing: 0,
  };

  return (
    <section id="about" className="relative w-full">
      {isLarge ? (
        /* ── Desktop / large screens → smooth video scroll expand ── */
        <ScrollExpand
          src="/assets/videos/homeVid.mp4"
          mediaType="video"
          {...shared}
        />
      ) : (
        /* ── Mobile / tablet → sleek presentation video card UI matching PresentationVideo ── */
        <div className="py-12 sm:py-16 bg-gradient-to-b from-[#FAFBFD] via-[#FFFFFF] to-[#FAFBFD] relative overflow-hidden border-b border-[#E7EAEE]">
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
            <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 mb-3 text-[#00266A] text-[11px] font-bold tracking-widest uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#00266A]" />
                <span>Engineering Excellence</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#10151C] tracking-tight leading-tight">
                Built to{" "}
                <span className="text-[#00266A] relative inline-block">
                  scale
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#C1FF72]/50 -z-10 rounded-full" />
                </span>
              </h2>

              <p className="text-[#5B6572] text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
                Industrial-grade packaging machinery designed, manufactured, and
                serviced directly in Chennai for seamless operations across
                South India.
              </p>
            </div>

            {/* Video Card */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black border border-[#00266A]/15 aspect-video max-h-[520px]">
              <video
                ref={videoRef}
                src="/assets/videos/homeVid.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
