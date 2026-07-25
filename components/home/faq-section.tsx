"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Which consecrated samagri items are included in the daily puja kits?",
    answer:
      "Each devotional kit clearly lists its complete contents—including solid brass diya, organic prayer incense, pure kumkum, haldi, consecrated marigold flowers, hand-woven prayer cloth, Rudraksha mala, and altar accents depending on the selected offering.",
  },
  {
    question: "Are these artifacts suitable for daily home mandir worship?",
    answer:
      "Yes. Our collection is specifically engineered for daily puja, japa meditation, evening aarti, festival rituals, mandir sanctification, and meaningful devotional gifting for family gatherings.",
  },
  {
    question: "How do I choose the right ritual kit for my spiritual practice?",
    answer:
      "Start with the primary intention of your practice: daily prayer, festival preparation, japa meditation, or home mandir aesthetics. Each product detail page provides complete ritual usage guidelines and priest recommendations.",
  },
  {
    question: "Are these offerings packaged securely for spiritual gifting?",
    answer:
      "Absolutely. Every artifact and samagri kit arrives in gift-ready, consecrated packaging suitable for Griha Pravesh (housewarming), Diwali, Navratri, weddings, and sacred milestones.",
  },
  {
    question: "How should I maintain and clean solid brass altar items?",
    answer:
      "To preserve the golden luster of solid brass diyas and aarti lamps, wipe gently with a soft dry cloth after each use. Store organic powders, incense, and malas in a clean, dry altar space.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="guidance" className="bg-[#fffaf3] py-16 sm:py-20 lg:py-28 border-b border-orange-200/60">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ea580c] mb-2 justify-center">
            <HelpCircle className="size-4" />
            <span>Clarification &amp; Guidance</span>
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#431407] sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-orange-950/75 sm:text-base">
            Everything you need to know about our consecrated samagri, Pan-India shipping, and Vedic ritual usage.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-orange-300 bg-white shadow-md"
                    : "border-orange-200/80 bg-white/70 hover:border-orange-300 hover:bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-7 outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-bold text-[#431407] sm:text-xl">
                    {faq.question}
                  </span>
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-[#7c2d12] text-white" : "bg-orange-100 text-[#7c2d12]"
                    }`}
                  >
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-orange-100 px-6 pb-6 pt-4 sm:px-7 sm:pb-7">
                    <p className="text-sm leading-relaxed text-orange-950/75 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
