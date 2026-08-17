import type { Metadata } from "next";
import { getAllProducts, getAllCategories } from "@/lib/data/public";
import ProductSearch from "@/app/catalogue/components/ProductSearch";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Packaging Machines | SP Solutions",
  description:
    "Browse all packaging machines from SP Solutions — shrink packaging, flow wrapping, metal detection, end-line packaging, and printing & coding systems. Chennai-based manufacturer.",
  openGraph: {
    title: "Packaging Machines | SP Solutions",
    description:
      "Browse packaging machines across 5 categories. Manufactured and serviced in Chennai.",
    type: "website",
  },
};

export default async function MachinesPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Page Hero */}
      <section className="bg-[#00266A] relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="wrap relative z-10">
          <span className="eyebrow eyebrow-dark !text-white/60 mb-4">PRODUCT CATALOGUE</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Packaging Machines &amp; Systems
          </h1>
          <p className="text-white/65 mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
            {products.length} machines across {categories.length} categories — manufactured &amp;
            serviced in Chennai.
          </p>
        </div>
      </section>

      {/* Search + Grid */}
      <section className="wrap py-12 sm:py-16">
        <ProductSearch products={products} categories={categories} />
      </section>
    </div>
  );
}
