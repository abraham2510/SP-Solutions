"use client";

import HeroRig from "./HeroRig";
import CountUp from "../../components/CountUp";

export default function Hero() {
  return (
    <section className="hero flex items-center">
      {/* Left animated machine rig */}
      <HeroRig side="left" />

      <div className="wrap relative z-3 py-10">
        <div className="max-w-[660px] mx-auto text-center">
          <span className="eyebrow eyebrow-dark md:text-[14px] justify-center">Chennai · Manufacturer &amp; Service Provider</span>
          <h1 className="reveal in">
            Packaging machinery &amp; industrial <em>Service solutions.</em>
          </h1>
          <p className="hero-lead reveal in">
            SP Solutions manufactures and services packaging machines flow wrap, shrink tunnels, wrapping, strapping, batch coders, and inkjet printers, alongside machinery repair, contract shrink wrapping, and rentals in Chennai.
          </p>
          <div className="flex gap-[14px] mt-[34px] flex-wrap justify-center items-center">
            <a href="#contact" className="btn btn-primary min-w-[220px] text-center justify-center">Request a quote</a>
            <a href="#products" className="btn btn-outline min-w-[220px] text-center justify-center">See machinery &amp; services</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <b>
                <CountUp from={2000} to={2024} duration={2.2} separator="" className="tabular-nums" />
              </b>
              <span>GST REGISTERED</span>
            </div>
            <div className="hero-stat">
              <b>
                0<CountUp from={0} to={6} duration={1.8} className="tabular-nums" />
              </b>
              <span>MACHINE CATEGORIES</span>
            </div>
            <div className="hero-stat">
              <b>
                <CountUp from={0} to={10} duration={1.8} className="tabular-nums" />
              </b>
              <span>TEAM ENGINEERS</span>
            </div>
            <div className="hero-stat">
              <b>
                <CountUp from={0} to={24} duration={2} className="tabular-nums" />/7
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
