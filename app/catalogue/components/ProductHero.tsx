import Link from "next/link";
import type { CatalogueProduct, CatalogueCategory } from "@/lib/catalogue/types";

interface Props {
  product: CatalogueProduct;
  category?: CatalogueCategory;
}

export default function ProductHero({ product, category }: Props) {
  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] overflow-hidden bg-[#00266A] flex items-end">
      {/* Background image */}
      {product.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#00266A] to-[#001D52]" />
      )}

      {/* Blueprint grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000d1f]/90 via-[#000d1f]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full wrap py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/55 mb-4 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/machines" className="hover:text-white transition-colors">Machines</Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/machines/${category.slug}`} className="hover:text-white transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white/80">{product.name}</span>
        </nav>

        {/* Category pill */}
        {category && (
          <span className="inline-block text-[11px] tracking-[0.08em] uppercase font-semibold text-[#D5BD66] bg-[#D5BD66]/15 border border-[#D5BD66]/30 px-3 py-1 rounded-full mb-3">
            {category.name}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.08] tracking-tight max-w-2xl">
          {product.name}
        </h1>

        {product.short_description && (
          <p className="mt-4 text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
            {product.short_description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={`/machines/${product.category_id}/${product.slug}/catalogue`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#bfee90] text-[#0a1a3a] text-xs font-bold hover:bg-[#a8e673] transition-colors shadow-xs"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Spec Sheet (PDF)</span>
          </Link>
          <a
            href={`https://wa.me/916374580330?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(product.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 !text-white text-xs font-semibold hover:bg-white/20 border border-white/20 transition-colors"
          >
            <span>Quick Enquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
}
