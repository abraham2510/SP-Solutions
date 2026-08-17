import type { Metadata } from "next";
import Topbar from "@/app/components/Topbar";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | SP Solutions Machines",
    default: "Machines | SP Solutions",
  },
};

export default function MachinesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Topbar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
