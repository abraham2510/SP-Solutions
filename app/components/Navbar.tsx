"use client";

import { useState, useEffect, useCallback } from "react";
import LogoMark from "./icons/LogoMark";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products" },
  { href: "#gallery", label: "Gallery" },
  { href: "#process", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        <div className="wrap flex items-center justify-between h-[78px]">
          <a href="#" className="logo flex items-center gap-2">
            <LogoMark />
          </a>

          <nav className="nav-links hidden lg:flex items-center gap-[34px]">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div className="flex items-center gap-[18px]">
            <a href="#contact" className="btn btn-primary !text-white !hidden md:!inline-flex px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5">Request a quote</a>
            <button
              className={`burger burger-btn lg:hidden w-[42px] h-[42px] flex items-center justify-center relative z-[301] ${
                drawerOpen ? "open burger-open" : ""
              }`}
              onClick={() => (drawerOpen ? closeDrawer() : openDrawer())}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobileDrawer"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`drawer-backdrop ${drawerOpen ? "open drawer-backdrop-open" : ""}`}
        onClick={closeDrawer}
      />

      {/* Mobile drawer */}
      <div
        className={`mobile-drawer flex flex-col p-[26px_26px_30px] ${
          drawerOpen ? "open mobile-drawer-open" : ""
        }`}
        id="mobileDrawer"
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="drawer-head flex items-center justify-between mb-[30px]">
          <a href="#" className="logo flex items-center gap-2" onClick={closeDrawer}>
            <LogoMark />
          </a>
          <button
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#F4F6FA] text-[#00266A] hover:bg-[#D5DEF0] transition-colors"
            onClick={closeDrawer}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeDrawer}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary mt-[26px]" onClick={closeDrawer}>
          Request a quote
        </a>
        <div className="drawer-foot">
          +91 63745 80330<br />
          alexnavinkumar@spsolutionsc.com<br />
          Chennai, India
        </div>
      </div>
    </>
  );
}
