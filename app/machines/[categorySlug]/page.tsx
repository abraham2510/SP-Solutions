import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
  getAllProducts,
} from "@/lib/data/public";
import ProductGrid from "@/app/catalogue/components/ProductGrid";
import CategoryFilter from "@/app/catalogue/components/CategoryFilter";

export const revalidate = 3600;

interface Props {
  params: Promise<{ categorySlug: string }>;
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat) => ({ categorySlug: cat.slug }));
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return {};

  const products = await getProductsByCategory(category.slug);
  const title = `${category.name} | SP Solutions`;
  const description =
    category.description ||
    `Browse ${products.length} ${category.name.toLowerCase()} from SP Solutions — manufactured and serviced in Chennai, Tamil Nadu.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(category.image ? { images: [{ url: category.image }] } : {}),
    },
    alternates: {
      canonical: `/machines/${category.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function CategoryPage({ params }: Props) {
  const { categorySlug } = await params;

  const [category, products, allCategories, allProducts] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProductsByCategory(categorySlug),
    getAllCategories(),
    getAllProducts(),
  ]);

  if (!category) notFound();

  const productCounts: Record<string, number> = {};
  for (const cat of allCategories) {
    productCounts[cat.id] = allProducts.filter(
      (p) =>
        p.category_id === cat.slug ||
        p.category_id === cat.id ||
        p.category_name?.toLowerCase() === cat.name?.toLowerCase()
    ).length;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Category Hero */}
      <section className="relative bg-[#00266A] overflow-hidden py-14 sm:py-20">
        {category.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001D52]/60 to-transparent" />

        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/machines" className="hover:text-white transition-colors">Machines</Link>
            <span>/</span>
            <span className="text-white/80">{category.name}</span>
          </nav>

          <span className="eyebrow eyebrow-dark !text-white/60 mb-3">CATEGORY</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/65 mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
              {category.description}
            </p>
          )}
          <p className="mt-3 text-[#D5BD66] text-[13px] font-semibold tracking-wide">
            {products.length} machine{products.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </section>

      {/* Category Dropdown Navigation Bar */}
      <div className="bg-white border-b border-[#E7EAEE] py-3.5">
        <div className="wrap flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CategoryFilter
              categories={allCategories}
              selected={categorySlug}
              isNavigation={true}
              productCounts={productCounts}
            />
          </div>

          <Link
            href="/machines"
            className="text-[13px] font-semibold text-[#00266A] hover:text-[#D5BD66] underline underline-offset-2 transition-colors self-start sm:self-center"
          >
            All machines ({allProducts.length})
          </Link>
        </div>
      </div>

      {/* Products */}
      <section className="wrap py-12 sm:py-16">
        <ProductGrid products={products} />
      </section>

      {/* CTA */}
      <section className="bg-[#00266A] py-12 sm:py-16">
        <div className="wrap text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Need help choosing the right machine?
          </h2>
          <p className="text-white/65 mb-8 max-w-md mx-auto">
            Talk to our engineers. We&apos;ll help you spec the right system for your line.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/916374580330"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              WhatsApp Us
            </a>
            <Link href="/#contact" className="btn btn-ghost-white">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
