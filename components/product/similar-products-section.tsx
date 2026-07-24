import Image from "next/image";
import Link from "next/link";
import type { SimilarProductCard } from "@/lib/products-data";

interface SimilarProductsSectionProps {
  products: SimilarProductCard[];
}

export default function SimilarProductsSection({ products }: SimilarProductsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-10 border-t border-orange-200 bg-[#fffaf3] pt-8 sm:mt-12 sm:pt-10 lg:mt-16 lg:pt-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-[clamp(1.6rem,3.8vw,4.25rem)] font-medium uppercase leading-[0.95] text-[#431407] sm:text-[clamp(2rem,3.8vw,4.25rem)]">
            Similar Sacred Offerings
          </h2>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:grid-cols-4 lg:gap-4 lg:px-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group flex min-h-[320px] flex-col rounded-[12px] border border-orange-200/80 bg-white p-3 shadow-[0_1px_2px_rgba(194,65,12,0.05)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(194,65,12,0.14)] sm:min-h-[360px]"
            >
              <p className="text-[11px] leading-none text-orange-900/45">{product.category}</p>
              <h3 className="mt-1 text-[16px] font-medium tracking-tight text-[#431407] sm:text-[20px]">
                {product.name}
              </h3>

              <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-[10px] bg-orange-50 py-3 sm:py-4">
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={360}
                  height={360}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="mt-4 flex items-end justify-between gap-3">
                <span className="text-[16px] font-medium tracking-tight text-[#431407] sm:text-[20px]">
                  {product.price}
                </span>
                <span className="rounded-full border border-orange-200 bg-white px-3 py-1.5 text-[11px] font-medium text-[#7c2d12] transition-colors group-hover:border-[#ea580c] group-hover:bg-[#ea580c] group-hover:text-white sm:px-4 sm:py-2 sm:text-[12px]">
                  Buy
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

