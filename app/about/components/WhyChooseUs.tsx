"use client";

import { Zap } from "lucide-react";
import type { AboutPageOptions } from "../options";

interface WhyChooseUsProps {
  whyChooseUs: AboutPageOptions["whyChooseUs"];
}

export default function WhyChooseUs({ whyChooseUs }: WhyChooseUsProps) {
  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-24 bg-[#00266A] text-white relative overflow-hidden scroll-mt-20"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="wrap max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#D5BD66] text-[11.5px] font-bold tracking-[0.12em] uppercase shadow-xs">
            <Zap className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>{whyChooseUs.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            {whyChooseUs.title}{" "}
            <span className="text-[#C1FF72]">
              {whyChooseUs.highlightWord}
            </span>
          </h2>

          <p className="text-white/75 mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
            {whyChooseUs.subtitle}
          </p>
        </div>

        {/* Stats Band */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {whyChooseUs.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xs text-center flex flex-col items-center justify-center hover:bg-white/[0.14] transition-all"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-white/80 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

