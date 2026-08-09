"use client";

import ArrowIcon from "./icons/ArrowIcon";

function RepairIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-6 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    </div>
  );
}

function PackagingIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-6 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    </div>
  );
}

function RentalIcon() {
  return (
    <div className="w-12 h-12 rounded-xl bg-[#00266A]/10 text-[#00266A] flex items-center justify-center mb-6 group-hover:bg-[#00266A] group-hover:text-white transition-colors duration-300">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  );
}

const SERVICES = [
  {
    icon: <RepairIcon />,
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
    icon: <PackagingIcon />,
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
    icon: <RentalIcon />,
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
    <section className="py-16 bg-white border-b border-[#E7EAEE]" id="services">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl bg-[#F8FAFC] border border-[#E7EAEE] p-6 sm:p-8 hover:border-[#D5BD66]/80 hover:bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,38,106,0.12)] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Top Card Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#00266A] transition-colors duration-300" />

              {service.icon}

              <span className="font-mono text-[10.5px] font-bold text-[#00266A] tracking-[0.08em] uppercase mb-2 block">
                {service.tag}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#10151C] mb-3 group-hover:text-[#00266A] transition-colors leading-snug">
                {service.title}
              </h3>
              <p className="text-[#5B6572] text-xs sm:text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs font-medium text-[#10151C]/80">
                    <span className="w-4 h-4 rounded-full bg-[#D5BD66]/20 text-[#00266A] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={service.href}
                className="card-link inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#00266A] group-hover:text-[#D5BD66] transition-colors mt-auto pt-4 border-t border-[#E7EAEE]/70"
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
