"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Box, Wrench } from "lucide-react";
import type { CatalogueCategory, CatalogueService } from "@/lib/catalogue/types";
import type { NavApiCategory, NavApiService } from "@/lib/navigation-data";

interface GalleryProps {
  categories?: (CatalogueCategory | NavApiCategory)[];
  services?: (CatalogueService | NavApiService)[];
}

interface DisplayGalleryItem {
  id: string;
  title: string;
  sub: string;
  image: string;
  alt: string;
  href: string;
  badge: string;
  isService?: boolean;
}

const DEFAULT_FALLBACKS: DisplayGalleryItem[] = [
  {
    id: "fb-flow",
    image: "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=1200&q=80",
    alt: "Horizontal Flow Wrap Machine operating in a factory",
    title: "Flow Wrap Machines",
    sub: "Horizontal & Bottom Flow Wrappers",
    href: "/machines/flow-wrapping",
    badge: "Flow Wrappers",
  },
  {
    id: "fb-shrink",
    image: "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
    alt: "Shrink Tunnel Machine packaging products",
    title: "Shrink Tunnel Packaging",
    sub: "Auto L-Sealers & Shrink Tunnels",
    href: "/machines/shrink-packaging",
    badge: "Shrink Lines",
  },
  {
    id: "fb-strap",
    image: "https://images.unsplash.com/photo-1764745021344-317b80f09e40?auto=format&fit=crop&w=900&q=80",
    alt: "Semi Automatic Strapping Machine in action",
    title: "Strapping & Stretch Wrappers",
    sub: "Semi-Auto Strapping & Pallet Wrappers",
    href: "/machines/end-line-packaging",
    badge: "End-of-Line",
  },
  {
    id: "fb-code",
    image: "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80",
    alt: "Thermal Inkjet Printer and Batch Coding Equipment",
    title: "Batch Coding & Inkjet Printers",
    sub: "Handheld Inkjet & Batch Coders",
    href: "/machines/printing-coding-systems",
    badge: "Coding Systems",
  },
  {
    id: "fb-inspect",
    image: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
    alt: "Inspection and Metal Detection Systems",
    title: "Inspection / Metal Detection",
    sub: "HACCP In-Line Metal Detectors",
    href: "/machines/inspection-metal-detection",
    badge: "Quality Control",
  },
  {
    id: "fb-repair",
    image: "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=900&q=80",
    alt: "Technician performing machinery repair and maintenance",
    title: "Machine Repair & Rentals",
    sub: "Chamber Machine Rental & Repairs",
    href: "/services",
    badge: "Support & Repair",
    isService: true,
  },
];

const LAYOUT_CLASSES = [
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2", // Big 2x2
  "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-2", // Tall 1x2
  "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1", // 1x1
  "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1", // 1x1
  "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1", // Wide 2x1
  "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1", // Wide 2x1
];

export default function Gallery({
  categories: initialCategories,
  services: initialServices,
}: GalleryProps) {
  const [categories, setCategories] = useState<(CatalogueCategory | NavApiCategory)[]>(
    initialCategories || []
  );
  const [services, setServices] = useState<(CatalogueService | NavApiService)[]>(
    initialServices || []
  );

  // Sync props if changed
  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
    }
  }, [initialCategories]);

  useEffect(() => {
    if (initialServices && initialServices.length > 0) {
      setServices(initialServices);
    }
  }, [initialServices]);

  // If no props supplied, fetch live categories & services from navigation API
  useEffect(() => {
    if ((!initialCategories || initialCategories.length === 0)) {
      let isMounted = true;
      async function fetchCategoryImages() {
        try {
          const res = await fetch("/api/navigation", { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (isMounted && data.success) {
              if (data.categories && data.categories.length > 0) {
                setCategories(data.categories);
              }
              if (data.services && data.services.length > 0) {
                setServices(data.services);
              }
            }
          }
        } catch (err) {
          console.error("Gallery: failed to load category images API data:", err);
        }
      }
      fetchCategoryImages();
      return () => {
        isMounted = false;
      };
    }
  }, [initialCategories]);

  // Build items from active categories and services
  const categoryItems: DisplayGalleryItem[] = categories.map((cat) => {
    const rawImages = "images" in cat && Array.isArray(cat.images) && cat.images.length > 0 ? cat.images : [];
    const primaryImg =
      rawImages[0] ||
      ("image" in cat && cat.image ? cat.image : "") ||
      ("imageUrl" in cat && cat.imageUrl ? cat.imageUrl : "") ||
      "";

    const count = "productCount" in cat ? cat.productCount : undefined;
    const subText =
      cat.description ||
      (count ? `${count} ${count === 1 ? "machine" : "machines"} available` : "Industrial packaging family");

    return {
      id: cat.id || cat.slug,
      title: cat.name,
      sub: subText,
      image: primaryImg,
      alt: `${cat.name} - Packaging machinery by SP Solutions`,
      href: `/machines/${cat.slug}`,
      badge: cat.name.split(" ")[0] || "Machinery",
      isService: false,
    };
  });

  const serviceItems: DisplayGalleryItem[] = services.map((srv) => {
    const rawImages = "images" in srv && Array.isArray(srv.images) && srv.images.length > 0 ? srv.images : [];
    const primaryImg =
      rawImages[0] ||
      ("image" in srv && srv.image ? srv.image : "") ||
      ("imageUrl" in srv && srv.imageUrl ? srv.imageUrl : "") ||
      "";

    return {
      id: srv.id || srv.slug,
      title: srv.name,
      sub:
        ("shortDescription" in srv && srv.shortDescription) ||
        srv.description ||
        "Professional technical maintenance & repair",
      image: primaryImg,
      alt: `${srv.name} - Technical services by SP Solutions`,
      href: `/services/${srv.slug}`,
      badge: "Technical Service",
      isService: true,
    };
  });

  // Combine categories and top service(s) to fill the 6-slot bento grid
  let combinedItems: DisplayGalleryItem[] = [];

  if (categoryItems.length > 0) {
    if (categoryItems.length >= 6) {
      combinedItems = categoryItems.slice(0, 6);
    } else {
      // If we have fewer than 6 categories (e.g. 5 categories), append service items to complete the bento layout
      const needed = 6 - categoryItems.length;
      combinedItems = [...categoryItems, ...serviceItems.slice(0, needed)];
    }
  }

  // Fallback to defaults if no items found
  const displayItems =
    combinedItems.length > 0
      ? combinedItems.map((item, index) => {
          // If image is missing, replace with curated fallback
          if (!item.image || item.image.trim() === "") {
            const fallback = DEFAULT_FALLBACKS[index % DEFAULT_FALLBACKS.length];
            return { ...item, image: fallback.image };
          }
          return item;
        })
      : DEFAULT_FALLBACKS;

  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow-dark">PRODUCT &amp; SERVICE RANGE</span>
          <h2>Machinery &amp; Product Categories</h2>
          <p>
            Explore SP Solutions&apos; complete range of packaging machinery, coding systems, shrink film, and technical repair solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] sm:auto-rows-[230px] lg:auto-rows-[220px] gap-4">
          {displayItems.map((item, i) => {
            const layoutClass = LAYOUT_CLASSES[i % LAYOUT_CLASSES.length];
            return (
              <Link
                key={item.id || i}
                href={item.href}
                className={`gallery-item group block !cursor-pointer ${layoutClass}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={i < 2 ? "eager" : "lazy"}
                  onError={(e) => {
                    // Fallback on broken image load
                    const target = e.currentTarget;
                    const fallback = DEFAULT_FALLBACKS[i % DEFAULT_FALLBACKS.length].image;
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.08em] font-bold uppercase text-white bg-[#00143B]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                    {item.isService ? (
                      <Wrench className="w-2.5 h-2.5 text-[#D5BD66]" />
                    ) : (
                      <Box className="w-2.5 h-2.5 text-[#bfee90]" />
                    )}
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="cap flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-2">
                    <b className="line-clamp-1 font-bold">{item.title}</b>
                    <span className="shrink-0 w-6 h-6 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </div>
                  <span className="line-clamp-1 opacity-80">{item.sub}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
