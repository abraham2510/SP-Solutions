import Image from "next/image";

const SPARES_LIST = [
  "POF shrink film",
  "Printer cartridges",
  "Ink solvents & solutions",
  "Electrical spares",
];

export default function SparesBanner() {
  return (
    <section className="section-tight">
      <div className="wrap">
        <div className="spares flex items-center reveal">
          <Image
            src="https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=1600&q=80"
            alt="Electrical and mechanical spare parts on a factory shelf"
            width={1600}
            height={600}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="relative z-2 p-[52px_48px] grid grid-cols-1 md:grid-cols-[1.2fr_auto_auto] items-center gap-9 w-full">
            <div className="spares-copy">
              <span className="eyebrow" style={{ color: "#D5BD66" }}>Spares &amp; consumables</span>
              <h2>Spares and consumables, without the wait</h2>
              <p>A worn part shouldn&apos;t stop a shift. We stock what your machines actually run on and ship it fast.</p>
            </div>
            <ul className="spares-list flex flex-col gap-3">
              {SPARES_LIST.map((item, i) => (
                <li key={i} className="flex items-center gap-[9px]">{item}</li>
              ))}
            </ul>
            <div>
              <a href="#contact" className="btn btn-primary">Browse spares</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
