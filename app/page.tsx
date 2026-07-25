import Navbar from "@/components/navbar/navbar";
import HeroShowcase from "@/components/home/hero-showcase";
import CategorySection from "@/components/home/category-section";
import ProductShowcaseSection from "@/components/home/product-showcase-section";
import BestSellersSection from "@/components/home/best-sellers-section";
import BrandSetupSection from "@/components/home/brand-setup-section";
import NewProductCardsSection from "@/components/home/new-product-cards-section";
import FaqSection from "@/components/home/faq-section";
import CreatorVideosSection from "@/components/home/creator-videos-section";
import Footer from "@/components/footer/footer";
import { getShopifyProducts } from "@/lib/shopify";
import { shopifyProductToHomeProduct } from "@/lib/shopify-adapters";

export const revalidate = 60;

export default async function Home() {
  const shopifyProducts = await getShopifyProducts(12);
  const products = shopifyProducts.map(shopifyProductToHomeProduct);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff7ed] text-[#431407]">
      <Navbar />
      <HeroShowcase />
      <CategorySection />
      <ProductShowcaseSection products={products.slice(0, 4)} />
      <BestSellersSection />
      <BrandSetupSection />
      <NewProductCardsSection products={products} />
      <FaqSection />
      <CreatorVideosSection />
      <Footer />
    </main>
  );
}
