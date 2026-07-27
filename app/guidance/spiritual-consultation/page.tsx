import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import {
  Sparkles,
  Star,
  Clock,
  Shield,
  Heart,
  Phone,
  Video,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowRight,
  Flame,
  Moon,
  Sun,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spiritual Consultation | Saffron Blessings",
  description: "Connect with experienced spiritual guides for personalised consultations on your devotional path, mantra guidance, jyotish readings, and sacred rituals.",
};

const services = [
  {
    icon: Star,
    title: "Jyotish (Vedic Astrology)",
    description: "Deep natal chart readings, dasha analysis, muhurat selection, and planetary remedies drawn from classical Parashara and Jaimini traditions.",
    duration: "60–90 minutes",
    price: "Rs. 2,499",
  },
  {
    icon: Moon,
    title: "Mantra & Sadhana Guidance",
    description: "Personalised mantra initiation, japa practice design, and sadhana structuring aligned with your spiritual temperament and chosen deity.",
    duration: "45–60 minutes",
    price: "Rs. 1,799",
  },
  {
    icon: Flame,
    title: "Puja Vidhi Consultation",
    description: "Guidance on setting up your home mandir, choosing the right puja items, learning proper ritual steps, and establishing a daily worship rhythm.",
    duration: "45 minutes",
    price: "Rs. 999",
  },
  {
    icon: Sun,
    title: "Vastu Shastra Review",
    description: "Assessment of your home or workspace for directional alignment, energy flow corrections, and remedial recommendations grounded in classical Vastu texts.",
    duration: "75–90 minutes",
    price: "Rs. 3,199",
  },
  {
    icon: Heart,
    title: "Spiritual Life Counselling",
    description: "Compassionate conversations addressing dharmic confusion, inner conflict, grief, transitions, and the integration of spiritual values into modern life.",
    duration: "60 minutes",
    price: "Rs. 1,499",
  },
  {
    icon: BookOpen,
    title: "Shastra Study Sessions",
    description: "Guided study of the Bhagavad Gita, Upanishads, Ramayana, or Puranas with contextual commentary to deepen understanding and personal relevance.",
    duration: "60 minutes",
    price: "Rs. 1,299",
  },
];

const steps = [
  { number: "01", title: "Choose Your Service", body: "Select the consultation type that aligns with your current need—astrology, mantra, puja guidance, or counselling." },
  { number: "02", title: "Book Your Slot", body: "Pick a date and time that suits you. Sessions are available six days a week, morning and evening." },
  { number: "03", title: "Complete Your Intake Form", body: "Share your birth details, questions, or context ahead of time so your guide can prepare meaningfully." },
  { number: "04", title: "Meet Your Guide", body: "Join your session via video call, phone, or in person at our Bangalore centre. Your conversation is held in confidence." },
  { number: "05", title: "Receive Your Summary", body: "Within 24 hours, receive a written summary of key insights, remedies, and suggested next steps." },
];

const testimonials = [
  {
    name: "Meera S.",
    location: "Mumbai",
    rating: 5,
    text: "My jyotish session with Pandit Rameshwarji was the most grounded astrology experience I have had. He explained the dasha periods clearly and the remedy he suggested has genuinely shifted something in my inner life.",
  },
  {
    name: "Arjun K.",
    location: "Bengaluru",
    rating: 5,
    text: "I was lost about how to set up my puja at home after moving to a new city. The puja vidhi session gave me a simple, sustainable daily practice that actually feels sacred now rather than performative.",
  },
  {
    name: "Priya D.",
    location: "Delhi",
    rating: 5,
    text: "The spiritual counselling session helped me work through a very difficult period of grief. The guide approached it with Vedantic wisdom and genuine care — not platitudes. I left feeling less alone.",
  },
];

const guides = [
  {
    name: "Pandit Rameshwar Das",
    speciality: "Jyotish & Vedanta",
    experience: "22 years",
    languages: "Hindi, Sanskrit, English",
    bio: "Trained under the late Pt. Sridharan of Varanasi, Rameshwarji holds deep expertise in Parashara Jyotish and Advaita Vedanta. He has guided over 4,000 seekers across India and abroad.",
  },
  {
    name: "Smt. Kavitha Nair",
    speciality: "Sadhana & Tantra Shastra",
    experience: "16 years",
    languages: "Malayalam, Tamil, English",
    bio: "A practitioner of the Sri Vidya tradition, Kavithaji brings rare depth to mantra guidance and feminine spiritual wisdom. Her sessions integrate breathwork, visualization, and devotional practice.",
  },
  {
    name: "Acharya Vijay Sharma",
    speciality: "Vastu & Muhurat",
    experience: "18 years",
    languages: "Hindi, English, Gujarati",
    bio: "A graduate of the Varanasi Sanskrit Vishwavidyalay, Vijayji specialises in classical Vastu Shastra and Muhurat selection for homes, businesses, and sacred occasions.",
  },
];

export default function SpiritualConsultationPage() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-[#431407]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-200/60 bg-gradient-to-br from-[#431407] via-[#7c2d12] to-[#9a3412] py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-200">
              <Sparkles className="size-3.5" />
              <span>Personalised Guidance</span>
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-tight text-white">
              Spiritual Consultation
            </h1>
            <p className="mt-6 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-orange-100/85">
              Walk your path with clarity. Our experienced guides offer deeply personalised consultations rooted in Vedic wisdom — jyotish, mantra, puja vidhi, Vastu, and more.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-8 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
                <Calendar className="size-5" />
                <span>Book a Session</span>
              </Link>
              <a href="#services" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <span>Explore Services</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-orange-200/70">
              <span className="flex items-center gap-2"><Shield className="size-4 text-orange-400" /> Confidential &amp; Respectful</span>
              <span className="flex items-center gap-2"><Star className="size-4 fill-orange-400 text-orange-400" /> 4.9 / 5 Rating</span>
              <span className="flex items-center gap-2"><CheckCircle className="size-4 text-orange-400" /> 4,000+ Sessions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section className="border-b border-orange-200/60 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">How We Meet</p>
            <h2 className="font-serif text-2xl font-bold text-[#431407] sm:text-3xl">Choose Your Preferred Format</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Video, title: "Video Call", body: "Private, face-to-face session via Google Meet or Zoom. Ideal for comprehensive consultations with screen-sharing of charts or diagrams.", color: "from-orange-50 to-amber-50" },
              { icon: Phone, title: "Phone Call", body: "A quiet, focused conversation. Preferred by many for mantra guidance and spiritual counselling where voice alone carries deep clarity.", color: "from-amber-50 to-orange-50" },
              { icon: MessageCircle, title: "In-Person (Bangalore)", body: "Visit our Indiranagar consultation centre for a warm, grounded session with incense, proper seating, and an unhurried atmosphere.", color: "from-orange-50 to-amber-50" },
            ].map((format) => (
              <div key={format.title} className={`rounded-3xl border border-orange-200/80 bg-gradient-to-br ${format.color} p-6 sm:p-8`}>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7c2d12]/10">
                  <format.icon className="size-6 text-[#7c2d12]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#431407]">{format.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-orange-950/70">{format.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-orange-200/60 bg-[#fffaf3] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">What We Offer</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Our Consultation Services</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-orange-950/70 sm:text-base">
              Each session is tailored to your unique situation and conducted with reverence, depth, and genuine care.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="group flex flex-col rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl sm:p-8">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 transition-colors group-hover:bg-[#7c2d12]">
                  <service.icon className="size-6 text-[#7c2d12] transition-colors group-hover:text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#431407]">{service.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-orange-950/70">{service.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-orange-100 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-orange-950/55">
                    <Clock className="size-3.5" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="font-serif text-lg font-bold text-[#431407]">{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-orange-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Simple Process</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">How It Works</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-200 bg-orange-50 font-serif text-xl font-bold text-[#ea580c]">{step.number}</div>
                {idx < steps.length - 1 && <div className="hidden lg:block absolute h-0.5 w-16 bg-orange-200 translate-x-24" />}
                <h3 className="font-serif text-base font-bold text-[#431407]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-orange-950/65">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Guides */}
      <section className="border-b border-orange-200/60 bg-[#fffaf3] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Meet the Guides</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Experienced, Rooted &amp; Compassionate</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <div key={guide.name} className="rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#ea580c] to-[#7c2d12] text-3xl font-bold text-white shadow-lg">
                  {guide.name.charAt(0)}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#431407]">{guide.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#ea580c]">{guide.speciality}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-xs text-orange-950/60">
                  <span className="rounded-full bg-orange-50 px-3 py-1 font-medium border border-orange-200/50">{guide.experience} experience</span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 font-medium border border-orange-200/50">{guide.languages}</span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-orange-950/70">{guide.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-orange-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Seekers Words</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">What Seekers Say</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-3xl border border-orange-200/80 bg-[#fffaf3] p-6 shadow-sm sm:p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#f97316] text-[#f97316]" />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-orange-950/80 sm:text-base">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ea580c] to-[#7c2d12] text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#431407]">{t.name}</p>
                    <p className="text-xs text-orange-950/50">{t.location}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#431407] via-[#7c2d12] to-[#9a3412] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-orange-300/20 bg-orange-500/10 p-4">
            <Sparkles className="size-8 text-orange-300" />
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Begin Your Consultation
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-orange-100/80">
            Every journey toward clarity starts with one honest conversation. Book your session today.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-10 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
              <Calendar className="size-5" />
              <span>Book Your Session</span>
            </Link>
            <Link href="/guidance/sacred-learning" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <span>Explore Sacred Learning</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
