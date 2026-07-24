import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ProductDetail from "@/components/product/product-detail";
import { getProductById } from "@/lib/products-data";

interface DynamicProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicProductPage({ params }: DynamicProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf3]">
      <Navbar />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#fffaf3] text-orange-900/45">Loading offering...</div>}>
        <ProductDetail initialProduct={product} />
      </Suspense>
      <Footer />
    </main>
  );
}
