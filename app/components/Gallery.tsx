import Image from "next/image";

const ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=1200&q=80",
    alt: "Horizontal Flow Wrap Machine operating in a factory",
    title: "Flow Wrap Machines",
    sub: "Horizontal & Bottom Flow Wrappers",
    className: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2",
  },
  {
    image: "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
    alt: "Shrink Tunnel Machine packaging products",
    title: "Shrink Tunnel Packaging",
    sub: "Auto L-Sealers & Shrink Tunnels",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-2",
  },
  {
    image: "https://images.unsplash.com/photo-1764745021344-317b80f09e40?auto=format&fit=crop&w=900&q=80",
    alt: "Semi Automatic Strapping Machine in action",
    title: "Strapping & Stretch Wrappers",
    sub: "Semi-Auto Strapping & Pallet Wrappers",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80",
    alt: "Thermal Inkjet Printer and Batch Coding Equipment",
    title: "Batch Coding & Inkjet Printers",
    sub: "Handheld Inkjet & Batch Coders",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
    alt: "Polyolefin Shrink Film rolls and packaged boxes",
    title: "Polyolefin Shrink Film",
    sub: "High-Clarity POF Shrink Film",
    className: "col-span-1 row-span-1 sm:col-span-1 sm:row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    image: "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=900&q=80",
    alt: "Technician performing machinery repair and maintenance",
    title: "Machine Repair & Rentals",
    sub: "Chamber Machine Rental & Repairs",
    className: "col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-1",
  },
];

export default function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow eyebrow-dark">PRODUCT &amp; SERVICE RANGE</span>
          <h2>Machinery &amp; Product Categories</h2>
          <p>Explore SP Solutions&apos; complete range of packaging machinery, coding systems, shrink film, and technical repair solutions.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery-item ${item.className}`}
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
