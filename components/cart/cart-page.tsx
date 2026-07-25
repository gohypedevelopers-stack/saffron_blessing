"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  ShieldCheck,
  Truck,
  Flame,
  ArrowRight,
  Tag,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { redirectToShopifyCheckout } from "@/lib/checkout";
import {
  clearLocalCart,
  readLocalCart,
  removeLocalCartItem,
  SHOPIFY_CART_EVENT,
  type LocalCartItem,
  updateLocalCartItemQuantity,
} from "@/lib/cart-store";

function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  // Extract numbers and optional decimal points
  const clean = priceStr.replace(/[^0-9.]/g, "");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

export default function CartPage() {
  const [items, setItems] = useState<LocalCartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(
    null
  );

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

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotalNum = useMemo(() => {
    return items.reduce((sum, item) => {
      const priceVal = parsePrice(item.price);
      return sum + priceVal * item.quantity;
    }, 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    if (!appliedDiscount) return 0;
    return Math.round((subtotalNum * appliedDiscount.percent) / 100);
  }, [subtotalNum, appliedDiscount]);

  const finalTotal = useMemo(() => {
    return Math.max(0, subtotalNum - discountAmount);
  }, [subtotalNum, discountAmount]);

  function setQuantity(variantId: string, quantity: number) {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }
    updateLocalCartItemQuantity(variantId, quantity);
    setItems(readLocalCart());
  }

  function removeItem(variantId: string) {
    const target = items.find((i) => i.variantId === variantId);
    removeLocalCartItem(variantId);
    setItems(readLocalCart());
    if (target) {
      toast.info(`Removed "${target.title}" from your sanctuary bag.`);
    }
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const code = promoCode.trim().toUpperCase();
    if (
      code === "SACRED10" ||
      code === "BLESS10" ||
      code === "WELCOME10" ||
      code === "FESTIVAL" ||
      code === "SAFFRON"
    ) {
      setAppliedDiscount({ code, percent: 10 });
      toast.success(`🎉 Blessing code "${code}" applied! 10% devotional discount added.`);
    } else if (code === "PUJA20" || code === "DEVOTION20" || code === "DIWALI") {
      setAppliedDiscount({ code, percent: 20 });
      toast.success(`🪔 Sacred code "${code}" applied! 20% festival discount added.`);
    } else {
      toast.error("Invalid or expired blessing code. Try 'SACRED10' or 'PUJA20'.");
    }
    setPromoCode("");
  };

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
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Unable to start sacred checkout."
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <section className="min-h-[80vh] bg-[#fffaf3] px-4 py-8 text-[#7c2d12] sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1300px]">
        {/* Sacred Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-orange-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#ea580c] shadow-xs">
              <Flame className="size-3.5 fill-orange-500 text-orange-500" />
              <span>Sacred Sanctuary Bag</span>
            </span>
            <h1 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#7c2d12] sm:text-4xl lg:text-5xl">
              Your Devotional Offerings
            </h1>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearLocalCart();
                setItems([]);
                toast.info("Your sacred shopping bag has been cleared.");
              }}
              className="inline-flex w-fit items-center gap-1.5 rounded-xl border border-orange-200/80 bg-white px-4 py-2 text-xs font-semibold text-orange-950/75 shadow-xs transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="size-3.5" />
              <span>Clear Altar Bag</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="mt-6 rounded-3xl border border-orange-200/80 bg-gradient-to-b from-white via-white to-orange-50/50 p-10 text-center shadow-md sm:p-16">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-orange-100 text-[#ea580c] shadow-inner">
              <ShoppingBag className="size-10 stroke-[1.5]" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-[#7c2d12] sm:text-3xl">
              Your Altar Bag is Empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-orange-950/70">
              Your devotional altar awaits its sacred samagri. Explore consecrated brass diyas, pure saffron, and festival puja kits to begin your spiritual journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/#sacred-store"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#ea580c] to-[#d97706] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition duration-300 hover:scale-105 hover:shadow-orange-500/35"
              >
                <span>Shop Puja Samagri</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/#rituals"
                className="inline-flex h-12 items-center justify-center rounded-full border border-orange-300 bg-white px-6 text-sm font-semibold text-[#7c2d12] shadow-sm transition hover:bg-orange-50"
              >
                Explore Sacred Rituals
              </Link>
            </div>
          </div>
        ) : (
          /* Active Bag Grid */
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
            {/* Left Column - Offerings List */}
            <div className="space-y-4">
              {items.map((item) => {
                const itemPriceVal = parsePrice(item.price);
                const itemTotalVal = itemPriceVal * item.quantity;
                const displayTotal =
                  itemTotalVal > 0 ? `₹${itemTotalVal.toLocaleString("en-IN")}` : item.price;

                return (
                  <article
                    key={item.variantId}
                    className="group relative grid gap-4 rounded-3xl border border-orange-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md sm:grid-cols-[120px_1fr_auto] sm:items-center sm:p-5"
                  >
                    <Link
                      href={item.href}
                      className="relative block aspect-square overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/60"
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="120px"
                      />
                    </Link>

                    <div className="flex h-full min-w-0 flex-col justify-between py-0.5">
                      <div>
                        <span className="mb-1 inline-block rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">
                          Consecrated Offering
                        </span>
                        <Link
                          href={item.href}
                          className="block line-clamp-1 font-serif text-lg font-bold text-[#7c2d12] transition hover:text-[#ea580c]"
                        >
                          {item.title}
                        </Link>
                      </div>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xs font-medium text-orange-950/60">Unit Offering:</span>
                        <span className="font-bold text-[#7c2d12]">{item.price}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.variantId)}
                        className="mt-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-orange-900/55 transition hover:text-red-600"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Remove offering</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-orange-100 pt-3 sm:flex-col sm:justify-center sm:border-t-0 sm:pt-0">
                      <div className="flex items-center gap-1 rounded-2xl border border-orange-200 bg-[#fffaf3] p-1 shadow-inner">
                        <button
                          type="button"
                          aria-label={`Decrease quantity for ${item.title}`}
                          onClick={() => setQuantity(item.variantId, item.quantity - 1)}
                          className="inline-flex size-8 items-center justify-center rounded-xl bg-white text-[#7c2d12] shadow-xs transition hover:bg-orange-100 active:scale-95"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="inline-flex w-8 justify-center text-sm font-bold text-[#7c2d12]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase quantity for ${item.title}`}
                          onClick={() => setQuantity(item.variantId, item.quantity + 1)}
                          className="inline-flex size-8 items-center justify-center rounded-xl bg-white text-[#7c2d12] shadow-xs transition hover:bg-orange-100 active:scale-95"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <div className="text-right sm:text-center">
                        <span className="block text-[10px] font-semibold uppercase text-orange-950/50">
                          Total Offering
                        </span>
                        <span className="font-serif text-base font-bold text-[#ea580c]">
                          {displayTotal}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Devotional Guarantee Banner */}
              <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-800">
                    <ShieldCheck className="size-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#7c2d12]">
                      100% Auspicious Guarantee & Priest Consecration
                    </h4>
                    <p className="mt-0.5 text-xs text-orange-950/75">
                      Every brass artifact and puja kit is purified with Ganga Jal and chanted mantras prior to secure dispatch.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary & Checkout Card */}
            <aside className="h-fit rounded-3xl border border-orange-200/80 bg-gradient-to-b from-white via-white to-orange-50/40 p-6 shadow-xl lg:sticky lg:top-24">
              <div className="flex items-center justify-between border-b border-orange-100 pb-4">
                <h2 className="font-serif text-xl font-bold text-[#7c2d12] flex items-center gap-2">
                  <span>📜</span> Sanctuary Summary
                </h2>
                <span className="rounded-full bg-orange-100 px-3 py-0.5 text-xs font-bold text-[#ea580c]">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </span>
              </div>

              {/* Blessing Coupon Code Box */}
              <div className="mt-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#7c2d12] mb-1.5 flex items-center gap-1">
                  <Tag className="size-3.5 text-[#ea580c]" />
                  <span>Have a Sacred Blessing Code?</span>
                </label>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Try 'SACRED10' or 'PUJA20'"
                    className="flex-1 rounded-xl border border-orange-200 bg-[#fffaf3] px-3.5 py-2 text-xs font-medium text-orange-950 placeholder-orange-950/40 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 uppercase"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#7c2d12] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#9a3412] shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {appliedDiscount && (
                  <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-1.5 border border-emerald-200/60 text-xs text-emerald-800 font-semibold">
                    <span className="flex items-center gap-1">
                      <Check className="size-3.5 text-emerald-600" />
                      Code &quot;{appliedDiscount.code}&quot; ({appliedDiscount.percent}% OFF)
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedDiscount(null);
                        toast.info("Blessing code removed.");
                      }}
                      className="text-[10px] text-emerald-700 underline hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Breakdown Rows */}
              <div className="mt-5 space-y-3 border-t border-orange-100 pt-5 text-sm">
                <div className="flex items-center justify-between text-orange-950/75">
                  <span>Offerings Subtotal</span>
                  <span className="font-semibold text-[#7c2d12]">
                    ₹{subtotalNum.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-orange-950/75">
                  <span className="flex items-center gap-1.5">
                    <span>Express Mandir Delivery</span>
                    <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-800">
                      FREE
                    </span>
                  </span>
                  <span className="font-semibold text-emerald-700">₹0</span>
                </div>

                <div className="flex items-center justify-between text-orange-950/75">
                  <span className="flex items-center gap-1.5">
                    <span>Consecration & Saffron Wrap</span>
                    <span className="rounded bg-orange-100 px-1.5 py-0.2 text-[10px] font-bold text-[#ea580c]">
                      INCLUDED
                    </span>
                  </span>
                  <span className="font-semibold text-[#7c2d12]">₹0</span>
                </div>

                {appliedDiscount && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Sacred Discount ({appliedDiscount.code})</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="border-t border-orange-200/80 pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="block font-serif text-lg font-bold text-[#7c2d12]">
                      Total Sanctuary Offering
                    </span>
                    <span className="text-[11px] text-orange-950/50">
                      Taxes and shipping included in final blessing
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#ea580c]">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={items.length === 0 || isCheckingOut}
                onClick={checkout}
                className="mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#d97706] to-[#c2410c] px-6 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-600/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                <Flame className="size-4 animate-pulse fill-white text-white" />
                <span>
                  {isCheckingOut
                    ? "Connecting to Sanctuary Altar..."
                    : "Proceed to Sacred Checkout"}
                </span>
              </button>

              {error && <p className="mt-3 text-xs font-semibold text-red-600 text-center">{error}</p>}

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-2 gap-2.5 border-t border-orange-100 pt-5 text-[11px] text-orange-950/75">
                <div className="flex items-center gap-2 rounded-xl bg-orange-50/70 p-2.5 border border-orange-100">
                  <ShieldCheck className="size-4 shrink-0 text-emerald-600" />
                  <span className="font-semibold leading-tight">
                    256-Bit Encrypted Altar Checkout
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-orange-50/70 p-2.5 border border-orange-100">
                  <Truck className="size-4 shrink-0 text-[#ea580c]" />
                  <span className="font-semibold leading-tight">
                    Free Express Shipping across India
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-orange-50/70 p-2.5 border border-orange-100 col-span-2">
                  <Flame className="size-4 shrink-0 text-amber-600 fill-amber-500" />
                  <span className="font-semibold leading-tight">
                    Every offering is blessed at dawn by Vedic priests before secure dispatch
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
