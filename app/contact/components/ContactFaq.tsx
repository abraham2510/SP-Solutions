"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How fast can an engineer visit our factory for emergency breakdowns?",
    answer:
      "For factories in Chennai and industrial corridors in Tamil Nadu (Ambattur, Sriperumbudur, Guindy, Oragadam, Maraimalai Nagar), our certified technicians can reach on-site within 4 to 8 hours. For pan-India clients, visits are scheduled within 24 to 48 hours based on urgency.",
  },
  {
    question: "Can we test our packaging samples before purchasing a machine?",
    answer:
      "Yes! We encourage clients to send their product samples (boxes, bottles, pouches, trays) to our Chennai facility. We will run live trial packaging on our shrink tunnels, strapping machines, or sealers and provide video proof along with cycle time and film consumption data.",
  },
  {
    question: "What is included in an SP Solutions Annual Maintenance Contract (AMC)?",
    answer:
      "Our comprehensive AMC packages cover quarterly preventive maintenance visits, priority breakdown response, free calibration of temperature controllers & tension assemblies, operator training, and discounts on replacement OEM spare parts.",
  },
  {
    question: "Do you supply spare parts for other third-party packaging machine brands?",
    answer:
      "Yes. We stock critical replacement parts including Teflon sealing tapes, heating elements, micro-switches, conveyor belts, silicone rubbers, and motor drives compatible with major domestic and imported packaging machinery.",
  },
  {
    question: "What is the standard warranty on SP Solutions machinery?",
    answer:
      "All new packaging machines manufactured and supplied by SP Solutions come with a 1-Year Comprehensive Warranty covering manufacturing defects, with lifetime technical telephone & video support.",
  },
];

export default function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="bg-[#F8FAFC] border border-[#E7EAEE] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xs">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00266A]/8 text-[#00266A] text-[11px] font-bold tracking-wider uppercase mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#10151C] tracking-tight">
          Common Questions About Orders &amp; Services
        </h3>
        <p className="text-[#5B6572] text-[14px] mt-2">
          Need immediate clarification? Browse our most common client queries or call our helpline directly.
        </p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white border-[#00266A]/30 shadow-sm"
                  : "bg-white/80 border-[#E7EAEE] hover:border-[#D5DEF0]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-[15px] sm:text-[16px] text-[#10151C] hover:text-[#00266A] transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8892A0] shrink-0 ml-3 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#00266A]" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-0 text-[#5B6572] text-[13.5px] sm:text-[14px] leading-relaxed border-t border-[#E7EAEE]/50 animate-in fade-in-50 duration-200">
                  <p className="pt-3">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
