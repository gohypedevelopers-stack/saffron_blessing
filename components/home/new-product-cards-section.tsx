"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type SpiritualProduct = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  rating: number;
  reviews: number;
  href: string;
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
    rating: 4.5,
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
    rating: 4.3,
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
    rating: 4.1,
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
    rating: 4.6,
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
    rating: 4.2,
    reviews: 94,
    href: "/product/24stv",
  },
  {
    id: "15-dpf",
    title: "Copper Kalash Puja Set",
    category: "Puja Kits",
    image: "/spiritual-products.png",
    alt: "Copper kalash puja set",
    price: "Rs. 2,499",
    oldPrice: "Rs. 4,199",
    discount: "40% off",
    rating: 4.4,
    reviews: 76,
    href: "/product/15-dpf",
  },
  {
    id: "32-tv",
    title: "Marigold Mandir Decor Pack",
    category: "Temple Decor",
    image: "/spiritual-products.png",
    alt: "Marigold mandir decor pack",
    price: "Rs. 899",
    oldPrice: "Rs. 1,899",
    discount: "53% off",
    rating: 4.3,
    reviews: 157,
    href: "/product/32-tv",
  },
  {
    id: "8-dpf",
    title: "Kumkum Haldi Bowl Set",
    category: "Puja Essentials",
    image: "/spiritual-products.png",
    alt: "Kumkum haldi bowl set",
    price: "Rs. 499",
    oldPrice: "Rs. 999",
    discount: "50% off",
    rating: 4.0,
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
          className={`size-3.5 ${star <= Math.round(value) ? "fill-[#f97316] text-[#f97316]" : "fill-orange-100 text-orange-100"}`}
        />
      ))}
    </div>
  );
}

export default function NewProductCardsSection() {
  return (
    <section id="sacred-store" className="bg-[#fff7ed] px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-14 lg:px-8 lg:pb-8 lg:pt-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
              Sacred Store
            </p>
            <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-[#431407] sm:text-[28px]">
              Explore devotional essentials
            </h2>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {spiritualProducts.map((product) => (
            <Link key={product.id} href={product.href} className="group block h-full" aria-label={`View ${product.title}`}>
              <article className="overflow-hidden border border-orange-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(194,65,12,0.14)]">
                <div className="relative flex h-[220px] items-center justify-center bg-[#fffaf3] p-4">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {product.discount && (
                    <span className="absolute left-3 top-3 bg-[#ea580c] px-2.5 py-1 text-[11px] font-semibold text-white">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#ea580c]">
                    {product.category}
                  </p>
                  <h3 className="mt-1.5 line-clamp-2 text-[14px] font-medium leading-5 text-[#431407]">
                    {product.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <Rating value={product.rating} />
                    <span className="text-[11px] text-orange-900/55">({product.reviews})</span>
                  </div>

                  <div className="mt-auto flex items-end gap-2 pt-3">
                    <span className="text-[18px] font-bold text-[#431407]">{product.price}</span>
                    {product.oldPrice && (
                      <span className="pb-0.5 text-[13px] text-orange-900/35 line-through">{product.oldPrice}</span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <span className="inline-flex h-10 items-center justify-center rounded-md border border-[#ea580c] text-[13px] font-medium text-[#ea580c] transition-colors group-hover:bg-[#fff7ed]">
                      Add to cart
                    </span>
                    <span className="inline-flex h-10 items-center justify-center rounded-md bg-[#ea580c] text-[13px] font-medium text-white transition-opacity group-hover:opacity-90">
                      Buy now
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
