import ArrowIcon from "./icons/ArrowIcon";

const SERVICES = [
  {
    title: "Packaging Machine Repairing Services",
    tag: "TECHNICAL REPAIR & OVERHAUL",
    desc: "In-factory and on-site repair services for Shrink Tunnel packaging equipment, Strapping Machines, and industrial packaging machinery across Chennai and India.",
    linkText: "Request repair service",
    href: "#contact",
    items: [
      "Shrink Tunnel Packaging Machine Repairing",
      "Strapping Machine Repairs & Tuning",
      "Emergency Line Breakdown Support",
    ],
  },
  {
    title: "Contract Shrink Wrapping Services",
    tag: "PACKAGING SERVICES",
    desc: "Professional shrink wrapping and shrink packaging services for multi-packs, retail cartons, and promotional bundles with guaranteed seal integrity.",
    linkText: "Enquire shrink wrapping",
    href: "#contact",
    items: [
      "Shrink Packaging Services in Chennai",
      "Retail-ready Tamper-Evident Wrapping",
      "Batch & Seasonal Pack Outs",
    ],
  },
  {
    title: "Chamber Machine Rental Services",
    tag: "EQUIPMENT LEASING & RENTAL",
    desc: "Flexible rental solutions for Chamber Type Shrink Packing Machines to scale your production capacity during peak manufacturing demand without capital expenditure.",
    linkText: "Rent a machine",
    href: "#contact",
    items: [
      "Chamber Type Shrink Packing Machine Rental",
      "Flexible Short-term & Monthly Leases",
      "Pre-tested Ready-to-Run Units",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white border-b border-[#E7EAEE]" id="services">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-[640px]">
            <span className="eyebrow eyebrow-dark mb-3">TECHNICAL SERVICES &amp; RENTALS</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-tight mb-3">
              Beyond machine sales. Dedicated technical support.
            </h2>
            <p className="text-[#5B6572] text-base leading-relaxed">
              SP Solutions provides expert repair services, on-site shrink wrapping, and machine rentals to keep your industrial operations running smoothly.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] p-8 hover:border-[#D5BD66] hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.12)] transition-all duration-300 group"
            >
              <span className="font-mono text-[11px] font-semibold text-[#00266A] tracking-[0.08em] uppercase mb-4 block">
                {service.tag}
              </span>
              <h3 className="text-xl font-bold text-[#10151C] mb-3 group-hover:text-[#00266A] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#5B6572] text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <ul className="space-y-2.5 mb-8 flex-grow">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs font-medium text-[#10151C]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D5BD66] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href={service.href}
                className="card-link inline-flex items-center gap-2 text-sm font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors mt-auto"
              >
                {service.linkText} <ArrowIcon />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
