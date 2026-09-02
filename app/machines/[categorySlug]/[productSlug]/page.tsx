import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Sparkles, FileText, MessageCircle, Send } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";
import {
  getAllProducts,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data/public";
import ProductHero from "@/app/catalogue/components/ProductHero";
import ProductGallery from "@/app/catalogue/components/ProductGallery";
import ProductVideos from "@/app/catalogue/components/ProductVideos";
import ProductFeatures from "@/app/catalogue/components/ProductFeatures";
import ProductApplications from "@/app/catalogue/components/ProductApplications";
import ProductSpecifications from "@/app/catalogue/components/ProductSpecifications";
import RelatedProducts from "@/app/catalogue/components/RelatedProducts";

export const revalidate = 3600;

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    categorySlug: p.category_id,
    productSlug: p.slug,
  }));
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return {};

  const title = `${product.name} | SP Solutions`;
  const description =
    product.short_description ||
    `${product.name} — ${product.category_name} from SP Solutions. Manufactured and serviced in Chennai, Tamil Nadu.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
    alternates: {
      canonical: `/machines/${product.category_id}/${product.slug}`,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ProductDetailPage({ params }: Props) {
  const { productSlug, categorySlug } = await params;

  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  // Guard: URL category must match product's actual category slug
  if (product.category_id !== categorySlug) notFound();

  const [category, categoryProducts] = await Promise.all([
    getCategoryBySlug(product.category_id),
    getProductsByCategory(product.category_id),
  ]);

  const related = categoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const hasBody =
    product.description ||
    product.features.length > 0 ||
    product.applications.length > 0 ||
    Object.keys(product.specifications).length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <ProductHero product={product} category={category || undefined} />

      {/* Body */}
      <div className="py-12 sm:py-16">
        <div className="space-y-10">
          {/* Machine Product Gallery */}
          <section>
            <h2 className="text-[20px] font-bold wrap px-4 text-[#10151C] mb-5 tracking-tight">
              Product Images & Gallery
            </h2>
            <ProductGallery product={product} />
          </section>

          {/* Machine Demonstration & Live Videos (YouTube / Instagram) */}
          <ProductVideos
            videos={product.videos}
            videoUrl={product.video_url}
            productName={product.name}
          />

          {hasBody ? (
            <div className="space-y-12 wrap">
              {/* Description */}
              {product.description && (
                <section>
                  <h2 className="text-[20px] font-bold text-[#10151C] mb-5 tracking-tight">
                    About This Machine
                  </h2>
                  <p className="text-[15.5px] leading-[1.75] text-[#5B6572]">
                    {product.description}
                  </p>
                </section>
              )}

              <ProductFeatures features={product.features} />
              <ProductApplications applications={product.applications} />
              <ProductSpecifications specifications={product.specifications} />
            </div>
          ) : (
            <div className="py-12 rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] text-center">
              <p className="text-[#8892A0] text-[14px] mb-1">
                Detailed specifications coming soon.
              </p>
              <p className="text-[#5B6572] text-[13px]">
                Contact us for full technical information about this machine.
              </p>
            </div>
          )}

          {/* WhatsApp + Contact CTA with Grid Decorations */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#00266A] via-[#001E54] to-[#001233] p-8 sm:p-12 text-center text-white border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,38,106,0.35)]">
            {/* Ambient Corner Glow Sparks */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#C1FF72]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#D5BD66]/15 blur-3xl rounded-full pointer-events-none" />

            {/* Architectural Blueprint Grid Pattern Overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "36px 36px",
              }}
            />

            {/* Geometric Grid Accent Crosses */}
            <div className="absolute top-4 left-4 text-white/25 text-xs font-mono pointer-events-none">
              +
            </div>
            <div className="absolute top-4 right-4 text-white/25 text-xs font-mono pointer-events-none">
              +
            </div>
            <div className="absolute bottom-4 left-4 text-white/25 text-xs font-mono pointer-events-none">
              +
            </div>
            <div className="absolute bottom-4 right-4 text-white/25 text-xs font-mono pointer-events-none">
              +
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase text-[#C1FF72] bg-[#C1FF72]/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#C1FF72]/25 mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C1FF72]" />
                Direct Manufacturer Assistance
              </div>

              <h2 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-white mb-3 leading-snug">
                Interested in the {product.name}?
              </h2>
              <p className="text-white/75 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-lg">
                Get an instant quote, technical documentation, or speak with an
                engineering specialist about your custom production
                requirements.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3.5 justify-center items-center w-full">
                <Link
                  href={`/machines/${product.category_id}/${product.slug}/catalogue`}
                  className="btn bg-[#bfee90] text-[#0a1a3a] hover:bg-[#a8e673] font-bold"
                >
                  Download Catalogue (PDF)
                </Link>

                <a
                  href={SITE_CONTACTS.whatsapp.getUrl(
                    `Hi, I'm interested in the ${product.name}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-gold"
                  id={`whatsapp-enquiry-${product.id}`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.999 2.004C6.477 2.004 2 6.481 2 12.003a9.945 9.945 0 001.38 5.098L2 22l5.032-1.363A9.944 9.944 0 0012 22c5.521 0 10-4.477 10-9.997 0-5.523-4.477-9.999-10.001-9.999zm.001 18.315a8.273 8.273 0 01-4.214-1.152l-.302-.179-3.126.847.85-3.044-.197-.313A8.285 8.285 0 013.716 12c0-4.586 3.698-8.312 8.284-8.312 4.585 0 8.283 3.726 8.283 8.312 0 4.587-3.698 8.319-8.283 8.319z" />
                  </svg>
                  WhatsApp Enquiry
                </a>

                <Link href="/#contact" className="btn btn-ghost-white">
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>

          {/* Related products */}
          <RelatedProducts products={related} />
        </div>
      </div>
    </div>
  );
}
