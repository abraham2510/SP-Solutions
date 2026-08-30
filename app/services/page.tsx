import type { Metadata } from "next";
import { getServices } from "@/lib/data/public";
import ServiceGrid from "@/app/catalogue/components/ServiceGrid";
import Link from "next/link";
import { SITE_CONTACTS } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Repair & Technical Services | SP Solutions",
  description:
    "SP Solutions offers expert packaging machine repair services for shrink tunnels, strapping machines, and all industrial packaging equipment. Chennai-based, pan-India support.",
  openGraph: {
    title: "Repair & Technical Services | SP Solutions",
    description:
      "Expert packaging machine repair services in Chennai. Shrink tunnel repair, strapping machine repair, and packaging machine repair.",
    type: "website",
  },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00266A] via-[#001E54] to-[#001233] relative overflow-hidden py-14 sm:py-20">
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Services</span>
          </nav>
          <span className="eyebrow eyebrow-dark text-white/60 mb-3">TECHNICAL SERVICES</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl">
            Repair &amp; <span className="text-[#C1FF72]">Technical Services</span>
          </h1>
          <p className="text-white/65 mt-4 text-base sm:text-lg max-w-xl leading-relaxed">
            Expert repair, maintenance, and on-site support for all packaging machinery. Chennai-based with pan-India reach.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="wrap py-12 sm:py-16">
        <ServiceGrid services={services} />
      </section>

      {/* CTA */}
      <section className="bg-[#F8FAFC] border-t border-[#E7EAEE] py-12 sm:py-16">
        <div className="wrap text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#10151C] mb-3">
            Need urgent machine repair?
          </h2>
          <p className="text-[#5B6572] mb-8 max-w-md mx-auto">
            Call us directly or WhatsApp for fastest response. We&apos;re available for emergency breakdowns.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={SITE_CONTACTS.whatsapp.getUrl("Hi, I need urgent packaging machine repair assistance.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              WhatsApp Us
            </a>
            <a href={SITE_CONTACTS.phone.primary.tel} className="btn btn-outline">
              Call {SITE_CONTACTS.phone.primary.display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
