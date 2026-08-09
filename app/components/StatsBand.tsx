"use client";

import { useEffect, useRef, useCallback } from "react";

const WHY_ITEMS = [
  { num: "01", title: "Founder-led engineering", desc: "Every install is walked through by the people who built the company, not a call centre." },
  { num: "02", title: "Spares actually in stock", desc: "Shrink film, cartridges, ink, and electrical spares, ready to ship without a six-week wait." },
  { num: "03", title: "24/7 support line", desc: "A machine down at 2\u00a0AM still gets a person who picks up, not a ticket queue." },
  { num: "04", title: "Built for Indian production lines", desc: "Voltage, humidity, and duty cycles matched to how factories here actually run." },
];

interface CounterDef {
  value: string;
  count?: number;
  suffix?: string;
  plain?: boolean;
  label: string;
}

const COUNTERS: CounterDef[] = [
  { value: "2019", plain: true, label: "Founded" },
  { value: "0", count: 6, label: "Machine categories" },
  { value: "0", count: 48, suffix: "H", label: "Spares dispatch" },
  { value: "24/7", plain: true, label: "Support line" },
];

export default function StatsBand() {
  const counterRefs = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback((el: HTMLElement | null, idx: number) => {
    counterRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0", 10);
          const suffix = el.dataset.suffix || "";
          if (el.dataset.plain) {
            observer.unobserve(el);
            return;
          }
          const dur = 1400;
          const start = performance.now();
          function tick(now: number) {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );

    counterRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section stats-band">
      <div className="wrap relative">
        <div className="section-head reveal">
          <span className="eyebrow">Why us</span>
          <h2>Why manufacturers call SP Solutions first</h2>
          <p>We&apos;re a small, founder-led team — which means fewer handoffs between the person who sold you the machine and the one who fixes it.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 relative">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="why-item reveal"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="num mono">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 border-t border-white/15 pt-10 mt-16 relative">
          {COUNTERS.map((c, i) => (
            <div key={i} className="counter reveal" style={{ "--i": i } as React.CSSProperties}>
              <b
                ref={(el) => setRef(el, i)}
                data-count={c.count}
                data-suffix={c.suffix}
                data-plain={c.plain || undefined}
              >
                {c.value}
              </b>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
