import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import CartPage from "@/components/cart/cart-page";

export default function CartRoute() {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf3]">
      <Navbar />
      <CartPage />
      <Footer />
    </main>
  );
}
