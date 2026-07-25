"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { categories } from "@/components/home/content";

export default function CategorySection() {
  return (
    <section className="bg-[#fffaf3] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 border-b border-orange-200/60">
      <div className="mx-auto max-w-[1500px]">
        {/* Simple & Clean Section Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-orange-200/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c] mb-1.5">
              <Compass className="size-4" />
              <span>Devotional Archives</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#431407] sm:text-4xl">
              Curated Collections for Your Sanctuary
            </h2>
          </div>
          <Link
            href="/#sacred-store"
            className="inline-flex items-center gap-2 rounded-xl border border-orange-300/80 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#7c2d12] shadow-2xs transition hover:bg-orange-50 hover:border-[#7c2d12] self-start sm:self-auto shrink-0"
          >
            <span>View All Offerings</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        {/* Refined Categories Grid (Sleek border radius & reduced text) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const slug = category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <Link
                key={category.title}
                href={`/product?id=${slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-orange-200/70 bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
              >
                {/* Sleek Image Container with refined border radius */}
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-orange-100/80 bg-[#fffefc]">
                  <Image
                    src={category.src}
                    alt={category.alt}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 100vw"
                  />
                </div>

                {/* Minimal Text Footer: Just title & icon arrow */}
                <div className="mt-3.5 flex items-center justify-between gap-2 px-1 pb-1">
                  <h3 className="font-serif text-base font-bold text-[#431407] transition-colors group-hover:text-[#ea580c] truncate">
                    {category.title}
                  </h3>
                  <div className="flex size-6 items-center justify-center rounded-md bg-orange-50 text-orange-950/40 transition-all group-hover:bg-[#ea580c] group-hover:text-white shrink-0">
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
