import Image from "next/image";
import Link from "next/link";
import { categories } from "@/components/home/content";

export default function CategorySection() {
  return (
    <section className="bg-[#fffaf3] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1400px]">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:pb-0 sm:pr-0 lg:grid-cols-5 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.title}
              className="flex min-w-[34vw] snap-start flex-col items-center text-center sm:min-w-0"
            >
              <div className="flex size-[92px] items-center justify-center overflow-hidden rounded-full bg-[#ffedd5] shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_12px_30px_rgba(194,65,12,0.12)] sm:size-[132px] lg:size-[146px]">
                <Image
                  src={category.src}
                  alt={category.alt}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-3 text-[10px] font-medium text-[#7c2d12] sm:mt-5 sm:text-[12px] lg:text-[13px]">
                {category.title}
              </h3>
              <Link
                href={`/product?id=${category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="mt-1 text-[8px] font-medium text-[#ea580c] transition-opacity hover:opacity-70 sm:text-[10px]"
              >
                View Collection
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
