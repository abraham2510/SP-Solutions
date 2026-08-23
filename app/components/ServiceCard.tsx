"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import type { CatalogueService } from "@/lib/catalogue/types";

interface ServiceCardProps {
  service: CatalogueService;
}

const SERVICE_FALLBACK_IMAGES: Record<string, string[]> = {
  "shrink-tunnel-packaging-machine-repair": [
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  ],
  "shrink-tunnel-repair": [
    "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=900&q=80",
  ],
  "strapping-machine-repair": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
  ],
  "packaging-machine-repair": [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
  ],
};

/**
 * Auto-cycling multi-image slider for service cards
 */
function AutoImageSlider({
  images,
  title,
  service,
}: {
  images: string[];
  title: string;
  service: CatalogueService;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Filter out any empty strings
  const validImages = images.filter((img) => Boolean(img && img.trim()));

  useEffect(() => {
    if (validImages.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [validImages.length, isHovered]);

  return (
    <div
      className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] overflow-hidden bg-[#00143B] shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#00143B]/95 via-[#00143B]/55 to-black/25 z-10 pointer-events-none transition-opacity duration-300 group-hover:from-[#00143B]/98 group-hover:via-[#00143B]/70" />

      {validImages.length > 0 ? (
        validImages.map((src, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-1" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} - image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          );
        })
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#00266A]/30 via-[#00143B]/70 to-[#00266A]/40 flex flex-col items-center justify-center gap-3">
          <Wrench className="w-14 h-14 text-white/20" />
          <span className="text-xs font-semibold text-white/50">SP Solutions Technical Support</span>
        </div>
      )}

      {/* Top Floating Badge */}
      <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5">
        <span className="text-[10px] tracking-[0.08em] font-bold uppercase text-white bg-[#00266A]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
          <Wrench className="w-3 h-3 text-[#D5BD66]" />
          {service.featured ? "Annual Maintenance & Support" : "Expert Repair Service"}
        </span>
      </div>

      {/* Bottom Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-20 flex flex-col justify-end">
        {/* Title — Always visible */}
        <h3 className="text-[17.5px] sm:text-[19.5px] font-bold text-white tracking-tight group-hover:text-[#bfee90] transition-colors duration-200 leading-snug">
          {service.name}
        </h3>

        {/* Description & Action — Smoothly expands & animates on hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
          <div className="overflow-hidden">
            <p className="text-white/80 text-[12.5px] sm:text-[13px] leading-relaxed pt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-3">
              {service.short_description ||
                service.description ||
                "Specialized diagnostic, component repair, and calibration services for packaging machinery."}
            </p>

            <div className="pt-3 flex items-center gap-2 text-[12.5px] font-bold text-[#bfee90] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <span>Explore repair details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Collect images with fallbacks
  const rawImages = [
    ...(service.images || []),
    service.image,
    ...(SERVICE_FALLBACK_IMAGES[service.slug] || [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
    ]),
  ].filter((img): img is string => Boolean(img && img.trim()));

  const imagesList = Array.from(new Set(rawImages));

  return (
    <Link
      href={`/services/${service.slug}`}
      className="w-full flex flex-col rounded-2xl bg-[#00143B] border border-[#E7EAEE]/15 hover:border-[#D5BD66]/80 transition-all duration-300 hover:shadow-[0_20px_45px_-12px_rgba(0,38,106,0.35)] hover:-translate-y-1 group overflow-hidden"
    >
      <AutoImageSlider images={imagesList} title={service.name} service={service} />
    </Link>
  );
}
