"use client";

import Image from "next/image";
import { banners } from "@/components/home/content";

export default function HeroShowcase() {
  const banner = banners[0];

  return (
    <section className="w-full">
      <div className="sm:hidden">
        <div className="relative h-[66vh] min-h-[460px] max-h-[700px] w-full overflow-hidden">
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
            sizes="(max-width: 639px) 100vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#431407]/75 via-[#7c2d12]/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-16 z-10 px-5 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-100">
              Sacred Daily Rituals
            </p>
            <h1 className="mt-2 max-w-[19rem] text-[2rem] font-semibold leading-[1.02] tracking-tight">
              Bring peace, prayer, and devotion home
            </h1>
          </div>

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
            <div className="flex items-center gap-2 rounded-full px-1.5 py-1.5">
              {banners.map((item, index) => (
                <span
                  key={`${item.src}-mobile-dot-${index}`}
                  aria-hidden="true"
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === 0 ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="relative h-[calc(100vh-75px)] min-h-[620px] w-full overflow-hidden">
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            loading="eager"
            fetchPriority="high"
            className="object-cover object-center"
            sizes="(min-width: 640px) 100vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#431407]/70 via-[#7c2d12]/15 to-transparent" />

          <div className="absolute inset-y-0 left-0 z-10 flex w-full items-center px-8 sm:px-12 lg:px-20">
            <div className="max-w-[560px] text-white">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-100">
                Sacred Daily Rituals
              </p>
              <h1 className="mt-4 text-[clamp(2.6rem,4.6vw,4.8rem)] font-semibold leading-[0.96] tracking-tight">
                Bring peace, prayer, and devotion home
              </h1>
              <p className="mt-5 max-w-[31rem] text-[16px] leading-7 text-orange-50/90">
                Puja kits, aarti essentials, meditation malas, and temple decor in a warm saffron collection.
              </p>
              <a
                href="#sacred-store"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#f97316] px-5 text-[13px] font-semibold text-white shadow-lg shadow-orange-950/25 transition-colors hover:bg-[#ea580c]"
              >
                Explore Offerings
              </a>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4 sm:bottom-7">
            <div className="flex items-center gap-2 rounded-full px-1.5 py-1.5">
              {banners.map((item, index) => (
                <span
                  key={`${item.src}-desktop-dot-${index}`}
                  aria-hidden="true"
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === 0 ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

