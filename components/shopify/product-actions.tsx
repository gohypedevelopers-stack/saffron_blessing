"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag, ArrowRight } from "lucide-react";
import { redirectToShopifyCheckout } from "@/lib/checkout";
import { addLocalCartItem } from "@/lib/cart-store";

export type ShopifyActionProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  alt: string;
  variantId?: string;
  availableForSale?: boolean;
  href?: string;
};

type ProductActionsProps = {
  product: ShopifyActionProduct;
  mode?: "card" | "detail";
  quantity?: number;
};

export default function ProductActions({
  product,
  mode = "card",
  quantity = 1,
}: ProductActionsProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canCheckout = Boolean(product.variantId) && product.availableForSale !== false;
  const href = product.href || `/product/${product.id}`;

  const buttonBase =
    mode === "detail"
      ? "h-13 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 sm:h-14 sm:text-base"
      : "h-11 rounded-xl text-xs font-bold transition-all duration-300 active:scale-95";

  async function buyNow() {
    if (!product.variantId || !canCheckout) return;

    setError(null);
    setIsCheckingOut(true);
    try {
      await redirectToShopifyCheckout(product.variantId, quantity);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Unable to start secure checkout."
      );
      setIsCheckingOut(false);
    }
  }

  function addToCart() {
    if (!product.variantId || !canCheckout) return;

    addLocalCartItem(
      {
        variantId: product.variantId,
        title: product.title,
        price: product.price,
        image: product.image,
        alt: product.alt,
        href,
      },
      quantity
    );

    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  }

  if (!product.variantId) {
    return (
      <div className={mode === "detail" ? "flex flex-1" : "mt-2 grid grid-cols-1"}>
        <Link
          href={href}
          className={`${buttonBase} inline-flex items-center justify-center gap-2 border-2 border-[#7c2d12] bg-white text-[#7c2d12] hover:bg-[#7c2d12] hover:text-white shadow-xs`}
        >
          <span>View Offering Details</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className={mode === "detail" ? "flex flex-1 flex-col gap-2.5" : "mt-2"}>
      <div className={mode === "detail" ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-2"}>
        <button
          type="button"
          disabled={!canCheckout}
          onClick={addToCart}
          className={`${buttonBase} inline-flex items-center justify-center gap-1.5 border border-orange-300 bg-orange-50/70 text-[#7c2d12] hover:bg-[#7c2d12] hover:text-white hover:border-[#7c2d12] shadow-xs disabled:cursor-not-allowed disabled:border-orange-200 disabled:text-orange-900/35 disabled:hover:bg-transparent`}
        >
          {isAdded ? <Check className="size-4 text-emerald-600" /> : <ShoppingBag className="size-3.5" />}
          <span>{isAdded ? "In Altar Bag" : "Add to Bag"}</span>
        </button>

        <button
          type="button"
          disabled={!canCheckout || isCheckingOut}
          onClick={buyNow}
          className={`${buttonBase} inline-flex items-center justify-center bg-gradient-to-r from-[#ea580c] via-[#d97706] to-[#c2410c] text-white shadow-sm hover:shadow-md hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100`}
        >
          <span>{isCheckingOut ? "Connecting..." : "Instant Buy"}</span>
        </button>
      </div>

      {error && <p className="mt-1 text-[11px] font-semibold text-red-600 text-center">{error}</p>}
    </div>
  );
}
