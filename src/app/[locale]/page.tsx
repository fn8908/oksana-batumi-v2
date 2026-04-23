import { HeroSection } from "@/components/home/HeroSection";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { AboutSnippet } from "@/components/home/AboutSnippet";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { WhyBatumi } from "@/components/home/WhyBatumi";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CredibilityBar />
      <ServicesSection />
      <FeaturedProperties />
      <AboutSnippet />
      <ExpertiseSection />
      <WhyBatumi />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
