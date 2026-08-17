import type { CatalogueProduct } from "@/lib/catalogue/types";
import ProductCard from "./ProductCard";

interface Props {
  products: CatalogueProduct[];
}

/** Shows related products in the same category. Returns null if none. */
export default function RelatedProducts({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-[#E7EAEE]">
      <h2 className="text-[22px] font-bold text-[#10151C] mb-8 tracking-tight">
        Related Machines
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
