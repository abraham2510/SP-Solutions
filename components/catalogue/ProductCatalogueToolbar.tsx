"use client";

import React, { useState } from "react";
import {
  Download,
  Printer,
  ArrowLeft,
  Share2,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  downloadCatalogueAsPdf,
  printCatalogueDocument,
  type ExportProductData,
} from "@/lib/utils/catalogue-export";
import Link from "next/link";
import { toast } from "sonner";

interface ProductCatalogueToolbarProps {
  product: ExportProductData;
  backHref?: string;
  onClose?: () => void;
}

export function ProductCatalogueToolbar({
  product,
  backHref,
  onClose,
}: ProductCatalogueToolbarProps) {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPdf = async () => {
    setDownloadingPdf(true);
    try {
      await downloadCatalogueAsPdf(product, "catalogue-print-area");
      toast.success("Catalogue PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to native print-to-PDF
      printCatalogueDocument();
      toast.info("Opened print dialog to save as PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    try {
      printCatalogueDocument();
    } catch {
      toast.error("Failed to open print dialog");
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Catalogue link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-4 py-3 shadow-md no-print">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back / Title */}
        <div className="flex items-center gap-3">
          {backHref ? (
            <Link
              href={backHref}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          ) : onClose ? (
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          ) : null}

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#bfee90] tracking-wider uppercase">
                Technical Catalogue
              </span>
              <span className="text-xs text-slate-400">&bull;</span>
              <span className="text-xs text-slate-300 font-mono">
                {product.model || "SPEC-SHEET"}
              </span>
            </div>
            <h1 className="text-sm font-bold text-white truncate max-w-md">
              {product.name}
            </h1>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Share Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="h-9 px-3 text-xs rounded-xl bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer gap-1.5"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>Share Link</span>
          </Button>

          {/* Native Print Dialog Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="h-9 px-3.5 text-xs font-semibold rounded-xl bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white cursor-pointer gap-1.5"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </Button>

          {/* Primary Download PDF Button */}
          <Button
            type="button"
            size="sm"
            onClick={handleDownloadPdf}
            disabled={downloadingPdf}
            className="h-9 px-4 text-xs font-bold rounded-xl bg-[#bfee90] text-[#0a1a3a] hover:bg-[#a8e673] shadow-xs cursor-pointer gap-1.5"
          >
            {downloadingPdf ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span>{downloadingPdf ? "Generating PDF..." : "Download PDF"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
