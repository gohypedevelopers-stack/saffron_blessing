"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Check,
  Heart,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
  Sparkles,
  Share2,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Flame,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import {
  getProductById,
  getSimilarProducts,
  ProductDetailItem,
  SimilarProductCard,
} from "@/lib/products-data";
import SimilarProductsSection from "@/components/product/similar-products-section";
import ProductActions from "@/components/shopify/product-actions";

interface ProductDetailProps {
  initialProduct?: ProductDetailItem;
  initialSimilarProducts?: SimilarProductCard[];
}

export default function ProductDetail({
  initialProduct,
  initialSimilarProducts,
}: ProductDetailProps) {
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

  // Gallery images list
  const imagesList = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return [product.mainImage, "/spiritual-hero.png", "/spiritual-products.png"];
  }, [product]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Variant selection
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(
    product.variantId || product.variants?.[0]?.id
  );

  const currentVariant = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
    }
    return undefined;
  }, [product.variants, selectedVariantId]);

  // Sync image when variant changes if variant has its own image
  useEffect(() => {
    if (currentVariant?.image) {
      const idx = imagesList.indexOf(currentVariant.image);
      if (idx !== -1) {
        setSelectedImageIndex(idx);
      }
    }
  }, [currentVariant, imagesList]);

  // Quantity and wishlist state
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"story" | "blessings" | "specs">("story");

  // Dynamically computed display values
  const displayPrice = currentVariant?.price || product.price;
  const displayOldPrice = currentVariant?.oldPrice || product.oldPrice;
  const displayVariantId = currentVariant?.id || product.variantId;
  const displayImage = imagesList[selectedImageIndex] || product.mainImage;

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + imagesList.length) % imagesList.length);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % imagesList.length);
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("🔗 Sacred offering link copied to clipboard!");
    }
  };

  const handleToggleWishlist = () => {
    setIsFavorite(!isFavorite);
    toast.info(!isFavorite ? "❤️ Added to your sacred wishlist" : "Removed from wishlist");
  };

  return (
    <div className="min-h-dvh bg-[#fffaf3] px-4 py-8 text-[#431407] sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1440px]">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-medium text-orange-950/60 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-[#ea580c]">
            Home
          </Link>
          <span>/</span>
          <Link href="/#sacred-store" className="transition-colors hover:text-[#ea580c]">
            Offerings
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#7c2d12] truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          
          {/* LEFT: INTERACTIVE GALLERY */}
          <div className="flex flex-col gap-4">
            {/* Main Viewport */}
            <div className="group relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden rounded-3xl bg-white border border-orange-200/80 shadow-[0_15px_40px_rgba(194,65,12,0.1)] flex items-center justify-center">
              <Image
                src={displayImage}
                alt={`${product.name} - View ${selectedImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />

              {/* Ambient gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7c2d12] px-3.5 py-1 text-xs font-bold text-white shadow-md">
                  <Flame className="size-3.5 fill-orange-400 text-orange-400" />
                  <span>Consecrated Offering</span>
                </span>
                {product.discount && (
                  <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Navigation Arrows for Gallery */}
              {imagesList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 text-[#7c2d12] shadow-md hover:bg-white hover:scale-110 transition flex items-center justify-center backdrop-blur-sm opacity-90 hover:opacity-100"
                  >
                    <ChevronLeft className="size-5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white/80 text-[#7c2d12] shadow-md hover:bg-white hover:scale-110 transition flex items-center justify-center backdrop-blur-sm opacity-90 hover:opacity-100"
                  >
                    <ChevronRight className="size-5 stroke-[2.5]" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white tracking-widest uppercase">
                {selectedImageIndex + 1} / {imagesList.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {imagesList.length > 1 && (
              <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 pt-1">
                {imagesList.map((imgUrl, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={`${imgUrl}-${idx}`}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Switch to view ${idx + 1}`}
                      className={`relative aspect-square size-20 sm:size-24 shrink-0 overflow-hidden rounded-2xl bg-white border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-[#ea580c] ring-2 ring-[#ea580c]/30 ring-offset-2 scale-105 shadow-md"
                          : "border-orange-200/70 opacity-70 hover:opacity-100 hover:border-orange-400"
                      }`}
                    >
                      <Image src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sacred Origin Assurance Banner */}
            <div className="mt-2 rounded-2xl bg-gradient-to-r from-orange-100/80 to-amber-100/80 p-4 border border-orange-200/80 flex items-center gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#7c2d12] text-amber-300 shadow-sm">
                <Sparkles className="size-6 animate-pulse" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-[#7c2d12]">Vedic Consecration Guarantee</h4>
                <p className="text-xs text-orange-950/75 mt-0.5 leading-normal">
                  Every offering is purified by Vedic priests with traditional mantras before leaving our sanctuary, bringing pristine spiritual resonance to your home.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO & ACTION PANEL */}
          <div className="flex flex-col pt-1">
            {/* Category & Vendor */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                <span>{product.category}</span>
                {product.vendor && (
                  <>
                    <span className="text-orange-900/40">•</span>
                    <span className="text-[#7c2d12]">{product.vendor}</span>
                  </>
                )}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share offering"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-orange-200 bg-white text-[#7c2d12] hover:bg-orange-50 hover:border-orange-300 transition"
                  title="Share link"
                >
                  <Share2 className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  aria-label="Add to wishlist"
                  className={`inline-flex size-9 items-center justify-center rounded-full border transition ${
                    isFavorite
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-orange-200 bg-white text-[#7c2d12] hover:bg-orange-50 hover:border-orange-300"
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`size-4 ${isFavorite ? "fill-red-500" : ""}`} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-[#7c2d12] leading-tight">
              {product.name}
            </h1>

            {/* Ratings Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-orange-950/75 pb-5 border-b border-orange-200/80">
              <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[#7c2d12] border border-amber-200/80">
                <Star className="size-4 fill-amber-500 text-amber-500" />
                <span className="font-bold">{product.rating}</span>
                <span className="text-orange-950/60">({product.reviewsCount})</span>
              </div>
              <span className="text-orange-900/35">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <Check className="size-4" />
                <span>Verified Live Shopify Catalog</span>
              </span>
            </div>

            {/* Price & Availability */}
            <div className="mb-6 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-5xl font-bold tracking-tight text-[#7c2d12]">
                {displayPrice}
              </span>
              {displayOldPrice && (
                <span className="text-lg sm:text-xl text-orange-950/45 line-through font-medium">
                  {displayOldPrice}
                </span>
              )}
              {product.availableForSale !== false ? (
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock</span>
                </span>
              ) : (
                <span className="ml-auto inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800 border border-red-200">
                  Sold Out
                </span>
              )}
            </div>

            {/* Variant Selector (if Shopify has real variants) */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6 rounded-2xl bg-white/80 p-4 border border-orange-200/80 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7c2d12]">
                    Select Offering Variant
                  </span>
                  {currentVariant && (
                    <span className="text-xs font-semibold text-[#ea580c]">
                      Selected: {currentVariant.title}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-[#7c2d12] text-white shadow-md ring-2 ring-[#7c2d12] ring-offset-1"
                            : "bg-orange-50/80 text-orange-950 hover:bg-orange-100 border border-orange-200/70"
                        }`}
                      >
                        <span>{variant.title}</span>
                        <span className={`text-[11px] font-bold ${isSelected ? "text-amber-300" : "text-[#ea580c]"}`}>
                          {variant.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Counter & Action Buttons */}
            <div className="mb-8 rounded-2xl bg-white p-5 border border-orange-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7c2d12]">
                  Select Quantity
                </span>
                <div className="inline-flex items-center rounded-xl border border-orange-200 bg-orange-50/50 p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-[#7c2d12] shadow-sm hover:bg-orange-100 disabled:opacity-40 transition"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#7c2d12]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-[#7c2d12] shadow-sm hover:bg-orange-100 transition"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              {/* Shopify Actions Bar */}
              <ProductActions
                mode="detail"
                product={{
                  id: product.id,
                  title: product.name,
                  price: displayPrice,
                  image: displayImage,
                  alt: product.name,
                  variantId: displayVariantId,
                  availableForSale: product.availableForSale,
                  href: `/product/${product.slug}`,
                }}
                quantity={quantity}
              />
            </div>

            {/* Interactive Information Tabs */}
            <div className="rounded-3xl bg-white border border-orange-200/80 shadow-sm overflow-hidden mb-8">
              {/* Tab Headers */}
              <div className="flex border-b border-orange-200/80 bg-orange-50/50">
                <button
                  type="button"
                  onClick={() => setActiveTab("story")}
                  className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold uppercase tracking-wider transition ${
                    activeTab === "story"
                      ? "bg-white text-[#7c2d12] border-b-2 border-[#ea580c] shadow-sm"
                      : "text-orange-950/60 hover:text-[#7c2d12]"
                  }`}
                >
                  Sacred Story
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("blessings")}
                  className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold uppercase tracking-wider transition ${
                    activeTab === "blessings"
                      ? "bg-white text-[#7c2d12] border-b-2 border-[#ea580c] shadow-sm"
                      : "text-orange-950/60 hover:text-[#7c2d12]"
                  }`}
                >
                  Key Blessings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("specs")}
                  className={`flex-1 py-3.5 px-4 text-center text-xs sm:text-sm font-bold uppercase tracking-wider transition ${
                    activeTab === "specs"
                      ? "bg-white text-[#7c2d12] border-b-2 border-[#ea580c] shadow-sm"
                      : "text-orange-950/60 hover:text-[#7c2d12]"
                  }`}
                >
                  Offering Specs
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                {activeTab === "story" && (
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-orange-950/80">
                    {product.descriptionHtml ? (
                      <div
                        className="prose prose-orange max-w-none text-orange-950/80"
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                      />
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                )}

                {activeTab === "blessings" && (
                  <ul className="grid gap-3 sm:grid-cols-1">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 rounded-xl bg-orange-50/70 p-3 border border-orange-100 text-sm font-medium text-[#7c2d12]">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#ea580c] text-white shadow-sm mt-0.5">
                          <Check className="size-3.5 stroke-[3]" />
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "specs" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="rounded-xl bg-orange-50/70 p-3.5 border border-orange-100 flex flex-col justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-950/50 mb-1">
                          {spec.label}
                        </span>
                        <span className="text-sm font-bold text-[#7c2d12]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Shipping & Delivery Guarantee Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white p-4 border border-orange-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#ea580c] mb-2">
                  <Truck className="size-5" />
                </div>
                <h5 className="text-xs font-bold text-[#7c2d12]">Careful Dispatch</h5>
                <p className="text-[11px] text-orange-950/60 mt-0.5">Free delivery with protective sacred handling</p>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-orange-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#ea580c] mb-2">
                  <ShieldCheck className="size-5" />
                </div>
                <h5 className="text-xs font-bold text-[#7c2d12]">Sacred Packaging</h5>
                <p className="text-[11px] text-orange-950/60 mt-0.5">Wrapped in saffron cloth & sandalwood seal</p>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-orange-200/80 shadow-sm flex flex-col items-center text-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#ea580c] mb-2">
                  <Award className="size-5" />
                </div>
                <h5 className="text-xs font-bold text-[#7c2d12]">Vedic Resonance</h5>
                <p className="text-[11px] text-orange-950/60 mt-0.5">Consecrated by temple priests at dawn</p>
              </div>
            </div>

          </div>

        </div>

        {/* SIMILAR PRODUCTS SECTION */}
        <div className="mt-16 sm:mt-24 border-t border-orange-200/80 pt-12">
          <SimilarProductsSection products={similarProducts} />
        </div>
      </div>
    </div>
  );
}
