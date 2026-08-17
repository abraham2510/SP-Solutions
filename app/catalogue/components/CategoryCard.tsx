import Link from "next/link";
import type { CatalogueCategory } from "@/lib/catalogue/types";

interface Props {
  category: CatalogueCategory;
  productCount: number;
}

export default function CategoryCard({ category, productCount }: Props) {
  return (
    <Link
      href={`/machines/${category.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#E7EAEE] hover:border-[#D5BD66]/70 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.18)] transition-all duration-300 bg-white focus-visible:outline-2 focus-visible:outline-[#D5BD66]"
    >
      {/* Image or gradient placeholder */}
      <div className="relative h-[160px] bg-[#F4F6FA] overflow-hidden shrink-0">
        {category.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00266A]/8 to-[#D5BD66]/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#00266A]/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.5 1.5M19.8 15l1.5 1.5m-3 0l1.5-1.5m-1.5 1.5v3.75m-9-3.75H6m12 0h1.5m-1.5 0v3.75"
              />
            </svg>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#00266A]/0 group-hover:bg-[#00266A]/5 transition-colors duration-300" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-[15.5px] font-semibold text-[#10151C] mb-1.5 leading-snug group-hover:text-[#00266A] transition-colors">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-[13px] text-[#5B6572] leading-relaxed line-clamp-2 mb-3">
            {category.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#F4F6FA]">
          <span className="text-[11.5px] font-semibold text-[#8892A0] uppercase tracking-[0.06em]">
            {productCount} machine{productCount !== 1 ? "s" : ""}
          </span>
          <span className="text-[#00266A] group-hover:text-[#D5BD66] transition-colors">
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
