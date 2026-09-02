"use client";

import { useState, useEffect } from "react";
import ScrollExpand from "../../components/ScrollExpand";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  // Start false → SSR + hydration safe
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLarge(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
        /* ── Mobile / tablet → smooth high-performance hero card ── */
        <div className="wrap py-12">
          <div className="relative w-full min-h-[360px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-xl border border-[#E7EAEE] bg-[#00143B] flex items-center justify-center p-6 sm:p-12 text-center text-white">
            <Image
              src="https://images.unsplash.com/photo-1716194583732-0b9874234218?auto=format&fit=crop&w=1600&q=80"
              alt="Packaging Machinery"
              fill
              className="object-cover object-center opacity-40 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00143B]/90 via-[#00143B]/60 to-[#00143B]/40" />

            <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4">
              <span className="eyebrow !text-[#C1FF72] tracking-[0.14em] uppercase text-xs font-bold bg-[#C1FF72]/10 border border-[#C1FF72]/20 px-3.5 py-1 rounded-full">
                Engineering Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Built to scale
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-md">
                Industrial-grade packaging machinery designed, manufactured, and
                serviced directly in Chennai for seamless operations across
                South India.
              </p>
              <Link
                href="/about"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1FF72] text-[#00266A] font-bold text-sm hover:bg-[#b5f563] transition-all shadow-md active:scale-95"
              >
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
