import type { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

type Highlight = {
  title: string;
  body: string;
};

type StaticPageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: Highlight[];
  children?: ReactNode;
};

export default function StaticPageShell({
  eyebrow,
  title,
  intro,
  highlights,
  children,
}: StaticPageShellProps) {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#fffaf3] text-[#431407]">
      <Navbar />
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(124,45,18,0.12),transparent_36%)]" />
        <div className="relative mx-auto max-w-[1120px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[#ea580c]">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,6vw,5.6rem)] font-semibold leading-[0.95] tracking-tight">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-[16px] leading-8 text-orange-950/70 sm:text-[18px]">
            {intro}
          </p>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-[1120px] gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="rounded-[8px] border border-orange-200 bg-white p-5 shadow-sm shadow-orange-900/5">
              <h2 className="text-[16px] font-semibold text-[#7c2d12]">{item.title}</h2>
              <p className="mt-3 text-[14px] leading-7 text-orange-950/70">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {children}
      <Footer />
    </main>
  );
}
