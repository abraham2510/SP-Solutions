"use client";

import CountUp from "../../components/CountUp";

const WHY_ITEMS = [
  {
    num: "01",
    title: "Chennai manufacturing & service",
    desc: "Dedicated factory and technical repair base located in Chennai, Tamil Nadu.",
  },
  {
    num: "02",
    title: "In-house machine repairs",
    desc: "Expert repair services for shrink tunnels, strapping machines, and packaging equipment.",
  },
  {
    num: "03",
    title: "Polyolefin shrink film & spares",
    desc: "Supplying high-grade POF shrink film and machine replacement components.",
  },
  {
    num: "04",
    title: "Proprietor-led engineering",
    desc: "Proprietorship company led by CEO A S and a dedicated team of up to 10 specialists.",
  },
];

export default function StatsBand() {
  return (
    <section className="section bg-gradient-to-br from-[#00266A] via-[#001E54] to-[#001233] text-white overflow-hidden relative" id="why-us">
      <div className="wrap relative z-10">
        <div className="section-head section-head-light reveal max-w-[620px] mb-12">
          <span className="eyebrow !text-white">Why SP Solutions</span>
          <h2 className="!text-white text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built for uptime. Serviced by the team that <span className="text-[#C1FF72]">built it.</span>
          </h2>
          <p className="!text-white/75 text-base leading-relaxed">
            We&apos;re a dedicated, proprietor-led team in Chennai — offering machinery, technical repairs, packaging services, and equipment rentals.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 relative">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="why-item reveal"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="num mono">{item.num}</span>
              <h3 className="text-base sm:text-[17px]">{item.title}</h3>
              <p className="text-xs sm:text-[14px]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Animated Counter Stats Grid using CountUp */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 border-t border-white/15 pt-8 sm:pt-10 mt-12 sm:mt-16 relative">
          <div className="counter reveal" style={{ "--i": 0 } as React.CSSProperties}>
            <b>
              <CountUp from={2000} to={2024} duration={2.2} separator="" className="tabular-nums" />
            </b>
            <span>GST REGISTERED</span>
          </div>

          <div className="counter reveal" style={{ "--i": 1 } as React.CSSProperties}>
            <b>
              0<CountUp from={0} to={6} duration={1.8} className="tabular-nums" />
            </b>
            <span>MACHINE CATEGORIES</span>
          </div>

          <div className="counter reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <b>
              <CountUp from={0} to={10} duration={1.8} className="tabular-nums" />
            </b>
            <span>TECHNICAL TEAM</span>
          </div>

          <div className="counter reveal" style={{ "--i": 3 } as React.CSSProperties}>
            <b>
              <CountUp from={0} to={24} duration={2} className="tabular-nums" />/7
            </b>
            <span>SUPPORT LINE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
