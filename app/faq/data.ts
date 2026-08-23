export interface FaqItem {
  id: string;
  category: "machines" | "repairs" | "rentals" | "spares" | "orders";
  categoryLabel: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: "all" | "machines" | "repairs" | "rentals" | "spares" | "orders";
  label: string;
  description: string;
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "all",
    label: "All FAQs",
    description: "Browse all questions across machinery, services, rentals, and spare parts.",
  },
  {
    id: "machines",
    label: "Machines & OEM",
    description: "Questions about flow wrap, shrink tunnels, strapping, and custom machinery.",
  },
  {
    id: "repairs",
    label: "Repairs & Service",
    description: "Emergency breakdown response times, AMC contracts, and on-site support.",
  },
  {
    id: "rentals",
    label: "Machine Rentals",
    description: "Rental terms, chamber machines, and flexible packaging equipment hire.",
  },
  {
    id: "spares",
    label: "Spares & Shrink Film",
    description: "OEM spare components, Teflon tapes, heating elements, and POF shrink films.",
  },
  {
    id: "orders",
    label: "Pricing & Delivery",
    description: "Direct factory pricing, pan-India dispatch, warranties, and trial testing.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "machines",
    categoryLabel: "Machines & OEM",
    question: "What types of packaging machines does SP Solutions manufacture and supply?",
    answer:
      "SP Solutions manufactures and supplies heavy-duty industrial packaging machines including Horizontal Flow Wrap Machines, Shrink Tunnel Machines, Auto & Semi-Automatic L-Sealers, Semi-Automatic Strapping Machines, Batch Coding Machines, Handheld Thermal Inkjet Printers, and Stretch Wrapping Systems engineered for continuous 24/7 factory operations.",
  },
  {
    id: "faq-2",
    category: "machines",
    categoryLabel: "Machines & OEM",
    question: "Can packaging machines be customized for our specific product dimensions and line speed?",
    answer:
      "Yes. All machines built at our Padi workshop in Chennai can be customized with adjustable conveyor lengths, variable speed motors, custom sealing jaws, product guides, and automated feeder attachments to match your exact package dimensions and output requirements.",
  },
  {
    id: "faq-3",
    category: "machines",
    categoryLabel: "Machines & OEM",
    question: "Can we test our products on your machines before making a purchase?",
    answer:
      "Absolutely. We welcome clients for live machine demonstration and product trials at our Padi facility in Chennai. You can bring or courier sample products and packaging films, and our engineering technicians will perform live trial runs to verify seal quality, shrinkage finish, and cycle speed.",
  },
  {
    id: "faq-4",
    category: "repairs",
    categoryLabel: "Repairs & Service",
    question: "What is your emergency breakdown response time in Chennai and Tamil Nadu?",
    answer:
      "We provide rapid emergency technician dispatch within < 2 hours across Chennai and same-day/next-day on-site response across Tamil Nadu and South India to minimize factory production downtime.",
  },
  {
    id: "faq-5",
    category: "repairs",
    categoryLabel: "Repairs & Service",
    question: "Do you provide Annual Maintenance Contracts (AMC) for packaging machines?",
    answer:
      "Yes, we offer structured AMC packages covering periodic preventive maintenance, heater/motor diagnostics, sensor calibration, conveyor alignment, and priority breakdown attendance for shrink tunnels, flow wrappers, and strapping machines.",
  },
  {
    id: "faq-6",
    category: "repairs",
    categoryLabel: "Repairs & Service",
    question: "Do you service packaging machines manufactured by other companies?",
    answer:
      "Yes. Our technicians have extensive hands-on experience troubleshooting and repairing third-party domestic and imported packaging machinery, including replacing electronic controls, rewiring heating circuits, and rebuilding sealing assemblies.",
  },
  {
    id: "faq-7",
    category: "rentals",
    categoryLabel: "Machine Rentals",
    question: "How does the Chamber Type Shrink Packing Machine rental service work?",
    answer:
      "We offer flexible weekly and monthly machine rental plans for chamber shrink packaging equipment. Rentals include complete machine delivery, installation, operator demonstration, and technical maintenance with zero capital expenditure required.",
  },
  {
    id: "faq-8",
    category: "rentals",
    categoryLabel: "Machine Rentals",
    question: "Who is machine rental ideal for?",
    answer:
      "Machine rental is ideal for seasonal demand spikes (festivals, holiday packaging), pilot product launches, short-term contract packing jobs, or businesses looking to validate packaging automation before making a full capital investment.",
  },
  {
    id: "faq-9",
    category: "spares",
    categoryLabel: "Spares & Shrink Film",
    question: "Are genuine OEM spare parts readily available in stock for immediate dispatch?",
    answer:
      "Yes. We maintain a ready-to-dispatch depot of genuine replacement parts in Chennai, including heating elements, Teflon belts & tapes, digital temperature controllers, cutter blades, silicone rollers, sealing wires, and thermocouples.",
  },
  {
    id: "faq-10",
    category: "spares",
    categoryLabel: "Spares & Shrink Film",
    question: "What types of shrink films and packaging materials do you supply?",
    answer:
      "We supply high-clarity Polyolefin (POF) shrink films in multi-gauge options, PVC shrink films, and virgin-grade semi-automatic PP strapping rolls suitable for food packaging, pharmaceuticals, cosmetics, stationery, and industrial hardware.",
  },
  {
    id: "faq-11",
    category: "orders",
    categoryLabel: "Pricing & Delivery",
    question: "Why is SP Solutions pricing more competitive than market dealers?",
    answer:
      "Because you purchase directly from our manufacturing and service facility in Padi, Chennai. Direct OEM supply eliminates middleman markups, agent commissions, and distributor delays.",
  },
  {
    id: "faq-12",
    category: "orders",
    categoryLabel: "Pricing & Delivery",
    question: "Do you deliver and install packaging machinery across India?",
    answer:
      "Yes. We ship packaging machinery pan-India in heavy-duty wooden transit crates, backed by complete engineering installation, operator training, and comprehensive 1-year machinery warranty coverage.",
  },
];
