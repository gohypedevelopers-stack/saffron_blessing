import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ProductDetail from "@/components/product/product-detail";
import { getProductById, getSimilarProductsFromList } from "@/lib/products-data";
import { getShopifyProductByHandle, getShopifyProducts } from "@/lib/shopify";
import { shopifyProductToDetail } from "@/lib/shopify-adapters";

interface DynamicProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicProductPage({ params }: DynamicProductPageProps) {
  const { id } = await params;
  const shopifyProduct = await getShopifyProductByHandle(id);
  const product = shopifyProduct ? shopifyProductToDetail(shopifyProduct) : getProductById(id);
  const shopifyProducts = shopifyProduct ? await getShopifyProducts(8) : [];
  const similarProducts = shopifyProduct
    ? getSimilarProductsFromList(shopifyProducts.map(shopifyProductToDetail), product.id, 4)
    : undefined;

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf3]">
      <Navbar />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#fffaf3] text-orange-900/45">Loading offering...</div>}>
        <ProductDetail initialProduct={product} initialSimilarProducts={similarProducts} />
      </Suspense>
      <Footer />
    </main>
  );
}
