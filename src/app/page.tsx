import Hero from "@/components/home/Hero";
import BrandStrip from "@/components/home/BrandStrip";
import CategoryBento from "@/components/home/CategoryBento";
import FeatureDrop from "@/components/home/FeatureDrop";
import DealSection from "@/components/home/DealSection";
import TrendingSection from "@/components/home/TrendingSection";
import BrandWorlds from "@/components/home/BrandWorlds";
import ReviewsSection from "@/components/home/ReviewsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <CategoryBento />
      <FeatureDrop />
      <DealSection />
      <TrendingSection />
      <BrandWorlds />
      <ReviewsSection />
      <NewsletterSection />
    </>
  );
}
