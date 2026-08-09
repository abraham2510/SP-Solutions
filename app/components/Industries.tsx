import Image from "next/image";
import {
  FoodBeverageIcon,
  PharmaceuticalIcon,
  FMCGIcon,
  IndustrialIcon,
} from "./icons/IndustryIcons";
import type { ReactNode } from "react";

interface Industry {
  title: string;
  image: string;
  alt: string;
  icon: ReactNode;
}

const INDUSTRIES: Industry[] = [
  {
    title: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=700&q=80",
    alt: "Bottles on a food and beverage packaging line",
    icon: <FoodBeverageIcon />,
  },
  {
    title: "Pharmaceutical",
    image: "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=700&q=80",
    alt: "Pharmaceutical manufacturing equipment and pipework",
    icon: <PharmaceuticalIcon />,
  },
  {
    title: "FMCG & Consumer Goods",
    image: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=700&q=80",
    alt: "Stacked cartons for FMCG distribution",
    icon: <FMCGIcon />,
  },
  {
    title: "Industrial Manufacturing",
    image: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&w=700&q=80",
    alt: "Large industrial manufacturing machine",
    icon: <IndustrialIcon />,
  },
];

export default function Industries() {
  return (
    <section className="section section-alt" id="industries">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow-dark">Industries served</span>
          <h2>Built to meet each industry&apos;s own standards</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {INDUSTRIES.map((industry, i) => (
            <div
              key={i}
              className="industry-card reveal"
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image
                src={industry.image}
                alt={industry.alt}
                width={700}
                height={840}
                className="w-full h-full object-cover"
              />
              <div className="content">
                {industry.icon}
                <h4>{industry.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
