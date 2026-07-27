"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import ProductActions from "@/components/shopify/product-actions";

type SpiritualProduct = {
  id: string;
  title: string;
  category?: string;
  image: string;
  alt: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  reviews: number | string;
  href?: string;
  variantId?: string;
  availableForSale?: boolean;
};

const spiritualProducts: SpiritualProduct[] = [
  {
    id: "55gtv",
    title: "Divine Puja Samagri Kit",
    category: "Puja Kits",
    image: "/spiritual-products.png",
    alt: "Divine puja samagri kit",
    price: "Rs. 2,999",
    oldPrice: "Rs. 4,999",
    discount: "40% off",
    rating: 4.8,
    reviews: 128,
    href: "/product/55-smart-tv",
  },
  {
    id: "c9-plus",
    title: "Brass Diya & Aarti Set",
    category: "Aarti Essentials",
    image: "/spiritual-products.png",
    alt: "Brass diya and aarti set",
    price: "Rs. 1,990",
    oldPrice: "Rs. 3,499",
    discount: "45% off",
    rating: 4.7,
    reviews: 256,
    href: "/product/c9-projector",
  },
  {
    id: "techno-projector",
    title: "Rudraksha Meditation Mala",
    category: "Meditation",
    image: "/spiritual-products.png",
    alt: "Rudraksha meditation mala",
    price: "Rs. 990",
    oldPrice: "Rs. 1,999",
    discount: "50% off",
    rating: 4.9,
    reviews: 189,
    href: "/product/techno-projector",
  },
  {
    id: "iprojector-2-plus",
    title: "Festival Mandir Decor Set",
    category: "Temple Decor",
    image: "/spiritual-products.png",
    alt: "Festival mandir decor set",
    price: "Rs. 3,490",
    oldPrice: "Rs. 5,999",
    discount: "42% off",
    rating: 4.9,
    reviews: 312,
    href: "/product/iprojector-2-plus",
  },
  {
    id: "24stv",
    title: "Daily Prayer Incense Set",
    category: "Incense",
    image: "/spiritual-products.png",
    alt: "Daily prayer incense set",
    price: "Rs. 649",
    oldPrice: "Rs. 1,299",
    discount: "50% off",
    rating: 4.6,
    reviews: 94,
    href: "/product/24stv",
  },
  {
    id: "15-dpf",
    title: "Copper Kalash Puja Set",
    category: "Puja Vessels",
    image: "/spiritual-products.png",
    alt: "Copper kalash puja set",
    price: "Rs. 2,499",
    oldPrice: "Rs. 4,199",
    discount: "40% off",
    rating: 4.8,
    reviews: 76,
    href: "/product/15-dpf",
  },
  {
    id: "32-tv",
    title: "Marigold Mandir Garland Pack",
    category: "Temple Decor",
    image: "/spiritual-products.png",
    alt: "Marigold mandir garland pack",
    price: "Rs. 899",
    oldPrice: "Rs. 1,899",
    discount: "53% off",
    rating: 4.7,
    reviews: 157,
    href: "/product/32-tv",
  },
  {
    id: "8-dpf",
    title: "Pure Brass Kumkum Haldi Bowl",
    category: "Puja Essentials",
    image: "/spiritual-products.png",
    alt: "Kumkum haldi bowl set",
    price: "Rs. 499",
    oldPrice: "Rs. 999",
    discount: "50% off",
    rating: 4.5,
    reviews: 203,
    href: "/product/8-dpf",
  },
];

function Rating({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="flex items-center gap-0.5">
      {stars.map((star) => (
        <Star
          key={star}
          className={`size-3.5 ${
            star <= Math.round(value)
              ? "fill-[#f97316] text-[#f97316]"
              : "fill-orange-100 text-orange-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function NewProductCardsSection({
  products = [],
}: {
  products?: SpiritualProduct[];
}) {
  const displayProducts = products.length > 0 ? products : spiritualProducts;

  return (
    <section id="sacred-store" className="bg-[#fff7ed] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 border-b border-orange-200/60">
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-orange-200/60 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c] mb-2">
              <ShoppingBag className="size-4" />
              <span>Sacred Collection</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#431407] sm:text-4xl lg:text-5xl">
              Explore Devotional Essentials
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-orange-950/75 sm:text-base">
              Handpicked pure copper kalash vessels, daily prayer incense, and consecrated mandir samagri for your home sanctuary.
            </p>
          </div>
          <Link
            href="/#guidance"
            className="inline-flex items-center gap-2 rounded-full border border-orange-300 bg-white px-6 py-3 text-sm font-bold text-[#7c2d12] shadow-xs transition hover:bg-orange-50 hover:border-[#7c2d12] self-start sm:self-auto shrink-0"
          >
            <span>Need Guidance?</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {displayProducts.map((product) => (
            <article
              key={product.id}
              className="group flex w-[76vw] max-w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-orange-200/80 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-xl sm:w-auto sm:max-w-none"
            >
              <div>
                {/* Image Container */}
                <Link
                  href={product.href || `/product/${product.id}`}
                  className="block relative aspect-square w-full overflow-hidden rounded-2xl border border-orange-100 bg-gradient-to-b from-orange-50/50 to-white p-4 shadow-inner"
                  aria-label={`View ${product.title}`}
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {product.discount && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#ea580c] px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {product.discount}
                    </span>
                  )}
                </Link>

                {/* Card Details */}
                <div className="mt-5">
                  <span className="inline-block rounded-md bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#ea580c] mb-2 border border-orange-200/50">
                    {product.category || "Sacred Offering"}
                  </span>
                  <Link
                    href={product.href || `/product/${product.id}`}
                    className="block font-serif text-lg font-bold text-[#431407] transition-colors hover:text-[#ea580c] line-clamp-1"
                  >
                    {product.title}
                  </Link>

                  <div className="mt-2 flex items-center gap-2">
                    <Rating value={product.rating} />
                    <span className="text-xs font-medium text-orange-950/60">
                      ({product.reviews} verified reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="mt-6 border-t border-orange-100 pt-4">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-orange-950/50">
                      Sanctuary Offering
                    </span>
                    <span className="font-serif text-xl font-bold text-[#431407]">
                      {product.price}
                    </span>
                  </div>
                  {product.oldPrice && (
                    <span className="text-xs font-medium text-orange-900/40 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                <ProductActions product={product} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
