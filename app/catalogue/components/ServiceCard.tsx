import Link from "next/link";
import type { CatalogueService } from "@/lib/catalogue/types";

interface Props {
  service: CatalogueService;
}

function ServiceIcon() {
  return (
    <div className="w-11 h-11 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-5 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300 shrink-0">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
        />
      </svg>
    </div>
  );
}

export default function ServiceCard({ service }: Props) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] p-6 sm:p-7 hover:border-[#D5BD66]/80 hover:bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.12)] transition-all duration-300 overflow-hidden focus-visible:outline-2 focus-visible:outline-[#D5BD66]"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-transparent group-hover:bg-[#00266A] transition-colors duration-300" />

      <ServiceIcon />

      <span className="font-mono text-[10.5px] font-bold text-[#00266A] tracking-[0.08em] uppercase mb-2 block">
        {service.type}
      </span>

      <h3 className="text-[16px] sm:text-[17px] font-bold text-[#10151C] mb-3 group-hover:text-[#00266A] transition-colors leading-snug">
        {service.name}
      </h3>

      {service.short_description && (
        <p className="text-[#5B6572] text-[13px] sm:text-[13.5px] leading-relaxed mb-5 flex-grow">
          {service.short_description}
        </p>
      )}

      <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors mt-auto pt-4 border-t border-[#E7EAEE]/70">
        Learn more
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </Link>
  );
}
