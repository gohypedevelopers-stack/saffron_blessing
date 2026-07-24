import { Suspense } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import ProductDetail from "@/components/product/product-detail";

export default function ProductPage() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf3]">
      <Navbar />
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#fffaf3] text-orange-900/45">Loading offering...</div>}>
        <ProductDetail />
      </Suspense>
      <Footer />
    </main>
  );
}
