"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import {
  getProductById,
  getSimilarProducts,
  ProductDetailItem,
  SimilarProductCard,
} from "@/lib/products-data";
import SimilarProductsSection from "@/components/product/similar-products-section";
import { redirectToShopifyCheckout } from "@/lib/checkout";

interface ProductDetailProps {
  initialProduct?: ProductDetailItem;
  initialSimilarProducts?: SimilarProductCard[];
}

export default function ProductDetail({ initialProduct, initialSimilarProducts }: ProductDetailProps) {
  const searchParams = useSearchParams();
  const productId = searchParams?.get("id") || searchParams?.get("product");

  const product = useMemo(() => {
    if (initialProduct) return initialProduct;
    return getProductById(productId);
  }, [initialProduct, productId]);

  const similarProducts = useMemo(
    () => initialSimilarProducts ?? getSimilarProducts(product.id, 4),
    [initialSimilarProducts, product.id]
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Standard");
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (product.colors[0]) {
      setSelectedColor(product.colors[0].name);
    }
  }, [product]);

  const galleryTransforms = [
    "object-cover transition-transform duration-500 group-hover:scale-105",
    "object-cover scale-110 translate-y-4",
    "object-cover scale-125 -translate-y-6 rotate-3",
    "object-cover -rotate-2 scale-110",
    "object-cover rotate-2 scale-110",
    "object-cover scale-125 translate-x-4 translate-y-4",
  ];

  return (
    <div className="min-h-dvh bg-[#fffaf3] px-4 py-8 text-[#431407] sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1440px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-orange-900/45 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-[#ea580c]">
            Home
          </Link>
          <span>/</span>
          <Link href="/" className="transition-colors hover:text-[#ea580c]">
            Offerings
          </Link>
          <span>/</span>
          <span className="font-medium text-[#7c2d12]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0">
            {galleryTransforms.map((className, index) => (
              <div
                key={`${product.id}-${index}`}
                className="group relative flex aspect-[4/5] min-w-[62vw] shrink-0 snap-start items-center justify-center overflow-hidden rounded-[24px] bg-white p-4 shadow-sm shadow-orange-900/5 sm:min-w-0 sm:p-6"
              >
                <Image
                  src={product.mainImage}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className={className}
                  sizes="(min-width: 1024px) 25vw, 62vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="pt-1 lg:pl-4">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-[#ea580c] sm:text-[13px]">
              {product.category}
            </p>

            <h1 className="mb-3 text-2xl font-medium leading-[1.1] tracking-tight text-[#431407] sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>

            <div className="mb-6 flex items-center gap-2 text-xs font-medium text-orange-950/65 sm:text-sm">
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-[#f97316] text-[#f97316]" />
                <span className="font-semibold text-[#431407]">({product.rating})</span>
              </div>
              <span className="text-orange-900/35">•</span>
              <span className="text-orange-900/45">{product.reviewsCount}</span>
            </div>

            <p className="mb-8 max-w-xl text-xs leading-relaxed text-orange-950/70 sm:text-base">
              {product.description}
            </p>

            <div className="mb-8 flex items-baseline gap-3">
              <span className="text-3xl font-medium tracking-tight text-[#431407] sm:text-5xl">
                {product.price}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-orange-900/35 line-through">
                  {product.oldPrice}
                </span>
              )}
              {product.discount && (
                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-[#ea580c] sm:text-sm">
                  {product.discount}
                </span>
              )}
            </div>

            {product.colors.length > 0 && (
              <div className="mb-8 border-t border-orange-200 pt-6">
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        aria-label={`Select ${color.name} color`}
                        className={`relative flex size-8 items-center justify-center rounded-full transition-all ${
                          isSelected
                            ? "scale-105 ring-2 ring-[#ea580c] ring-offset-2"
                            : "opacity-80 hover:scale-105 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: color.bg }}
                      >
                        {isSelected && <span className="size-2 rounded-full bg-white opacity-90" />}
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-medium text-[#7c2d12] sm:text-sm">
                    {selectedColor}
                  </span>
                </div>
              </div>
            )}

            {product.features.length > 0 && (
              <div className="mb-8 border-t border-orange-200 pt-6">
                <h3 className="mb-4 text-sm font-semibold text-[#431407]">Key Blessings</h3>
                <ul className="space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-orange-950/70 sm:text-[15px]">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-orange-200 text-[#ea580c]">
                        <Check className="size-3 stroke-[2.5]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.specs.length > 0 && (
              <div className="mb-8 border-t border-orange-200 pt-6">
                <h3 className="mb-3 text-sm font-semibold text-[#431407]">Offering Details</h3>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="rounded-xl bg-orange-50 p-2.5">
                      <span className="block text-[11px] uppercase tracking-wider text-orange-900/45">
                        {spec.label}
                      </span>
                      <span className="font-semibold text-[#431407]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mb-6 text-[11px] leading-relaxed text-orange-900/45">
              {product.shippingNotice}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isCheckingOut}
                onClick={async () => {
                  if (!product.variantId) return;

                  setCheckoutError(null);
                  setIsCheckingOut(true);
                  try {
                    await redirectToShopifyCheckout(product.variantId);
                  } catch (error) {
                    setCheckoutError(error instanceof Error ? error.message : "Unable to start Shopify checkout.");
                    setIsCheckingOut(false);
                  }
                }}
                className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-[#ea580c] text-sm font-medium text-white shadow-md shadow-orange-500/20 transition-all hover:bg-[#c2410c] active:scale-[0.99] sm:h-14 sm:rounded-full sm:text-base"
              >
                {isCheckingOut ? "Opening Checkout..." : product.variantId ? "Buy with Shopify" : "Buy Now"}
              </button>

              <button
                type="button"
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label="Add to wishlist"
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-all sm:size-14 ${
                  isFavorite
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-orange-200 text-[#7c2d12] hover:border-orange-400 hover:bg-orange-50"
                }`}
              >
                <Heart className={`size-5 stroke-[1.8] ${isFavorite ? "fill-red-500" : ""}`} />
              </button>

              <button
                type="button"
                aria-label="Add to shopping bag"
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-orange-200 text-[#7c2d12] transition-all hover:border-orange-400 hover:bg-orange-50 sm:size-14"
              >
                <ShoppingBag className="size-5 stroke-[1.8]" />
              </button>
            </div>

            {checkoutError ? (
              <p className="mt-3 text-[12px] font-medium text-red-600">{checkoutError}</p>
            ) : null}

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-orange-200 pt-6">
              <div className="flex flex-col items-center p-2 text-center">
                <Truck className="mb-1 size-4 text-orange-500 sm:size-5" />
                <span className="text-[10px] font-medium text-orange-950/70 sm:text-[11px]">Careful Delivery</span>
              </div>
              <div className="flex flex-col items-center p-2 text-center">
                <ShieldCheck className="mb-1 size-4 text-orange-500 sm:size-5" />
                <span className="text-[10px] font-medium text-orange-950/70 sm:text-[11px]">Sacred Packing</span>
              </div>
              <div className="flex flex-col items-center p-2 text-center">
                <RotateCcw className="mb-1 size-4 text-orange-500 sm:size-5" />
                <span className="text-[10px] font-medium text-orange-950/70 sm:text-[11px]">Easy Support</span>
              </div>
            </div>
          </div>
        </div>

        <SimilarProductsSection products={similarProducts} />
      </div>
    </div>
  );
}
