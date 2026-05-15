import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { ComboSection } from "@/components/sections/ComboSection";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { CTA, Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      <Header />
      <Hero />
      <PricingGrid />
      <ComboSection />
      <ComparisonTable />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
