import AboutHero from "./components/AboutHero";
import PresentationVideo from "./components/PresentationVideo";
import OurStory from "./components/OurStory";
import OurTeam from "./components/OurTeam";
import WhyChooseUs from "./components/WhyChooseUs";
import FactsheetProfile from "./components/FactsheetProfile";
// import GoogleRatingsSection from "./components/GoogleRatingsSection";
import AboutCta from "./components/AboutCta";
import { aboutOptions } from "./options";

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <AboutHero hero={aboutOptions.hero} />

      {/* 2. Machine Demonstration & Workshop Presentation Video */}
      <PresentationVideo presentation={aboutOptions.presentation} />

      {/* 3. The Story of SP Solutions (Interactive Timeline) */}
      <OurStory story={aboutOptions.story} />

      {/* 4. Our Team / Leadership (Alex Navin Kumar & Bhagavan) */}
      <OurTeam team={aboutOptions.team} />

      {/* 5. Why Choose Us (Pillars & Key Advantages) */}
      <WhyChooseUs whyChooseUs={aboutOptions.whyChooseUs} />

      {/* 6. Company Factsheet & Statutory Profile */}
      <FactsheetProfile factsheet={aboutOptions.factsheet} />

      {/* 7. Direct Factory Visit & Quote CTA */}
      <AboutCta cta={aboutOptions.cta} />
    </div>
  );
}
