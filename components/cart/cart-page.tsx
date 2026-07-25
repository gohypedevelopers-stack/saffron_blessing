"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { redirectToShopifyCheckout } from "@/lib/checkout";
import {
  clearLocalCart,
  readLocalCart,
  removeLocalCartItem,
  SHOPIFY_CART_EVENT,
  type LocalCartItem,
  updateLocalCartItemQuantity,
} from "@/lib/cart-store";

export default function CartPage() {
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function syncCart() {
      setItems(readLocalCart());
    }

    syncCart();
    window.addEventListener(SHOPIFY_CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(SHOPIFY_CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  function setQuantity(variantId: string, quantity: number) {
    updateLocalCartItemQuantity(variantId, quantity);
    setItems(readLocalCart());
  }

  function removeItem(variantId: string) {
    removeLocalCartItem(variantId);
    setItems(readLocalCart());
  }

  async function checkout() {
    if (items.length === 0) return;

    setError(null);
    setIsCheckingOut(true);
    try {
      await redirectToShopifyCheckout(
        items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        }))
      );
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start Shopify checkout.");
      setIsCheckingOut(false);
    }
  }

  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-4 py-8 text-[#431407] sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
            Shopping Bag
          </p>
          <h1 className="mt-1 text-[32px] font-semibold tracking-tight sm:text-[44px]">
            Your devotional cart
          </h1>

          {items.length === 0 ? (
            <div className="mt-8 rounded-[8px] border border-orange-200 bg-white p-8 text-center">
              <ShoppingBag className="mx-auto size-9 text-orange-400" />
              <p className="mt-4 text-[15px] text-orange-950/70">
                Your cart is empty.
              </p>
              <Link
                href="/#sacred-store"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#ea580c] px-5 text-sm font-medium text-white hover:bg-[#c2410c]"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              {items.map((item) => (
                <article
                  key={item.variantId}
                  className="grid gap-4 rounded-[8px] border border-orange-200 bg-white p-3 sm:grid-cols-[120px_1fr_auto]"
                >
                  <Link href={item.href} className="relative block aspect-square overflow-hidden rounded-[6px] bg-orange-50">
                    <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="120px" />
                  </Link>
                  <div className="min-w-0">
                    <Link href={item.href} className="line-clamp-2 text-[16px] font-semibold text-[#431407] hover:text-[#ea580c]">
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm font-medium text-orange-950/65">{item.price}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.variantId)}
                      className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-orange-900/55 hover:text-red-600"
                    >
                      <Trash2 className="size-3.5" />
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <button
                      type="button"
                      aria-label={`Decrease quantity for ${item.title}`}
                      onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-orange-200 text-[#7c2d12] hover:border-orange-400"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="inline-flex min-w-8 justify-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase quantity for ${item.title}`}
                      onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-orange-200 text-[#7c2d12] hover:border-orange-400"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-[8px] border border-orange-200 bg-white p-5 lg:sticky lg:top-24">
          <h2 className="text-[18px] font-semibold">Checkout</h2>
          <div className="mt-4 flex items-center justify-between border-t border-orange-100 pt-4 text-sm">
            <span className="text-orange-950/65">Items</span>
            <span className="font-semibold">{itemCount}</span>
          </div>
          <p className="mt-3 text-[12px] leading-5 text-orange-950/55">
            Taxes, shipping, discounts, payment, and final totals are handled securely in Shopify checkout.
          </p>
          <button
            type="button"
            disabled={items.length === 0 || isCheckingOut}
            onClick={checkout}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#ea580c] text-sm font-medium text-white shadow-md shadow-orange-500/20 hover:bg-[#c2410c] disabled:cursor-not-allowed disabled:bg-orange-200 disabled:text-orange-900/40"
          >
            {isCheckingOut ? "Opening Shopify..." : "Checkout with Shopify"}
          </button>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={() => {
                clearLocalCart();
                setItems([]);
              }}
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full border border-orange-200 text-sm font-medium text-[#7c2d12] hover:border-orange-400"
            >
              Clear cart
            </button>
          ) : null}
          {error ? <p className="mt-3 text-[12px] font-medium text-red-600">{error}</p> : null}
        </aside>
      </div>
    </section>
  );
}
