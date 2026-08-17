"use client";

import React from "react";
import type { ExportProductData } from "@/lib/utils/catalogue-export";

interface ProductCatalogueDocumentProps {
  product: ExportProductData;
}

// Icon mapper for Industry Applications matching template
function getApplicationIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("e-commerce") || lower.includes("logistics") || lower.includes("shipping")) return "📦";
  if (lower.includes("food") || lower.includes("fmcg") || lower.includes("bakery") || lower.includes("confectionery")) return "🍫";
  if (lower.includes("cosmetic") || lower.includes("personal care") || lower.includes("beauty")) return "🧴";
  if (lower.includes("electronic") || lower.includes("electrical") || lower.includes("appliance")) return "🔌";
  if (lower.includes("print") || lower.includes("stationery") || lower.includes("paper") || lower.includes("publishing")) return "🖨️";
  if (lower.includes("warehous") || lower.includes("factory") || lower.includes("storage")) return "🏭";
  if (lower.includes("pharma") || lower.includes("medical") || lower.includes("health")) return "💊";
  if (lower.includes("beverage") || lower.includes("drink") || lower.includes("bottle")) return "🥤";
  if (lower.includes("textile") || lower.includes("garment") || lower.includes("apparel")) return "🧵";
  if (lower.includes("auto") || lower.includes("hardware") || lower.includes("metal")) return "⚙️";
  if (lower.includes("chemical") || lower.includes("paint") || lower.includes("fertilizer")) return "🧪";
  return "📦";
}

export function ProductCatalogueDocument({ product }: ProductCatalogueDocumentProps) {
  const modelStr = product.model || "SPS/TM 017";
  const categoryStr =
    product.category_name || product.category?.name || "Semi-Automatic Carton Taping Machine";
  const titleStr = product.name;
  const descStr = product.description || product.short_description || "";
  const shortDesc = product.short_description || "";
  const primaryImage =
    product.image ||
    product.imageUrl ||
    (product.images && product.images[0]) ||
    "/logo.png";

  // Normalize features
  const featureList: string[] = Array.isArray(product.features)
    ? product.features.map((f) => (typeof f === "string" ? f : f.feature))
    : [];

  // Normalize applications
  const applicationList: string[] = Array.isArray(product.applications)
    ? product.applications.map((a) => (typeof a === "string" ? a : a.application))
    : [];

  // Normalize specifications
  let specEntries: { key: string; value: string; unit: string }[] = [];
  if (Array.isArray(product.specifications)) {
    specEntries = product.specifications.map((s) => ({
      key: s.specification,
      value: s.value,
      unit: s.unitOrNote || "",
    }));
  } else if (product.specifications && typeof product.specifications === "object") {
    specEntries = Object.entries(product.specifications).map(([k, v]) => ({
      key: k,
      value: v,
      unit: "",
    }));
  }

  // Format title words for styling (middle words italicized in navy #1a3560)
  const titleParts = titleStr.split(" ");
  let formattedTitle: React.ReactNode = titleStr;
  if (titleParts.length >= 3) {
    const firstWord = titleParts[0];
    const middleWords = titleParts.slice(1, -1).join(" ");
    const lastWord = titleParts[titleParts.length - 1];
    formattedTitle = (
      <>
        {firstWord}
        <br />
        <em>{middleWords}</em>
        <br />
        {lastWord}
      </>
    );
  } else if (titleParts.length === 2) {
    formattedTitle = (
      <>
        {titleParts[0]}
        <br />
        <em>{titleParts[1]}</em>
      </>
    );
  }

  // Dynamic Tagline items (matching template style)
  const taglineItems = [
    categoryStr,
    featureList[0] || "Adjustable Carton Sizing",
    featureList[1] || "Top & Bottom Taping",
    featureList[2] || "Heavy Duty Roller Frame",
  ].slice(0, 4);

  return (
    <div className="catalogue-wrapper">
      {/* Exact Google Fonts for this catalogue template */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;800;900&family=Michroma&family=Oxanium:wght@300;400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style jsx global>{`
        .catalogue-wrapper {
          background: #c8d8b0;
          font-family: 'Exo 2', sans-serif;
          padding: 30px 20px;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-x: auto;
        }

        /* FIXED 960px CARD CONTAINER — MATCHES EXACT HTML TEMPLATE */
        .catalogue-page-container {
          width: 960px;
          min-width: 960px;
          max-width: 960px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 24px 100px rgba(0, 0, 0, 0.22);
          box-sizing: border-box;
          color: #1a2a0a;
          page-break-inside: avoid;
          page-break-after: avoid;
        }

        /* HEADER */
        .cat-header {
          background: linear-gradient(135deg, #0a1a3a 0%, #102040 50%, #1a3560 100%);
          padding: 32px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .cat-header::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(191, 238, 144, 0.15), transparent 70%);
        }
        .cat-header::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: 25%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(191, 238, 144, 0.08), transparent 70%);
        }
        .cat-header-lines {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .cat-header-lines span {
          position: absolute;
          display: block;
          height: 1px;
          width: 200px;
          background: linear-gradient(90deg, transparent, rgba(191, 238, 144, 0.3), transparent);
          transform: rotate(-35deg);
        }
        .cat-header-lines span:nth-child(1) {
          top: 20px;
          right: 200px;
        }
        .cat-header-lines span:nth-child(2) {
          top: 50px;
          right: 160px;
          width: 120px;
          opacity: 0.5;
        }
        .cat-header-lines span:nth-child(3) {
          bottom: 20px;
          right: 100px;
          width: 160px;
        }

        .cat-header-left {
          display: flex;
          align-items: center;
          gap: 22px;
          position: relative;
          z-index: 2;
        }
        .cat-logo {
          height: 70px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.5));
        }
        .cat-header-divider {
          width: 1px;
          height: 58px;
          background: linear-gradient(180deg, transparent, rgba(191, 238, 144, 0.3), transparent);
        }
        .cat-header-text h1 {
          font-family: 'Oxanium', sans-serif;
          font-size: 30px;
          font-weight: 800;
          color: #bfee90;
          letter-spacing: 3px;
          text-transform: uppercase;
          line-height: 1;
          margin: 0;
        }
        .cat-header-text p {
          font-family: 'Exo 2', sans-serif;
          font-size: 10px;
          color: rgba(191, 238, 144, 0.6);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-top: 6px;
          font-weight: 300;
          margin-bottom: 0;
        }
        .cat-model-badge {
          background: rgba(191, 238, 144, 0.08);
          border: 1px solid rgba(191, 238, 144, 0.45);
          border-radius: 14px;
          padding: 12px 22px;
          text-align: center;
          position: relative;
          z-index: 2;
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .cat-model-badge .cat-model-num {
          font-family: 'Michroma', sans-serif;
          font-size: 18px;
          font-weight: 400;
          color: #bfee90;
          letter-spacing: 3px;
        }
        .cat-model-badge .cat-model-lbl {
          font-family: 'Exo 2', sans-serif;
          font-size: 9px;
          color: rgba(191, 238, 144, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-top: 4px;
        }

        /* TAGLINE STRIP */
        .cat-tagline-strip {
          background: linear-gradient(90deg, #0a1a3a, #102040, #0a1a3a);
          padding: 10px 48px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cat-tagline-strip span {
          font-family: 'Exo 2', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(191, 238, 144, 0.75);
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .cat-tagline-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #bfee90;
          flex-shrink: 0;
          opacity: 0.8;
        }

        /* HERO — EXACT 2 COLUMN GRID (1.1fr 1fr) */
        .cat-hero {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
        }
        .cat-hero-img-wrap {
          background: linear-gradient(155deg, #f0f8e0 0%, #e0f0cc 100%);
          padding: 32px 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #cce8a0;
          position: relative;
          overflow: hidden;
        }
        .cat-hero-img-wrap::after {
          content: '';
          position: absolute;
          bottom: -40px;
          right: -40px;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(90, 150, 30, 0.08), transparent);
        }
        .cat-hero-img {
          width: 100%;
          max-width: 340px;
          max-height: 380px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 14px 36px rgba(60, 100, 20, 0.18));
        }

        .cat-hero-desc {
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }
        .cat-section-eyebrow {
          font-family: 'Michroma', sans-serif;
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #1a3560;
        }
        .cat-product-title {
          font-family: 'Oxanium', sans-serif;
          font-size: 38px;
          font-weight: 800;
          color: #1a2a0a;
          line-height: 0.92;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
        }
        .cat-product-title em {
          font-style: normal;
          color: #1a3560;
        }
        .cat-desc-text {
          font-family: 'Exo 2', sans-serif;
          font-size: 12.5px;
          color: #334;
          line-height: 1.8;
          font-weight: 400;
          border-left: 3px solid #bfee90;
          padding-left: 14px;
          margin: 0;
        }
        .cat-feature-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cat-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Exo 2', sans-serif;
          font-size: 12px;
          color: #334422;
          font-weight: 400;
          line-height: 1.5;
        }
        .cat-feat-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a3560, #bfee90);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          font-size: 9px;
          color: #ffffff;
          font-weight: 700;
        }

        /* SPECS — 4 COLUMN GRID */
        .cat-specs-section {
          padding: 24px 48px;
          background: linear-gradient(180deg, #f7fbf2, #f0f8e8);
          border-top: 1px solid #d8efc4;
        }
        .cat-section-title {
          font-family: 'Oxanium', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #1a2a0a;
          margin-bottom: 16px;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cat-section-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #bfee90, transparent);
        }
        .cat-specs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .cat-spec-card {
          background: #ffffff;
          border: 1px solid #d0e8b8;
          border-radius: 10px;
          padding: 12px 14px;
          transition: box-shadow 0.2s;
        }
        .cat-spec-card:hover {
          box-shadow: 0 4px 16px rgba(90, 150, 30, 0.1);
        }
        .cat-spec-card.accent {
          background: linear-gradient(135deg, #f0fbdf, #e4f5cc);
        }
        .cat-spec-card.wide {
          grid-column: span 2;
        }
        .cat-spec-card.wide3 {
          grid-column: span 3;
        }
        .cat-spec-card.full {
          grid-column: span 4;
        }
        .cat-sc-label {
          font-family: 'Exo 2', sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          color: #7a9a50;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          margin-bottom: 5px;
        }
        .cat-sc-value {
          font-family: 'Michroma', sans-serif;
          font-size: 16px;
          color: #1a2a0a;
          font-weight: 400;
        }
        .cat-sc-value span {
          font-family: 'Exo 2', sans-serif;
          font-size: 11px;
          color: #556;
          font-weight: 400;
        }

        /* APPLICATIONS — FLEX ROW */
        .cat-app-section-full {
          padding: 22px 48px 24px;
          background: #ffffff;
          border-top: 1px solid #d8efc4;
        }
        .cat-app-grid {
          display: flex;
          gap: 0;
        }
        .cat-app-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 8px;
          border-right: 1px solid #e8f4d4;
          transition: background 0.2s;
        }
        .cat-app-item:last-child {
          border-right: none;
        }
        .cat-app-item:hover {
          background: #f5fbee;
        }
        .cat-app-icon {
          font-size: 26px;
        }
        .cat-app-name {
          font-family: 'Exo 2', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          color: #1a3560;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
        }

        /* INFO STRIP — 2 COLUMNS */
        .cat-info-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: linear-gradient(90deg, #0a1a3a 0%, #102040 100%);
          padding: 22px 48px;
          gap: 32px;
          border-top: 2px solid #bfee90;
        }
        .cat-info-box h4 {
          font-family: 'Michroma', sans-serif;
          font-size: 10px;
          color: rgba(191, 238, 144, 0.7);
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-bottom: 12px;
          margin-top: 0;
        }
        .cat-tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .cat-tag,
        .cat-lang-tag {
          font-family: 'Exo 2', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.08em;
        }
        .cat-tag {
          background: rgba(191, 238, 144, 0.12);
          border: 1px solid rgba(191, 238, 144, 0.3);
          color: #bfee90;
        }
        .cat-lang-tag {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.7);
        }

        /* FOOTER */
        .cat-footer {
          background: linear-gradient(135deg, #0a1a3a 0%, #102040 100%);
          padding: 24px 48px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-top: 2px solid #1a3560;
        }
        .cat-footer-contact h3 {
          font-family: 'Oxanium', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #bfee90;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 10px;
          margin-top: 0;
        }
        .cat-footer-contact p {
          font-family: 'Exo 2', sans-serif;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.85;
          margin: 0;
        }
        .cat-footer-contact strong {
          color: rgba(255, 255, 255, 0.9);
        }
        .cat-footer-right {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: right;
        }
        .cat-phone {
          font-family: 'Michroma', sans-serif;
          font-size: 15px;
          color: #bfee90;
          letter-spacing: 2px;
        }
        .cat-phone2 {
          font-family: 'Michroma', sans-serif;
          font-size: 13px;
          color: rgba(191, 238, 144, 0.65);
          letter-spacing: 1.5px;
        }
        .cat-web,
        .cat-email {
          font-family: 'Exo 2', sans-serif;
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.08em;
        }
        .cat-web {
          color: rgba(191, 238, 144, 0.55);
        }

        /* STRICT 1-PAGE A4 PRINT ISOLATION */
        @page {
          size: A4 portrait;
          margin: 0mm;
        }
        @media print {
          html,
          body {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            overflow: visible !important;
          }
          body * {
            visibility: hidden !important;
          }
          #catalogue-print-area,
          #catalogue-print-area * {
            visibility: visible !important;
          }
          #catalogue-print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 960px !important;
            min-width: 960px !important;
            max-width: 960px !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            background: #ffffff !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print,
          .catalogue-wrapper {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
        }
      `}</style>

      {/* STRICT 1-PAGE CATALOGUE CARD */}
      <div className="catalogue-page-container" id="catalogue-print-area">
        {/* HEADER */}
        <div className="cat-header">
          <div className="cat-header-lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="cat-header-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="cat-logo" src="/logo.png" alt="SP Solutions Logo" />
            <div className="cat-header-divider"></div>
            <div className="cat-header-text">
              <h1>SP Solutions</h1>
              <p>Packaging Machinery &amp; Automation Specialists</p>
            </div>
          </div>
          <div className="cat-model-badge">
            <div className="cat-model-num">{modelStr}</div>
            <div className="cat-model-lbl">Model</div>
          </div>
        </div>

        {/* TAGLINE STRIP */}
        <div className="cat-tagline-strip">
          {taglineItems.map((tag, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="cat-tagline-dot"></div>}
              <span>{tag}</span>
            </React.Fragment>
          ))}
        </div>

        {/* HERO SECTION */}
        <div className="cat-hero">
          <div className="cat-hero-img-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cat-hero-img"
              src={primaryImage}
              alt={titleStr}
            />
          </div>
          <div className="cat-hero-desc">
            <div className="cat-section-eyebrow">Product Description</div>
            <h2 className="cat-product-title">{formattedTitle}</h2>
            {shortDesc && <p className="cat-desc-text">{shortDesc}</p>}
            {descStr && descStr !== shortDesc && (
              <p className="cat-desc-text" style={{ borderLeftColor: "#1a3560" }}>
                {descStr}
              </p>
            )}

            {featureList.length > 0 && (
              <div className="cat-feature-list">
                {featureList.slice(0, 6).map((feat, i) => (
                  <div key={i} className="cat-feature-item">
                    <div className="cat-feat-icon">✓</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TECHNICAL SPECIFICATIONS */}
        <div className="cat-specs-section">
          <div className="cat-section-title">Technical Specifications</div>
          <div className="cat-specs-grid">
            {/* Model Card (Accent Full Width) */}
            <div className="cat-spec-card full accent">
              <div className="cat-sc-label">Model</div>
              <div className="cat-sc-value" style={{ fontSize: "16px" }}>
                {modelStr}
              </div>
            </div>

            {/* Dynamic Specification Cards */}
            {specEntries.map((spec, idx) => {
              const keyLower = spec.key.toLowerCase();
              let spanClass = "";
              if (
                keyLower.includes("size") ||
                keyLower.includes("dimension") ||
                keyLower.includes("table height") ||
                spec.value.length > 18
              ) {
                spanClass = "wide";
              }
              if (spec.value.length > 30 || keyLower.includes("carton size")) {
                spanClass = "wide3";
              }

              return (
                <div key={idx} className={`cat-spec-card ${spanClass}`}>
                  <div className="cat-sc-label">{spec.key}</div>
                  <div className="cat-sc-value">
                    {spec.value}
                    {spec.unit && <span> {spec.unit}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* INDUSTRY APPLICATIONS */}
        {applicationList.length > 0 && (
          <div className="cat-app-section-full">
            <div className="cat-section-title">Industry Applications</div>
            <div className="cat-app-grid">
              {applicationList.map((app, idx) => (
                <div key={idx} className="cat-app-item">
                  <div className="cat-app-icon">{getApplicationIcon(app)}</div>
                  <div className="cat-app-name">{app}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO STRIP / HIGHLIGHTS */}
        <div className="cat-info-strip">
          <div className="cat-info-box">
            <h4>Key Features</h4>
            <div className="cat-tag-list">
              {featureList.length > 0 ? (
                featureList.slice(0, 5).map((f, idx) => (
                  <span key={idx} className="cat-tag">
                    {f}
                  </span>
                ))
              ) : (
                <>
                  <span className="cat-tag">Top &amp; Bottom Taping</span>
                  <span className="cat-tag">Roller Conveyor Frame</span>
                  <span className="cat-tag">Height Adjustable</span>
                  <span className="cat-tag">Mobile Castors</span>
                  <span className="cat-tag">Wide Carton Range</span>
                </>
              )}
            </div>
          </div>
          <div className="cat-info-box">
            <h4>Compatible Pack Types</h4>
            <div className="cat-tag-list">
              <span className="cat-lang-tag">Corrugated Cartons</span>
              <span className="cat-lang-tag">E-commerce Boxes</span>
              <span className="cat-lang-tag">Shipping Cartons</span>
              <span className="cat-lang-tag">Export Packing</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="cat-footer">
          <div className="cat-footer-contact">
            <h3>Contact Us</h3>
            <p>
              <strong>No. 30, Thiruvalluvar Street, T.M.P Nagar,</strong>
              <br />
              Padi, Chennai – 600 050, Tamil Nadu, India
              <br />
              <strong>GST: 33DESPA4848P2ZT</strong>
              <br />
              <strong>sales@spsolutionsc.com</strong> &nbsp;|&nbsp; alexnavinkumar@spsolutionsc.com
            </p>
          </div>
          <div className="cat-footer-right">
            <span className="cat-phone">+91 63745 80330</span>
            <span className="cat-phone2">+91 63696 74493</span>
            <span className="cat-web">www.spsolutionsc.com</span>
            <span className="cat-email">sales@spsolutionsc.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
