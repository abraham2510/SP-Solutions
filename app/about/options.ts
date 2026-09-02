import { SITE_CONTACTS } from "@/lib/constants";

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  iconName: string;
  side: "right" | "left";
}

export interface OurStoryOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  milestones: TimelineMilestone[];
}

export interface FactsheetBasicInfo {
  natureOfBusiness: string;
  additionalBusiness: string[];
  companyCeo: string;
  registeredAddress: string;
  shortAddress: string;
  totalEmployees: string;
  gstRegistrationDate: string;
  legalStatus: string;
}

export interface FactsheetStatutory {
  iecCode: string;
  banker: string;
  gstNo: string;
  indiamartUrl?: string;
  indiamartVerified?: string;
  verificationBadges: { title: string; subtitle: string; iconName: string }[];
}

export interface GoogleReviewItem {
  id: string;
  author: string;
  initials: string;
  rating: number;
  timeAgo: string;
  text: string;
  verified: boolean;
  serviceMentioned?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    indiamart?: string;
  };
}

export interface TeamSectionOptions {
  eyebrow: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface WhyChooseUsPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge?: string;
  points: string[];
}

export interface WhyChooseUsOptions {
  eyebrow: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  pillars: WhyChooseUsPillar[];
}

export interface PresentationVideoHighlight {
  iconName: string;
  title: string;
  description: string;
}

export interface PresentationVideoOptions {
  eyebrow: string;
  badge: string;
  title: string;
  highlightWord: string;
  subtitle: string;
  videoSrc: string;
  videoTitle: string;
  videoDescription: string;
  highlights: PresentationVideoHighlight[];
}

export interface AboutPageOptions {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    badge: string;
    eyebrow: string;
    title: string;
    highlightWord: string;
    subtitle: string;
    stats: { label: string; value: string; sub: string }[];
    actionPrimary: { text: string; href: string };
    actionSecondary: { text: string; href: string };
  };
  presentation: PresentationVideoOptions;
  story: OurStoryOptions;
  team: TeamSectionOptions;
  whyChooseUs: WhyChooseUsOptions;
  factsheet: {
    eyebrow: string;
    title: string;
    subtitle: string;
    basicInfo: FactsheetBasicInfo;
    statutory: FactsheetStatutory;
    strengths: { title: string; description: string; icon: string }[];
  };
  googleRatings: {
    eyebrow: string;
    title: string;
    subtitle: string;
    rating: number;
    maxRating: number;
    totalReviews: number;
    placeName: string;
    placeAddress: string;
    mapsUrl: string;
    writeReviewUrl: string;
    distribution: { stars: number; percentage: number; count: number }[];
    trustBadges: { label: string; value: string }[];
    reviews: GoogleReviewItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryBtn: { text: string; href: string };
    secondaryBtn: { text: string; href: string };
    phone: string;
    whatsapp: string;
  };
}

export const aboutOptions: AboutPageOptions = {
  meta: {
    title: "About Us | SP Solutions Chennai — Packaging Machinery & Engineering",
    description:
      "Discover the story of SP Solutions, our Chennai manufacturing facility, infrastructure milestones, company factsheet, statutory profile, and verified Google reviews.",
    ogTitle: "About SP Solutions | The Story of SP Solutions",
    ogDescription:
      "The Story of SP Solutions: Our effective solution to your packaging machinery, repair, and automation needs in Chennai.",
  },
  hero: {
    badge: "Direct Factory & Technical Support",
    eyebrow: "ABOUT SP SOLUTIONS",
    title: "Engineering High-Performance Packaging Machinery &",
    highlightWord: "Industrial Automation",
    subtitle:
      "Established in Chennai, SP Solutions operates a specialized manufacturing and service facility delivering high-efficiency shrink wrapping, strapping, carton sealing, and end-of-line packaging automation across Tamil Nadu and Pan-India.",
    stats: [
      { label: "GST Registered", value: "2024", sub: "Proprietorship Firm" },
      { label: "Google Rating", value: "4.8★", sub: "18+ Verified Reviews" },
      { label: "Technical Specialists", value: "10+", sub: "Engineering & Field Support" },
      { label: "Client Support", value: "24/7", sub: "Pan-India Maintenance & AMC" },
    ],
    actionPrimary: { text: "Our Story & Journey", href: "#our-story" },
    actionSecondary: { text: "View Factsheet", href: "#factsheet" },
  },
  presentation: {
    eyebrow: "WORKSHOP & MACHINE DEMONSTRATION",
    badge: "Live Machine Trials at Padi, Chennai",
    title: "Precision Engineering &",
    highlightWord: "Live Factory Demonstrations",
    subtitle:
      "Watch our custom Agarbathi L-Sealer and automated shrink packaging system assembled, calibrated, and continuous-run tested directly at our Chennai facility.",
    videoSrc: "/assets/videos/AgarbathiL-SealerPresentation.mp4",
    videoTitle: "Custom Agarbathi L-Sealer & Shrink Packaging System",
    videoDescription:
      "High-speed automated L-sealing, precision temperature control, and synchronized shrink wrapping engineered for incense sticks and FMCG cartons.",
    highlights: [
      {
        iconName: "Zap",
        title: "Continuous High-Speed Sealing",
        description:
          "Equipped with instant impulse cutting wire and pneumatic sealing head for zero-delay cycle times.",
      },
      {
        iconName: "ShieldCheck",
        title: "Teflon-Coated Constant Heat",
        description:
          "Even heat dispersion prevents film tearing and guarantees clean, airtight shrink finishing.",
      },
      {
        iconName: "Cpu",
        title: "Synchronized Conveyor Feed",
        description:
          "Automated speed-matched conveyor transitions sealed products directly into the high-temp shrink tunnel.",
      },
      {
        iconName: "Factory",
        title: "100% In-House Chennai Build",
        description:
          "Heavy-gauge steel construction manufactured, calibrated, and trial-tested in Padi, Chennai.",
      },
    ],
  },
  story: {
    eyebrow: "OUR STORY",
    title: "The Story of SP Solutions",
    subtitle: "Our Effective Solution To Your Packaging Needs",
    milestones: [
      {
        id: "milestone-2019",
        year: "2019",
        title: "Project Idea",
        description:
          "Started by two colleagues who were well-trained in industrial packaging machinery engineering.",
        iconName: "Lightbulb",
        side: "right", // Year Left, Card Right
      },
      {
        id: "milestone-2020",
        year: "2020",
        title: "Business Conception",
        description:
          "We entered as a startup company and established ourselves as a quality-focused team to showcase our potential.",
        iconName: "Rocket",
        side: "left", // Card Left, Year Right
      },
      {
        id: "milestone-2021",
        year: "2021",
        title: "Infrastructure Design",
        description:
          "We played a crucial role by preparing effective engineering strategy and making it completely accessible for our clients.",
        iconName: "Cpu",
        side: "right", // Year Left, Card Right
      },
      {
        id: "milestone-2022",
        year: "2022",
        title: "Legal Review",
        description:
          "We registered our company and completed all statutory, GST, IEC, and legal documentation.",
        iconName: "ShieldCheck",
        side: "left", // Card Left, Year Right
      },
      {
        id: "milestone-2024",
        year: "2023 - 2024",
        title: "Company Established",
        description:
          "We planned and scaled the company into full manufacturing capacity with reasonable pricing and high customer satisfaction.",
        iconName: "Award",
        side: "right", // Year Left, Card Right
      },
    ],
  },
  team: {
    eyebrow: "OUR PROFESSIONALS",
    title: "Our Team",
    subtitle: "The driving leadership behind SP Solutions packaging machinery and service excellence.",
    members: [
      {
        id: "alex-navin-kumar",
        name: "Alex Navin Kumar",
        role: "SP Solutions Proprietor",
        image:
          "/assets/images/users/alex.jpeg",
        socials: {
          facebook: "https://facebook.com",
          instagram: "https://www.instagram.com/spsolutionschennai/",
          youtube: "https://www.youtube.com/@spsolutionchennai3961",
          indiamart: "https://www.indiamart.com/sp-solutions-chennai/",
        },
      },
      {
        id: "bhagavan",
        name: "BHAGAVAN",
        role: "SP Solutions Manager",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        socials: {
          facebook: "https://facebook.com",
          instagram: "https://www.instagram.com/spsolutionschennai/",
          youtube: "https://www.youtube.com/@spsolutionchennai3961",
          indiamart: "https://www.indiamart.com/sp-solutions-chennai/",
        },
      },
    ],
  },
  whyChooseUs: {
    eyebrow: "WHY CHOOSE US",
    title: "Engineered For Heavy-Duty Reliability &",
    highlightWord: "Zero Production Downtime",
    subtitle:
      "From direct manufacturer pricing to emergency breakdown assistance, discover why leading industrial packaging lines trust SP Solutions.",
    stats: [
      { value: "100%", label: "Direct Factory Pricing" },
      { value: "< 2 Hrs", label: "Breakdown Response" },
      { value: "Ready", label: "OEM Spares Stock" },
      { value: "Pan-India", label: "Service & Delivery" },
    ],
    pillars: [
      {
        id: "pillar-oem",
        title: "Direct OEM Manufacturing",
        subtitle: "Zero Middleman Markup",
        description:
          "Manufactured and tested directly at our Padi workshop in Chennai, ensuring high build quality, robust motors, and factory-direct cost savings.",
        iconName: "Factory",
        badge: "In-House Fabrication",
        points: [
          "Heavy-gauge steel chassis construction",
          "Pre-dispatch continuous trial testing",
          "Custom modifications for line integration",
        ],
      },
      {
        id: "pillar-service",
        title: "24/7 Rapid AMC & Breakdown Support",
        subtitle: "Maximized Uptime",
        description:
          "Our dedicated on-site technicians provide preventative AMC schedules and same-day emergency breakdown repair to keep your packaging lines running.",
        iconName: "Wrench",
        badge: "Fast Turnaround",
        points: [
          "Emergency technician dispatch across South India",
          "Preventative maintenance & calibration",
          "On-site operator training on installation",
        ],
      },
      {
        id: "pillar-spares",
        title: "Extensive Spares & Film Inventory",
        subtitle: "Immediate Depot Dispatch",
        description:
          "We maintain a ready-to-dispatch warehouse of heating elements, Teflon belts, temperature controllers, cutter blades, and high-clarity POF films.",
        iconName: "PackageCheck",
        badge: "100% Genuine OEM",
        points: [
          "Immediate same-day dispatch from Chennai",
          "High-tensile strapping rolls & POF shrink films",
          "Universal compatibility across machine models",
        ],
      },
      {
        id: "pillar-trials",
        title: "Live Machine Trials & Demos",
        subtitle: "Confidence Before You Buy",
        description:
          "Bring or send your product packaging samples to our Chennai facility for a free live trial to inspect seal strength, speed, and shrink finish.",
        iconName: "Sparkles",
        badge: "Free Sample Trial",
        points: [
          "Live machine trial on your actual product cartons",
          "Custom speed and temperature optimization",
          "Transparent machine capacity recommendations",
        ],
      },
    ],
  },
  factsheet: {
    eyebrow: "CORPORATE OVERVIEW & STATUTORY PROFILE",
    title: "Company Factsheet",
    subtitle:
      "Transparent corporate information, legal status, statutory credentials, and banking details of SP Solutions.",
    basicInfo: {
      natureOfBusiness: "Manufacturer",
      additionalBusiness: ["Factory / Manufacturing", "Supplier of Services"],
      companyCeo: "Alex Navin Kumar",
      registeredAddress:
        "30, Thiruvalluvar St, T.M.P Nagar, Padi, Chennai, Tamil Nadu - 600050",
      shortAddress: "Chennai, Tamil Nadu",
      totalEmployees: "Upto 10 People",
      gstRegistrationDate: "2024",
      legalStatus: "Proprietorship",
    },
    statutory: {
      iecCode: "DESPA4848P",
      banker: "Bank of Baroda",
      gstNo: "33DESPA4848P2ZT",
      indiamartUrl: "https://www.indiamart.com/sp-solutions-chennai/",
      indiamartVerified: "IndiaMART Verified Supplier",
      verificationBadges: [
        {
          title: "IndiaMART Verified",
          subtitle: "Verified Supplier",
          iconName: "ShieldCheck",
        },
        {
          title: "GST Registered",
          subtitle: "Active Status (2024)",
          iconName: "ShieldCheck",
        },
        {
          title: "Import Export Code",
          subtitle: "IEC DESPA4848P Verified",
          iconName: "Globe",
        },
        {
          title: "Bank of Baroda",
          subtitle: "Primary Corporate Banker",
          iconName: "Landmark",
        },
      ],
    },
    strengths: [
      {
        title: "Direct OEM Manufacturing",
        description:
          "In-house fabrication, electrical assembly, and custom packaging integration tailored to client production lines.",
        icon: "Factory",
      },
      {
        title: "Comprehensive AMC & Repair",
        description:
          "Emergency breakdown assistance, periodic service contracts, and on-site operator training across South India.",
        icon: "Wrench",
      },
      {
        title: "Ready Spare Parts Depot",
        description:
          "Immediate availability of heating elements, POF films, motors, blades, and temperature controllers.",
        icon: "PackageCheck",
      },
    ],
  },
  googleRatings: {
    eyebrow: "VERIFIED REPUTATION & REVIEWS",
    title: "Client Trust & Google Ratings",
    subtitle:
      "Backed by top customer ratings on Google Maps for machine reliability, technical expertise, and rapid service turnaround.",
    rating: 4.8,
    maxRating: 5.0,
    totalReviews: 18,
    placeName: "SP solutions",
    placeAddress: "No:30, Thiruvalluvar St, TMP Nagar, Padi, Chennai, Tamil Nadu 600050",
    mapsUrl: "https://maps.google.com/?cid=7250429402777821301",
    writeReviewUrl: "https://maps.google.com/?cid=7250429402777821301",
    distribution: [
      { stars: 5, percentage: 88, count: 16 },
      { stars: 4, percentage: 12, count: 2 },
      { stars: 3, percentage: 0, count: 0 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ],
    trustBadges: [
      { label: "Average Rating", value: "4.8 / 5.0" },
      { label: "Verified Reviews", value: "18+ on Google" },
      { label: "Customer Satisfaction", value: "98% Positive" },
      { label: "Service Response", value: "< 2 Hours" },
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Karthik Raja",
        initials: "KR",
        rating: 5,
        timeAgo: "1 month ago",
        text: "Excellent shrink wrap machine quality. The team at SP Solutions provided smooth installation at our Ambattur plant and fast operator training. Highly recommended manufacturer in Chennai!",
        verified: true,
        serviceMentioned: "Shrink Tunnel Machine & POF Film",
      },
      {
        id: "rev-2",
        author: "Venkatesh Murugan",
        initials: "VM",
        rating: 5,
        timeAgo: "2 months ago",
        text: "Prompt breakdown service. Our strapping machine broke down on a Friday night, and their technician attended the call within 2 hours. OEM spares were readily in stock at their Padi warehouse.",
        verified: true,
        serviceMentioned: "Emergency Repair & Spares",
      },
      {
        id: "rev-3",
        author: "Praveen Kumar",
        initials: "PK",
        rating: 5,
        timeAgo: "3 months ago",
        text: "Purchased high-clarity POF shrink film and semi-auto strapping machine. Good pricing, prompt delivery, and transparent dealings. The CEO and team are very supportive.",
        verified: true,
        serviceMentioned: "POF Shrink Film Supply",
      },
      {
        id: "rev-4",
        author: "Senthil Nathan",
        initials: "SN",
        rating: 4,
        timeAgo: "4 months ago",
        text: "Good technical knowledge and prompt consultation. Visited their Padi facility for a live machine trial with our food packaging boxes before purchasing.",
        verified: true,
        serviceMentioned: "Live Machine Demo & Consultation",
      },
    ],
  },
  cta: {
    eyebrow: "SCHEDULE A VISIT OR GET A QUOTE",
    title: "Experience Our Machines in Action",
    description:
      "Visit our Padi workshop in Chennai for a live trial on your products, or connect with our engineering team for custom machinery quotation.",
    primaryBtn: { text: "Request Machine Quote", href: "/contact" },
    secondaryBtn: { text: "Visit Factory via Maps", href: SITE_CONTACTS.maps.shareUrl },
    phone: SITE_CONTACTS.phone.primary.display,
    whatsapp: SITE_CONTACTS.whatsapp.getUrl(),
  },
};
