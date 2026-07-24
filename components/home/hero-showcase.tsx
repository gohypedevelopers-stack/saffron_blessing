"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { banners } from "@/components/home/content";

const SLIDE_DURATION = 6000;
const PROGRESS_STEP = 50;

export default function HeroShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const timer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setActiveSlide((slide) => (slide + 1) % banners.length);
          return 0;
        }

        return current + (PROGRESS_STEP / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_STEP);

    return () => window.clearInterval(timer);
  }, [activeSlide]);

  return (
    <section className="w-full">
      <div className="sm:hidden">
        <div className="relative h-[66vh] min-h-[460px] max-h-[700px] w-full overflow-hidden">
          <div className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
            {banners.map((banner) => (
              <div key={banner.src} className="relative h-full w-full shrink-0 snap-start">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={banner.src === banners[0].src}
                  className="object-contain object-center p-0.5"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#431407]/75 via-[#7c2d12]/25 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-16 z-10 px-5 text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-orange-100">
              Sacred Daily Rituals
            </p>
            <h1 className="mt-2 max-w-[20rem] text-[2.35rem] font-semibold leading-none tracking-tight">
              Bring peace, prayer, and devotion home
            </h1>
          </div>

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
            <div className="flex items-center gap-2 rounded-full px-1.5 py-1.5">
              {banners.map((banner, index) => (
                <button
                  key={banner.src}
                  type="button"
                  aria-label={`Show banner ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="relative h-[clamp(360px,72vh,760px)] w-full overflow-hidden sm:h-[calc(100vh-72px)]">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {banners.map((banner) => (
              <div key={banner.src} className="relative h-full w-full shrink-0">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  priority={banner.src === banners[0].src}
                  className="object-cover object-[70%_center] sm:object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#431407]/70 via-[#7c2d12]/15 to-transparent" />
              </div>
            ))}
          </div>

          <div className="absolute inset-y-0 left-0 z-10 flex w-full items-center px-8 sm:px-12 lg:px-20">
            <div className="max-w-[620px] text-white">
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-orange-100">
                Sacred Daily Rituals
              </p>
              <h1 className="mt-4 text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-tight">
                Bring peace, prayer, and devotion home
              </h1>
              <p className="mt-5 max-w-[34rem] text-[17px] leading-8 text-orange-50/90">
                Puja kits, aarti essentials, meditation malas, and temple decor in a warm saffron collection.
              </p>
              <a
                href="#sacred-store"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#f97316] px-6 text-[14px] font-semibold text-white shadow-lg shadow-orange-950/25 transition-colors hover:bg-[#ea580c]"
              >
                Explore Offerings
              </a>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center px-4 sm:bottom-7">
            <div className="flex items-center gap-2 rounded-full px-1.5 py-1.5">
              {banners.map((banner, index) => (
                <button
                  key={banner.src}
                  type="button"
                  aria-label={`Show banner ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeSlide ? "w-8 bg-white" : "w-2 bg-white/50"
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

