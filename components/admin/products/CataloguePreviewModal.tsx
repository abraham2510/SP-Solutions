"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductCatalogueDocument } from "@/components/catalogue/ProductCatalogueDocument";
import { ProductCatalogueToolbar } from "@/components/catalogue/ProductCatalogueToolbar";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExportProductData } from "@/lib/utils/catalogue-export";
import Link from "next/link";

interface CataloguePreviewModalProps {
  isOpen: boolean;
  productId: string | null;
  onClose: () => void;
}

export function CataloguePreviewModal({
  isOpen,
  productId,
  onClose,
}: CataloguePreviewModalProps) {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<ExportProductData | null>(null);
  const [productSlug, setProductSlug] = useState<string>("");
  const [categorySlug, setCategorySlug] = useState<string>("");

  useEffect(() => {
    if (!isOpen || !productId) {
      setProductData(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch(`/api/admin/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.product) {
          const p = data.product;
          setProductSlug(p.slug);
          setCategorySlug(p.category?.slug || "packaging-machines");
          setProductData({
            name: p.name,
            model: p.model,
            category_name: p.category?.name,
            category: p.category,
            short_description: p.shortDescription,
            description: p.description,
            imageUrl: p.imageUrl,
            images: p.images,
            features: p.features,
            applications: p.applications,
            specifications: p.specifications,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load product for catalogue preview:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, productId]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[92vh] p-0 overflow-hidden flex flex-col bg-slate-900 border border-slate-700">
        <DialogHeader className="sr-only">
          <DialogTitle>Product Catalogue Preview</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#bfee90]" />
            <span className="text-sm">Generating product catalogue...</span>
          </div>
        ) : productData ? (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Top Action Toolbar */}
            <ProductCatalogueToolbar
              product={productData}
              onClose={onClose}
            />

            {/* Document Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-800/60">
              <div className="flex justify-end mb-3">
                <Button
                  render={
                    <Link
                      href={`/machines/${categorySlug}/${productSlug}/catalogue`}
                      target="_blank"
                    />
                  }
                  variant="outline"
                  size="sm"
                  className="text-xs bg-slate-800 border-slate-700 text-slate-200 hover:text-white gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Fullscreen Public View</span>
                </Button>
              </div>

              <ProductCatalogueDocument product={productData} />
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-sm">
            Product data could not be loaded.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
