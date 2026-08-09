import Image from "next/image";

const ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1200&q=80",
    alt: "Interior of a large industrial factory floor",
    title: "Factory floor",
    sub: "Chennai service base",
    className: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2",
  },
  {
    image: "https://images.unsplash.com/photo-1730584476141-232435a40c32?auto=format&fit=crop&w=900&q=80",
    alt: "Technician welding a metal machine part",
    title: "Fabrication",
    sub: "In-house machine builds",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-2",
  },
  {
    image: "https://images.unsplash.com/photo-1717386255767-52643970d483?auto=format&fit=crop&w=900&q=80",
    alt: "Factory filled with production machines",
    title: "Production line",
    sub: "End-to-end setups",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1741176508062-a79aa6b48bdc?auto=format&fit=crop&w=900&q=80",
    alt: "Workers in an industrial manufacturing facility",
    title: "Commissioning",
    sub: "On-site handover",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&w=900&q=80",
    alt: "Row of industrial machines on a factory floor",
    title: "Workshop",
    sub: "Machines ready to ship",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1717386255773-1e3037c81788?auto=format&fit=crop&w=900&q=80",
    alt: "Large industrial machine inside a factory building",
    title: "Assembly",
    sub: "Built before it ships",
    className: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1",
  },
];

export default function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow-dark">On the floor</span>
          <h2>Manufacturing, in motion</h2>
          <p>A look at the lines, installs, and workshops behind every machine we ship.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery-item reveal ${item.className}`}
              style={{ "--i": i } as React.CSSProperties}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={1200}
                height={800}
                className="w-full h-full object-cover"
              />
              <div className="cap">
                <b>{item.title}</b>
                <span>{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
