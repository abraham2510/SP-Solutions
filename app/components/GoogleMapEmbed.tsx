import { ExternalLink, MapPin } from "lucide-react";
import { SITE_CONTACTS } from "@/lib/constants";

interface GoogleMapEmbedProps {
  className?: string;
  height?: string;
  showOverlayButton?: boolean;
  title?: string;
}

export default function GoogleMapEmbed({
  className = "w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#E7EAEE] relative shadow-xs",
  height = "100%",
  showOverlayButton = true,
  title = "SP Solutions Facility & Workshop Location Map",
}: GoogleMapEmbedProps) {
  return (
    <div className={className}>
      <iframe
        title={title}
        src={SITE_CONTACTS.maps.embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full h-full"
      />

      {showOverlayButton && (
        <a
          href={SITE_CONTACTS.maps.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#00266A] text-xs font-bold py-1.5 px-3 rounded-lg shadow-md border border-[#E7EAEE] flex items-center gap-1.5 backdrop-blur-xs transition-all hover:shadow-lg"
          aria-label="Open in Google Maps App"
        >
          <MapPin className="w-3.5 h-3.5 text-[#00266A]" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-[#5B6572]" />
        </a>
      )}
    </div>
  );
}
