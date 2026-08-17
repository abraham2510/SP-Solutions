/**
 * lib/utils/catalogue-export.ts
 * Utilities for exporting product catalogue card directly as a single-page PDF using html2pdf.js.
 */

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface ExportProductData {
  name: string;
  model?: string | null;
  category_name?: string;
  category?: { name: string; slug?: string } | null;
  short_description?: string | null;
  description?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  images?: string[];
  features?: string[] | { feature: string }[];
  applications?: string[] | { application: string }[];
  specifications?:
    | Record<string, string>
    | {
        specification: string;
        value: string;
        unitOrNote?: string | null;
        sortOrder?: number;
      }[];
}

/**
 * Downloads the catalogue card fitting strictly on EXACTLY 1 single A4 PDF page without splitting.
 */
export async function downloadCatalogueAsPdf(
  product: ExportProductData,
  elementId = "catalogue-print-area"
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id '${elementId}' not found`);
  }

  // Generate clean filename
  const modelStr = (product.model || "Machine")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const nameStr = (product.name || "Product")
    .replace(/[^a-zA-Z0-9_-]/g, "_");
  const filename = `SP_Solutions_${modelStr}_${nameStr}_Catalogue.pdf`;

  try {
    // Try html2pdf first with fixed 960px viewport
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdfModule: any = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default || html2pdfModule;

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 960,
        windowWidth: 960,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.warn("html2pdf failed, falling back to direct canvas capture:", error);

    // Fallback: render canvas at fixed 960px width
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
      width: 960,
      windowWidth: 960,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // Standard A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    // Calculate proportional dimensions to fit on 1 single A4 page
    const cardAspectRatio = canvas.height / canvas.width;
    let finalWidth = a4Width;
    let finalHeight = a4Width * cardAspectRatio;

    if (finalHeight > a4Height) {
      finalHeight = a4Height;
      finalWidth = a4Height / cardAspectRatio;
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const xOffset = (a4Width - finalWidth) / 2;
    const yOffset = (a4Height - finalHeight) / 2;

    pdf.addImage(imgData, "JPEG", xOffset, yOffset, finalWidth, finalHeight);
    pdf.save(filename);
  }
}

/**
 * Browser print dialog (strictly configured for 1-page A4 print)
 */
export function printCatalogueDocument() {
  window.print();
}
