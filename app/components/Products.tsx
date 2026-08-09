"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  ShrinkWrapIcon,
  FlowWrapIcon,
  LSealerIcon,
  MetalDetectorIcon,
  StrappingIcon,
  CodingIcon,
} from "./icons/ProductIcons";
import type { ReactNode } from "react";

interface Product {
  station: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  icon: ReactNode;
}

const PRODUCTS: Product[] = [
  {
    station: "CATEGORY 01",
    title: "Flow Wrap Machines",
    desc: "Horizontal Flow Wrap and Bottom Flow Wrapper packaging machines designed for high-speed pillow packing.",
    image: "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=900&q=80",
    alt: "Bottles moving on a factory conveyor belt for flow wrapping",
    icon: <FlowWrapIcon />,
  },
  {
    station: "CATEGORY 02",
    title: "Shrink Tunnel Machines & L-Sealers",
    desc: "Shrink Tunnel Packaging equipment, Auto L-Sealer systems, and Chamber Machines for tight protective seals.",
    image: "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
    alt: "Bottles moving through a shrink wrap packaging machine",
    icon: <ShrinkWrapIcon />,
  },
  {
    station: "CATEGORY 03",
    title: "Strapping & Stretch Wrapping",
    desc: "Semi-Automatic Strapping Machines and Stretch Wrappers for secure carton bundle transport and palletized loads.",
    image: "https://images.unsplash.com/photo-1764745021344-317b80f09e40?auto=format&fit=crop&w=900&q=80",
    alt: "Industrial conveyor belt machine with metal parts used for strapping",
    icon: <StrappingIcon />,
  },
  {
    station: "CATEGORY 04",
    title: "Batch Coding & Inkjet Printers",
    desc: "Mild Steel Batch Coding Machines, Handheld Thermal Inkjet Printers, and Continuous Inkjet printing systems.",
    image: "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80",
    alt: "Industrial machinery and pipework used for coding and printing systems",
    icon: <CodingIcon />,
  },
  {
    station: "CATEGORY 05",
    title: "Polyolefin Shrink Film",
    desc: "Premium White Polyolefin (POF) Shrink Film offering superior clarity, puncture resistance, and tamper evidence.",
    image: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
    alt: "Stack of sealed cartons wrapped in shrink film",
    icon: <LSealerIcon />,
  },
  {
    station: "CATEGORY 06",
    title: "Machine Repairs & Rentals",
    desc: "Specialized repair services for shrink tunnels, strapping equipment, and Chamber Shrink Packing Machine rental.",
    image: "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=900&q=80",
    alt: "Technician inspecting packaging machinery",
    icon: <MetalDetectorIcon />,
  },
];

export default function Products() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -390 : 390;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] border-y border-[#E7EAEE]" id="products">
      <div className="wrap">
        {/* Section Header with Top-Right Nav Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">THE PRODUCT LINE</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              Six machine families. One line that doesn&apos;t stop.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              Every station below is built to run alongside the others — pick one machine or spec a full end-of-line system.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
              aria-label="Previous product"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-[#D5DEF0] bg-white text-[#00266A] hover:bg-[#00266A] hover:text-white hover:border-[#00266A] transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer"
              aria-label="Next product"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              className="w-[85vw] sm:w-[350px] md:w-[370px] snap-start flex-shrink-0 flex flex-col rounded-2xl bg-white border border-[#E7EAEE] hover:border-[#D5BD66]/70 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.15)] group overflow-hidden"
            >
              {/* Media Container */}
              <div className="relative h-[220px] w-full overflow-hidden bg-[#F4F6FA]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={900}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Body */}
              <div className="pt-8 px-6 pb-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-[#10151C] mb-2 group-hover:text-[#00266A] transition-colors">
                  {product.title}
                </h3>
                <p className="text-[#5B6572] text-[13.5px] leading-relaxed mb-6 flex-grow">
                  {product.desc}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors"
                >
                  View range
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
