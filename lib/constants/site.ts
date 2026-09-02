/**
 * Centralized Site Constants & Contact Information for SP Solutions.
 * Use these constants across all components, pages, and metadata for consistency.
 */

export const SITE_CONTACTS = {
  name: "SP Solutions",
  tagline: "Packaging Machinery & Service, Chennai",
  
  phone: {
    primary: {
      display: "+91 63745 80330",
      displayFormatted: "+91 6374 580 330",
      raw: "6374580330",
      tel: "tel:+916374580330",
    },
    secondary: {
      display: "+91 63696 67449",
      displayFormatted: "+91 6369 667 449",
      raw: "6369667449",
      tel: "tel:+916369667449",
    },
  },

  whatsapp: {
    display: "+91 6374 580 330",
    number: "916374580330",
    defaultMessage:
      "Hello SP Solutions, I would like to enquire about your packaging machines and services.",
    /**
     * Generates a prefilled WhatsApp chat URL
     */
    getUrl: (customMessage?: string) => {
      const message =
        customMessage ||
        "Hello SP Solutions, I would like to enquire about your packaging machines and services.";
      return `https://wa.me/916374580330?text=${encodeURIComponent(message)}`;
    },
  },

  email: {
    primary: "alexnavinkumar@spsolutionsc.com",
    sales: "sales@spsolutionsc.com",
    mailto: "mailto:alexnavinkumar@spsolutionsc.com",
  },

  address: {
    companyName: "SP Solutions",
    street: "30, Thiruvalluvar St, T.M.P Nagar",
    area: "Padi",
    landmark: "Padi Industrial Area",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600050",
    country: "India",
    full: "30, Thiruvalluvar St, T.M.P Nagar, Padi, Chennai, Tamil Nadu 600050",
    short: "30, Thiruvalluvar St, Padi, Chennai 600050",
    singleLine: "30, Thiruvalluvar St, T.M.P Nagar, Padi, Chennai 600050",
  },

  maps: {
    // Exact Google Maps iframe embed provided
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0680994148524!2d80.1827656!3d13.0948706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526300025fa2f5%3A0x649f1f2d2ce0a075!2sSP%20solutions!5e0!3m2!1sen!2sin!4v1787408890833!5m2!1sen!2sin",
    // Exact Google Maps share / directions link
    shareUrl: "https://maps.app.goo.gl/qnCcYoVzgguyNfpv6",
    coordinates: {
      lat: 13.0948706,
      lng: 80.1827656,
    },
  },

  businessHours: {
    workingDays: "Monday – Saturday",
    timings: "9:00 AM – 7:00 PM",
    compact: "Mon–Sat 9AM–7PM",
    emergency: "24/7 Breakdown & AMC Support",
  },

  indiamart: {
    url: "https://www.indiamart.com/sp-solutions-chennai/",
    title: "SP Solutions on IndiaMART",
    catalogUrl: "https://www.indiamart.com/sp-solutions-chennai/",
    badge: "IndiaMART Verified Supplier",
    verified: true,
  },

  socials: {
    facebook: "https://facebook.com",
    instagram: "https://www.instagram.com/spsolutionschennai/",
    youtube: "https://www.youtube.com/@spsolutionchennai3961",
    youtubeChannelId: "UCV-G_rN049lavbegP920SnA",
    youtubeChannelUrl: "https://www.youtube.com/channel/UCV-G_rN049lavbegP920SnA",
    indiamart: "https://www.indiamart.com/sp-solutions-chennai/",
  },

  legal: {
    companyName: "SP SOLUTIONS",
    legalStatus: "Proprietorship",
    gstNo: "33DESPA4848P2ZT",
    iecCode: "DESPA4848P",
    indiamartVerified: "IndiaMART Verified Supplier",
    gstRegistrationYear: "2024",
    ceo: "Alex Navin Kumar",
    employeeCount: "Up to 10 People",
    copyright: "© 2026 SP Solutions. All rights reserved.",
  },
} as const;

export type SiteContacts = typeof SITE_CONTACTS;
