/**
 * populate-catalogue.mjs
 * Fills every row in the single "Catalogue" sheet with:
 *   - Full descriptions and short descriptions
 *   - Real Unsplash image URLs (royalty-free, no login needed)
 *   - Features, applications, specifications (denormalised pipe-strings)
 * Run: node scripts/populate-catalogue.mjs
 */

import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const XLSX_PATH = path.join(__dirname, "../public/data/products.xlsx");

// ── Unsplash image URLs (stable direct photo links) ───────────────────────────
// All use ?auto=format&fit=crop&w=900&q=80 for consistent sizing

const IMG = {
  // ── Categories ──
  "shrink-packaging":           "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
  "flow-wrapping":              "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80",
  "inspection-metal-detection": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  "end-line-packaging":         "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
  "printing-coding-systems":    "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",

  // ── Machines ──
  "M001": "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
  "M002": "https://images.unsplash.com/photo-1530037335614-e68828dcf258?auto=format&fit=crop&w=900&q=80",
  "M003": "https://images.unsplash.com/photo-1716191300020-b52dec5b70a8?auto=format&fit=crop&w=900&q=80",
  "M004": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
  "M005": "https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&w=900&q=80",
  "M006": "https://images.unsplash.com/photo-1780145180040-0beda1df60e6?auto=format&fit=crop&w=900&q=80",
  "M007": "https://images.unsplash.com/photo-1564939558297-fc396f18e5c7?auto=format&fit=crop&w=900&q=80",
  "M008": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80",
  "M009": "https://images.unsplash.com/photo-1610439204403-7f0f9f7e1a48?auto=format&fit=crop&w=900&q=80",
  "M010": "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
  "M011": "https://images.unsplash.com/photo-1764745021344-317b80f09e40?auto=format&fit=crop&w=900&q=80",
  "M012": "https://images.unsplash.com/photo-1569466441685-19dc36f47da5?auto=format&fit=crop&w=900&q=80",
  "M013": "https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=900&q=80",
  "M014": "https://images.unsplash.com/photo-1603792907191-89e55f70099a?auto=format&fit=crop&w=900&q=80",
  "M015": "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=80",
  "M016": "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
  "M017": "https://images.unsplash.com/photo-1565793979688-7c6be9f8a2b1?auto=format&fit=crop&w=900&q=80",
  "M018": "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80",

  // ── Services ──
  "S001": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
  "S002": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
  "S003": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  "S004": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",

  // ── Consumables / Spares ──
  "C001": "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
  "C002": "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
  "C003": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  "C004": "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80",
  "C005": "https://images.unsplash.com/photo-1651525670033-279c26cc2347?auto=format&fit=crop&w=900&q=80",
  "C006": "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?auto=format&fit=crop&w=900&q=80",
};

// ── Full catalogue data ───────────────────────────────────────────────────────

const DATA = {
  // ━━━━━━━━━━━━━━━━ CATEGORIES ━━━━━━━━━━━━━━━━
  "shrink-packaging": {
    description: "SP Solutions' shrink packaging range covers manual, semi-automatic, and fully automatic L-sealer machines paired with shrink tunnels and chamber systems. Designed for retailers, pharmaceutical companies, and food processors who need tamper-evident, professional shrink-wrapped packs at any volume.",
    short_description: "Shrink wrapping and sealing solutions for retail, pharma, and food processing — from manual sealers to full-auto shrink tunnel lines.",
  },
  "flow-wrapping": {
    description: "Our flow wrapping machines deliver high-speed pillow-pack sealing for biscuits, soap bars, confectionery, and a wide range of consumer goods. Both top-film and bottom-film configurations are available for seamless integration into existing production lines.",
    short_description: "High-speed horizontal flow wrappers for food, pharma, and consumer goods — top-film and bottom-film configurations.",
  },
  "inspection-metal-detection": {
    description: "Food-grade and pharmaceutical-grade metal detection systems that protect your brand and comply with HACCP, BRC, and IFS standards. Available in analogue and digital versions with adjustable sensitivity for ferrous, non-ferrous, and stainless steel contaminants.",
    short_description: "In-line metal detectors for HACCP-compliant food and pharma production. Detects ferrous, non-ferrous, and stainless steel.",
  },
  "end-line-packaging": {
    description: "Complete end-of-line solutions from SP Solutions — case packers, stretch wrappers, semi-auto and fully automatic strapping machines, and taping machines. Engineered to handle high-volume carton sealing, palletising, and secure load stabilisation for logistics and warehousing.",
    short_description: "End-of-line machinery for carton sealing, palletising, and load stabilisation — strapping, taping, case packing, and stretch wrapping.",
  },
  "printing-coding-systems": {
    description: "Comprehensive batch coding and product marking solutions including hand printers, continuous ink-jet (CIJ), thermal transfer overprint (TTO), and thermal ink-jet (TIJ) printers. Print manufacturing dates, batch codes, MRP, and traceability data onto any surface.",
    short_description: "Batch coding and date marking systems — CIJ, TTO, TIJ, and hand printers for complete traceability on any surface.",
  },

  // ━━━━━━━━━━━━━━━━ MACHINES ━━━━━━━━━━━━━━━━

  "M001": {
    short_description: "Entry-level manual L-sealer for low-volume shrink packaging of retail products, gift items, and boxed goods.",
    description: "The SP Solutions Manual L Sealer Machine is designed for businesses that require a reliable, operator-driven shrink sealing solution. The L-shaped sealing bar seals two sides of the product simultaneously, creating a tight, professional package when passed through a shrink tunnel. Ideal for pharmacy, cosmetics, toy shops, and retail stores handling varied product sizes.",
    featured: "FALSE",
    applications: "Retail product packaging|Pharmaceutical packaging|Gift and toy wrapping|Boxed goods sealing|CD and DVD packaging",
    features: "L-shaped dual seal bar for two-side sealing|Compatible with POF and PVC shrink film|Adjustable seal bar temperature|Low maintenance design|Compact footprint for small workspaces|Manual operation for full operator control",
    specifications: "Seal Bar Length:500mm|Film Compatibility:POF / PVC|Power:500W|Voltage:220V 50Hz|Weight:12kg",
  },
  "M002": {
    short_description: "Compact chamber-type shrink packer for batch shrink wrapping of small items — ideal for gift sets, pharma blisters, and bundled packs.",
    description: "The Shrink Chamber Machine from SP Solutions is a compact, all-in-one chamber-type shrink packaging unit that simultaneously seals and shrinks the product within an enclosed heated chamber. Unlike L-sealers with separate tunnels, the chamber machine completes the entire cycle in one step, making it ideal for short-run production of gift sets, pharmaceutical blisters, and consumer product bundles. Widely used in rentals for seasonal and promotional packaging.",
    featured: "FALSE",
    applications: "Gift set packaging|Pharmaceutical blister packing|Promotional bundle wrapping|Stationary and office supply packaging|Toy and craft packaging",
    features: "Integrated seal and shrink in single chamber|Digital temperature controller|Adjustable timer for consistent results|Compact and portable design|Works with POF and PVC shrink film",
    specifications: "Chamber Size:450×450×200mm|Voltage:220V 50Hz|Power:1.35kW|Capacity:10–15 packs/min|Weight:18kg",
  },
  "M003": {
    short_description: "Semi-automatic shrink wrap system for medium-volume packaging lines — fast, consistent sealing with minimal operator effort.",
    description: "The SP Solutions Semi Automatic Shrink Wrap Machine combines a foot-pedal-operated L-sealer with a conveyor-fed shrink tunnel, giving mid-volume packaging operations the speed of automation with the flexibility of manual feeding. A single operator can wrap and shrink up to 25 packs per minute. Suitable for food, beverages, hardware, and pharmaceutical distribution centres.",
    featured: "FALSE",
    applications: "Food and beverage packing|Hardware and industrial parts packaging|Pharmaceutical secondary packaging|Multi-pack bundling|Retail distribution packaging",
    features: "Foot-pedal sealing for hands-free film handling|Integrated conveyor shrink tunnel|Adjustable conveyor speed|Digital temperature control on tunnel|Film centre-fold or roll compatibility|Stainless steel construction on food contact areas",
    specifications: "Seal Bar Length:600mm|Tunnel Belt Width:500mm|Voltage:220V 50Hz|Power:2.8kW|Speed:Up to 25 packs/min|Weight:68kg",
  },
  "M004": {
    short_description: "Fully automatic L-sealer for high-speed shrink wrapping on continuous production lines — no operator sealing required.",
    description: "The Auto L Sealer Machine from SP Solutions is a fully automated, motorised sealing system that integrates with a downstream shrink tunnel to deliver continuous, high-speed shrink packaging without manual intervention. Products are conveyed through the sealing station automatically, making it ideal for high-volume FMCG, food processing, and pharmaceutical factories that require consistent output at 40–60 packs per minute.",
    featured: "FALSE",
    applications: "FMCG high-volume packaging|Food processing lines|Pharmaceutical secondary packaging|Beverage and water bottle bundling|Automotive parts packaging",
    features: "Fully motorised automatic sealing cycle|PLC-controlled operation with touchscreen HMI|Servo-driven film feed for minimal wastage|Side-sealing and bottom-sealing capability|Safety guards and emergency stop|Easy film threading mechanism",
    specifications: "Seal Bar Length:700mm|Voltage:380V 3-phase / 220V 50Hz|Power:4.5kW|Speed:40–60 packs/min|Film Thickness:12–25 microns|Weight:150kg",
  },
  "M005": {
    short_description: "Industrial shrink tunnel for tight, glass-clear shrink film finishing — partners with any L-sealer for a complete packaging line.",
    description: "The SP Solutions Shrink Tunnel Machine is a stainless-steel conveyor tunnel that uses calibrated hot-air circulation to shrink POF or PVC film around products sealed by an L-sealer or flow wrapper upstream. Variable temperature and conveyor speed controls ensure a wrinkle-free, crystal-clear shrink finish on products of any shape. Available in multiple belt widths to suit line requirements.",
    featured: "TRUE",
    applications: "Post-sealing shrink finishing|Beverage multi-pack wrapping|Cosmetic and pharma presentation packs|Retail-ready product sealing|Industrial parts protection",
    features: "Stainless steel housing for food-grade applications|Adjustable hot-air temperature (50–200°C)|Variable conveyor speed control|Even heat distribution for consistent shrink|Energy-efficient insulated chamber|Compatible with all L-sealers and flow wrappers",
    specifications: "Tunnel Opening:W600×H300mm|Conveyor Width:550mm|Temperature Range:50–200°C|Voltage:220V / 380V 50Hz|Power:4.0kW|Speed:0–15m/min",
  },
  "M006": {
    short_description: "Top-film horizontal flow wrapper for high-speed pillow-pack sealing of biscuits, chocolates, and bar-shaped products.",
    description: "The Top Film Flow Wrapper from SP Solutions is a horizontal form-fill-seal machine that feeds film from the top of the machine, wraps it around the product, and creates a pillow-pack seal at the front and back. It is designed for confectionery, bakery, and personal care product manufacturers requiring consistent, airtight packaging at speeds of up to 150 packs per minute. A robust servo-drive system ensures accurate film tracking and minimal waste.",
    featured: "FALSE",
    applications: "Biscuit and cookie packaging|Chocolate and candy bar wrapping|Soap and personal care bar packing|Bread and bakery product wrapping|Pharmaceutical tablet strip packaging",
    features: "Servo-driven film feed for precision tracking|Top-film reel configuration for easy loading|Digital temperature controller for fin and end seals|Adjustable jaw speed for varied product sizes|Stainless steel product contact parts|Automatic film splicing capability",
    specifications: "Max Pack Length:400mm|Max Pack Width:200mm|Speed:Up to 150 packs/min|Film Width:100–450mm|Voltage:380V 3-phase|Power:3.0kW",
  },
  "M007": {
    short_description: "Bottom-film flow wrapper delivering stronger back seals — ideal for heavier or irregularly shaped products.",
    description: "The Bottom Film Flow Wrapper from SP Solutions uses a film reel mounted below the machine, forming a tube from the bottom that provides a stronger and flatter back seal compared to top-film designs. This makes it ideal for heavier products like canned goods, hardware, and auto parts, as well as irregularly shaped products that benefit from a more stable bottom-seating during the sealing process.",
    featured: "FALSE",
    applications: "Heavy consumer goods packaging|Hardware and auto parts wrapping|Fresh produce and vegetables|Cheese and deli product sealing|Industrial component bundling",
    features: "Bottom-film reel for strong fin-seal base|Heavy-duty conveyor for stable product transport|PLC controller with recipe memory|Fin-seal and lap-seal options|Quick changeover for different product sizes|Safety interlocked covers",
    specifications: "Max Pack Length:500mm|Max Pack Width:250mm|Speed:Up to 100 packs/min|Film Width:150–550mm|Voltage:380V 3-phase|Power:3.5kW",
  },
  "M008": {
    short_description: "High-sensitivity digital metal detector for in-line contamination detection in food, pharma, and FMCG production.",
    description: "The SP Solutions Digital Metal Detector uses advanced digital signal processing (DSP) to achieve superior sensitivity for detecting ferrous, non-ferrous, and stainless steel metal contaminants in packaged and unpackaged products. The digital control panel offers multi-product recipe storage, automatic sensitivity calibration, and real-time rejection reporting — making compliance with HACCP, BRC, and IFS standards straightforward. Available in aperture widths from 150mm to 600mm.",
    featured: "TRUE",
    applications: "Food processing line inspection|Pharmaceutical contamination control|FMCG quality assurance|Pet food safety inspection|Bakery and confectionery lines",
    features: "DSP-based digital detection for high sensitivity|Detects ferrous, non-ferrous, and stainless steel|Multi-product recipe memory (up to 100 products)|Auto-reject mechanism (air-blast or flap)|IP65 wash-down rated housing|HACCP, BRC, and IFS compliant|RS232/RS485 data output for production reporting",
    specifications: "Aperture Width:150–600mm (configurable)|Sensitivity - Fe:0.5mm sphere|Sensitivity - Non-Fe:0.6mm sphere|Sensitivity - SS:1.0mm sphere|Voltage:220V 50Hz|IP Rating:IP65",
  },
  "M009": {
    short_description: "Analogue in-line metal detector for reliable contamination protection in standard food and packaging applications.",
    description: "The SP Solutions Metal Detector is a reliable analogue-based inline inspection system for detecting metallic contaminants in products moving on a conveyor. Simpler to operate than digital models, it offers excellent value for small to medium manufacturers who need HACCP-compliant metal detection without complex recipe management. Suitable for loose bulk products as well as packaged goods.",
    featured: "FALSE",
    applications: "General food packaging inspection|Snack and dry goods contamination control|Pharmaceutical secondary packaging|Textile and garment needle detection|Chemical and FMCG goods inspection",
    features: "Balanced coil detection technology|Analogue sensitivity control|Auto-rejection conveyor with buzzer alarm|Stainless steel housing|Simple one-knob calibration|Low power consumption",
    specifications: "Aperture Width:200–500mm (configurable)|Sensitivity - Fe:0.8mm|Sensitivity - Non-Fe:1.0mm|Sensitivity - SS:1.5mm|Voltage:220V 50Hz",
  },
  "M010": {
    short_description: "Automatic or semi-automatic case packer for high-speed carton erecting, loading, and sealing at end-of-line.",
    description: "The SP Solutions Case Packer automates the erecting, filling, and sealing of corrugated cartons at the end of the production line. It significantly reduces manual labour in palletising operations and ensures consistent carton fill weight and seal integrity. Available in drop-packer, wrap-around, and side-load configurations to match your product type and line layout.",
    featured: "FALSE",
    applications: "Beverage and bottled water case packing|Pouch and sachet carton loading|Can and jar case erecting|Snack food end-of-line packing|Pharmaceutical carton sealing",
    features: "Automatic carton erecting and sealing|Hot melt glue or tape sealing options|PLC controller with touchscreen|Adjustable for multiple carton sizes|Safety guarding with interlocked access|Integrated conveyor discharge",
    specifications: "Case Size Range:W200–600×L200–800×H150–500mm|Speed:Up to 20 cases/min|Voltage:380V 3-phase|Power:4.0kW|Weight:450kg",
  },
  "M011": {
    short_description: "Rotary arm or turntable stretch wrapper for securing pallet loads with LLDPE stretch film — essential for logistics and warehousing.",
    description: "The SP Solutions Stretch Wrapper applies LLDPE stretch film around palletised loads to stabilise and protect products during transport and storage. The turntable model suits most warehouse and distribution operations, while the rotary arm model handles unstable or very heavy loads. Variable stretch ratio settings optimise film usage and ensure consistent load containment force.",
    featured: "FALSE",
    applications: "Pallet load stabilisation for logistics|Warehouse dispatch wrapping|Export packaging and containment|Cold chain palletising|Pharmaceutical and food pallet wrapping",
    features: "Turntable and rotary-arm options|Variable film stretch ratio (0–300%)|Adjustable wrap cycle: top sheet, ramp, and column modes|Pre-stretch carriage for 200–300% film elongation|Auto-cut and wipe film tail|Safety sensor for obstacle detection",
    specifications: "Turntable Diameter:1500mm|Max Load Height:2400mm|Max Pallet Weight:2000kg|Film Roll Width:500mm|Voltage:380V 3-phase|Power:2.2kW",
  },
  "M012": {
    short_description: "Semi-automatic strapping machine for PP and PET strap bundling of cartons, boxes, and pallets — fast and operator-assisted.",
    description: "The SP Solutions Semi Automatic Strapping Machine feeds, tensions, seals, and cuts PP or PET strapping around cartons and pallet loads with a single foot-pedal press. It dramatically reduces strapping time compared to manual methods, producing consistent strap tension and a strong heat-weld or friction-weld seal. Widely used in printing, packaging, textile, and logistics industries.",
    featured: "FALSE",
    applications: "Carton bundling and reinforcement|Newspaper and magazine bundle strapping|Textile bale strapping|Pallet pre-strapping|Printing and publishing house dispatch",
    features: "Foot-pedal operation for hands-free strapping|Adjustable strap tension dial|Heat-seal or friction-seal options|Strap width: 9–15.5mm PP|Table-top or arch frame options|Digital tension display",
    specifications: "Strap Width:9–15.5mm|Strap Thickness:0.5–0.9mm|Strap Material:PP / PET|Arch Size:560×450mm|Tension Range:5–50kg|Voltage:220V 50Hz|Power:550W",
  },
  "M013": {
    short_description: "Fully automatic strapping machine for continuous high-speed carton and pallet strapping on conveyor lines.",
    description: "The SP Solutions Automatic Strapping Machine is a conveyor-integrated, fully automated PP strapping system that automatically detects, positions, feeds, tensions, seals, and cuts strapping around cartons — without any operator intervention. With strap speeds of up to 80 straps per minute, it is engineered for high-volume dispatch operations in FMCG, beverage, and pharmaceutical facilities.",
    featured: "TRUE",
    applications: "High-volume carton dispatch strapping|FMCG distribution centre operations|Pharmaceutical secondary packaging|Beverage case strapping|E-commerce fulfilment centre bundling",
    features: "Fully automatic strap feeding and sealing|PLC-controlled with touchscreen HMI|Conveyor-integrated with external trigger|Adjustable strap tension and cycle time|Low strap alert and automatic thread|Compact footprint for tight line layouts",
    specifications: "Strap Width:12–19mm|Arch Size:850×600mm (configurable)|Speed:Up to 80 straps/min|Voltage:220V 50Hz / 380V|Power:1.1kW|Weight:180kg",
  },
  "M014": {
    short_description: "Semi-automatic carton taping machine for consistent top-and-bottom sealing of standard and non-standard carton sizes.",
    description: "The SP Solutions Semi Automatic Taping Machine seals the top and bottom flaps of corrugated cartons with BOPP self-adhesive tape in a single pass. The operator simply places the carton at the entrance, and the machine's conveyor and pressure rollers guide it through for sealed dispatch. Adjustable for carton heights from 150mm to 500mm, making it compatible with virtually all standard carton sizes.",
    featured: "FALSE",
    applications: "Carton top-and-bottom tape sealing|E-commerce parcel sealing|Pharmaceutical carton dispatch|FMCG distribution centre sealing|Grocery and food carton closure",
    features: "Top and bottom simultaneous taping|Adjustable height for varied carton sizes|Self-adhesive BOPP tape compatible|Heavy-duty frame and conveyor|Ergonomic operator height|Quick tape roll changeover",
    specifications: "Carton Width:180–500mm|Carton Height:150–500mm|Carton Length:200–600mm|Tape Width:48–75mm|Speed:Up to 20 cartons/min|Voltage:220V 50Hz|Power:370W",
  },
  "M015": {
    short_description: "Manual hand printer for ink-based batch code and date marking directly on cartons, bags, and packaging surfaces.",
    description: "The SP Solutions Hand Printer is a manual, handheld batch coding device that uses a raised rubber type die and fast-drying ink to stamp manufacturing dates, batch codes, MRP prices, and shift codes directly onto cartons, pouches, PE bags, and corrugated boxes. Simple, low-cost, and maintenance-free, it is the standard tool for small manufacturers and warehouse operations requiring basic product traceability.",
    featured: "FALSE",
    applications: "Carton batch code stamping|Pouch and bag date printing|MRP and shift code marking|Small batch pharmaceutical coding|Agricultural and grain bag marking",
    features: "Adjustable die plate for date and code customisation|Quick-dry ink for porous and non-porous surfaces|Lightweight and ergonomic handle|Re-inkable stamp pad|No power required|Suitable for high-speed handheld marking",
    specifications: "Print Area:40×20mm (standard)|Ink Type:Oil / water-based (food-safe available)|Characters:Interchangeable type set|Weight:0.3kg",
  },
  "M016": {
    short_description: "Non-contact continuous inkjet printer for high-speed date, batch, and QR code marking on any packaging surface.",
    description: "The SP Solutions Continuous Ink Jet (CIJ) Printer is an industrial non-contact coding system that prints on products and packaging moving at high speed without the print head touching the surface. Using electrically charged ink droplets, it marks date codes, batch numbers, barcodes, QR codes, and logos on glass, plastic, metal, cartons, and flexible packaging. With a print speed of over 500 characters per second, it integrates seamlessly with high-speed production lines.",
    featured: "TRUE",
    applications: "Beverage bottle date coding|Dairy product batch marking|Pharmaceutical expiry date printing|Confectionery wrapper coding|Industrial component serial marking",
    features: "Non-contact printing — no surface wear|Print speed >500 characters/second|Multiple font sizes and barcodes|Auto-clean print head on startup|MEK-free and acetone-free ink options|Ethernet and USB data interface|IP55-rated for production environments",
    specifications: "Print Speed:Up to 500 char/sec|Print Resolution:Up to 128×128 DPI|Ink Colour:Black, Red, White, Yellow|Line Speed:Up to 10m/sec|Voltage:220V 50Hz|Power:100W|IP Rating:IP55",
  },
  "M017": {
    short_description: "Thermal Transfer Overprinter for crisp, durable batch code and date printing on flexible film packaging.",
    description: "The SP Solutions TTO (Thermal Transfer Overprinter) is a high-resolution, ribbon-based printing system designed to be integrated directly into flow wrappers, VFFS machines, and pouch-filling lines. It prints sharp, permanent, solvent-free codes — including text, logos, barcodes, and 2D codes — directly onto flexible film in real time. With print resolution of up to 300 DPI, TTO is the choice for premium brand presentation and regulatory compliance on flexible packaging.",
    featured: "FALSE",
    applications: "Flow wrapper film date coding|VFFS pouch marking|Stand-up pouch and label printing|Pharmaceutical blister foil coding|Confectionery and snack film marking",
    features: "300 DPI high-resolution printing|Ribbon save mode for reduced consumable cost|Colour touchscreen HMI with recipe management|Automatic ribbon end and jam detection|Compatible with all major flow wrapper brands|No solvents or VOC emissions",
    specifications: "Print Resolution:300 DPI|Max Print Width:110mm|Print Speed:Up to 600mm/sec|Ribbon Width:33–110mm|Interface:USB / RS232 / Ethernet|Voltage:220V 50Hz|Power:150W",
  },
  "M018": {
    short_description: "Thermal Inkjet printer for versatile, maintenance-free batch coding on cartons, labels, and absorbent surfaces.",
    description: "The SP Solutions TIJ (Thermal Inkjet) Printer is a compact, cartridge-based printing system for marking batch codes, dates, lot numbers, and barcodes onto corrugated cartons, labels, and fibrous packaging materials. Unlike CIJ printers, TIJ systems use replaceable ink cartridges, require no daily maintenance, and produce clean, solvent-free prints. Ideal for operations that code directly on cartons before dispatch.",
    featured: "FALSE",
    applications: "Corrugated carton batch coding|Label and tag date printing|Warehousing and logistics dispatch coding|Agricultural product sack marking|Chemical drum and container coding",
    features: "Cartridge-based — no daily flushing required|600 DPI resolution for crisp barcode printing|Multiple colour ink options|Lightweight head for fixed or handheld use|USB programming for easy date updates|Compatible with water-based and MEK-based inks",
    specifications: "Print Resolution:600 DPI|Print Width:Up to 50mm (single head)|Print Speed:Up to 500mm/sec|Ink Cartridge Life:~3 million characters|Voltage:220V 50Hz|Power:30W",
  },

  // ━━━━━━━━━━━━━━━━ SERVICES ━━━━━━━━━━━━━━━━

  "S001": {
    short_description: "On-site and in-factory repair service for shrink tunnel packaging machines — covering heating elements, conveyor belts, and motor failures.",
    description: "SP Solutions provides comprehensive repair and maintenance services for all makes and models of shrink tunnel packaging machines. Our certified technicians handle heating element replacement, thermocouple calibration, conveyor belt wear, motor and drive failures, temperature controller faults, and frame damage. We offer on-site breakdown support across Chennai and Tamil Nadu, and in-factory major overhaul services at our facility in Padi, Chennai.",
    featured: "TRUE",
  },
  "S002": {
    short_description: "Specialised shrink tunnel repairing for temperature instability, uneven shrink, and conveyor belt issues.",
    description: "Our shrink tunnel repairing service addresses the most common failure modes — uneven temperature distribution, conveyor belt slippage, damaged heating elements, and blown thermal fuses. SP Solutions carries a comprehensive stock of shrink tunnel spare parts for major brands. Turnaround time for standard repairs is 24–48 hours, with emergency same-day service available for production-critical breakdowns.",
    featured: "FALSE",
  },
  "S003": {
    short_description: "Professional strapping machine repair service covering tension faults, sealing head failures, and arch jamming issues.",
    description: "SP Solutions' strapping machine repair service covers semi-automatic and fully automatic PP and PET strapping machines from all major manufacturers. Common issues addressed include strap feed jams, sealing head wear, tension board failure, motor burnout, and frame misalignment. Our engineers carry a complete spares inventory for fast turnaround, minimising production line downtime.",
    featured: "TRUE",
  },
  "S004": {
    short_description: "General packaging machine repair service for flow wrappers, case packers, coding systems, and end-of-line equipment.",
    description: "Our general packaging machine repair service covers the full range of end-of-line and primary packaging equipment — flow wrappers, L-sealers, case packers, taping machines, metal detectors, and coding systems. SP Solutions technicians are trained to diagnose electrical, mechanical, and pneumatic faults across all machine types. Annual maintenance contracts (AMC) are also available for scheduled preventive maintenance.",
    featured: "TRUE",
  },

  // ━━━━━━━━━━━━━━━━ CONSUMABLES / SPARES ━━━━━━━━━━━━━━━━

  "C001": {
    short_description: "Original and compatible printer inks and solvents for CIJ coding machines — fast-dry, high-adhesion formulations.",
    description: "SP Solutions stocks a complete range of CIJ printer inks and solvents compatible with major inkjet printer brands. Our inks are available in black, red, and white in standard, food-grade, and UV-resistant formulations. Matching solvents ensure consistent ink viscosity and print quality. We also offer MEK-free and acetone-free ink options for food-contact and pharmaceutical applications.",
  },
  "C002": {
    short_description: "TTO ribbons, TIJ cartridges, and CIJ ink supplies for all major coding and marking systems.",
    description: "We supply a comprehensive range of printer consumables including thermal transfer overprint (TTO) ribbons, thermal inkjet (TIJ) cartridges, and CIJ inks and solvents. All consumables are tested for compatibility with major OEM systems. Bulk supply contracts are available for high-volume users, with guaranteed lead times and consistent quality.",
  },
  "C003": {
    short_description: "Genuine and compatible spare parts for CIJ, TTO, and TIJ printers — nozzles, filters, and print heads.",
    description: "SP Solutions carries a comprehensive inventory of printer spare parts including CIJ nozzle assemblies, filter cartridges, solenoid valves, print head modules, and TTO ribbon motors. All parts are sourced from OEM or certified compatible suppliers, ensuring reliable performance and extended machine life.",
  },
  "C004": {
    short_description: "Genuine and compatible spare parts for packaging machines — sealing elements, conveyor belts, and drive components.",
    description: "We supply a wide range of spare parts for packaging machinery including L-sealer heating elements, Teflon sealing tape, conveyor belts, drive motors, temperature controllers, thermocouples, and strapping machine sealing heads. All parts are stocked in Chennai for fast delivery across India.",
  },
  "C005": {
    short_description: "POF shrink film rolls and pre-formed shrink pouches — crystal-clear with excellent seal strength.",
    description: "SP Solutions supplies premium Polyolefin (POF) shrink film in centrefold rolls for use with L-sealers and flow wrappers, as well as pre-formed shrink bags and pouches for chamber machines. POF film offers superior clarity, puncture resistance, and tamper evidence. Available in 12–25 micron thicknesses and custom widths from 150mm to 600mm.",
  },
  "C006": {
    short_description: "TTO ribbons, TIJ cartridges, and labelling consumables for all printing and coding applications.",
    description: "Our range of printer cartridges and coding consumables covers TTO resin ribbons (for flexible film), TIJ thermal cartridges (for carton coding), and inkjet inks for CIJ machines. All consumables are tested for compatibility with major brands. We also supply self-adhesive label rolls, BOPP taping, and stencil inks for hand printers.",
  },
};

// ── Read current workbook ─────────────────────────────────────────────────────
const wb    = XLSX.readFile(XLSX_PATH);
const rows  = XLSX.utils.sheet_to_json(wb.Sheets["Catalogue"]);

// ── Merge data into rows ──────────────────────────────────────────────────────
const updated = rows.map((row) => {
  const key = row.id;
  const patch = DATA[key] ?? {};

  return {
    ...row,
    // Image — always use Unsplash URL
    image: IMG[key] ?? row.image ?? "",
    // Text fields — fill if missing or if patch provides an override
    short_description: patch.short_description ?? row.short_description ?? "",
    description:       patch.description       ?? row.description       ?? "",
    featured:          patch.featured          ?? row.featured          ?? "FALSE",
    // Pipe-string fields — fill if patch provides them and row doesn't already have content
    applications:   patch.applications  ?? row.applications  ?? "",
    features:       patch.features      ?? row.features      ?? "",
    specifications: patch.specifications ?? row.specifications ?? "",
  };
});

// ── Write back ────────────────────────────────────────────────────────────────
const newWb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(newWb, XLSX.utils.json_to_sheet(updated), "Catalogue");
XLSX.writeFile(newWb, XLSX_PATH);

console.log(`✓  Populated ${updated.length} rows in "Catalogue" sheet`);
for (const r of updated) {
  const img = r.image ? "✓img" : "✗img";
  const desc = r.description ? "✓desc" : "✗desc";
  console.log(`  [${r.type.padEnd(11)}] ${String(r.id).padEnd(25)} ${img} ${desc}`);
}
