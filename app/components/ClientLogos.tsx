"use client";

import Image from "next/image";

const CLIENTS = [
  { name: "BigBasket", src: "/assets/images/cients/BigBasketLogo.png" },
  { name: "Havmor", src: "/assets/images/cients/havmor-copy.png" },
  { name: "LG Perungayam", src: "/assets/images/cients/LG-perungayam-logo.png" },
  { name: "Medimix", src: "/assets/images/cients/medimix-copy.png" },
  { name: "Sheenlac", src: "/assets/images/cients/Sheenlac-WhiteLogo-copy.png" },
  { name: "Value Ingredients", src: "/assets/images/cients/value-ingredients-logo-e1747549374929.png" },
];

// Quadruple the list so the infinite marquee track is super long and seamlessly resets
const REPEATED_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

export default function ClientLogos() {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="wrap mb-6 text-center">
        <span className="eyebrow text-[#D5BD66] justify-center">TRUSTED BY INDUSTRY LEADING BRANDS</span>
      </div>

      {/* Infinite Seamless Logo Carousel */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-logo-scroll hover:[animation-play-state:paused] items-center gap-10 sm:gap-16 py-2">
          {REPEATED_CLIENTS.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-center shrink-0 w-[140px] sm:w-[170px] h-[64px] px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-[#D5BD66]/60 hover:bg-white/15 transition-all duration-300 group"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={160}
                height={55}
                className="max-h-[44px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
