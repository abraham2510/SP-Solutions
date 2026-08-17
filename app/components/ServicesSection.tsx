"use client";

import Link from "next/link";
import type { CatalogueService } from "@/lib/catalogue/types";

function ServiceIcon({ type }: { type: string }) {
  // Repair icon
  if (type === "repair") {
    return (
      <div className="w-12 h-12 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-6 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      </div>
    );
  }
  // Default icon
  return (
    <div className="w-12 h-12 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-6 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
  );
}

interface Props {
  services: CatalogueService[];
}

export default function ServicesSection({ services }: Props) {
  return (
    <section className="py-16 bg-white border-b border-[#E7EAEE]" id="services">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">TECHNICAL SERVICES &amp; RENTALS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              Beyond machine sales. Dedicated technical support.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              SP Solutions provides expert repair services and on-site support to keep your industrial operations running smoothly.
            </p>
          </div>
          <Link
            href="/services"
            className="self-start shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#00266A] border border-[#D5DEF0] px-4 py-2 rounded-full hover:border-[#00266A] hover:bg-[#F4F6FA] transition-all"
          >
            All services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] p-6 sm:p-8 hover:border-[#D5BD66]/80 hover:bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.12)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top Card Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#00266A] transition-colors duration-300" />

              <ServiceIcon type={service.type} />

              <span className="font-mono text-[10.5px] font-bold text-[#00266A] tracking-[0.08em] uppercase mb-2 block">
                {service.type}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#10151C] mb-3 group-hover:text-[#00266A] transition-colors leading-snug">
                {service.name}
              </h3>
              {service.short_description && (
                <p className="text-[#5B6572] text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                  {service.short_description}
                </p>
              )}

              <span className="card-link inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors mt-auto pt-4 border-t border-[#E7EAEE]/70">
                Learn more
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
