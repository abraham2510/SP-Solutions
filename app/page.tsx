import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import ClientLogos from "./components/ClientLogos";
import Products from "./components/Products";
import ServicesSection from "./components/ServicesSection";
import Gallery from "./components/Gallery";
import StatsBand from "./components/StatsBand";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import {
  getAllCategories,
  getProductsByCategory,
  getServices,
} from "@/lib/data/public";

export const revalidate = 3600;

export default async function Home() {
  const [categories, services] = await Promise.all([
    getAllCategories(),
    getServices(),
  ]);

  const productCounts: Record<string, number> = {};
  for (const cat of categories) {
    const products = await getProductsByCategory(cat.slug);
    productCounts[cat.id] = products.length;

    // Collect product images for multi-image auto-scroller
    const productImgs = products
      .flatMap((p) =>
        p.images && p.images.length > 0 ? p.images : p.image ? [p.image] : [],
      )
      .filter(Boolean);
    const combined = [
      ...(cat.images && cat.images.length > 0
        ? cat.images
        : cat.image
          ? [cat.image]
          : []),
      ...productImgs,
    ];
    cat.images = Array.from(new Set(combined));
  }

  return (
    <ScrollReveal>
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <ClientLogos />
      <Products categories={categories} productCounts={productCounts} />
      <ServicesSection services={services} />
      <Gallery categories={categories} services={services} />
      <StatsBand />
      <CtaBand />
      <Footer />
    </ScrollReveal>
  );
}
