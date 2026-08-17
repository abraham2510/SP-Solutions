/**
 * prisma/seed.ts — Seeds the sp_solutions database with:
 *   - 1 admin user
 *   - 5 categories
 *   - 18 products (with features, applications, specifications)
 *   - 4 services
 *
 * Run: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin user ────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  await prisma.user.upsert({
    where: { email: "admin@spsolutionsc.com" },
    update: {},
    create: {
      name: "SP Solutions Admin",
      email: "admin@spsolutionsc.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✓ Admin user created: admin@spsolutionsc.com / Admin@123");

  // ── Categories ────────────────────────────────────────────────────────────
  const categoryData = [
    {
      id: "cat_shrink",
      name: "Shrink Packaging Machines",
      slug: "shrink-packaging",
      type: "machine",
      description: "Shrink wrapping and sealing solutions for retail, pharma, and food processing — from manual sealers to full-auto shrink tunnel lines.",
      imageUrl: "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
      sortOrder: 1,
      status: "ACTIVE" as const,
    },
    {
      id: "cat_flow",
      name: "Flow Wrapping Machines",
      slug: "flow-wrapping",
      type: "machine",
      description: "High-speed horizontal flow wrappers for food, pharma, and consumer goods — top-film and bottom-film configurations.",
      imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
      sortOrder: 2,
      status: "ACTIVE" as const,
    },
    {
      id: "cat_inspect",
      name: "Inspection / Metal Detection",
      slug: "inspection-metal-detection",
      type: "machine",
      description: "In-line metal detectors for HACCP-compliant food and pharma production. Detects ferrous, non-ferrous, and stainless steel.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      sortOrder: 3,
      status: "ACTIVE" as const,
    },
    {
      id: "cat_endline",
      name: "End Line Packaging",
      slug: "end-line-packaging",
      type: "machine",
      description: "End-of-line machinery for carton sealing, palletising, and load stabilisation — strapping, taping, case packing, and stretch wrapping.",
      imageUrl: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
      sortOrder: 4,
      status: "ACTIVE" as const,
    },
    {
      id: "cat_print",
      name: "Printing & Coding Systems",
      slug: "printing-coding-systems",
      type: "machine",
      description: "Batch coding and date marking systems — CIJ, TTO, TIJ, and hand printers for complete traceability on any surface.",
      imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
      sortOrder: 5,
      status: "ACTIVE" as const,
    },
  ];

  for (const cat of categoryData) {
    const images = cat.imageUrl ? [cat.imageUrl] : [];
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, imageUrl: cat.imageUrl, images, sortOrder: cat.sortOrder },
      create: { ...cat, images },
    });
  }
  console.log(`✓ ${categoryData.length} categories seeded`);

  // ── Products ──────────────────────────────────────────────────────────────
  const products = [
    // ── Shrink Packaging ──
    {
      slug: "manual-l-sealer-machine",
      name: "Manual L Sealer Machine",
      categorySlug: "shrink-packaging",
      model: "",
      shortDescription: "Entry-level manual L-sealer for low-volume shrink packaging of retail products, gift items, and boxed goods.",
      description: "The SP Solutions Manual L Sealer Machine is designed for businesses that require a reliable, operator-driven shrink sealing solution. The L-shaped sealing bar seals two sides of the product simultaneously, creating a tight, professional package when passed through a shrink tunnel.",
      imageUrl: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["L-shaped dual seal bar for two-side sealing", "Compatible with POF and PVC shrink film", "Adjustable seal bar temperature", "Low maintenance design", "Compact footprint for small workspaces"],
      applications: ["Retail product packaging", "Pharmaceutical packaging", "Gift and toy wrapping", "Boxed goods sealing"],
      specifications: [
        { specification: "Seal Bar Length", value: "500", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Film Compatibility", value: "POF / PVC", unitOrNote: "", sortOrder: 1 },
        { specification: "Power", value: "500", unitOrNote: "W", sortOrder: 2 },
        { specification: "Voltage", value: "220V 50Hz", unitOrNote: "", sortOrder: 3 },
        { specification: "Weight", value: "12", unitOrNote: "kg", sortOrder: 4 },
      ],
    },
    {
      slug: "shrink-chamber-machine",
      name: "Shrink Chamber Machine",
      categorySlug: "shrink-packaging",
      model: "",
      shortDescription: "Compact chamber-type shrink packer for batch shrink wrapping of small items — ideal for gift sets, pharma blisters, and bundled packs.",
      description: "The Shrink Chamber Machine from SP Solutions is a compact, all-in-one chamber-type shrink packaging unit that simultaneously seals and shrinks the product within an enclosed heated chamber.",
      imageUrl: "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Integrated seal and shrink in single chamber", "Digital temperature controller", "Adjustable timer for consistent results", "Compact and portable design", "Works with POF and PVC shrink film"],
      applications: ["Gift set packaging", "Pharmaceutical blister packing", "Promotional bundle wrapping", "Toy and craft packaging"],
      specifications: [
        { specification: "Chamber Size", value: "450×450×200", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Voltage", value: "220V 50Hz", unitOrNote: "", sortOrder: 1 },
        { specification: "Power", value: "1.35", unitOrNote: "kW", sortOrder: 2 },
        { specification: "Capacity", value: "10–15", unitOrNote: "packs/min", sortOrder: 3 },
        { specification: "Weight", value: "18", unitOrNote: "kg", sortOrder: 4 },
      ],
    },
    {
      slug: "semi-automatic-shrink-wrap-machine",
      name: "Semi Automatic Shrink Wrap Machine",
      categorySlug: "shrink-packaging",
      model: "",
      shortDescription: "Semi-automatic shrink wrap system for medium-volume packaging lines — fast, consistent sealing with minimal operator effort.",
      description: "The SP Solutions Semi Automatic Shrink Wrap Machine combines a foot-pedal-operated L-sealer with a conveyor-fed shrink tunnel, giving mid-volume packaging operations the speed of automation with the flexibility of manual feeding.",
      imageUrl: "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Foot-pedal sealing for hands-free film handling", "Integrated conveyor shrink tunnel", "Adjustable conveyor speed", "Digital temperature control on tunnel", "Stainless steel construction on food contact areas"],
      applications: ["Food and beverage packing", "Hardware and industrial parts packaging", "Pharmaceutical secondary packaging", "Multi-pack bundling"],
      specifications: [
        { specification: "Seal Bar Length", value: "600", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Tunnel Belt Width", value: "500", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Voltage", value: "220V 50Hz", unitOrNote: "", sortOrder: 2 },
        { specification: "Power", value: "2.8", unitOrNote: "kW", sortOrder: 3 },
        { specification: "Speed", value: "Up to 25", unitOrNote: "packs/min", sortOrder: 4 },
      ],
    },
    {
      slug: "auto-l-sealer-machine",
      name: "Auto L Sealer Machine",
      categorySlug: "shrink-packaging",
      model: "",
      shortDescription: "Fully automatic L-sealer for high-speed shrink wrapping on continuous production lines — no operator sealing required.",
      description: "The Auto L Sealer Machine from SP Solutions is a fully automated, motorised sealing system that integrates with a downstream shrink tunnel to deliver continuous, high-speed shrink packaging without manual intervention.",
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Fully motorised automatic sealing cycle", "PLC-controlled operation with touchscreen HMI", "Servo-driven film feed for minimal wastage", "Safety guards and emergency stop", "Easy film threading mechanism"],
      applications: ["FMCG high-volume packaging", "Food processing lines", "Pharmaceutical secondary packaging", "Beverage and water bottle bundling"],
      specifications: [
        { specification: "Seal Bar Length", value: "700", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Voltage", value: "380V / 220V 50Hz", unitOrNote: "", sortOrder: 1 },
        { specification: "Power", value: "4.5", unitOrNote: "kW", sortOrder: 2 },
        { specification: "Speed", value: "40–60", unitOrNote: "packs/min", sortOrder: 3 },
      ],
    },
    {
      slug: "shrink-tunnel-machine",
      name: "Shrink Tunnel Machine",
      categorySlug: "shrink-packaging",
      model: "",
      shortDescription: "Industrial shrink tunnel for tight, glass-clear shrink film finishing — partners with any L-sealer for a complete packaging line.",
      description: "The SP Solutions Shrink Tunnel Machine is a stainless-steel conveyor tunnel that uses calibrated hot-air circulation to shrink POF or PVC film around products sealed by an L-sealer or flow wrapper upstream.",
      imageUrl: "https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&w=900&q=80",
      featured: true,
      status: "ACTIVE" as const,
      features: ["Stainless steel housing for food-grade applications", "Adjustable hot-air temperature (50–200°C)", "Variable conveyor speed control", "Even heat distribution for consistent shrink", "Compatible with all L-sealers and flow wrappers"],
      applications: ["Post-sealing shrink finishing", "Beverage multi-pack wrapping", "Retail-ready product sealing", "Industrial parts protection"],
      specifications: [
        { specification: "Tunnel Opening", value: "W600×H300", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Conveyor Width", value: "550", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Temperature Range", value: "50–200", unitOrNote: "°C", sortOrder: 2 },
        { specification: "Power", value: "4.0", unitOrNote: "kW", sortOrder: 3 },
        { specification: "Speed", value: "0–15", unitOrNote: "m/min", sortOrder: 4 },
      ],
    },
    // ── Flow Wrapping ──
    {
      slug: "top-film-flow-wrapper",
      name: "Top Film Flow Wrapper",
      categorySlug: "flow-wrapping",
      model: "",
      shortDescription: "Top-film horizontal flow wrapper for high-speed pillow-pack sealing of biscuits, chocolates, and bar-shaped products.",
      description: "The Top Film Flow Wrapper from SP Solutions is a horizontal form-fill-seal machine that feeds film from the top of the machine, wraps it around the product, and creates a pillow-pack seal.",
      imageUrl: "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Servo-driven film feed for precision tracking", "Top-film reel configuration for easy loading", "Digital temperature controller for fin and end seals", "Stainless steel product contact parts"],
      applications: ["Biscuit and cookie packaging", "Chocolate and candy bar wrapping", "Soap and personal care bar packing", "Bread and bakery product wrapping"],
      specifications: [
        { specification: "Max Pack Length", value: "400", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Max Pack Width", value: "200", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Speed", value: "Up to 150", unitOrNote: "packs/min", sortOrder: 2 },
        { specification: "Film Width", value: "100–450", unitOrNote: "mm", sortOrder: 3 },
        { specification: "Power", value: "3.0", unitOrNote: "kW", sortOrder: 4 },
      ],
    },
    {
      slug: "bottom-film-flow-wrapper",
      name: "Bottom Film Flow Wrapper",
      categorySlug: "flow-wrapping",
      model: "",
      shortDescription: "Bottom-film flow wrapper delivering stronger back seals — ideal for heavier or irregularly shaped products.",
      description: "The Bottom Film Flow Wrapper from SP Solutions uses a film reel mounted below the machine, forming a tube from the bottom that provides a stronger and flatter back seal.",
      imageUrl: "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Bottom-film reel for strong fin-seal base", "Heavy-duty conveyor for stable product transport", "PLC controller with recipe memory", "Quick changeover for different product sizes"],
      applications: ["Heavy consumer goods packaging", "Hardware and auto parts wrapping", "Fresh produce and vegetables", "Cheese and deli product sealing"],
      specifications: [
        { specification: "Max Pack Length", value: "500", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Max Pack Width", value: "250", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Speed", value: "Up to 100", unitOrNote: "packs/min", sortOrder: 2 },
        { specification: "Power", value: "3.5", unitOrNote: "kW", sortOrder: 3 },
      ],
    },
    // ── Inspection ──
    {
      slug: "digital-metal-detector",
      name: "Digital Metal Detector",
      categorySlug: "inspection-metal-detection",
      model: "",
      shortDescription: "High-sensitivity digital metal detector for in-line contamination detection in food, pharma, and FMCG production.",
      description: "The SP Solutions Digital Metal Detector uses advanced digital signal processing (DSP) to achieve superior sensitivity for detecting ferrous, non-ferrous, and stainless steel metal contaminants in packaged and unpackaged products.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
      featured: true,
      status: "ACTIVE" as const,
      features: ["DSP-based digital detection for high sensitivity", "Detects ferrous, non-ferrous, and stainless steel", "Multi-product recipe memory (up to 100 products)", "IP65 wash-down rated housing", "HACCP, BRC, and IFS compliant"],
      applications: ["Food processing line inspection", "Pharmaceutical contamination control", "FMCG quality assurance", "Bakery and confectionery lines"],
      specifications: [
        { specification: "Aperture Width", value: "150–600", unitOrNote: "mm configurable", sortOrder: 0 },
        { specification: "Sensitivity - Fe", value: "0.5", unitOrNote: "mm sphere", sortOrder: 1 },
        { specification: "Sensitivity - Non-Fe", value: "0.6", unitOrNote: "mm sphere", sortOrder: 2 },
        { specification: "Sensitivity - SS", value: "1.0", unitOrNote: "mm sphere", sortOrder: 3 },
        { specification: "IP Rating", value: "IP65", unitOrNote: "", sortOrder: 4 },
      ],
    },
    {
      slug: "metal-detector",
      name: "Metal Detector",
      categorySlug: "inspection-metal-detection",
      model: "",
      shortDescription: "Analogue in-line metal detector for reliable contamination protection in standard food and packaging applications.",
      description: "The SP Solutions Metal Detector is a reliable analogue-based inline inspection system for detecting metallic contaminants in products moving on a conveyor.",
      imageUrl: "https://images.unsplash.com/photo-1610439204403-7f0f9f7e1a48?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Balanced coil detection technology", "Analogue sensitivity control", "Auto-rejection conveyor with buzzer alarm", "Stainless steel housing", "Low power consumption"],
      applications: ["General food packaging inspection", "Snack and dry goods contamination control", "Pharmaceutical secondary packaging", "Textile and garment needle detection"],
      specifications: [
        { specification: "Aperture Width", value: "200–500", unitOrNote: "mm configurable", sortOrder: 0 },
        { specification: "Sensitivity - Fe", value: "0.8", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Sensitivity - Non-Fe", value: "1.0", unitOrNote: "mm", sortOrder: 2 },
        { specification: "Sensitivity - SS", value: "1.5", unitOrNote: "mm", sortOrder: 3 },
      ],
    },
    // ── End Line ──
    {
      slug: "case-packer",
      name: "Case Packer",
      categorySlug: "end-line-packaging",
      model: "",
      shortDescription: "Automatic or semi-automatic case packer for high-speed carton erecting, loading, and sealing at end-of-line.",
      description: "The SP Solutions Case Packer automates the erecting, filling, and sealing of corrugated cartons at the end of the production line.",
      imageUrl: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Automatic carton erecting and sealing", "Hot melt glue or tape sealing options", "PLC controller with touchscreen", "Adjustable for multiple carton sizes"],
      applications: ["Beverage and bottled water case packing", "Pouch and sachet carton loading", "Snack food end-of-line packing"],
      specifications: [
        { specification: "Speed", value: "Up to 20", unitOrNote: "cases/min", sortOrder: 0 },
        { specification: "Power", value: "4.0", unitOrNote: "kW", sortOrder: 1 },
        { specification: "Voltage", value: "380V 3-phase", unitOrNote: "", sortOrder: 2 },
      ],
    },
    {
      slug: "stretch-wrapper",
      name: "Stretch Wrapper",
      categorySlug: "end-line-packaging",
      model: "",
      shortDescription: "Rotary arm or turntable stretch wrapper for securing pallet loads with LLDPE stretch film — essential for logistics and warehousing.",
      description: "The SP Solutions Stretch Wrapper applies LLDPE stretch film around palletised loads to stabilise and protect products during transport and storage.",
      imageUrl: "https://images.unsplash.com/photo-1764745021344-317b80f09e40?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Turntable and rotary-arm options", "Variable film stretch ratio (0–300%)", "Pre-stretch carriage for 200–300% film elongation", "Auto-cut and wipe film tail"],
      applications: ["Pallet load stabilisation for logistics", "Warehouse dispatch wrapping", "Export packaging and containment"],
      specifications: [
        { specification: "Turntable Diameter", value: "1500", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Max Load Height", value: "2400", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Max Pallet Weight", value: "2000", unitOrNote: "kg", sortOrder: 2 },
        { specification: "Power", value: "2.2", unitOrNote: "kW", sortOrder: 3 },
      ],
    },
    {
      slug: "semi-automatic-strapping-machine",
      name: "Semi Automatic Strapping Machine",
      categorySlug: "end-line-packaging",
      model: "",
      shortDescription: "Semi-automatic strapping machine for PP and PET strap bundling of cartons, boxes, and pallets — fast and operator-assisted.",
      description: "The SP Solutions Semi Automatic Strapping Machine feeds, tensions, seals, and cuts PP or PET strapping around cartons and pallet loads with a single foot-pedal press.",
      imageUrl: "https://images.unsplash.com/photo-1569466441685-19dc36f47da5?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Foot-pedal operation for hands-free strapping", "Adjustable strap tension dial", "Heat-seal or friction-seal options", "Digital tension display"],
      applications: ["Carton bundling and reinforcement", "Newspaper and magazine bundle strapping", "Textile bale strapping"],
      specifications: [
        { specification: "Strap Width", value: "9–15.5", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Strap Material", value: "PP / PET", unitOrNote: "", sortOrder: 1 },
        { specification: "Tension Range", value: "5–50", unitOrNote: "kg", sortOrder: 2 },
        { specification: "Power", value: "550", unitOrNote: "W", sortOrder: 3 },
      ],
    },
    {
      slug: "automatic-strapping-machine",
      name: "Automatic Strapping Machine",
      categorySlug: "end-line-packaging",
      model: "",
      shortDescription: "Fully automatic strapping machine for continuous high-speed carton and pallet strapping on conveyor lines.",
      description: "The SP Solutions Automatic Strapping Machine is a conveyor-integrated, fully automated PP strapping system that automatically detects, positions, feeds, tensions, seals, and cuts strapping around cartons.",
      imageUrl: "https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=900&q=80",
      featured: true,
      status: "ACTIVE" as const,
      features: ["Fully automatic strap feeding and sealing", "PLC-controlled with touchscreen HMI", "Conveyor-integrated with external trigger", "Low strap alert and automatic thread"],
      applications: ["High-volume carton dispatch strapping", "FMCG distribution centre operations", "Beverage case strapping"],
      specifications: [
        { specification: "Strap Width", value: "12–19", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Speed", value: "Up to 80", unitOrNote: "straps/min", sortOrder: 1 },
        { specification: "Power", value: "1.1", unitOrNote: "kW", sortOrder: 2 },
      ],
    },
    {
      slug: "semi-automatic-taping-machine",
      name: "Semi Automatic Taping Machine",
      categorySlug: "end-line-packaging",
      model: "",
      shortDescription: "Semi-automatic carton taping machine for consistent top-and-bottom sealing of standard and non-standard carton sizes.",
      description: "The SP Solutions Semi Automatic Taping Machine seals the top and bottom flaps of corrugated cartons with BOPP self-adhesive tape in a single pass.",
      imageUrl: "https://images.unsplash.com/photo-1603792907191-89e55f70099a?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Top and bottom simultaneous taping", "Adjustable height for varied carton sizes", "Self-adhesive BOPP tape compatible", "Quick tape roll changeover"],
      applications: ["Carton top-and-bottom tape sealing", "E-commerce parcel sealing", "FMCG distribution centre sealing"],
      specifications: [
        { specification: "Carton Width", value: "180–500", unitOrNote: "mm", sortOrder: 0 },
        { specification: "Tape Width", value: "48–75", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Speed", value: "Up to 20", unitOrNote: "cartons/min", sortOrder: 2 },
        { specification: "Power", value: "370", unitOrNote: "W", sortOrder: 3 },
      ],
    },
    // ── Printing & Coding ──
    {
      slug: "hand-printer",
      name: "Hand Printer",
      categorySlug: "printing-coding-systems",
      model: "",
      shortDescription: "Manual hand printer for ink-based batch code and date marking directly on cartons, bags, and packaging surfaces.",
      description: "The SP Solutions Hand Printer is a manual, handheld batch coding device that uses a raised rubber type die and fast-drying ink to stamp manufacturing dates, batch codes, MRP prices, and shift codes.",
      imageUrl: "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Adjustable die plate for date and code customisation", "Quick-dry ink for porous and non-porous surfaces", "Lightweight and ergonomic handle", "No power required"],
      applications: ["Carton batch code stamping", "Pouch and bag date printing", "MRP and shift code marking"],
      specifications: [
        { specification: "Print Area", value: "40×20", unitOrNote: "mm standard", sortOrder: 0 },
        { specification: "Weight", value: "0.3", unitOrNote: "kg", sortOrder: 1 },
      ],
    },
    {
      slug: "continuous-ink-jet-printer",
      name: "Continuous Ink Jet Printer",
      categorySlug: "printing-coding-systems",
      model: "",
      shortDescription: "Non-contact continuous inkjet printer for high-speed date, batch, and QR code marking on any packaging surface.",
      description: "The SP Solutions Continuous Ink Jet (CIJ) Printer is an industrial non-contact coding system that prints on products and packaging moving at high speed without the print head touching the surface.",
      imageUrl: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
      featured: true,
      status: "ACTIVE" as const,
      features: ["Non-contact printing — no surface wear", "Print speed >500 characters/second", "Multiple font sizes and barcodes", "Auto-clean print head on startup", "IP55-rated for production environments"],
      applications: ["Beverage bottle date coding", "Dairy product batch marking", "Pharmaceutical expiry date printing"],
      specifications: [
        { specification: "Print Speed", value: "Up to 500", unitOrNote: "char/sec", sortOrder: 0 },
        { specification: "Print Resolution", value: "Up to 128×128", unitOrNote: "DPI", sortOrder: 1 },
        { specification: "Power", value: "100", unitOrNote: "W", sortOrder: 2 },
        { specification: "IP Rating", value: "IP55", unitOrNote: "", sortOrder: 3 },
      ],
    },
    {
      slug: "tto-printer",
      name: "TTO Printer",
      categorySlug: "printing-coding-systems",
      model: "",
      shortDescription: "Thermal Transfer Overprinter for crisp, durable batch code and date printing on flexible film packaging.",
      description: "The SP Solutions TTO (Thermal Transfer Overprinter) is a high-resolution, ribbon-based printing system designed to be integrated directly into flow wrappers, VFFS machines, and pouch-filling lines.",
      imageUrl: "https://images.unsplash.com/photo-1565793979688-7c6be9f8a2b1?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["300 DPI high-resolution printing", "Ribbon save mode for reduced consumable cost", "Colour touchscreen HMI with recipe management", "No solvents or VOC emissions"],
      applications: ["Flow wrapper film date coding", "VFFS pouch marking", "Pharmaceutical blister foil coding"],
      specifications: [
        { specification: "Print Resolution", value: "300", unitOrNote: "DPI", sortOrder: 0 },
        { specification: "Max Print Width", value: "110", unitOrNote: "mm", sortOrder: 1 },
        { specification: "Print Speed", value: "Up to 600", unitOrNote: "mm/sec", sortOrder: 2 },
        { specification: "Power", value: "150", unitOrNote: "W", sortOrder: 3 },
      ],
    },
    {
      slug: "tij-printer",
      name: "TIJ Printer",
      categorySlug: "printing-coding-systems",
      model: "",
      shortDescription: "Thermal Inkjet printer for versatile, maintenance-free batch coding on cartons, labels, and absorbent surfaces.",
      description: "The SP Solutions TIJ (Thermal Inkjet) Printer is a compact, cartridge-based printing system for marking batch codes, dates, lot numbers, and barcodes onto corrugated cartons, labels, and fibrous packaging materials.",
      imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",
      featured: false,
      status: "ACTIVE" as const,
      features: ["Cartridge-based — no daily flushing required", "600 DPI resolution for crisp barcode printing", "Lightweight head for fixed or handheld use", "USB programming for easy date updates"],
      applications: ["Corrugated carton batch coding", "Label and tag date printing", "Warehousing and logistics dispatch coding"],
      specifications: [
        { specification: "Print Resolution", value: "600", unitOrNote: "DPI", sortOrder: 0 },
        { specification: "Print Width", value: "Up to 50", unitOrNote: "mm single head", sortOrder: 1 },
        { specification: "Power", value: "30", unitOrNote: "W", sortOrder: 2 },
      ],
    },
  ];

  // Get category ID map
  const categories = await prisma.category.findMany({ select: { id: true, slug: true } });
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  for (const product of products) {
    const { features, applications, specifications, categorySlug, ...productData } = product;
    const categoryId = catMap[categorySlug];
    if (!categoryId) {
      console.warn(`⚠ No category found for slug: ${categorySlug}`);
      continue;
    }

    const images = productData.imageUrl ? [productData.imageUrl] : [];
    const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
    if (existing) {
      await prisma.product.update({
        where: { slug: product.slug },
        data: { ...productData, images, categoryId },
      });
    } else {
      await prisma.product.create({
        data: {
          ...productData,
          images,
          categoryId,
          features: {
            createMany: {
              data: features.map((f, i) => ({ feature: f, sortOrder: i })),
            },
          },
          applications: {
            createMany: {
              data: applications.map((a, i) => ({ application: a, sortOrder: i })),
            },
          },
          specifications: {
            createMany: { data: specifications },
          },
        },
      });
    }
  }
  console.log(`✓ ${products.length} products seeded`);

  // ── Services ──────────────────────────────────────────────────────────────
  const services = [
    {
      name: "Shrink Tunnel Packaging Machine Repairing Service",
      slug: "shrink-tunnel-packaging-machine-repair",
      shortDescription: "On-site and in-factory repair service for shrink tunnel packaging machines — covering heating elements, conveyor belts, and motor failures.",
      description: "SP Solutions provides comprehensive repair and maintenance services for all makes and models of shrink tunnel packaging machines. Our certified technicians handle heating element replacement, thermocouple calibration, conveyor belt wear, motor and drive failures, temperature controller faults, and frame damage.",
      imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
      featured: true,
      sortOrder: 1,
      status: "ACTIVE" as const,
    },
    {
      name: "Shrink Tunnel Repairing Service",
      slug: "shrink-tunnel-repair",
      shortDescription: "Specialised shrink tunnel repairing for temperature instability, uneven shrink, and conveyor belt issues.",
      description: "Our shrink tunnel repairing service addresses the most common failure modes — uneven temperature distribution, conveyor belt slippage, damaged heating elements, and blown thermal fuses.",
      imageUrl: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
      featured: false,
      sortOrder: 2,
      status: "ACTIVE" as const,
    },
    {
      name: "Strapping Machine Repair Service",
      slug: "strapping-machine-repair",
      shortDescription: "Professional strapping machine repair service covering tension faults, sealing head failures, and arch jamming issues.",
      description: "SP Solutions' strapping machine repair service covers semi-automatic and fully automatic PP and PET strapping machines from all major manufacturers.",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
      featured: true,
      sortOrder: 3,
      status: "ACTIVE" as const,
    },
    {
      name: "Packaging Machine Repair Service",
      slug: "packaging-machine-repair",
      shortDescription: "General packaging machine repair service for flow wrappers, case packers, coding systems, and end-of-line equipment.",
      description: "Our general packaging machine repair service covers the full range of end-of-line and primary packaging equipment — flow wrappers, L-sealers, case packers, taping machines, metal detectors, and coding systems.",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      featured: true,
      sortOrder: 4,
      status: "ACTIVE" as const,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: { name: service.name, shortDescription: service.shortDescription, description: service.description, featured: service.featured, sortOrder: service.sortOrder },
      create: service,
    });
  }
  console.log(`✓ ${services.length} services seeded`);

  console.log("\n✅ Seed complete!");
  console.log("   Admin login: admin@spsolutionsc.com / Admin@123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
