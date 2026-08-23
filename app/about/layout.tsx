import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { aboutOptions } from "./options";

export const metadata: Metadata = {
  title: aboutOptions.meta.title,
  description: aboutOptions.meta.description,
  openGraph: {
    title: aboutOptions.meta.ogTitle,
    description: aboutOptions.meta.ogDescription,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}
