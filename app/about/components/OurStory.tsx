"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lightbulb,
  Rocket,
  Cpu,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import type { AboutPageOptions } from "../options";

interface OurStoryProps {
  story: AboutPageOptions["story"];
}

export default function OurStory({ story }: OurStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth continuous lerped scroll animation
  useEffect(() => {
    let animId: number;

    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when container enters lower viewport, finish near upper viewport
      const startTrigger = windowHeight * 0.75;
      const endTrigger = windowHeight * 0.25;
      const totalDistance = rect.height + startTrigger - endTrigger;
      const currentDistance = startTrigger - rect.top;

      const target = Math.min(Math.max(currentDistance / totalDistance, 0), 1);

      setScrollProgress((prev) => {
        const delta = target - prev;
        if (Math.abs(delta) < 0.0005) return target;
        return prev + delta * 0.15; // Smooth fluid damping
      });

      animId = requestAnimationFrame(updateProgress);
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  const getMilestoneIcon = (name: string) => {
    const iconClass = "w-4 h-4 text-[#00266A]";
    switch (name) {
      case "Lightbulb":
        return <Lightbulb className={iconClass} />;
      case "Rocket":
        return <Rocket className={iconClass} />;
      case "Cpu":
        return <Cpu className={iconClass} />;
      case "ShieldCheck":
        return <ShieldCheck className={iconClass} />;
      case "Award":
        return <Award className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section
      id="our-story"
      className="py-16 sm:py-20 bg-[#FAFBFD] relative overflow-hidden scroll-mt-20 border-b border-[#E7EAEE]"
    >
      <div className="wrap relative z-10 max-w-4xl mx-auto">
        {/* Section Header with standard typography weights */}
        <div className="text-center mb-14 sm:mb-16 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00266A]/5 border border-[#00266A]/10 mb-2.5 text-[#00266A] text-[11px] font-bold tracking-widest uppercase">
            <span>{story.eyebrow}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#10151C] tracking-tight">
            {story.title}
          </h2>

          <p className="text-sm sm:text-base font-medium text-[#5B6572] mt-2">
            {story.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative py-2">
          {/* Base Neutral Track (Desktop) */}
          <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[2px] bg-[#E7EAEE]" />

          {/* Base Neutral Track (Mobile) */}
          <div className="block md:hidden absolute top-6 bottom-6 left-6 w-[2px] bg-[#E7EAEE]" />

          {/* Dynamic Scroll-Driven Green Light Beam (Desktop) */}
          <div
            className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#00266A] via-[#C1FF72] to-[#bfee90] rounded-full z-10 shadow-[0_0_16px_rgba(193,255,114,0.85)] will-change-[height]"
            style={{
              height: `calc((100% - 48px) * ${scrollProgress})`,
            }}
          >
            {scrollProgress > 0.02 && scrollProgress < 0.98 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#C1FF72] border-2 border-white shadow-[0_0_18px_6px_rgba(193,255,114,0.9)] animate-pulse" />
            )}
          </div>

          {/* Dynamic Scroll-Driven Green Light Beam (Mobile) */}
          <div
            className="block md:hidden absolute top-6 left-6 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#00266A] via-[#C1FF72] to-[#bfee90] rounded-full z-10 shadow-[0_0_16px_rgba(193,255,114,0.85)] will-change-[height]"
            style={{
              height: `calc((100% - 48px) * ${scrollProgress})`,
            }}
          >
            {scrollProgress > 0.02 && scrollProgress < 0.98 && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-[#C1FF72] border-2 border-white shadow-[0_0_16px_5px_rgba(193,255,114,0.9)] animate-pulse" />
            )}
          </div>

          {/* Milestones in Strict Alternating Rhythm */}
          <div className="flex flex-col gap-10 sm:gap-14">
            {story.milestones.map((item, index) => {
              const isCardRight = item.side === "right";
              const threshold = (index + 0.35) / story.milestones.length;
              const isReached = scrollProgress >= threshold;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Left Column on Desktop */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end pl-14 md:pl-0 md:pr-10 mb-2 md:mb-0">
                    {isCardRight ? (
                      /* Year on Left */
                      <div className="flex items-center md:justify-end w-full">
                        <span
                          className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 ${
                            isReached
                              ? "text-[#00266A] opacity-100 scale-100"
                              : "text-[#8892A0]/45 opacity-50 scale-95"
                          }`}
                        >
                          {item.year}
                        </span>
                      </div>
                    ) : (
                      /* Card on Left */
                      <div
                        className={`w-full max-w-sm bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 group ${
                          isReached
                            ? "border-[#00266A]/20 shadow-[0_10px_25px_-8px_rgba(0,38,106,0.1)] -translate-y-0.5"
                            : "border-[#E7EAEE] shadow-2xs"
                        }`}
                      >
                        {/* Heading & Icon */}
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#00266A]/6 border border-[#00266A]/10 flex items-center justify-center shrink-0">
                            {getMilestoneIcon(item.iconName)}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[#10151C] leading-snug group-hover:text-[#00266A] transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-[#5B6572] text-[13px] sm:text-[13.5px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Node Hub with Green Brand Glow */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white transition-all duration-400 flex items-center justify-center ${
                        isReached
                          ? "bg-[#00266A] scale-110 shadow-[0_0_14px_rgba(193,255,114,0.85)] ring-4 ring-[#C1FF72]/40"
                          : "bg-[#E7EAEE] scale-90"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-400 ${
                          isReached ? "bg-[#C1FF72]" : "bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Right Column on Desktop */}
                  <div className="w-full md:w-1/2 flex justify-start pl-14 md:pl-10">
                    {isCardRight ? (
                      /* Card on Right */
                      <div
                        className={`w-full max-w-sm bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 group ${
                          isReached
                            ? "border-[#00266A]/20 shadow-[0_10px_25px_-8px_rgba(0,38,106,0.1)] -translate-y-0.5"
                            : "border-[#E7EAEE] shadow-2xs"
                        }`}
                      >
                        {/* Heading & Icon */}
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-[#00266A]/6 border border-[#00266A]/10 flex items-center justify-center shrink-0">
                            {getMilestoneIcon(item.iconName)}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-[#10151C] leading-snug group-hover:text-[#00266A] transition-colors">
                            {item.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-[#5B6572] text-[13px] sm:text-[13.5px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ) : (
                      /* Year on Right */
                      <div className="hidden md:flex items-center justify-start w-full">
                        <span
                          className={`text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 ${
                            isReached
                              ? "text-[#00266A] opacity-100 scale-100"
                              : "text-[#8892A0]/45 opacity-50 scale-95"
                          }`}
                        >
                          {item.year}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
