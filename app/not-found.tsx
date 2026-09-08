import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/app/components/BackButton";
import { SITE_CONTACTS } from "@/lib/constants";
import {
  Home,
  Package,
  Wrench,
  Building2,
  HelpCircle,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Search,
  Cog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "404: Page Not Found | SP Solutions",
  description:
    "The packaging machinery, service page, or document you requested could not be found. Return to SP Solutions homepage or explore our machinery catalogue.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "Packaging Machinery",
      desc: "Explore flow wrap, shrink tunnel, strapping, and pouch packing machines.",
      href: "/machines",
      icon: Package,
      badge: "Full Catalogue",
    },
    {
      title: "Machine Repair & Service",
      desc: "Preventive maintenance, retrofits, and 24/7 technical breakdown service.",
      href: "/services",
      icon: Wrench,
      badge: "24/7 Support",
    },
    {
      title: "About SP Solutions",
      desc: "Our Chennai manufacturing facility, engineering team, and story.",
      href: "/about",
      icon: Building2,
      badge: "Factory Tour",
    },
    {
      title: "Frequently Asked Questions",
      desc: "Spares availability, warranty coverage, dispatch times, and technical specs.",
      href: "/faq",
      icon: HelpCircle,
      badge: "Knowledgebase",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-[#00266A] selection:text-white">
      {/* Primary Site Navigation */}
      <Navbar />

      <main className="flex-1 flex flex-col justify-center relative overflow-hidden py-16 sm:py-24">
        {/* Subtle Industrial Background Grid & Glows */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px), radial-gradient(#CBD5E1 1px, #F8FAFC 1px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
          aria-hidden="true"
        />

        {/* Ambient colored light blurs */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#00266A]/10 via-[#1E40AF]/8 to-[#D5BD66]/15 blur-3xl rounded-full pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Main Hero Card */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00266A]/8 border border-[#00266A]/15 text-[#00266A] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Error 404 • Machinery Line Off Track</span>
            </div>

            {/* Giant Graphic 404 Heading */}
            <div className="relative select-none flex items-center justify-center gap-2 sm:gap-4 my-2">
              <span className="text-7xl sm:text-9xl font-black tracking-tighter text-[#00266A]">
                4
              </span>
              <div className="relative flex items-center justify-center">
                <span className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-br from-[#00266A] via-[#1E40AF] to-[#D5BD66] bg-clip-text text-transparent">
                  0
                </span>
                <Cog
                  className="w-10 h-10 sm:w-16 sm:h-16 text-[#D5BD66] absolute animate-spin"
                  style={{ animationDuration: "12s" }}
                />
              </div>
              <span className="text-7xl sm:text-9xl font-black tracking-tighter text-[#00266A]">
                4
              </span>
            </div>

            {/* Explanatory Message */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-4">
              Looks like this page has run off the conveyor.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              The packaging machine, service specification, or catalogue document
              you requested could not be located. It may have been renamed,
              relocated, or is undergoing scheduled maintenance.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00266A] hover:bg-[#001D52] !text-white font-semibold text-[15px] shadow-md shadow-[#00266A]/20 hover:shadow-lg hover:shadow-[#00266A]/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Home className="w-4 h-4" />
                <span>Return to Homepage</span>
              </Link>

              <Link
                href="/machines"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D5BD66] hover:bg-[#C9AF56] text-slate-950 font-semibold text-[15px] shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Package className="w-4 h-4" />
                <span>Browse Machinery</span>
              </Link>

              <BackButton />
            </div>
          </div>
        </div>
      </main>

      {/* Global Site Footer */}
      <Footer />
    </div>
  );
}
