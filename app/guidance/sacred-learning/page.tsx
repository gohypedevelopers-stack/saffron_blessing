import type { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import {
  BookOpen,
  Star,
  Users,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle,
  Headphones,
  Play,
  Download,
  Award,
  Layers,
  Compass,
  GraduationCap
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sacred Learning | Saffron Blessings",
  description: "Deepen your spiritual understanding with our curated courses, guided audio lectures, and shastra study sessions on the Bhagavad Gita, Vedanta, mantra, and devotional practice.",
};

const courses = [
  {
    icon: BookOpen,
    level: "Beginner",
    title: "Introduction to Sanatan Dharma",
    description: "A warm, unhurried introduction to the core values, philosophies, and practices of Sanatana Dharma — ideal for those new to the tradition or curious seekers from any background.",
    lessons: 12,
    duration: "6 hours",
    format: "Video + Text",
    price: "Free",
    topics: ["What is Dharma?", "The Vedic worldview", "Karma & Reincarnation", "Paths of Yoga", "Sacred calendar", "Getting started with daily puja"],
  },
  {
    icon: Layers,
    level: "Intermediate",
    title: "Bhagavad Gita — Chapter by Chapter",
    description: "A deep study of all 18 chapters of the Bhagavad Gita with original Sanskrit, transliteration, meaning, and contextual commentary drawing on Shankara, Ramanuja, and contemporary teachers.",
    lessons: 36,
    duration: "24 hours",
    format: "Audio + PDF",
    price: "Rs. 1,499",
    topics: ["Arjuna's dilemma", "Karma Yoga", "Jnana Yoga", "Bhakti Yoga", "Raja Yoga", "Nature of the Self"],
  },
  {
    icon: Star,
    level: "Intermediate",
    title: "Mantra Science & Practice",
    description: "Understand the physics and metaphysics of mantra — how sound vibration operates, how mantras are structured, how to establish a personal japa practice, and common misconceptions.",
    lessons: 18,
    duration: "10 hours",
    format: "Audio + Workbook",
    price: "Rs. 999",
    topics: ["What is a mantra?", "Beeja mantras", "Pancha akshara", "Gayatri", "Japa technique", "Mala usage"],
  },
  {
    icon: Compass,
    level: "Intermediate",
    title: "Understanding the Puranas",
    description: "A guided journey through the 18 Mahapuranas — their stories, their cosmology, their hidden symbolism, and why these ancient tales remain spiritually alive today.",
    lessons: 24,
    duration: "16 hours",
    format: "Video + Text",
    price: "Rs. 1,299",
    topics: ["The five characteristics of Puranas", "Vishnu Purana", "Shiva Purana", "Devi Bhagavat", "Bhagavata Purana", "Cosmological models"],
  },
  {
    icon: GraduationCap,
    level: "Advanced",
    title: "Advaita Vedanta Essentials",
    description: "A rigorous yet accessible study of Advaita Vedanta through the Vivekachudamani and Mandukya Upanishad, guided by an experienced teacher trained in the tradition of Adi Shankara.",
    lessons: 30,
    duration: "20 hours",
    format: "Live + Recording",
    price: "Rs. 2,499",
    topics: ["Brahman & Maya", "Atman & Self", "Three states of consciousness", "Mahavakyas", "Neti Neti", "Liberation"],
  },
  {
    icon: Headphones,
    level: "All Levels",
    title: "Devotional Music & Kirtan Study",
    description: "Explore the tradition of bhajan and kirtan — the ragas, the composers, the stories behind beloved devotional songs, and how to bring sacred music into daily life.",
    lessons: 15,
    duration: "9 hours",
    format: "Audio + Video",
    price: "Rs. 799",
    topics: ["Mirabai's bhajans", "Tukaram", "Sur Das", "Tyagaraja", "Carnatic & Hindustani devotional", "Simple kirtan practice"],
  },
];

const features = [
  { icon: Play, title: "Self-Paced Access", body: "Learn at your own rhythm. All courses give you lifetime access to recordings, PDFs, and audio files once enrolled." },
  { icon: Headphones, title: "Guided Audio Lectures", body: "Most courses include high-quality audio lectures you can listen to during walks, commutes, or sitting in meditation." },
  { icon: Download, title: "Downloadable Resources", body: "Sanskrit texts, transliterations, workbooks, and mantra charts are included as downloadable PDFs with each course." },
  { icon: Users, title: "Community Circle", body: "Join a private WhatsApp group with fellow students and the course teacher for questions, sharing, and satsang." },
  { icon: Award, title: "Completion Recognition", body: "Receive a digital certificate of completion for each course — a meaningful acknowledgment of your dedication." },
  { icon: Shield, title: "Satisfaction Guarantee", body: "If a course is not right for you, we offer a 7-day full refund — no questions asked, no conditions." },
];

const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
  Intermediate: "bg-orange-50 text-orange-700 border-orange-200/70",
  Advanced: "bg-rose-50 text-rose-700 border-rose-200/70",
  "All Levels": "bg-amber-50 text-amber-700 border-amber-200/70",
};

const testimonials = [
  {
    name: "Deepika R.",
    location: "Pune",
    course: "Bhagavad Gita — Chapter by Chapter",
    rating: 5,
    text: "I have tried reading the Gita on my own many times but always felt lost without context. This course gave me the scaffolding I was missing. The commentary is clear, unsectarian, and genuinely inspiring.",
  },
  {
    name: "Suresh M.",
    location: "Chennai",
    course: "Mantra Science & Practice",
    rating: 5,
    text: "I had been chanting the Gayatri mantra for years without really understanding it. This course transformed my practice from repetition to genuine communion. Worth every rupee.",
  },
  {
    name: "Ananya V.",
    location: "Hyderabad",
    course: "Introduction to Sanatan Dharma",
    rating: 5,
    text: "As someone who grew up in a secular household, this course was exactly what I needed — warm, inclusive, and deeply respectful. It answered years of questions.",
  },
];

export default function SacredLearningPage() {
  return (
    <div className="min-h-screen bg-[#fff7ed] text-[#431407]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-orange-200/60 bg-gradient-to-br from-[#0f0500] via-[#2d0f00] to-[#431407] py-20 sm:py-28 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-orange-600/8 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-amber-500/8 blur-3xl" />
          {[600, 450, 300].map((size) => (
            <div key={size} className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/5`} style={{ height: size, width: size }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-200">
              <BookOpen className="size-3.5" />
              <span>Vidya & Shastra</span>
            </div>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,4.8rem)] font-bold leading-[0.95] tracking-tight text-white">
              Sacred Learning
            </h1>
            <p className="mt-6 text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-orange-100/85">
              From the first diya to the depths of Vedanta — our courses meet you where you are and walk with you deeper into the tradition.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#courses" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-8 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
                <GraduationCap className="size-5" />
                <span>Browse Courses</span>
              </a>
              <Link href="/guidance/spiritual-consultation" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <span>Book a Study Session</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-orange-200/70">
              <span className="flex items-center gap-2"><BookOpen className="size-4 text-orange-400" /> 6 Courses Available</span>
              <span className="flex items-center gap-2"><Users className="size-4 text-orange-400" /> 900+ Enrolled Students</span>
              <span className="flex items-center gap-2"><Star className="size-4 fill-orange-400 text-orange-400" /> 4.9 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-orange-200/60 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Why Learn with Us</p>
            <h2 className="font-serif text-2xl font-bold text-[#431407] sm:text-3xl">Thoughtfully Built for Genuine Seekers</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 rounded-2xl border border-orange-200/80 bg-orange-50/40 p-6">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-orange-200/80 shadow-xs">
                  <f.icon className="size-5 text-[#7c2d12]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#431407]">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-orange-950/65">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="border-b border-orange-200/60 bg-[#fffaf3] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Our Curriculum</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">Sacred Courses</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-orange-950/70 sm:text-base">
              Each course is crafted by practitioners with decades of study in the tradition — not just scholars, but people who live what they teach.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.title} className="group flex flex-col rounded-3xl border border-orange-200/80 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange-300 hover:shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-[#431407] to-[#7c2d12] p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <course.icon className="size-6 text-orange-200" />
                  </div>
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-3 ${levelColors[course.level]}`}>
                    {course.level}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white leading-tight">{course.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-orange-950/70 flex-1">{course.description}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-orange-100 pt-5">
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-950/40">Lessons</p>
                      <p className="mt-0.5 font-serif text-sm font-bold text-[#431407]">{course.lessons}</p>
                    </div>
                    <div className="text-center border-x border-orange-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-950/40">Duration</p>
                      <p className="mt-0.5 font-serif text-sm font-bold text-[#431407]">{course.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-orange-950/40">Format</p>
                      <p className="mt-0.5 font-serif text-sm font-bold text-[#431407]">{course.format}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-950/40">Topics covered</p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.slice(0, 4).map((topic) => (
                        <span key={topic} className="rounded-md bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 text-[11px] font-medium text-orange-900/70">{topic}</span>
                      ))}
                      {course.topics.length > 4 && (
                        <span className="rounded-md bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 text-[11px] font-medium text-orange-900/70">+{course.topics.length - 4} more</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-serif text-2xl font-bold text-[#431407]">{course.price}</span>
                    <Link href="/contact" className="inline-flex h-10 items-center gap-2 rounded-full bg-[#7c2d12] px-5 text-xs font-bold text-white transition-all hover:bg-[#9a3412]">
                      <span>Enrol Now</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-orange-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c]">Student Voices</p>
            <h2 className="font-serif text-3xl font-bold text-[#431407] sm:text-4xl">What Students Say</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col rounded-3xl border border-orange-200/80 bg-[#fffaf3] p-6 shadow-sm sm:p-8">
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#f97316] text-[#f97316]" />
                  ))}
                </div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#ea580c]">{t.course}</p>
                <blockquote className="flex-1 text-sm leading-relaxed text-orange-950/80 sm:text-base">
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
      <section className="bg-gradient-to-br from-[#0f0500] via-[#2d0f00] to-[#431407] py-20 sm:py-28">
        <div className="mx-auto max-w-[1500px] px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center justify-center rounded-full border border-orange-300/20 bg-orange-500/10 p-4">
            <BookOpen className="size-8 text-orange-300" />
          </div>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
            Begin Your Study
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-orange-100/80">
            The tradition is vast, but the door is always open. Start with what calls to you — one verse, one concept, one quiet hour of listening.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#courses" className="inline-flex h-14 items-center gap-2 rounded-full bg-[#f97316] px-10 text-[15px] font-bold text-white shadow-xl shadow-orange-950/30 transition-all hover:bg-[#ea580c] hover:scale-[1.02]">
              <GraduationCap className="size-5" />
              <span>Explore All Courses</span>
            </a>
            <Link href="/guidance/prayer-requests" className="inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <span>Submit a Prayer Request</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
