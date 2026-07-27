import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import {
  Heart,
  Star,
  Send,
  Clock,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Flame,
  HandHeart,
  BookHeart,
  Sunrise
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Prayer Requests | Saffron Blessings",
  description: "Submit your heartfelt prayer requests. Our pandits and devoted practitioners offer puja, havan, and mantra recitation on your behalf at sacred temples and our own shrine.",
};

const prayerServices = [
  {
    icon: Flame,
    title: "Navagraha Havan",
    description: "A fire offering performed to balance the nine planetary energies. Includes invocation, sankalpa, ahuti, and poornahuti over 90 minutes.",
    duration: "90 minutes",
    price: "Rs. 2,199",
    includes: ["Sankalpa in your name", "Sacred fire ritual", "Prasad dispatched", "Video blessing"],
  },
  {
    icon: Heart,
    title: "Satyanarayan Puja",
    description: "The beloved katha and puja for fulfilment, family harmony, new beginnings, and divine grace performed by a qualified pandit.",
    duration: "75 minutes",
    price: "Rs. 1,499",
    includes: ["Full katha recitation", "Panchamrit abhishek", "Prasad dispatched", "Video darshan"],
  },
  {
    icon: HandHeart,
    title: "Durga Saptashati Path",
    description: "Recitation of all 700 verses of the Devi Mahatmyam for protection, courage, removal of obstacles, and the grace of Adi Shakti.",
    duration: "Ongoing — 9 days",
    price: "Rs. 3,499",
    includes: ["Daily recitation", "Daily update message", "Concluding havan", "Blessed vermilion sent"],
  },
  {
    icon: Star,
    title: "Maha Mrityunjaya Jaap",
    description: "11,000 or 1,08,000 repetitions of the Maha Mrityunjaya mantra for health, longevity, and healing of self or a loved one.",
    duration: "3–7 days",
    price: "From Rs. 1,999",
    includes: ["Mantra count on counter", "Daily blessings update", "Rudraksha prasad", "Completion certificate"],
  },
  {
    icon: BookHeart,
    title: "Sundarkand Path",
    description: "A recitation of the Sundarkand from the Ramcharitmanas, beloved for removing fear, bringing success, and invoking Lord Hanuman's grace.",
    duration: "3–4 hours",
    price: "Rs. 999",
    includes: ["Dedicated recitation", "Lamp kept throughout", "Prasad dispatched", "Short video update"],
  },
  {
    icon: Sunrise,
    title: "Personal Sankalpa Puja",
    description: "A bespoke puja designed around your specific intention — a new venture, a health matter, a relationship, an exam — with deity selection aligned to your need.",
    duration: "60 minutes",
    price: "Rs. 1,799",
    includes: ["Personal consultation first", "Deity-aligned ritual", "Mantra & remedy guidance", "Prasad dispatched"],
  },
];

const howItWorks = [
  { step: "01", title: "Submit Your Request", body: "Fill out our request form with your name, the name of the person the puja is for, your sankalpa (intention), and any relevant details." },
  { step: "02", title: "Choose a Service", body: "Select the puja, havan, or path that resonates with your need. We are also happy to guide you on the most appropriate ritual." },
  { step: "03", title: "We Set the Sankalpa", body: "Our pandit takes your details and formally sets the sankalpa — the sacred intent — at the start of the ritual in your name and family lineage." },
  { step: "04", title: "Puja is Performed", body: "The ritual is conducted with full devotion at our dedicated prayer space or at an allied temple, as appropriate for the service." },
  { step: "05", title: "Receive Prasad & Blessings", body: "You receive a video or photo update, and consecrated prasad is dispatched to your address within 3–5 working days." },
];

const faqs = [
  { q: "Do I need to be present?", a: "No — the puja is conducted on your behalf with your name and sankalpa as the focal point. You can join a short video call at the start if you wish." },
  { q: "Can I request a puja for someone else?", a: "Yes. Simply provide the name, gotra (if known), and date of birth of the person you are requesting the puja for." },
  { q: "Will prasad actually be sent to me?", a: "Yes. Prasad is packed respectfully and dispatched across India. International shipping is available for select services at an additional courier cost." },
  { q: "How do I know the puja was done?", a: "We provide a short video clip or photograph from the puja. For multi-day paths, you receive daily updates via WhatsApp." },
  { q: "Can I request a puja at a specific temple?", a: "We work with allied temples including those at Tirupati, Shirdi, and Vrindavan. Additional logistics charges may apply. Contact us to discuss." },
  { q: "Is there a simpler way to offer a prayer?", a: "Yes — for a modest offering, we light a diya and offer flowers in your name at our daily morning puja and send you a photograph." },
];

export default function PrayerRequestsPage() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-[#431407]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-200/60 bg-gradient-to-br from-[#1e0a00] via-[#431407] to-[#7c2d12] py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-orange-500/8 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-amber-400/8 blur-3xl" />
          {/* Subtle mandala-like rings */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/5" />
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/8" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-200">
              <HandHeart className="size-3.5" />
              <span>Sacred Intercession</span>
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-tight text-white">
              Prayer Requests
            </h1>
            <p className="mt-6 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-orange-100/85">
              When a prayer is too heavy to carry alone, let our pandits and devoted practitioners offer it at the sacred fire on your behalf.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-8 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
                <Send className="size-5" />
                <span>Submit a Prayer Request</span>
              </Link>
              <a href="#services" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <span>See All Pujas</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-orange-200/70">
              <span className="flex items-center gap-2"><Shield className="size-4 text-orange-400" /> Performed with Full Devotion</span>
              <span className="flex items-center gap-2"><Users className="size-4 text-orange-400" /> 1,200+ Prayers Offered</span>
              <span className="flex items-center gap-2"><CheckCircle className="size-4 text-orange-400" /> Prasad Dispatched Pan-India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="border-b border-orange-200/60 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Our Sacred Commitment</p>
              <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Every Prayer is Held with Reverence</h2>
              <p className="mt-5 text-base leading-relaxed text-orange-950/70">
                We believe that prayer is not a transaction but a sacred act of surrender. Every ritual we perform on your behalf is conducted with the same care and intention as if it were for ourselves.
              </p>
              <p className="mt-4 text-base leading-relaxed text-orange-950/70">
                Our pandits are trained in classical vidhi and maintain strict ritual purity. Each puja begins with a formal sankalpa — invoking your name, gotra, and intention — so the merit flows directly to you and your loved ones.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Qualified Pandits", value: "6 on team" },
                  { label: "Prayers Fulfilled", value: "1,200+" },
                  { label: "Traditions Covered", value: "Shaiva, Vaishnava, Shakta, Smarta" },
                  { label: "Languages", value: "Sanskrit, Hindi, Tamil, Kannada" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-orange-200/80 bg-orange-50/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-orange-950/50">{stat.label}</p>
                    <p className="mt-1 font-serif text-base font-bold text-[#431407]">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-[#431407] to-[#7c2d12] p-8 sm:p-10 text-white">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/20">
                <Flame className="size-7 text-orange-300" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Daily Morning Puja</h3>
              <p className="mt-4 leading-relaxed text-orange-100/80">
                Every morning at sunrise, our team performs a communal puja at our dedicated shrine. Donors who have submitted requests have their names read aloud during this daily offering — a simple, beautiful act of connection across distance.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#f97316] px-6 text-sm font-bold text-white transition-all hover:bg-[#ea580c]">
                  <Heart className="size-4" />
                  <span>Add My Name to Today&apos;s Puja</span>
                </Link>
              </div>
              <p className="mt-4 text-xs text-orange-200/60">Rs. 51 donation — 100% goes toward lamp oil, flowers, and incense.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-orange-200/60 bg-[#fffaf3] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Sacred Offerings</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Choose Your Prayer Offering</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-orange-950/70 sm:text-base">
              Each ritual is performed in full, with proper sankalpa, vidhi, and prasad — never abbreviated or outsourced.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prayerServices.map((service) => (
              <div key={service.title} className="group flex flex-col rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl sm:p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 transition-colors group-hover:bg-[#7c2d12]">
                  <service.icon className="size-6 text-[#7c2d12] transition-colors group-hover:text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#431407]">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-orange-950/70">{service.description}</p>
                <ul className="mt-5 space-y-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-orange-950/65">
                      <CheckCircle className="size-3.5 shrink-0 text-[#ea580c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between border-t border-orange-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-orange-950/55">
                    <Clock className="size-3.5" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-[#431407]">{service.price}</span>
                </div>
                <Link href="/contact" className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-orange-200 bg-orange-50 text-xs font-bold text-[#7c2d12] transition-all hover:bg-[#7c2d12] hover:text-white hover:border-[#7c2d12]">
                  Request This Puja
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-orange-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">The Process</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">How It Works</h2>
          </div>
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-50 font-serif text-xl font-bold text-[#ea580c]">{item.step}</div>
                <h3 className="font-serif text-base font-bold text-[#431407]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-orange-950/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-orange-200/60 bg-[#fffaf3] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Common Questions</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-orange-200/80 bg-white p-6">
                <h3 className="font-serif text-base font-bold text-[#431407]">{faq.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-orange-950/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1e0a00] via-[#431407] to-[#7c2d12] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-orange-300/20 bg-orange-500/10 p-4">
            <Heart className="size-8 text-orange-300" />
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Submit Your Prayer Today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-orange-100/80">
            No prayer is too small. No need too ordinary. Reach out and let us hold your intention with care.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-10 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
              <Send className="size-5" />
              <span>Send Your Request</span>
            </Link>
            <Link href="/guidance/spiritual-consultation" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <span>Book a Consultation</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
