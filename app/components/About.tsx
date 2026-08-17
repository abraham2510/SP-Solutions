"use client";

import { useState, useEffect } from "react";
import ScrollExpand from "../../components/ScrollExpand";

export default function About() {
  // Start false → SSR + hydration always renders image (safe default)
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsLarge(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const shared = {
    title: "Built to scale",
    scrollHint: "Scroll to expand",
    useWindowScroll: true,
    startWidth: 44,
    startHeight: 58,
    startRadius: 24,
    endRadius: 0,
    mediaZoom: 1,
    scrollDistance: 0.5,
    holdDistance: 0.05,
    smoothing: 0,
  };

  return (
    <section id="about" className="relative w-full">
      {isLarge ? (
        /* ── Desktop / large screens → autoplay video ── */
        <ScrollExpand
          src="/assets/videos/Agarbathi L-Sealer Presentation.mp4"
          mediaType="video"
          {...shared}
        />
      ) : (
        /* ── Mobile / tablet → static image ── */
        <ScrollExpand
          src="https://images.unsplash.com/photo-1716194583732-0b9874234218?auto=format&fit=crop&w=1600&q=80"
          mediaType="image"
          alt="Packaging Machinery"
          {...shared}
        />
      )}
    </section>
  );
}

