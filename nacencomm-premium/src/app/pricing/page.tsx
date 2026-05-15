import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FAQ } from "@/components/sections/FAQ";
import { CTA, Footer } from "@/components/sections/Footer";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-10"> {/* Offset for header */}
        <Hero />
        <PricingGrid />
        <ComparisonTable />
        <FAQ />
      </div>
      <CTA />
      <Footer />
    </main>
  );
}
