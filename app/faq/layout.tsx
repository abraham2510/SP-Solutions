import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function FaqLayout({
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
