import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us & Machine Inquiries | SP Solutions Chennai",
  description:
    "Get in touch with SP Solutions for industrial packaging machinery quotes, emergency breakdown repairs, and Annual Maintenance Contracts (AMC) in Chennai and pan-India.",
  openGraph: {
    title: "Contact SP Solutions | Industrial Packaging Machinery & Repair",
    description:
      "Request a quote for shrink tunnels, strapping machines, carton sealers, or book an on-site technician visit.",
    type: "website",
  },
};

export default function ContactLayout({
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
