import Link from "next/link";
import { PhoneCall, MapPin, ArrowRight } from "lucide-react";
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
          Experience Our Machines{" "}
          <span className="text-[#C1FF72]">in Action</span>
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
            <svg
              className="w-6 h-6 fill-[#25D366]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.997.588 3.86 1.608 5.431L2 22l4.697-1.57A9.957 9.957 0 0 0 12.004 22c5.524 0 10.004-4.48 10.004-9.996C22.008 6.48 17.528 2 12.004 2zm0 18.29c-1.745 0-3.376-.505-4.757-1.381l-.341-.218-2.784.93.948-2.715-.24-.378A8.257 8.257 0 0 1 3.714 12c0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${cta.phone.replace(/\s+/g, "")}`}
            className="btn btn-outline !border-white/25 !text-black hover:!text-white hover:!bg-white/10 !rounded-xl !py-3.5 !px-6 !text-xs font-bold flex items-center gap-2 transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>Call {cta.phone}</span>
          </a>

          <a
            href={cta.secondaryBtn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline !border-white/25 !text-black hover:!text-white hover:!bg-white/10 !rounded-xl !py-3.5 !px-6 !text-xs font-bold flex items-center gap-2 transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>{cta.secondaryBtn.text}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
