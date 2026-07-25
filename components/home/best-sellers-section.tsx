"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { bestSellers } from "@/components/home/best-sellers-data";
import { Award, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function SpecificationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-2 gap-4 border-t border-orange-200/80 py-3.5 first:border-t-0 first:pt-0 last:pb-0">
      <div className="text-xs font-semibold uppercase tracking-wider text-orange-950/60">{label}</div>
      <div className="text-right text-sm font-bold text-[#431407]">{value}</div>
    </div>
  );
}

export default function BestSellersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const visualRefs = useRef<Array<HTMLDivElement | null>>([]);
  const glowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.max(bestSellers.length - 1, 1) * window.innerHeight}`,
        scrub: 0.6,
        pin: viewport,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            bestSellers.length - 1,
            Math.round(self.progress * (bestSellers.length - 1))
          );
          if (activeIndexRef.current !== nextIndex) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });

      gsap.set(cardRefs.current, { autoAlpha: 0, y: 24, scale: 0.98 });
      gsap.set(visualRefs.current, { autoAlpha: 0, y: 150, x: -150, scale: 0.94 });
      gsap.set(glowRefs.current, { autoAlpha: 0 });
      gsap.set(cardRefs.current[0], { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set(visualRefs.current[0], { autoAlpha: 1, y: 0, x: 0, scale: 1 });
      gsap.set(glowRefs.current[0], { autoAlpha: 1 });

      return () => trigger.kill();
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.to(card, {
        autoAlpha: index === activeIndex ? 1 : 0,
        y: index === activeIndex ? 0 : 24,
        scale: index === activeIndex ? 1 : 0.98,
        duration: 0.7,
        ease: "power2.out",
        overwrite: true,
      });
    });

    visualRefs.current.forEach((visual, index) => {
      if (!visual) return;
      gsap.to(visual, {
        autoAlpha: index === activeIndex ? 1 : 0,
        y: index === activeIndex ? 0 : 150,
        x: index === activeIndex ? 0 : -150,
        scale: index === activeIndex ? 1 : 0.94,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
      });
    });

    glowRefs.current.forEach((glow, index) => {
      if (!glow) return;
      gsap.to(glow, {
        autoAlpha: index === activeIndex ? 1 : 0,
        duration: 0.7,
        ease: "power2.out",
        overwrite: true,
      });
    });

    const activeTitle = titleRefs.current[activeIndex];
    const track = trackRef.current;
    if (activeTitle && track && track.parentElement) {
      const centerOfActive = activeTitle.offsetLeft + activeTitle.offsetWidth / 2;
      const centerOfContainer = track.parentElement.offsetWidth / 2;
      gsap.to(track, {
        x: centerOfContainer - centerOfActive,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [activeIndex, reduceMotion]);

  const titleRailStyle = {
    WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
    maskImage: "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
  } as const;

  const titleClass =
    "shrink-0 whitespace-nowrap text-[clamp(2.5rem,4.5vw,5.5rem)] font-serif font-bold leading-none tracking-tight transition-all duration-500 ease-out";

  if (reduceMotion) {
    return (
      <section className="bg-[#fffaf3] text-[#431407] py-16 border-b border-orange-200/60">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c] mb-2">
              <Award className="size-4" />
              <span>Sanctuary Favorites</span>
            </div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#431407] sm:text-4xl">
              Curated Best Sellers
            </h2>
          </div>

          <div className="space-y-12">
            {bestSellers.map((item) => (
              <div key={item.id} className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-center">
                <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-orange-200/80 pb-6">
                    <span className="font-serif text-3xl font-bold text-[#431407]">{item.price}</span>
                    <span className="text-sm text-orange-900/40 line-through">{item.oldPrice}</span>
                    <span className="rounded-full bg-[#ea580c] px-3 py-1 text-xs font-bold text-white ml-auto">
                      {item.discount}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-bold text-[#431407]">{item.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-orange-950/75 sm:text-base">
                    {item.description}
                  </p>
                  <div className="mt-6 border-t border-orange-100 pt-4">
                    {item.specs.map((spec) => (
                      <SpecificationRow key={spec.label} label={spec.label} value={spec.value} />
                    ))}
                  </div>
                  <a
                    href={`/product?id=${item.id}`}
                    className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#7c2d12] px-6 text-base font-bold text-white shadow-md transition-all hover:bg-[#9a3412]"
                  >
                    <span>View Offering Details</span>
                    <ArrowRight className="size-4" />
                  </a>
                </div>
                <div className="relative min-h-[350px] aspect-square rounded-3xl border border-orange-100 bg-gradient-to-b from-orange-50/50 to-white overflow-hidden p-6 shadow-inner">
                  <Image src={item.image} alt={item.imageAlt} fill className="object-contain p-6" sizes="100vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#fffaf3] text-[#431407] border-b border-orange-200/60"
      style={{ height: `${bestSellers.length * 96}vh` }}
    >
      <div
        ref={viewportRef}
        className="mx-auto flex h-screen max-w-[1500px] flex-col justify-between px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">
            <Award className="size-4" />
            <span>Sanctuary Favorites</span>
          </div>
        </div>

        <div className="relative my-4 w-full overflow-visible" style={titleRailStyle}>
          <div
            ref={trackRef}
            className="flex w-max items-center gap-14 py-1 transition-transform duration-500 ease-out will-change-transform"
          >
            {bestSellers.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <h2
                  key={item.id}
                  ref={(node) => {
                    titleRefs.current[index] = node;
                  }}
                  className={`${titleClass} ${
                    isActive
                      ? "translate-y-[-0.02em] text-[#431407] opacity-100"
                      : "translate-y-[0.02em] text-orange-200 opacity-50"
                  }`}
                >
                  {item.name}
                </h2>
              );
            })}
          </div>
        </div>

        <div className="grid flex-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="relative order-2 min-h-[420px] sm:min-h-[460px] lg:order-1 lg:min-h-[520px]">
            {bestSellers.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={`absolute inset-0 flex items-center transition-all duration-700 ease-out [will-change:transform,opacity] ${
                    isActive
                      ? "opacity-100 translate-y-0 scale-100"
                      : "pointer-events-none opacity-0 translate-y-6 scale-[0.98]"
                  }`}
                >
                  <div className="relative z-10 w-full max-w-[620px] rounded-3xl border border-orange-200/80 bg-white/95 px-6 py-6 shadow-xl backdrop-blur-md sm:px-8 sm:py-8 md:px-10">
                    <div className="flex items-start justify-between gap-4 border-b border-orange-200/80 pb-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c] block mb-1">
                          Most Wanted Artifact
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-serif text-3xl font-bold text-[#431407]">
                            {item.price}
                          </span>
                          <span className="text-sm text-orange-900/40 line-through">
                            {item.oldPrice}
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#ea580c] px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                        {item.discount}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-orange-950/75 sm:text-base">
                      {item.description}
                    </p>

                    <div className="mt-5 border-t border-orange-100 pt-3">
                      {item.specs.map((spec) => (
                        <SpecificationRow key={spec.label} label={spec.label} value={spec.value} />
                      ))}
                    </div>

                    <a
                      href={`/product?id=${item.id}`}
                      className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#7c2d12] px-6 text-base font-bold text-white shadow-lg shadow-orange-950/15 transition-all duration-300 hover:bg-[#9a3412] hover:scale-[1.01] active:scale-98"
                    >
                      <span>View Details &amp; Buy</span>
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:justify-end">
            <div className="relative min-h-[360px] w-full max-w-[700px] sm:min-h-[440px] lg:min-h-[520px]">
              {bestSellers.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={item.id}
                    ref={(node) => {
                      visualRefs.current[index] = node;
                    }}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out [will-change:transform,opacity] ${
                      isActive
                        ? "opacity-100 translate-y-0 translate-x-0 scale-100"
                        : "opacity-0 translate-y-32 -translate-x-32 scale-[0.94]"
                    }`}
                  >
                    <div
                      ref={(node) => {
                        glowRefs.current[index] = node;
                      }}
                      className={`absolute inset-0 rounded-full blur-3xl pointer-events-none [will-change:opacity,transform] ${
                        isActive
                          ? "bg-[radial-gradient(circle,_rgba(249,115,22,0.18)_0%,_rgba(249,115,22,0.05)_50%,_transparent_75%)]"
                          : "bg-transparent"
                      }`}
                    />
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-contain filter drop-shadow-[0_25px_45px_rgba(15,23,42,0.12)] [will-change:transform,opacity]"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={index === 0}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
