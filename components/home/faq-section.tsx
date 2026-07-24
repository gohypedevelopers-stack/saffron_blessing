const faqs = [
  {
    question: "Which puja essentials are included in the kits?",
    answer:
      "Each kit clearly lists its contents, such as diya, incense, kumkum, haldi, flowers, prayer cloth, mala, or decor accents depending on the selected offering.",
  },
  {
    question: "Can these items be used for daily worship?",
    answer:
      "Yes. The collection is designed for daily puja, meditation, aarti, festival rituals, home mandir decoration, and thoughtful devotional gifting.",
  },
  {
    question: "Do you offer guidance for choosing a kit?",
    answer:
      "Start with the purpose of your ritual: daily prayer, festival preparation, meditation, gifting, or mandir decor. Product details highlight the best use for each item.",
  },
  {
    question: "Are the products suitable as spiritual gifts?",
    answer:
      "Yes. Many offerings are gift-ready for griha pravesh, festivals, family puja, meditation practice, and devotional occasions.",
  },
  {
    question: "How should I care for brass and puja items?",
    answer:
      "Keep brass items dry after use, wipe gently with a soft cloth, and store powders, incense, and malas in a clean sacred space.",
  },
];

export default function FaqSection() {
  return (
    <section id="guidance" className="bg-[#fffaf3] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,0.5fr)] lg:gap-12">
          <div className="max-w-sm">
            <p className="text-[13px] leading-6 text-orange-950/60 md:text-[15px]">
              Got questions?
              <br />
              We have peaceful answers.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <div className="inline-flex items-baseline gap-2 text-[#431407]">
              <span className="font-serif text-[clamp(2.3rem,4.6vw,4.3rem)] leading-none">
                FAQs
              </span>
              <span className="text-[clamp(1.3rem,2.4vw,2rem)] leading-none text-[#ea580c]">+</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-orange-200">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-orange-200"
              open={false}
            >
              <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-4 py-4 outline-none md:py-5 lg:py-5.5">
                <span className="text-left text-[clamp(0.9rem,1.35vw,1.3rem)] font-medium uppercase leading-[1.08] text-[#431407] md:max-w-4xl">
                  {faq.question}
                </span>
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center text-[#ea580c] md:h-8 md:w-8">
                  <span className="text-[1.6rem] leading-none group-open:hidden">+</span>
                  <span className="hidden text-[1.6rem] leading-none group-open:inline">x</span>
                </span>
              </summary>
              <div className="pb-5 md:pb-6">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)]">
                  <div />
                  <p className="max-w-xl text-[14px] leading-7 text-orange-950/70 md:text-[15px] md:leading-8 lg:justify-self-end lg:text-[16px]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
