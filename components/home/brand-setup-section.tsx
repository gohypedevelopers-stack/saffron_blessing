"use client";

import Image from "next/image";
import { useState } from "react";
import { Flame } from "lucide-react";

const items = [
  {
    id: 1,
    title: "Morning Puja Altar",
    subtitle: "Conical brass diya, pure incense, and serene devotional focus",
    image: "/spiritual-hero.png",
  },
  {
    id: 2,
    title: "Sacred Mandir Decor",
    subtitle: "Saffron marigold garlands and polished temple brass accents",
    image: "/spiritual-hero.png",
  },
  {
    id: 3,
    title: "Meditation & Stillness",
    subtitle: "Authentic 108-bead Rudraksha mala and prayer cloths for japa",
    image: "/spiritual-products.png",
  },
  {
    id: 4,
    title: "Festival Aarti Gatherings",
    subtitle: "Auspicious samagri for family worship and evening celebrations",
    image: "/spiritual-products.png",
  },
];

export default function BrandSetupSection() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section id="rituals" className="overflow-hidden bg-[#fffaf3] py-16 text-[#431407] md:py-24 border-b border-orange-200/60">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-left sm:text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c] mb-2 sm:justify-center">
            <Flame className="size-4 fill-orange-500 text-orange-500" />
            <span>Ritual Architectures</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#431407] sm:text-4xl lg:text-5xl">
            One Sacred Sanctuary for Your Devotional Life
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-orange-950/75 sm:text-base">
            Thoughtfully designed setups for morning puja, temple decoration, meditation stillness, and festive family worship.
          </p>
        </div>

        {/* Mobile Swipe Gallery */}
        <div className="md:hidden">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-orange-900/50">
            Swipe to Explore
          </p>
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-2">
            {items.map((item, index) => (
              <article
                key={item.id}
                className="relative min-w-[80vw] snap-start overflow-hidden rounded-3xl bg-slate-950 border border-orange-200/40 shadow-lg"
              >
                <div className="relative h-[380px] w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="80vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-300">
                      Saffron Blessings
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/80">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Desktop Interactive Hover Gallery */}
        <div className="hidden h-[360px] w-full gap-2 transition-all duration-500 md:flex md:h-[440px] lg:h-[500px] lg:gap-3">
          {items.map((item, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-orange-200/50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md ${
                  isActive ? "flex-[12] lg:flex-[16]" : "flex-[1.5]"
                }`}
              >
                <div
                  className={`absolute inset-0 z-10 bg-slate-950/20 transition-opacity duration-500 group-hover:bg-transparent ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />

                <div
                  className={`absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                  sizes="(max-width: 767px) 100vw, 50vw"
                />

                {/* Collapsed Vertical Label */}
                <div
                  className={`absolute inset-y-0 left-0 z-30 flex items-center justify-center p-4 transition-opacity duration-500 ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <span className="writing-mode-vertical -rotate-180 whitespace-nowrap font-serif text-base font-bold tracking-wider text-white drop-shadow-md">
                    {item.title}
                  </span>
                </div>

                {/* Expanded Card Content */}
                <div
                  className={`absolute bottom-6 left-6 right-6 z-30 flex flex-col justify-end text-left transition-all duration-500 ease-out md:bottom-8 md:left-8 ${
                    isActive ? "translate-y-0 opacity-100 delay-100" : "translate-y-8 opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="inline-block w-fit rounded-full bg-orange-500/30 border border-orange-400/40 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-orange-200 backdrop-blur-sm mb-2">
                    Sacred Practice 0{item.id}
                  </span>
                  <h3 className="whitespace-nowrap font-serif text-2xl font-bold text-white drop-shadow-md md:text-3xl lg:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-white/90 drop-shadow md:text-base">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
