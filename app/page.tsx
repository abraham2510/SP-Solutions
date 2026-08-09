import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import About from "./components/About";
import ClientLogos from "./components/ClientLogos";
import Products from "./components/Products";
import Gallery from "./components/Gallery";
import StatsBand from "./components/StatsBand";
import Process from "./components/Process";
import Industries from "./components/Industries";
import SparesBanner from "./components/SparesBanner";
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
      <Gallery />
      <StatsBand />
      <Process />
      {/* <Industries />
      <SparesBanner /> */}
      <CtaBand />
      <Footer />
    </ScrollReveal>
  );
}
