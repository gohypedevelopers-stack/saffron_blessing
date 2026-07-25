"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Check, Heart, Star, ArrowRight, Flame } from "lucide-react";
import { toast } from "sonner";
import { addLocalCartItem } from "@/lib/cart-store";
import type { SimilarProductCard } from "@/lib/products-data";

interface SimilarProductsSectionProps {
  products: SimilarProductCard[];
}

export default function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  if (!products || products.length === 0) return null;

  const handleQuickAdd = (product: SimilarProductCard, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addLocalCartItem({
      variantId: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      alt: product.alt,
      href: `/product/${product.slug}`,
    });

    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    toast.success(`🛍️ "${product.name}" added to your sacred shopping bag.`);

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  const handleToggleFavorite = (product: SimilarProductCard, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isFav = favorites[product.id];
    setFavorites((prev) => ({ ...prev, [product.id]: !isFav }));
    toast.info(!isFav ? `❤️ "${product.name}" added to wishlist` : `Removed from wishlist`);
  };

  return (
    <section className="bg-[#fffaf3] py-8 text-[#431407]">
      <div className="mx-auto max-w-[1440px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-orange-200/80">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3.5 py-1.5 text-[12px] font-bold text-[#ea580c] mb-3 shadow-sm border border-orange-200/60">
              <Flame className="size-4 fill-orange-400 text-orange-400 animate-pulse" />
              <span>Harmonious Sacred Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#7c2d12] tracking-tight">
              Similar Sacred Offerings
            </h2>
            <p className="mt-2 text-sm sm:text-base text-orange-950/75 max-w-2xl leading-relaxed">
              Handpicked devotional samagri, meditation malas, and temple decor that harmonize with your selected offering for a complete altar.
            </p>
          </div>

          <Link
            href="/#sacred-store"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#7c2d12] bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#7c2d12] transition-all hover:bg-[#7c2d12] hover:text-white shadow-sm self-start md:self-auto shrink-0 group"
          >
            <span>Explore All Offerings</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isAdded = addedIds[product.id];
            const isFav = favorites[product.id];

            return (
              <div
                key={product.id}
                className="group relative rounded-3xl border border-orange-200/80 bg-gradient-to-b from-white via-white to-orange-50/50 p-4 shadow-[0_8px_30px_rgba(194,65,12,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(194,65,12,0.18)] hover:border-[#ea580c]/60 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Bar inside Card */}
                <div className="flex items-center justify-between gap-2 mb-3 z-10 relative">
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100/90 px-2.5 py-1 text-[11px] font-bold text-[#ea580c] border border-orange-200/50">
                    <Flame className="size-3 fill-orange-400 text-orange-500" />
                    <span className="truncate max-w-[120px]">{product.category}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200/60">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      <span>4.8</span>
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(product, e)}
                      aria-label="Wishlist"
                      className={`flex size-8 items-center justify-center rounded-full border transition-all ${
                        isFav
                          ? "border-red-200 bg-red-50 text-red-500"
                          : "border-orange-200/80 bg-white/90 text-[#7c2d12] hover:bg-orange-50 hover:border-orange-400"
                      }`}
                    >
                      <Heart className={`size-3.5 ${isFav ? "fill-red-500" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Clickable Area for Product Details */}
                <Link href={`/product/${product.slug}`} className="block flex-1 flex flex-col group/link">
                  {/* Image Viewport */}
                  <div className="relative aspect-[1/1] w-full overflow-hidden rounded-2xl bg-orange-50/60 border border-orange-100/80 mb-4 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />

                    {/* Subtle ambient light overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Product Title & Swatches */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-serif text-[#7c2d12] group-hover/link:text-[#ea580c] transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h3>

                      {/* Swatches if present */}
                      {product.swatches && product.swatches.length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5">
                          {product.swatches.map((colorBg, idx) => (
                            <span
                              key={idx}
                              className="size-3.5 rounded-full ring-1 ring-orange-200/80 shadow-2xs"
                              style={{ backgroundColor: colorBg }}
                              title="Available sacred color"
                            />
                          ))}
                          <span className="text-[10px] font-medium text-orange-950/50 ml-1">
                            +{product.swatches.length} tones
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Price & Quick Add Bar */}
                <div className="mt-5 pt-3 border-t border-orange-100 flex items-center justify-between gap-3 relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-orange-950/45 block leading-none mb-1">
                      Sacred Price
                    </span>
                    <span className="text-lg sm:text-xl font-bold tracking-tight text-[#7c2d12]">
                      {product.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(product, e)}
                    className={`inline-flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm ${
                      isAdded
                        ? "bg-emerald-600 text-white shadow-emerald-600/20 scale-95"
                        : "bg-[#7c2d12] text-white hover:bg-[#ea580c] hover:shadow-orange-500/25 active:scale-95"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="size-4 stroke-[3]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="size-4" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
