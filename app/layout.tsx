import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";
import FloatingContactButtons from "./components/FloatingContactButtons";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const siteUrl =
  process.env.SITE_URL && !process.env.SITE_URL.includes("vercel.app")
    ? process.env.SITE_URL
    : "https://www.spsolutionsc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SP Solutions — Packaging Machinery & Industrial Automation",
    template: "%s | SP Solutions",
  },
  description:
    "SP Solutions designs, installs, and services shrink wrap, flow wrap, and end-of-line packaging systems for manufacturers across Tamil Nadu. Spares stocked, 24/7 support.",
  applicationName: "SP Solutions",
  authors: [{ name: "SP Solutions", url: siteUrl }],
  keywords: [
    "packaging machinery Chennai",
    "shrink wrap machines",
    "flow wrap machines",
    "pouch packing machines",
    "industrial automation Tamil Nadu",
    "packaging spares Chennai",
    "SP Solutions",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "SP Solutions",
    title: "SP Solutions — Packaging Machinery & Industrial Automation",
    description:
      "SP Solutions designs, installs, and services shrink wrap, flow wrap, and end-of-line packaging systems for manufacturers across Tamil Nadu. Spares stocked, 24/7 support.",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "SP Solutions — Packaging Machinery & Industrial Automation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SP Solutions — Packaging Machinery & Industrial Automation",
    description:
      "SP Solutions designs, installs, and services shrink wrap, flow wrap, and end-of-line packaging systems for manufacturers across Tamil Nadu. Spares stocked, 24/7 support.",
    images: ["/opengraph.png"],
    creator: "@spsolutionsc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body text-ink bg-white overflow-x-hidden">
        <Preloader />
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingContactButtons />
      </body>
    </html>
  );
}
