"use client";

import ScrollExpand from "../../components/ScrollExpand";

export default function About() {
  return (
    <section id="about" className="relative w-full">
      <ScrollExpand
        src="https://images.unsplash.com/photo-1716194583732-0b9874234218?auto=format&fit=crop&w=1600&q=80"
        mediaType="image"
        alt="Packaging Machinery"
        title="Built to scale"
        scrollHint="Scroll to expand"
        useWindowScroll={true}
        startWidth={44}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1}
        scrollDistance={0.5}
        holdDistance={0.05}
        smoothing={0}
      >
        <h2 className="text-3xl sm:text-6xl font-bold text-white mb-3 tracking-tight">
          Machines &amp; Repairs. Built for Uptime.
        </h2>
        <p className="text-white text-base sm:text-lg max-w-[560px] mx-auto font-normal">
          Chennai-based manufacturer &amp; service provider — flow wrap, shrink tunnels, batch coders, machine repairs, and rentals.
        </p>
      </ScrollExpand>
    </section>
  );
}
