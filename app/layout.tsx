import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "SP Solutions — Packaging Machinery & Service, Chennai",
  description:
    "SP Solutions designs, installs, and services shrink wrap, flow wrap, and end-of-line packaging systems for manufacturers across Tamil Nadu. Spares stocked, 24/7 support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("antialiased", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body text-ink bg-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
