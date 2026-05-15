import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { PricingGrid } from "@/components/sections/PricingGrid";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-brand-blue selection:text-white">
      <Header />
      <Hero />
      <PricingGrid />
      <ProductInfo />
      <Footer />
    </main>
  );
}
