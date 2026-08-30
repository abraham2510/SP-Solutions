import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import FaqContent from "./components/FaqContent";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | SP Solutions Chennai",
  description:
    "Explore answers about packaging machinery specifications, flow wrap machines, shrink tunnels, emergency repair response times, AMC contracts, machine rentals, and spare parts.",
  openGraph: {
    title: "FAQ | SP Solutions Industrial Packaging Machinery",
    description:
      "Find quick answers to common questions about SP Solutions packaging machines, breakdown repairs, rentals, and OEM spares in Chennai.",
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <div className="bg-[#FAFBFD] min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#00266A] via-[#001E54] to-[#001233] relative overflow-hidden py-12 sm:py-16 text-white">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />

        <div className="wrap relative z-10">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-[12.5px] text-white/60 mb-4 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-white/90">FAQ</span>
          </nav>

          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-3 text-[#D5BD66] text-[11.5px] font-bold tracking-[0.12em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>Help &amp; Knowledge Base</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Frequently Asked <span className="text-[#C1FF72]">Questions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 mt-3 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything you need to know about our packaging equipment, emergency
            repair services, factory demonstration trials, and genuine spare
            parts.
          </p>
        </div>
      </section>

      {/* Main FAQ Content */}
      <FaqContent />
    </div>
  );
}
