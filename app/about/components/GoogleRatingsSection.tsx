import {
  Star,
  ExternalLink,
  ShieldCheck,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import type { AboutPageOptions } from "../options";

interface GoogleRatingsSectionProps {
  googleRatings: AboutPageOptions["googleRatings"];
}

export default function GoogleRatingsSection({
  googleRatings,
}: GoogleRatingsSectionProps) {
  return (
    <section className="wrap py-14 sm:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[#00266A] text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 text-[#D5BD66] fill-[#D5BD66]" />
            <span>{googleRatings.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10151C] tracking-tight">
            {googleRatings.title}
          </h2>
          <p className="text-[#5B6572] text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            {googleRatings.subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={googleRatings.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary !rounded-xl !py-2.5 !px-5 !text-xs font-bold shadow-sm flex items-center gap-2"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Review Us on Google</span>
          </a>

          <a
            href={googleRatings.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline !rounded-xl !py-2.5 !px-5 !text-xs font-bold flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>View on Google Maps</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Main Ratings & Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Live Google Scorecard & Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-[#F8FAFC] rounded-3xl border border-[#E7EAEE] p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Google Identity Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7EAEE]">
              <div className="flex items-center gap-2">
                {/* Google "G" Colored SVG Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="text-xs font-bold text-[#10151C] uppercase tracking-wider">
                  Google Business
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7E8] border border-[#D5BD66]/40 text-[#00266A] text-[10.5px] font-bold">
                100% Verified
              </span>
            </div>

            {/* Large Score */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl sm:text-5xl font-black text-[#10151C] tracking-tight">
                {googleRatings.rating}
              </span>
              <span className="text-base text-[#8892A0] font-semibold">
                / {googleRatings.maxRating}
              </span>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-[#D5BD66] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-[#D5BD66] text-[#D5BD66]"
                />
              ))}
            </div>

            <p className="text-xs text-[#5B6572] mb-6">
              Based on{" "}
              <strong className="text-[#10151C]">
                {googleRatings.totalReviews} Google Reviews
              </strong>{" "}
              for SP solutions in Padi, Chennai.
            </p>

            {/* Star Distribution Bars */}
            <div className="flex flex-col gap-2 mb-6">
              {googleRatings.distribution.map((dist) => (
                <div
                  key={dist.stars}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="w-4 font-semibold text-[#10151C]">
                    {dist.stars}★
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-[#E7EAEE] overflow-hidden">
                    <div
                      className="h-full bg-[#00266A] rounded-full transition-all duration-500"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[11px] text-[#8892A0]">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Trust Stats */}
          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E7EAEE]">
            {googleRatings.trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-white text-center border border-[#E7EAEE]/70"
              >
                <div className="text-[12px] font-bold text-[#00266A]">
                  {badge.value}
                </div>
                <div className="text-[10px] text-[#8892A0] leading-tight mt-0.5">
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Customer Reviews Grid (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {googleRatings.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl border border-[#E7EAEE] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#D5DEF0] transition-colors"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#00266A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#10151C] leading-snug">
                        {rev.author}
                      </h4>
                      <span className="text-[11px] text-[#8892A0]">
                        {rev.timeAgo}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D5BD66] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-[#D5BD66] text-[#D5BD66]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[13px] text-[#5B6572] leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Service Tag */}
              {rev.serviceMentioned && (
                <div className="pt-3 mt-4 border-t border-[#E7EAEE]/70 flex items-center justify-between text-[11px] text-[#8892A0]">
                  <span className="flex items-center gap-1 text-[#00266A] font-semibold">
                    <ThumbsUp className="w-3 h-3 text-[#D5BD66]" />
                    {rev.serviceMentioned}
                  </span>
                  <span>Google Review</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
