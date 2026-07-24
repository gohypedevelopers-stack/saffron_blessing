"use client";

import Image from "next/image";

const videos = [
  { id: 1, image: "/spiritual-hero.png", alt: "Morning prayer moment" },
  { id: 2, image: "/spiritual-products.png", alt: "Puja kit essentials" },
  { id: 3, image: "/spiritual-hero.png", alt: "Mandir aarti moment" },
  { id: 4, image: "/spiritual-products.png", alt: "Meditation and devotional items" },
];

export default function CreatorVideosSection() {
  return (
    <section id="devotional-moments" className="bg-[#ffedd5] py-12 text-[#431407] md:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
          Moments of Devotion
        </h2>
        
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-2 lg:grid lg:grid-cols-4 lg:gap-6">
          {videos.map((vid) => (
            <div 
              key={vid.id} 
              className="group relative aspect-[9/16] min-w-[72vw] cursor-pointer snap-start overflow-hidden rounded-[18px] bg-orange-200 sm:min-w-[48vw] md:rounded-2xl lg:min-w-0"
            >
              <Image
                src={vid.image}
                alt={vid.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 48vw, 25vw"
              />
              
              <div className="absolute inset-0 bg-[#431407]/20 transition-colors duration-500 group-hover:bg-[#431407]/30" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/25 text-white backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40 md:h-16 md:w-16">
                  <svg className="ml-1 h-4 w-4 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

