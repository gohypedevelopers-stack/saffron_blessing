"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
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

export default function ProductActions({ product, mode = "card", quantity = 1 }: ProductActionsProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canCheckout = Boolean(product.variantId) && product.availableForSale !== false;
  const href = product.href || `/product/${product.id}`;

  const buttonBase =
    mode === "detail"
      ? "h-12 rounded-2xl text-sm font-medium transition-all active:scale-[0.99] sm:h-14 sm:rounded-full sm:text-base"
      : "h-10 rounded-[4px] text-[12px] font-medium transition-colors";

  async function buyNow() {
    if (!product.variantId || !canCheckout) return;

    setError(null);
    setIsCheckingOut(true);
    try {
      await redirectToShopifyCheckout(product.variantId, quantity);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start sacred checkout.");
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
      <div className={mode === "detail" ? "flex flex-1" : "mt-4 grid grid-cols-1"}>
        <Link
          href={href}
          className={`${buttonBase} inline-flex items-center justify-center border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white`}
        >
          View details
        </Link>
      </div>
    );
  }

  return (
    <div className={mode === "detail" ? "flex flex-1 flex-col gap-2" : "mt-4"}>
      <div className={mode === "detail" ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 gap-2"}>
        <button
          type="button"
          disabled={!canCheckout}
          onClick={addToCart}
          className={`${buttonBase} inline-flex items-center justify-center gap-1.5 border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white disabled:cursor-not-allowed disabled:border-orange-200 disabled:text-orange-900/35 disabled:hover:bg-transparent`}
        >
          {isAdded ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
          {isAdded ? "Added" : "Add"}
        </button>
        <button
          type="button"
          disabled={!canCheckout || isCheckingOut}
          onClick={buyNow}
          className={`${buttonBase} inline-flex items-center justify-center bg-[#ea580c] text-white shadow-orange-500/20 hover:bg-[#c2410c] disabled:cursor-not-allowed disabled:bg-orange-200 disabled:text-orange-900/40 ${mode === "detail" ? "shadow-md" : ""}`}
        >
          {isCheckingOut ? "Opening..." : canCheckout ? "Buy now" : "Sold out"}
        </button>
      </div>
      {error ? <p className="text-[12px] font-medium text-red-600">{error}</p> : null}
    </div>
  );
}
