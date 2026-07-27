import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Sparkles, Star, BookOpen, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guidance | Saffron Blessings",
  description: "Spiritual guidance, prayer requests, and sacred learning from Saffron Blessings. Connect with experienced guides for consultations, pujas, and deeper study of the tradition.",
};

const guidancePages = [
  {
    href: "/guidance/spiritual-consultation",
    icon: Star,
    eyebrow: "Personal Guidance",
    title: "Spiritual Consultation",
    description: "One-on-one sessions with experienced guides covering jyotish, mantra, puja vidhi, Vastu Shastra, and spiritual life counselling.",
    cta: "Book a Consultation",
    gradient: "from-[#431407] via-[#7c2d12] to-[#9a3412]",
  },
  {
    href: "/guidance/prayer-requests",
    icon: Heart,
    eyebrow: "Sacred Intercession",
    title: "Prayer Requests",
    description: "Submit your intentions and let our pandits perform pujas, havans, and mantra jaap on your behalf with full devotion and proper sankalpa.",
    cta: "Submit a Prayer",
    gradient: "from-[#1e0a00] via-[#431407] to-[#7c2d12]",
  },
  {
    href: "/guidance/sacred-learning",
    icon: BookOpen,
    eyebrow: "Courses & Study",
    title: "Sacred Learning",
    description: "Self-paced courses on the Bhagavad Gita, Vedanta, mantra science, the Puranas, and more — crafted by practitioners, not just scholars.",
    cta: "Browse Courses",
    gradient: "from-[#0f0500] via-[#2d0f00] to-[#431407]",
  },
];

export default function GuidancePage() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-[#431407]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-200/60 bg-gradient-to-br from-[#431407] to-[#7c2d12] py-20 sm:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-orange-500/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-amber-400/8 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-200">
            <Sparkles className="size-3.5" />
            <span>Sacred Guidance</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-tight text-white">
            Guidance
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-orange-100/85">
            Whether you seek personal counsel, a prayer held in your name, or a deeper understanding of the tradition — we are here to walk alongside you.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guidancePages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-orange-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className={`bg-gradient-to-br ${page.gradient} p-8 sm:p-10`}>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <page.icon className="size-7 text-orange-200" />
                  </div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300/80">{page.eyebrow}</p>
                  <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">{page.title}</h2>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="flex-1 text-sm leading-relaxed text-orange-950/70 sm:text-base">{page.description}</p>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#7c2d12] transition-colors group-hover:text-[#ea580c]">
                    <span>{page.cta}</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
