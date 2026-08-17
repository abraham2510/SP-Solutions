import type { CatalogueProduct } from "@/lib/catalogue/types";
import ProductCard from "./ProductCard";

interface Props {
  products: CatalogueProduct[];
  emptyState?: React.ReactNode;
}

export default function ProductGrid({ products, emptyState }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        {emptyState ?? (
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-14 h-14 text-[#D5DEF0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z"
              />
            </svg>
            <p className="text-[#5B6572] text-base font-medium">No products found.</p>
            <p className="text-[#8892A0] text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
