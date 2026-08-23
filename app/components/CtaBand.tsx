import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";

export default function CtaBand() {
  const { phone, email, address, maps } = SITE_CONTACTS;

  return (
    <section className="section-tight" id="contact">
      <div className="wrap">
        <div className="cta-band reveal !p-[48px_24px] sm:!p-[68px_44px] lg:!p-[80px_56px] rounded-3xl shadow-2xl overflow-hidden relative border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1800&q=80"
            alt="Interior of an industrial packaging manufacturing facility"
            width={1800}
            height={800}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="inner relative z-20 flex flex-col items-center text-center">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#D5BD66] text-[11.5px] font-bold tracking-[0.12em] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5BD66] animate-pulse" />
              Get In Touch
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-[620px] mx-auto mb-4 tracking-tight leading-tight">
              Tell us what you&apos;re packing.
            </h2>
            <p className="text-white/85 text-base sm:text-lg max-w-[540px] mx-auto mb-9 leading-relaxed">
              Send us your product, pack size, and line speed — we&apos;ll get
              back with the right machine and a transparent quote.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-12 max-w-[380px] sm:max-w-none mx-auto">
              <Link
                href="/contact"
                className="btn btn-primary w-full sm:w-auto justify-center !px-8 !py-3.5 !rounded-xl !text-[14.5px] !font-bold shadow-lg shadow-[#00266A]/50"
              >
                Request a quote
              </Link>
              <a
                href={phone.primary.tel}
                className="btn btn-ghost-white w-full sm:w-auto justify-center !px-8 !py-3.5 !rounded-xl !text-[14.5px] !font-semibold border-white/30 hover:border-white hover:bg-white/10"
              >
                Call {phone.primary.display}
              </a>
            </div>

            {/* Centered Flex Contact Row */}
            <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12 lg:gap-16 border-t border-white/15 pt-8 max-w-[1000px] mx-auto w-full">
              {/* Visit */}
              <div className="flex flex-col items-center text-center max-w-[280px]">
                <div className="w-9 h-9 rounded-full !bg-white/10 border border-white/15 flex items-center justify-center text-[#D5BD66] mb-2.5 shadow-xs shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold !text-[#D5BD66] tracking-[0.08em] uppercase mb-1">
                  Visit Us
                </span>
                <a
                  href={maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="!text-white text-[14px] leading-snug font-medium hover:underline"
                >
                  {address.singleLine}
                </a>
              </div>

              {/* Call */}
              <div className="flex flex-col items-center text-center min-w-[200px]">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#D5BD66] mb-2.5 shadow-xs shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#D5BD66] tracking-[0.08em] uppercase mb-1">
                  Call Directly
                </span>
                <a
                  href={phone.primary.tel}
                  className="!text-white text-[15px] font-semibold hover:text-[#D5BD66] transition-colors block leading-tight"
                >
                  {phone.primary.display}
                </a>
                <span className="text-white/60 text-[11.5px] mt-1 block">
                  Toll-free &amp; WhatsApp
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center min-w-[260px]">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-[#D5BD66] mb-2.5 shadow-xs shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#D5BD66] tracking-[0.08em] uppercase mb-1">
                  Email Inquiries
                </span>
                <a
                  href={email.mailto}
                  className="!text-white text-[14px] font-semibold hover:text-[#D5BD66] transition-colors block leading-tight"
                  title={email.primary}
                >
                  {email.primary}
                </a>
                <span className="text-white/60 text-[11.5px] mt-1 block">
                  Response within 2 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
