import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import ClientLogos from "./components/ClientLogos";
import Products from "./components/Products";
import ServicesSection from "./components/ServicesSection";
import Gallery from "./components/Gallery";
import StatsBand from "./components/StatsBand";
import Process from "./components/Process";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <ScrollReveal>
      <Topbar />
      <Navbar />
      <Hero />
      <Ticker />
      <About />
      <ClientLogos />
      <Products />
      <ServicesSection />
      <Gallery />
      <StatsBand />
      <Process />
      <CtaBand />
      <Footer />
    </ScrollReveal>
  );
}
