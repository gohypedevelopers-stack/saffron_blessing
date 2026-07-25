import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { products } from "@/components/home/content";
import type { ProductItem } from "@/components/home/content";
import ProductActions from "@/components/shopify/product-actions";

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

export default function ProductShowcaseSection({ products: incomingProducts = [] }: { products?: ProductItem[] }) {
  const displayProducts = incomingProducts.length > 0 ? incomingProducts : products;

  return (
    <section className="bg-[#fffaf3] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#ea580c]">
              Featured Offerings
            </p>
            <h2 className="mt-1 text-[22px] font-semibold tracking-tight text-[#431407] sm:text-[28px]">
              Essentials for prayer, peace, and devotion
            </h2>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {displayProducts.map((product) => (
            <article
              key={product.id}
              className="group flex min-h-[430px] flex-col overflow-hidden rounded-[2px] border border-orange-200/80 bg-white shadow-[0_1px_2px_rgba(194,65,12,0.05)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(194,65,12,0.14)] sm:min-h-[455px] lg:min-h-[500px]"
            >
              <div className="flex flex-1 flex-col p-4 sm:p-[18px] lg:p-5">
                <Link
                  href={product.href || `/product/${product.id}`}
                  className="block"
                  aria-label={`View ${product.title}`}
                >
                  <div className="relative flex h-[210px] items-center justify-center overflow-hidden rounded-[2px] bg-[#fff7ed] p-4 sm:h-[235px] lg:h-[270px]">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    {product.discount ? (
                      <span className="absolute left-3 top-3 bg-[#ea580c] px-2.5 py-1 text-[11px] font-semibold text-white">
                        {product.discount}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-orange-900/45">
                      {product.category || "Saffron Blessings"}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-[15px] font-medium leading-5 text-[#431407] sm:text-[16px]">
                      {product.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2">
                      <Rating value={product.rating} />
                      <span className="text-[11px] text-orange-900/55">({product.reviews})</span>
                    </div>

                    <p className="mt-2 text-[12px] leading-5 text-orange-950/70">
                      {product.subtitle}
                    </p>
                  </div>
                </Link>

                <div className="mt-auto">
                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-[16px] font-semibold text-[#431407] sm:text-[18px]">
                      {product.price}
                    </span>
                    {product.oldPrice ? (
                      <span className="pb-0.5 text-[12px] text-orange-900/35 line-through">
                        {product.oldPrice}
                      </span>
                    ) : null}
                  </div>

                  <ProductActions product={product} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}



