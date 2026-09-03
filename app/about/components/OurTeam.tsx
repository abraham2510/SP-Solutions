"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import type { AboutPageOptions } from "../options";

interface OurTeamProps {
  team: AboutPageOptions["team"];
}

export default function OurTeam({ team }: OurTeamProps) {
  return (
    <section
      id="our-team"
      className="py-16 sm:py-24 bg-[#FAFBFD] relative overflow-hidden scroll-mt-20 border-b border-[#E7EAEE]"
    >
      {/* Background Subtle Blueprint Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00266A 1px, transparent 1px), linear-gradient(90deg, #00266A 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] blur-3xl pointer-events-none" />

      <div className="wrap max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 mb-2.5 text-[#00266A] text-[11px] font-bold tracking-widest uppercase">
            <Users className="w-3.5 h-3.5 text-[#00266A]" />
            <span>{team.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10151C] tracking-tight">
            {team.title}
          </h2>

          <p className="text-sm sm:text-base text-[#5B6572] mt-2">
            {team.subtitle}
          </p>
        </div>

        {/* Executive Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {team.members.map((member) => (
            <div
              key={member.id}
              className="transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden group"
            >
              {/* Circular Portrait Image with Dual-Ring Elevation */}
              <div className="relative w-44 h-44 sm:w-42 sm:h-42 rounded-full overflow-hidden mb-5 bg-white border border-[#E7EAEE] shadow-md ring-4 ring-[#00266A]/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 176px, 192px"
                  className="object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl sm:text-2xl font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors mb-1">
                {member.name}
              </h3>

              {/* Role Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#00266A]/6 text-[#00266A] text-xs font-semibold tracking-wide mb-5">
                {member.role}
              </div>

              {/* Useful Info (1 to 2 lines) */}
              <div className="pt-3 border-t border-[#E7EAEE] w-full max-w-xs">
                <p className="text-xs sm:text-sm text-[#5B6572] leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
