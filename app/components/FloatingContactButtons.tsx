"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";

export default function FloatingContactButtons() {
  const pathname = usePathname();

  // Hide floating action buttons on admin dashboard routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const { phone, whatsapp } = SITE_CONTACTS;


  return (
    <aside
      aria-label="Quick Contact Options"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto select-none"
    >
      {/* Phone Call Button */}
      <a
        href={phone.primary.tel}
        aria-label={`Call SP Solutions at ${phone.primary.displayFormatted}`}
        className="group relative flex items-center justify-center"
      >
        {/* Tooltip Label on Hover (Desktop) */}
        <span className="hidden md:inline-flex items-center absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#00266A] text-white text-xs font-semibold shadow-lg whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/15">
          Call: {phone.primary.displayFormatted}
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-[#00266A]" />
        </span>

        {/* Action Circle */}
        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#00266A] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(0,38,106,0.38)] border-2 border-white/20 group-hover:scale-110 group-hover:shadow-[0_6px_22px_rgba(0,38,106,0.55)] group-active:scale-95 transition-all duration-200">
          <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#D5BD66] group-hover:rotate-12 transition-transform duration-200" />
        </div>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsapp.getUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with SP Solutions on WhatsApp"
        className="group relative flex items-center justify-center"
      >
        {/* Tooltip Label on Hover (Desktop) */}
        <span className="hidden md:inline-flex items-center absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#075E54] text-white text-xs font-semibold shadow-lg whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-white/15">
          Chat on WhatsApp
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-[#075E54]" />
        </span>

        {/* Action Circle */}
        <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] group-hover:scale-110 group-hover:shadow-[0_6px_24px_rgba(37,211,102,0.65)] group-active:scale-95 transition-all duration-200">
          {/* Official WhatsApp SVG icon */}
          <svg
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.997.588 3.86 1.608 5.431L2 22l4.697-1.57A9.957 9.957 0 0 0 12.004 22c5.524 0 10.004-4.48 10.004-9.996C22.008 6.48 17.528 2 12.004 2zm0 18.29c-1.745 0-3.376-.505-4.757-1.381l-.341-.218-2.784.93.948-2.715-.24-.378A8.257 8.257 0 0 1 3.714 12c0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29z" />
          </svg>
        </div>
      </a>
    </aside>
  );
}
