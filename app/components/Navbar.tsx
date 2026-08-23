"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import LogoMark from "./icons/LogoMark";
import {
  getCategoryIcon,
  getServiceIcon,
  type NavApiCategory,
  type NavApiService,
} from "@/lib/navigation-data";
import { ArrowRight, ChevronDown, PhoneCall, Mail, MapPin } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [categories, setCategories] = useState<NavApiCategory[]>([]);
  const [services, setServices] = useState<NavApiService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const isMachinesActive =
    pathname === "/machines" || pathname.startsWith("/machines/");
  const isServicesActive =
    pathname === "/services" || pathname.startsWith("/services/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch navigation categories & services dynamically from backend API
  useEffect(() => {
    let isMounted = true;
    async function fetchNavigation() {
      try {
        const res = await fetch("/api/navigation", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success) {
            setCategories(data.categories || []);
            setServices(data.services || []);
          }
        }
      } catch (err) {
        console.error("Error loading navigation data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchNavigation();
    return () => {
      isMounted = false;
    };
  }, []);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  const featuredProductImage =
    categories.find((c) => c.imageUrl)?.imageUrl ||
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80";

  const featuredServiceImage =
    services.find((s) => s.imageUrl)?.imageUrl ||
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80";

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="wrap flex items-center justify-between h-[89px]">
          {/* Logo — links to homepage */}
          <Link href="/" className="logo flex items-center gap-2">
            <LogoMark />
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center">
            <NavigationMenu align="center" anchor={navRef}>
              <NavigationMenuList className="flex items-center gap-1">
                {/* About Link */}
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className={`nav-link-standard px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors ${
                      pathname === "/about"
                        ? "text-[#00266A] font-semibold bg-[#F4F6FA]"
                        : "text-[#10151C] hover:text-[#00266A]"
                    }`}
                  >
                    About
                  </Link>
                </NavigationMenuItem>

                {/* Products Mega Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`nav-link-trigger text-[14.5px] font-medium px-3 py-2 rounded-lg transition-all ${
                      isMachinesActive
                        ? "text-[#00266A] font-semibold bg-[#F4F6FA]"
                        : "text-[#10151C] hover:text-[#00266A]"
                    }`}
                  >
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[830px] max-w-[calc(100vw-32px)] grid grid-cols-12 gap-0 p-5 bg-white rounded-2xl">
                      {/* Left Column: Categories List (7 cols) */}
                      <div className="col-span-7 pr-5 flex flex-col justify-between border-r border-[#E7EAEE]/80">
                        <div>
                          {/* Header */}
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E7EAEE]">
                            <span className="text-[11px] font-bold text-[#8892A0] tracking-wider uppercase flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00266A]" />
                              Product Categories
                            </span>
                            <span className="text-[11px] font-medium text-[#5B6572]">
                              {categories.length > 0
                                ? `${categories.length} Categories`
                                : "Packaging Machinery"}
                            </span>
                          </div>

                          {/* Items Grid */}
                          {isLoading && categories.length === 0 ? (
                            <div className="flex flex-col gap-2 py-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="h-12 rounded-xl bg-[#F4F6FA] animate-pulse"
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              {categories.map((cat) => {
                                const Icon = getCategoryIcon(cat.slug);
                                const href = `/machines/${cat.slug}`;
                                const isCurrent = pathname === href;
                                return (
                                  <Link
                                    key={cat.id || cat.slug}
                                    href={href}
                                    className={`group flex items-start gap-3 p-2 rounded-xl transition-all duration-200 border ${
                                      isCurrent
                                        ? "bg-[#F4F6FA] border-[#D5DEF0]"
                                        : "border-transparent hover:bg-[#F4F6FA] hover:border-[#D5DEF0]/70"
                                    }`}
                                  >
                                    <div className="w-8 h-8 shrink-0 rounded-lg bg-[#F4F6FA] text-[#00266A] flex items-center justify-center border border-[#E7EAEE] group-hover:bg-[#00266A] group-hover:text-[#C1FF72] group-hover:border-[#00266A] transition-all duration-200 shadow-2xs mt-0.5">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-[13px] font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors leading-tight truncate">
                                          {cat.name}
                                        </span>
                                        {cat.productCount > 0 && (
                                          <span className="text-[10px] font-semibold text-[#8892A0] group-hover:text-[#00266A] transition-colors shrink-0">
                                            {cat.productCount} models
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-[#5B6572] leading-snug line-clamp-1 mt-0.5 group-hover:text-[#374151]">
                                        {cat.description ||
                                          "High-performance packaging solutions"}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Bottom Footer inside Left Column */}
                        <div className="pt-2.5 mt-2.5 border-t border-[#E7EAEE] flex items-center justify-between">
                          <span className="text-[11px] text-[#8892A0]">
                            Industrial Automation
                          </span>
                          <Link
                            href="/machines"
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#00266A] hover:underline"
                          >
                            <span>View all catalogues</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Full Height Image with Button Inside (5 cols) */}
                      <div className="col-span-5 pl-5 flex flex-col">
                        <div className="relative h-full min-h-[290px] w-full rounded-xl overflow-hidden group/img-card border border-[#D5DEF0] shadow-xs flex flex-col justify-between p-4">
                          <Image
                            src={featuredProductImage}
                            alt="Packaging Machinery"
                            fill
                            sizes="(max-width: 768px) 100vw, 340px"
                            className="object-cover group-hover/img-card:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 z-10" />

                          {/* Top Badge */}
                          <div className="relative z-20">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white bg-black/45 backdrop-blur-md rounded-full border border-white/20 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" />
                              Packaging Machines
                            </span>
                          </div>

                          {/* Bottom Content & Button inside Image */}
                          <div className="relative z-20 flex flex-col gap-3">
                            <div>
                              <h4 className="text-[15px] font-bold text-white leading-tight">
                                Explore Full Catalogue
                              </h4>
                              <p className="text-[11.5px] text-white/80 line-clamp-1 mt-0.5">
                                High-speed packaging & custom automation
                              </p>
                            </div>
                            <Link
                              href="/machines"
                              className="btn btn-primary btn-sm !w-full !justify-center !py-2.5 !rounded-lg !text-[12.5px] !bg-[#00266A] hover:!bg-[#001D52] !text-white font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                            >
                              <span>Browse All Machines</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services Mega Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`nav-link-trigger text-[14.5px] font-medium px-3 py-2 rounded-lg transition-all ${
                      isServicesActive
                        ? "text-[#00266A] font-semibold bg-[#F4F6FA]"
                        : "text-[#10151C] hover:text-[#00266A]"
                    }`}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[830px] max-w-[calc(100vw-32px)] grid grid-cols-12 gap-0 p-5 bg-white rounded-2xl">
                      {/* Left Column: Services List (7 cols) */}
                      <div className="col-span-7 pr-5 flex flex-col justify-between border-r border-[#E7EAEE]/80">
                        <div>
                          {/* Header */}
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#E7EAEE]">
                            <span className="text-[11px] font-bold text-[#8892A0] tracking-wider uppercase flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00266A]" />
                              Repair & Maintenance Services
                            </span>
                            <span className="text-[11px] font-medium text-[#5B6572]">
                              {services.length > 0
                                ? `${services.length} Specialized Services`
                                : "Industrial Support"}
                            </span>
                          </div>

                          {/* Items Grid */}
                          {isLoading && services.length === 0 ? (
                            <div className="flex flex-col gap-2 py-2">
                              {[1, 2, 3, 4].map((i) => (
                                <div
                                  key={i}
                                  className="h-12 rounded-xl bg-[#F4F6FA] animate-pulse"
                                />
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1.5">
                              {services.map((service) => {
                                const Icon = getServiceIcon(service.slug);
                                const href = `/services/${service.slug}`;
                                const isCurrent = pathname === href;
                                return (
                                  <Link
                                    key={service.id || service.slug}
                                    href={href}
                                    className={`group flex items-start gap-3 p-2 rounded-xl transition-all duration-200 border ${
                                      isCurrent
                                        ? "bg-[#F4F6FA] border-[#D5DEF0]"
                                        : "border-transparent hover:bg-[#F4F6FA] hover:border-[#D5DEF0]/70"
                                    }`}
                                  >
                                    <div className="w-8 h-8 shrink-0 rounded-lg bg-[#F4F6FA] text-[#00266A] flex items-center justify-center border border-[#E7EAEE] group-hover:bg-[#00266A] group-hover:text-[#C1FF72] group-hover:border-[#00266A] transition-all duration-200 shadow-2xs mt-0.5">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-[13px] font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors leading-tight truncate">
                                          {service.name}
                                        </span>
                                        {service.featured && (
                                          <span className="text-[10px] font-semibold text-[#00266A] bg-[#D5DEF0]/60 px-1.5 py-0.5 rounded shrink-0">
                                            Featured
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-[#5B6572] leading-snug line-clamp-1 mt-0.5 group-hover:text-[#374151]">
                                        {service.shortDescription ||
                                          service.description ||
                                          "Expert OEM repair & maintenance"}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Bottom Footer inside Left Column */}
                        <div className="pt-2.5 mt-2.5 border-t border-[#E7EAEE] flex items-center justify-between">
                          <span className="text-[11px] text-[#8892A0]">
                            On-Site Support & AMC
                          </span>
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#00266A] hover:underline"
                          >
                            <span>View all services</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Right Column: Full Height Image with Button Inside (5 cols) */}
                      <div className="col-span-5 pl-5 flex flex-col">
                        <div className="relative h-full min-h-[290px] w-full rounded-xl overflow-hidden group/img-card border border-[#D5DEF0] shadow-xs flex flex-col justify-between p-4">
                          <Image
                            src={featuredServiceImage}
                            alt="Maintenance & Repair Services"
                            fill
                            sizes="(max-width: 768px) 100vw, 340px"
                            className="object-cover group-hover/img-card:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 z-10" />

                          {/* Top Badge */}
                          <div className="relative z-20">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wider text-white bg-black/45 backdrop-blur-md rounded-full border border-white/20 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C1FF72]" />
                              24/7 Field Service
                            </span>
                          </div>

                          {/* Bottom Content & Button inside Image */}
                          <div className="relative z-20 flex flex-col gap-3">
                            <div>
                              <h4 className="text-[15px] font-bold text-white leading-tight">
                                OEM Maintenance & AMC
                              </h4>
                              <p className="text-[11.5px] text-white/80 line-clamp-1 mt-0.5">
                                On-site support & genuine spare parts
                              </p>
                            </div>
                            <Link
                              href="/services"
                              className="btn btn-primary btn-sm !w-full !justify-center !py-2.5 !rounded-lg !text-[12.5px] !bg-[#00266A] hover:!bg-[#001D52] !text-white font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                            >
                              <span>View All Services</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* FAQ Link */}
                <NavigationMenuItem>
                  <Link
                    href="/faq"
                    className={`nav-link-standard px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors ${
                      pathname === "/faq"
                        ? "text-[#00266A] font-semibold bg-[#F4F6FA]"
                        : "text-[#10151C] hover:text-[#00266A]"
                    }`}
                  >
                    FAQ
                  </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                  <Link
                    href="/contact"
                    className={`nav-link-standard px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors ${
                      pathname === "/contact"
                        ? "text-[#00266A] font-semibold bg-[#F4F6FA]"
                        : "text-[#10151C] hover:text-[#00266A]"
                    }`}
                  >
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-[18px]">
            <Link
              href="/contact"
              className="btn btn-primary !text-white !hidden md:!inline-flex px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5"
            >
              Request a quote
            </Link>
            <button
              className={`burger burger-btn lg:hidden w-[42px] h-[42px] flex items-center justify-center relative z-[301] ${
                drawerOpen ? "open burger-open" : ""
              }`}
              onClick={() => (drawerOpen ? closeDrawer() : openDrawer())}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobileDrawer"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${drawerOpen ? "open drawer-backdrop-open" : ""}`}
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${drawerOpen ? "open mobile-drawer-open" : ""}`}
        id="mobileDrawer"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="drawer-head">
          <Link
            href="/"
            className="logo flex items-center gap-2"
            onClick={closeDrawer}
          >
            <LogoMark />
          </Link>
          <button
            className="w-[36px] h-[36px] flex items-center justify-center rounded-full bg-[#F4F6FA] text-[#00266A] hover:bg-[#D5DEF0] transition-colors"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          <nav className="flex flex-col gap-1.5">
            {/* About */}
            <Link
              href="/about"
              className={`flex items-center justify-between p-3 rounded-xl font-semibold text-[15px] transition-colors ${
                pathname === "/about"
                  ? "bg-[#F4F6FA] text-[#00266A]"
                  : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
              }`}
              onClick={closeDrawer}
            >
              <span>About</span>
              <ArrowRight className="w-4 h-4 text-[#8892A0]" />
            </Link>

            {/* Products Accordion */}
            <div className="rounded-xl overflow-hidden border border-[#E7EAEE]/80">
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className="w-full flex items-center justify-between p-3 font-semibold text-[15px] text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A] transition-colors text-left"
                aria-expanded={mobileProductsOpen}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isMachinesActive ? "text-[#00266A] font-bold" : ""
                    }
                  >
                    Products
                  </span>
                  <span className="text-[11px] font-medium text-[#8892A0] bg-white px-2 py-0.5 rounded-full border border-[#E7EAEE]">
                    {categories.length}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#8892A0] transition-transform duration-200 ${
                    mobileProductsOpen ? "rotate-180 text-[#00266A]" : ""
                  }`}
                />
              </button>

              {mobileProductsOpen && (
                <div className="px-2.5 pb-3 pt-1 flex flex-col gap-1.5 border-t border-[#E7EAEE]/60 bg-white animate-in fade-in-50 duration-200">
                  {categories.map((cat) => {
                    const Icon = getCategoryIcon(cat.slug);
                    const href = `/machines/${cat.slug}`;
                    const isCurrent = pathname === href;
                    return (
                      <Link
                        key={cat.id || cat.slug}
                        href={href}
                        className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                          isCurrent
                            ? "bg-[#F4F6FA] text-[#00266A] font-semibold"
                            : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                        }`}
                        onClick={closeDrawer}
                      >
                        <div className="w-7 h-7 rounded bg-[#F4F6FA] text-[#00266A] flex items-center justify-center shrink-0 border border-[#E7EAEE]">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] leading-tight truncate">
                            {cat.name}
                          </div>
                        </div>
                        {cat.productCount > 0 && (
                          <span className="text-[10px] text-[#8892A0]">
                            {cat.productCount}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  <Link
                    href="/machines"
                    className="flex items-center justify-between p-2 mt-1 rounded-lg bg-[#00266A]/5 text-[12.5px] font-bold text-[#00266A] hover:bg-[#00266A]/10 transition-colors"
                    onClick={closeDrawer}
                  >
                    <span>Explore all machines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Services Accordion */}
            <div className="rounded-xl overflow-hidden border border-[#E7EAEE]/80">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between p-3 font-semibold text-[15px] text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A] transition-colors text-left"
                aria-expanded={mobileServicesOpen}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={
                      isServicesActive ? "text-[#00266A] font-bold" : ""
                    }
                  >
                    Services
                  </span>
                  <span className="text-[11px] font-medium text-[#8892A0] bg-white px-2 py-0.5 rounded-full border border-[#E7EAEE]">
                    {services.length}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#8892A0] transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-[#00266A]" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="px-2.5 pb-3 pt-1 flex flex-col gap-1.5 border-t border-[#E7EAEE]/60 bg-white animate-in fade-in-50 duration-200">
                  {services.map((service) => {
                    const Icon = getServiceIcon(service.slug);
                    const href = `/services/${service.slug}`;
                    const isCurrent = pathname === href;
                    return (
                      <Link
                        key={service.id || service.slug}
                        href={href}
                        className={`flex items-center gap-2.5 p-2 rounded-lg transition-colors ${
                          isCurrent
                            ? "bg-[#F4F6FA] text-[#00266A] font-semibold"
                            : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                        }`}
                        onClick={closeDrawer}
                      >
                        <div className="w-7 h-7 rounded bg-[#F4F6FA] text-[#00266A] flex items-center justify-center shrink-0 border border-[#E7EAEE]">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] leading-tight truncate">
                            {service.name}
                          </div>
                        </div>
                        {service.featured && (
                          <span className="text-[9.5px] font-semibold text-[#00266A] bg-[#D5DEF0]/60 px-1 py-0.5 rounded">
                            AMC
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  <Link
                    href="/services"
                    className="flex items-center justify-between p-2 mt-1 rounded-lg bg-[#00266A]/5 text-[12.5px] font-bold text-[#00266A] hover:bg-[#00266A]/10 transition-colors"
                    onClick={closeDrawer}
                  >
                    <span>Explore all repair services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* FAQ */}
            <Link
              href="/faq"
              className={`flex items-center justify-between p-3 rounded-xl font-semibold text-[15px] transition-colors ${
                pathname === "/faq"
                  ? "bg-[#F4F6FA] text-[#00266A]"
                  : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
              }`}
              onClick={closeDrawer}
            >
              <span>FAQ</span>
              <ArrowRight className="w-4 h-4 text-[#8892A0]" />
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`flex items-center justify-between p-3 rounded-xl font-semibold text-[15px] transition-colors ${
                pathname === "/contact"
                  ? "bg-[#F4F6FA] text-[#00266A]"
                  : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
              }`}
              onClick={closeDrawer}
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-[#8892A0]" />
            </Link>
          </nav>

          <Link
            href="/contact"
            className="btn btn-primary !w-full !justify-center !py-3 !rounded-xl !text-[13.5px] font-bold mt-4 shadow-sm"
            onClick={closeDrawer}
          >
            Request a quote
          </Link>

          {/* Contact info */}
          <div className="drawer-foot">
            <div className="flex flex-col gap-2">
              <a
                href={SITE_CONTACTS.phone.primary.tel}
                className="flex items-center gap-2 hover:text-[#00266A] transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#00266A] shrink-0" />
                <span>{SITE_CONTACTS.phone.primary.display}</span>
              </a>
              <a
                href={SITE_CONTACTS.email.mailto}
                className="flex items-center gap-2 hover:text-[#00266A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00266A] shrink-0" />
                <span className="truncate">
                  {SITE_CONTACTS.email.primary}
                </span>
              </a>
              <a
                href={SITE_CONTACTS.maps.shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#00266A] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#00266A] shrink-0" />
                <span>{SITE_CONTACTS.address.landmark}, Chennai</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
