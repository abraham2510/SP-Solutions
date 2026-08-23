import Link from "next/link";
import { ChevronRight, MapPin, Sparkles } from "lucide-react";
import ContactForm from "./components/ContactForm";
import ContactInfoCard from "./components/ContactInfoCard";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import { SITE_CONTACTS } from "@/lib/constants";

export const revalidate = 3600;

export default function ContactPage() {
  const { address } = SITE_CONTACTS;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#00266A] relative overflow-hidden py-14 sm:py-20 text-white">
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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12.5px] text-white/60 mb-5 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="text-white/90">Contact Us</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#D5BD66] text-[11.5px] font-bold tracking-[0.12em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>Direct Factory &amp; Technical Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Let&apos;s Build or Service Your{" "}
            <span className="text-[#C1FF72]">Packaging Line</span>
          </h1>

          <p className="text-white/75 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
            Whether you require a new machine quotation, emergency breakdown
            assistance, or preventive AMC coverage, our Chennai engineering
            specialists are standing by.
          </p>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="wrap py-12 sm:py-16 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <ContactForm />
          </div>

          {/* Info Area (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <ContactInfoCard />
          </div>
        </div>
      </section>

      {/* Interactive Facility Map Section */}
      <section className="wrap pb-12 sm:pb-16">
        <div className="bg-white rounded-3xl border border-[#E7EAEE] p-6 sm:p-8 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-[#00266A] text-xs font-bold uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#D5BD66]" />
                <span>Visit Our Factory &amp; Workshop</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#10151C] tracking-tight">
                {address.landmark}, {address.city}
              </h3>
              <p className="text-[#5B6572] text-[13px] mt-0.5">
                {address.full}
              </p>
            </div>
          </div>

          {/* Reusable Google Maps Component */}
          <GoogleMapEmbed />
        </div>
      </section>
    </div>
  );
}
