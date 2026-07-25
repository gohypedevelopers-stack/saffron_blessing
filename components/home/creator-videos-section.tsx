"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Maximize2,
  Volume2,
  VolumeX,
  Flame,
  ShoppingBag,
  X,
  ChevronRight,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { toast } from "sonner";
import { addLocalCartItem } from "@/lib/cart-store";
import { products } from "@/components/home/content";

type ProcessStep = {
  id: number;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  poster: string;
  videoUrl: string;
  durationSec: number;
  featuredProduct: (typeof products)[0];
  mantra: string;
};

const processSteps: ProcessStep[] = [
  {
    id: 1,
    stepNumber: "01",
    title: "Pure Samagri Harvesting",
    subtitle: "Sourcing organic marigold, camphor, and sandalwood from sacred ghats.",
    description:
      "Our artisans hand-select pristine marigold blossoms, pure camphor crystals, and natural sandalwood from Varanasi and Haridwar. Every element is tested for aromatic purity and organic devotion.",
    poster: "/spiritual-hero.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-lit-candle-in-the-dark-41724-large.mp4",
    durationSec: 6,
    featuredProduct: products[0], // 55-smart-tv (Puja kit)
    mantra: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि...",
  },
  {
    id: 2,
    stepNumber: "02",
    title: "Vedic Consecration & Aarti",
    subtitle: "Every diya and yantra is blessed with Vedic mantras by temple priests.",
    description:
      "Before any brass diya or puja kit leaves our sanctuary, temple priests perform a traditional consecration ritual (Prana Pratishta) at dawn, infusing the items with positive spiritual resonance.",
    poster: "/spiritual-products.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-incense-smoke-in-the-dark-41722-large.mp4",
    durationSec: 6,
    featuredProduct: products[1], // c9-projector (Diya set)
    mantra: "शुभं करोति कल्याणमारोग्यं धनसंपदा। शत्रुबुद्धि विनाशाय दीपज्योतिर्नमोऽस्तुते॥",
  },
  {
    id: 3,
    stepNumber: "03",
    title: "Auspicious Eco-Packaging",
    subtitle: "Wrapped in organic saffron cotton cloth with protective sandalwood seal.",
    description:
      "We pack each sacred order with utmost reverence using biodegradable saffron cotton cloth, cushioned marigold petals, and a wax sandalwood seal to protect the consecrated energy during transit.",
    poster: "/spiritual-hero.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-lit-candle-in-the-dark-41724-large.mp4",
    durationSec: 6,
    featuredProduct: products[3], // iprojector-2-plus (Mandir decor)
    mantra: "ॐ शांतिः शांतिः शांतिः॥",
  },
  {
    id: 4,
    stepNumber: "04",
    title: "Arrival at Your Home Altar",
    subtitle: "Unboxing your sacred collection to awaken divine peace and prosperity.",
    description:
      "When you open your Saffron Blessings box, the fragrance of temple camphor and sandalwood fills your room, transforming your home mandir into a sanctuary of peace, prayer, and family devotion.",
    poster: "/spiritual-products.png",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-incense-smoke-in-the-dark-41722-large.mp4",
    durationSec: 6,
    featuredProduct: products[2], // techno-projector (Rudraksha mala)
    mantra: "त्वमेव माता च पिता त्वमेव। त्वमेव बन्धुश्च सखा त्वमेव॥",
  },
];

export default function CreatorVideosSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const current = processSteps[activeStep];

  // Autoplay Timeline Loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && !modalOpen) {
      const stepDurationMs = current.durationSec * 1000;
      const updateIntervalMs = 50;
      const increment = (updateIntervalMs / stepDurationMs) * 100;

      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev + increment >= 100) {
            // Move to next step automatically
            setActiveStep((currStep) => (currStep + 1) % processSteps.length);
            return 0;
          }
          return prev + increment;
        });
      }, updateIntervalMs);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, modalOpen, current.durationSec]);

  // Sync video source change when activeStep changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Autoplay fallback if browser blocks unmuted video
        });
      }
    }
  }, [activeStep, isPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    toast.info(!isPlaying ? "▶️ Autoplay resumed" : "⏸️ Autoplay paused");
  };

  const handleQuickAdd = (prod: (typeof products)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addLocalCartItem({
      variantId: prod.id,
      title: prod.title,
      price: prod.price,
      image: prod.image,
      alt: prod.alt,
      href: `/product/${prod.id}`,
    });
    toast.success(`🛍️ "${prod.title}" added to your sacred shopping bag.`);
  };

  return (
    <section id="devotional-moments" className="bg-[#fffaf3] py-16 text-[#431407] md:py-24 border-t border-orange-200/60 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1552px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 border-b border-orange-200/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3.5 py-1.5 text-[12px] font-bold text-[#ea580c] mb-3 shadow-sm border border-orange-200/60">
              <Flame className="size-4 fill-orange-400 animate-pulse" />
              <span>Sacred Preparation & Blessing Rhythm</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#7c2d12] sm:text-4xl lg:text-5xl font-serif">
              Watch The Real Process
            </h2>
            <p className="mt-3 text-[15px] text-orange-950/75 max-w-2xl leading-relaxed">
              Witness how our Vedic priests and artisans harvest, consecrate, and package your puja samagri before it arrives at your home altar.
            </p>
          </div>

          {/* Autoplay Controls & Status Bar */}
          <div className="flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-orange-200 shadow-sm self-start lg:self-auto">
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#7c2d12]">
              <span className="relative flex size-3">
                {isPlaying && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span className={`relative inline-flex rounded-full size-3 ${isPlaying ? "bg-emerald-500" : "bg-amber-500"}`} />
              </span>
              <span>{isPlaying ? "Autoplay Active" : "Paused"}</span>
            </div>

            <div className="h-4 w-px bg-orange-200" />

            <button
              type="button"
              onClick={handleTogglePlay}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#7c2d12] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#ea580c] shadow-sm"
              title={isPlaying ? "Pause automatic cycling" : "Play automatically"}
            >
              {isPlaying ? (
                <>
                  <Pause className="size-3.5 fill-white" />
                  <span>Pause Auto</span>
                </>
              ) : (
                <>
                  <Play className="size-3.5 fill-white" />
                  <span>Play Auto</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="inline-flex size-8 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 text-orange-900 transition hover:bg-orange-100"
              title={isMuted ? "Unmute audio" : "Mute audio"}
            >
              {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4 text-[#ea580c]" />}
            </button>
          </div>
        </div>

        {/* Main Grid: Left Featured Cinema Player | Right Timeline Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          
          {/* FEATURED CINEMA PLAYER */}
          <div className="group relative rounded-3xl overflow-hidden border-2 border-orange-300/80 bg-slate-950 shadow-[0_20px_50px_rgba(194,65,12,0.18)] aspect-[16/10] sm:aspect-[16/9] flex flex-col justify-between">
            {/* Video Element */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              poster={current.poster}
              className="absolute inset-0 size-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.02]"
            >
              <source src={current.videoUrl} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

            {/* Top Bar inside Player */}
            <div className="relative z-10 flex items-center justify-between p-5 sm:p-6 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-300 border border-white/15">
                <span className="size-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Now Playing • Step {current.stepNumber} of 04</span>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-white/30 transition border border-white/25 shadow-sm"
              >
                <Maximize2 className="size-3.5" />
                <span>Full Cinema Mode</span>
              </button>
            </div>

            {/* Center Play Indicator */}
            <div className="relative z-10 flex flex-1 items-center justify-center">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="group/btn relative flex size-16 sm:size-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#ea580c] to-amber-500 text-white shadow-2xl transition duration-300 hover:scale-110 hover:shadow-orange-500/50 ring-4 ring-white/30 backdrop-blur-sm"
              >
                <Play className="ml-1 size-7 sm:size-8 fill-white" />
                <span className="absolute -inset-2 rounded-full border border-white/40 animate-ping opacity-75 pointer-events-none" />
              </button>
            </div>

            {/* Bottom Info inside Player */}
            <div className="relative z-10 p-6 sm:p-8 text-white">
              <div className="max-w-xl">
                <p className="text-[12px] font-semibold uppercase tracking-widest text-amber-300/90 mb-1">
                  Sacred Process Stage {current.stepNumber}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif leading-tight text-white drop-shadow-md">
                  {current.title}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[15px] text-white/80 leading-relaxed line-clamp-2">
                  {current.description}
                </p>
              </div>

              {/* Mantra Caption Bar */}
              <div className="mt-4 rounded-xl bg-black/60 backdrop-blur-md px-4 py-2.5 border border-amber-500/30 flex items-center gap-3">
                <Flame className="size-4 shrink-0 text-amber-400 fill-amber-400" />
                <p className="text-[12px] sm:text-[13px] font-medium text-amber-200/90 italic truncate">
                  Vedic Mantra Resonance: &ldquo;{current.mantra}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* TIMELINE STEPS LIST */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#7c2d12]">
                Automated Story Timeline
              </span>
              <span className="text-[12px] font-medium text-orange-950/60 flex items-center gap-1">
                <Clock className="size-3.5" />
                <span>Auto-advances every 6s</span>
              </span>
            </div>

            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = idx < activeStep;

              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden p-5 ${
                    isActive
                      ? "border-[#ea580c] bg-gradient-to-r from-white to-orange-50/80 shadow-md ring-1 ring-orange-500/20"
                      : "border-orange-200/80 bg-white/70 hover:bg-white hover:border-orange-300"
                  }`}
                >
                  {/* Automated Progress Bar at top of card */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-orange-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ea580c] to-amber-500 transition-all duration-75"
                      style={{
                        width: isActive ? `${progress}%` : isPassed ? "100%" : "0%",
                      }}
                    />
                  </div>

                  <div className="flex items-start gap-4 pt-1">
                    {/* Step Badge */}
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl font-bold text-base transition-colors ${
                        isActive
                          ? "bg-[#7c2d12] text-white shadow-sm"
                          : isPassed
                          ? "bg-emerald-600 text-white"
                          : "bg-orange-100 text-[#7c2d12]"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="size-5" /> : step.stepNumber}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-[16px] font-bold truncate ${isActive ? "text-[#7c2d12]" : "text-orange-950"}`}>
                          {step.title}
                        </h4>
                        {isActive && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-[#ea580c]">
                            <span>PLAYING</span>
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-[13px] text-orange-950/70 leading-normal line-clamp-2">
                        {step.subtitle}
                      </p>

                      {/* Featured Item snippet when active */}
                      {isActive && step.featuredProduct && (
                        <div className="mt-3 flex items-center justify-between rounded-xl bg-orange-100/60 p-2.5 border border-orange-200/60">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="relative size-9 shrink-0 rounded-lg overflow-hidden bg-white border border-orange-200">
                              <Image src={step.featuredProduct.image} alt={step.featuredProduct.title} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold text-[#7c2d12] truncate">{step.featuredProduct.title}</p>
                              <p className="text-[11px] font-bold text-[#ea580c]">{step.featuredProduct.price}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => handleQuickAdd(step.featuredProduct, e)}
                            className="shrink-0 inline-flex items-center gap-1 rounded-lg bg-[#ea580c] px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-[#d97706] shadow-sm transition"
                          >
                            <ShoppingBag className="size-3" />
                            <span>Add</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* FULL CINEMA THEATER MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-slate-950 border border-orange-500/30 shadow-2xl flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-slate-900 to-black border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 items-center justify-center rounded-full bg-[#ea580c] text-white font-bold text-xs">
                    SB
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-white">
                      Sacred Cinema Theater • {current.title}
                    </h3>
                    <p className="text-[11px] text-amber-300">
                      Step {current.stepNumber} of 04 • High Definition Devotional Stream
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-white/20 transition"
                  >
                    {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4 text-amber-400" />}
                    <span>{isMuted ? "Unmute Audio" : "Audio On"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-red-600 transition"
                    title="Close Cinema Theater"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Modal Video Area */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
                <video
                  ref={modalVideoRef}
                  autoPlay
                  loop
                  controls
                  muted={isMuted}
                  playsInline
                  poster={current.poster}
                  src={current.videoUrl}
                  className="size-full object-contain"
                />
              </div>

              {/* Modal Footer Controls & Shop Bar */}
              <div className="p-6 bg-gradient-to-t from-slate-950 to-slate-900 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="max-w-lg">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#ea580c]">
                    About This Sacred Step
                  </span>
                  <p className="text-[13px] text-white/85 mt-1 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {current.featuredProduct && (
                  <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-3 border border-white/15">
                    <div className="relative size-12 rounded-xl overflow-hidden bg-white shrink-0">
                      <Image src={current.featuredProduct.image} alt={current.featuredProduct.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-amber-300">Featured in Video</p>
                      <h4 className="text-[14px] font-bold text-white">{current.featuredProduct.title}</h4>
                      <span className="text-[13px] font-bold text-[#ea580c]">{current.featuredProduct.price}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(current.featuredProduct, e)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ea580c] to-amber-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg hover:opacity-95 transition"
                    >
                      <ShoppingBag className="size-4" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
