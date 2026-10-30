import { HeroSection } from "@/components/home/HeroSection";
import { QuickCategories } from "@/components/home/QuickCategories";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { ExpertiseSection } from "@/components/home/ExpertiseSection";
import { WhyBatumi } from "@/components/home/WhyBatumi";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickCategories />
      <CredibilityBar />
      <ServicesSection />
      <FeaturedProperties />
      <ExpertiseSection />
      <WhyBatumi />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
