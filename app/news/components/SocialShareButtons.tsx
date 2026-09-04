"use client";

import React, { useState } from "react";
import { Link as LinkIcon, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { SITE_CONTACTS } from "@/lib/constants/site";
import {
  InstagramIcon,
  YouTubeIcon,
  IndiaMartIcon,
  WhatsAppIcon,
} from "@/app/components/icons/SocialIcons";

interface SocialShareButtonsProps {
  title: string;
  slug: string;
}

export function SocialShareButtons({ title, slug }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/news/${slug}`;
    }
    return `https://www.spsolutionsc.com/news/${slug}`;
  };

  const handleCopyLink = () => {
    const url = getFullUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Article link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToWhatsApp = () => {
    const url = getFullUrl();
    const customMessage = `*${title}*\n\nRead more on SP Solutions:\n${url}`;
    const waUrl = SITE_CONTACTS.whatsapp.getUrl(customMessage);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 select-none">
      <span className="text-xs font-bold text-[#8892A0] uppercase tracking-wider flex items-center gap-1 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Connect &amp; Share:
      </span>

      {/* WhatsApp Share */}
      <button
        type="button"
        onClick={shareToWhatsApp}
        className="h-8 w-8 rounded-full bg-[#25D366]/10 hover:bg-slate-200 text-[#075E54] hover:text-white transition-all text-xs font-bold flex items-center justify-center cursor-pointer shadow-2xs border border-[#25D366]/20 group"
        title="Share on WhatsApp"
      >
        <WhatsAppIcon className="w-4 h-4 shrink-0" />
      </button>

      {/* Instagram */}
      {SITE_CONTACTS.socials.instagram && (
        <a
          href={SITE_CONTACTS.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="SP Solutions on Instagram"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
      )}

      {/* YouTube */}
      {SITE_CONTACTS.socials.youtube && (
        <a
          href={SITE_CONTACTS.socials.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="SP Solutions on YouTube"
          aria-label="YouTube"
        >
          <YouTubeIcon />
        </a>
      )}

      {/* IndiaMART */}
      {SITE_CONTACTS.socials.indiamart && (
        <a
          href={SITE_CONTACTS.socials.indiamart}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
          title="SP Solutions on IndiaMART"
          aria-label="IndiaMART"
        >
          <IndiaMartIcon />
        </a>
      )}

      {/* Copy Article Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        className={`h-8 px-2.5 rounded-full border transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs ${
          copied
            ? "bg-emerald-500 text-white border-emerald-500"
            : "bg-white text-slate-700 border-slate-200 hover:border-[#00266A] hover:text-[#00266A]"
        }`}
        title="Copy article URL"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-white" />
        ) : (
          <LinkIcon className="w-3.5 h-3.5" />
        )}
        <span className="text-[11px]">{copied ? "Copied" : "Copy Link"}</span>
      </button>
    </div>
  );
}
