import Link from "next/link";
import { PhoneCall, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import type { AboutPageOptions } from "../options";

interface AboutCtaProps {
  cta: AboutPageOptions["cta"];
}

export default function AboutCta({ cta }: AboutCtaProps) {
  return (
    <section className="bg-[#00266A] text-white py-14 sm:py-20 relative overflow-hidden">
      {/* Background blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="wrap relative z-10 text-center max-w-3xl mx-auto">
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#D5BD66] text-[11px] font-bold tracking-[0.12em] uppercase mb-4 shadow-xs">
          {cta.eyebrow}
        </span>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          {cta.title}
        </h2>

        <p className="text-white/75 text-base sm:text-lg mb-8 leading-relaxed">
          {cta.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href={cta.primaryBtn.href}
            className="btn btn-primary !bg-[#D5BD66] hover:!bg-[#C4AB52] !text-[#00266A] !rounded-xl !py-3.5 !px-6 !text-xs font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <span>{cta.primaryBtn.text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={cta.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline !border-green-400/40 !bg-green-500/20 hover:!bg-green-500/30 !text-white !rounded-xl !py-3.5 !px-6 !text-xs font-bold flex items-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${cta.phone.replace(/\s+/g, "")}`}
            className="btn btn-outline !border-white/25 !text-white hover:!bg-white/10 !rounded-xl !py-3.5 !px-6 !text-xs font-bold flex items-center gap-2 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>Call {cta.phone}</span>
          </a>

          <a
            href={cta.secondaryBtn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline !border-white/25 !text-white hover:!bg-white/10 !rounded-xl !py-3.5 !px-6 !text-xs font-bold flex items-center gap-2 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>{cta.secondaryBtn.text}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
