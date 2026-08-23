"use client";

import { useState } from "react";
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
  const [isInteractive, setIsInteractive] = useState(false);

  return (
    <div
      className={`${className} group/map`}
      onClick={() => setIsInteractive(true)}
      onMouseLeave={() => setIsInteractive(false)}
    >
      <iframe
        title={title}
        src={SITE_CONTACTS.maps.embedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className={`w-full h-full transition-opacity duration-300 ${
          isInteractive ? "pointer-events-auto" : "pointer-events-none"
        }`}
      />

      {/* Non-intrusive tap-to-activate indicator */}
      {!isInteractive && (
        <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-auto cursor-pointer">
          <span className="hidden group-hover/map:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00266A]/90 text-white text-xs font-semibold backdrop-blur-md shadow-md pointer-events-none">
            Click to interact with map
          </span>
        </div>
      )}

      {showOverlayButton && (
        <a
          href={SITE_CONTACTS.maps.shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-[#00266A] text-xs font-bold py-1.5 px-3 rounded-lg shadow-md border border-[#E7EAEE] flex items-center gap-1.5 backdrop-blur-xs transition-all hover:shadow-lg pointer-events-auto z-10"
          aria-label="Open in Google Maps App"
          onClick={(e) => e.stopPropagation()}
        >
          <MapPin className="w-3.5 h-3.5 text-[#00266A]" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-[#5B6572]" />
        </a>
      )}
    </div>
  );
}
