"use client";

import { useState, useEffect } from "react";
import HeroRig from "./HeroRig";
import CountUp from "../../components/CountUp";
import RotatingText from "@/components/RotatingText";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      setLoaded(true);
    };

    // Safety fallback timer to ensure animation triggers seamlessly
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 2400);

    window.addEventListener("preloaderComplete", handlePreloaderComplete);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("preloaderComplete", handlePreloaderComplete);
    };
  }, []);

  return (
    <section className="hero flex items-center">
      {/* Lime #C1FF72 accent sparks on grid intersections */}
      <div className="hero-grid-sparks" aria-hidden="true" />

      {/* Left animated machine rig */}
      <HeroRig side="left" />

      <div className="wrap relative z-3 py-10">
        <div className="max-w-[660px] mx-auto text-center">
          <span
            className={`eyebrow eyebrow-dark md:text-[14px] justify-center reveal ${loaded ? "in" : ""}`}
          >
            Chennai · Manufacturer &amp; Service Provider
          </span>
          <h1 className={`reveal ${loaded ? "in" : ""}`}>
            Packaging machinery &amp; industrial{" "}
            <span className="inline-flex items-center align-baseline px-2.5 sm:px-3.5 py-0.5 sm:py-1 mx-1 bg-[#C1FF72] text-[#00266A] font-extrabold not-italic shadow-xs">
              <RotatingText
                texts={["Service", "Product", "Rental", "Repair", "Spares"]}
                mainClassName="inline-flex text-[#00266A] overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-120%", opacity: 0 }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2200}
              />
            </span>{" "}
            solutions.
          </h1>
          <p className={`hero-lead reveal ${loaded ? "in" : ""}`}>
            SP Solutions manufactures and services packaging machines flow wrap,
            shrink tunnels, wrapping, strapping, batch coders, and inkjet
            printers, alongside machinery repair, contract shrink wrapping, and
            rentals in Chennai.
          </p>
          <div
            className={`flex gap-[14px] mt-[34px] flex-wrap justify-center items-center reveal ${loaded ? "in" : ""}`}
          >
            <a
              href="#contact"
              className="btn btn-primary min-w-[220px] text-center justify-center"
            >
              Request a quote
            </a>
            <a
              href="#products"
              className="btn btn-outline min-w-[220px] text-center justify-center"
            >
              See machinery &amp; services
            </a>
          </div>
          <div className={`hero-stats reveal ${loaded ? "in" : ""}`}>
            <div className="hero-stat">
              <b>
                <CountUp
                  from={2000}
                  to={2024}
                  duration={2.2}
                  separator=""
                  className="tabular-nums"
                  startWhen={loaded}
                />
              </b>
              <span>GST REGISTERED</span>
            </div>
            <div className="hero-stat">
              <b>
                0
                <CountUp
                  from={0}
                  to={6}
                  duration={1.8}
                  className="tabular-nums"
                  startWhen={loaded}
                />
              </b>
              <span>MACHINE CATEGORIES</span>
            </div>
            <div className="hero-stat">
              <b>
                <CountUp
                  from={0}
                  to={10}
                  duration={1.8}
                  className="tabular-nums"
                  startWhen={loaded}
                />
              </b>
              <span>TEAM ENGINEERS</span>
            </div>
            <div className="hero-stat">
              <b>
                <CountUp
                  from={0}
                  to={24}
                  duration={2}
                  className="tabular-nums"
                  startWhen={loaded}
                />
                /7
              </b>
              <span>SUPPORT LINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right animated machine rig */}
      <HeroRig side="right" />

      {/* Scroll cue */}
      <div className="absolute left-1/2 bottom-7 -translate-x-1/2 z-3 !hidden md:!flex flex-col items-center gap-2 text-gray-soft">
        <span className="scroll-cue-label">Scroll</span>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}
