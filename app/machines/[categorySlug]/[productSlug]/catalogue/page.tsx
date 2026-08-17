import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/data/public";
import { ProductCatalogueDocument } from "@/components/catalogue/ProductCatalogueDocument";
import { ProductCatalogueToolbar } from "@/components/catalogue/ProductCatalogueToolbar";

export const revalidate = 3600;

interface Props {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({
    categorySlug: p.category_id,
    productSlug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product) return {};

  const title = `${product.name} (${product.model || "Catalogue"}) - Technical Spec Sheet | SP Solutions`;
  const description =
    product.short_description ||
    `Official technical catalogue, dimensions, power requirements, and specifications for ${product.name}. SP Solutions Chennai.`;

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
      canonical: `/machines/${product.category_id}/${product.slug}/catalogue`,
    },
  };
}

export default async function PublicProductCataloguePage({ params }: Props) {
  const { productSlug, categorySlug } = await params;

  const product = await getProductBySlug(productSlug);
  if (!product) notFound();

  // Guard: URL category must match product's actual category slug
  if (product.category_id !== categorySlug) notFound();

  return (
    <div className="min-h-screen bg-[#c8d8b0]">
      {/* Top Floating Toolbar with PDF, DOC, Share, and Print buttons */}
      <ProductCatalogueToolbar
        product={product}
        backHref={`/machines/${categorySlug}/${productSlug}`}
      />

      {/* Main Exact Catalogue Document */}
      <ProductCatalogueDocument product={product} />
    </div>
  );
}
