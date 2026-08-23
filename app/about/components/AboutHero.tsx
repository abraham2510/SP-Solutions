import Link from "next/link";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import type { AboutPageOptions } from "../options";

interface AboutHeroProps {
  hero: AboutPageOptions["hero"];
}

export default function AboutHero({ hero }: AboutHeroProps) {
  return (
    <section className="bg-[#00266A] relative overflow-hidden py-14 sm:py-20 text-white">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="wrap relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[12.5px] text-white/60 mb-5 font-medium">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-white/90">About Us</span>
        </nav>

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-4 text-[#D5BD66] text-[11.5px] font-bold tracking-[0.12em] uppercase shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#D5BD66]" />
          <span>{hero.badge}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-3xl">
          {hero.title}{" "}
          <span className="text-[#C1FF72]">{hero.highlightWord}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/75 mt-4 text-base sm:text-lg max-w-2xl leading-relaxed">
          {hero.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a
            href={hero.actionPrimary.href}
            className="btn btn-primary !bg-[#D5BD66] hover:!bg-[#C4AB52] !text-[#00266A] !rounded-xl !py-3 !px-6 !text-xs font-bold shadow-md transition-all flex items-center gap-2"
          >
            <span>{hero.actionPrimary.text}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={hero.actionSecondary.href}
            className="btn btn-outline !border-white/30 !text-black hover:!text-white hover:!bg-white/10 !rounded-xl !py-3 !px-6 !text-xs font-bold transition-all"
          >
            {hero.actionSecondary.text}
          </a>
        </div>

        {/* Statistics Band in Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15">
          {hero.stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D5BD66] mt-1">
                {stat.label}
              </span>
              <span className="text-[11.5px] text-white/60 mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
