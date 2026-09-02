import Image from "next/image";
import { ShieldCheck, Zap, Truck, MapPin, Phone } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";

export default function ContactInfoCard() {
  const { address, phone, maps } = SITE_CONTACTS;

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,38,106,0.3)] border border-[#00266A]/20 flex flex-col justify-between p-7 sm:p-9 text-white">
      {/* Full Height Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
        alt="SP Solutions Packaging Machinery Facility & Engineering Center"
        fill
        priority
        className="object-cover z-0"
      />

      {/* Dark Gradient Overlay for Maximum Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00143B]/85 via-[#00143B]/70 to-[#000F2E]/95 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col justify-between h-full gap-8">
        {/* Top Header */}
        <div>
          {/* Eyebrow Pill & IndiaMART Verification */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[#D5BD66] text-[11px] font-bold tracking-[0.12em] uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#bfee90] animate-pulse" />
              <span>Chennai Assembly &amp; Testing Facility</span>
            </div>
            <a
              href={SITE_CONTACTS.indiamart.catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#C1FF72]/15 border border-[#C1FF72]/30 text-[#C1FF72] text-[11px] font-bold hover:bg-[#C1FF72]/25 transition-colors shadow-xs"
              title="View SP Solutions on IndiaMART"
            >
              <Image
                src="/assets/images/indiaMart.png"
                alt="IndiaMART"
                width={16}
                height={16}
                className="w-3.5 h-3.5 object-contain rounded-xs"
              />
              <span>IndiaMART Verified Supplier</span>
            </a>
          </div>

          <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-3">
            Engineering Precision &amp; Industrial Packaging Support
          </h4>

          <p className="text-white/80 text-[14px] sm:text-[14.5px] leading-relaxed max-w-md">
            Our Padi workshop is equipped with live demonstration machines, test packaging stations, and an extensive OEM spare parts depot.
          </p>
        </div>

        {/* 3 Pillars / Feature Cards inside the image */}
        <div className="flex flex-col gap-3">
          {/* Response */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-all hover:bg-white/15">
            <div className="w-9 h-9 rounded-xl bg-[#D5BD66]/20 border border-[#D5BD66]/30 text-[#D5BD66] flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-white">
                Guaranteed Response &lt; 2 Hours
              </div>
              <div className="text-[12px] text-white/75 leading-tight mt-0.5">
                Fast machinery proposals, line estimates, and technical consultation.
              </div>
            </div>
          </div>

          {/* Delivery & Setup */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-all hover:bg-white/15">
            <div className="w-9 h-9 rounded-xl bg-[#D5BD66]/20 border border-[#D5BD66]/30 text-[#D5BD66] flex items-center justify-center shrink-0 mt-0.5">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-white">
                Pan-India Delivery &amp; Setup
              </div>
              <div className="text-[12px] text-white/75 leading-tight mt-0.5">
                On-site engineering installation and operator training across India.
              </div>
            </div>
          </div>

          {/* Warranty & OEM Parts */}
          <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-all hover:bg-white/15">
            <div className="w-9 h-9 rounded-xl bg-[#D5BD66]/20 border border-[#D5BD66]/30 text-[#D5BD66] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[13.5px] font-bold text-white">
                1-Year Warranty &amp; OEM Spares
              </div>
              <div className="text-[12px] text-white/75 leading-tight mt-0.5">
                Genuine components, preventive AMC, and breakdown repair warranty.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Contact Bar */}
        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/80">
          <a
            href={maps.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[#D5BD66] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#D5BD66] shrink-0" />
            <span>{address.landmark}, {address.city} {address.pincode}</span>
          </a>

          <a
            href={phone.primary.tel}
            className="inline-flex items-center gap-1.5 text-white font-bold hover:text-[#D5BD66] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>{phone.primary.display}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
