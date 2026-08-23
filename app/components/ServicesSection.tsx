"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CatalogueService } from "@/lib/catalogue/types";
import ServiceCard from "./ServiceCard";

interface Props {
  services: CatalogueService[];
}

export default function ServicesSection({ services }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -390 : 390;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white border-b border-[#E7EAEE]" id="services">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">TECHNICAL SERVICES &amp; RENTALS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              Beyond machine sales. Dedicated technical support.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              SP Solutions provides expert repair services, preventative maintenance, and on-site emergency support for industrial packaging machinery.
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 self-end md:self-auto">
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00266A] border border-[#D5DEF0] px-4 py-2 rounded-full hover:border-[#00266A] hover:bg-[#F4F6FA] transition-all mr-1"
            >
              All services
            </Link>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-xs flex items-center justify-center cursor-pointer"
              aria-label="Next service"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-proximity sm:snap-mandatory scroll-smooth pb-6 pt-2 touch-pan-y [webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className="w-[85vw] sm:w-[350px] md:w-[380px] snap-start flex-shrink-0 flex"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
