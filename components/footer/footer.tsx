"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart } from "lucide-react";

const footerHrefs: Record<string, string> = {
  "Puja Kits": "/#sacred-store",
  "Aarti Essentials": "/product/c9-projector",
  "Meditation Malas": "/product/techno-projector",
  "Temple Decor": "/product/iprojector-2-plus",
  "Prayer Requests": "/contact",
  "Ritual Guidance": "/#guidance",
  "Order Tracking": "/contact",
  "Gift Packaging": "/contact",
  "Contact Us": "/contact",
  "About Us": "/about",
  "Visit Our Mandir Store": "/contact",
  Seva: "/about",
  "Devotional Stories": "/about",
  "Your privacy choices": "/privacy-policy",
  "Privacy Policy": "/privacy-policy",
  "Terms and Conditions": "/terms-and-conditions",
};

function getFooterHref(label: string) {
  return footerHrefs[label] || "/";
}

const productLinks = ["Puja Kits", "Aarti Essentials", "Meditation Malas", "Temple Decor"];
const customerServiceLinks = [
  "Prayer Requests",
  "Ritual Guidance",
  "Order Tracking",
  "Gift Packaging",
  "Contact Us",
];
const companyLinks = ["About Us", "Visit Our Mandir Store", "Seva", "Devotional Stories"];
const policyLinks = ["Your privacy choices", "Privacy Policy", "Terms and Conditions"];

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#431407] sm:text-base">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-xs font-medium text-orange-950/70 sm:text-sm">
        {links.map((link) => (
          <li key={link}>
            <Link
              href={getFooterHref(link)}
              className="transition-colors duration-200 hover:text-[#ea580c]"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#fffaf3] pt-16 sm:pt-20 border-t border-orange-200/80">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Mission Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] pb-14 border-b border-orange-200/80">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#ea580c] text-sm font-bold text-white shadow-sm">
                SB
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#431407] sm:text-3xl">
                Saffron Blessings
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-orange-950/75 sm:text-base font-normal">
              Elevating daily worship through consecrated brass diyas, organic Kashmir saffron, and priest-blessed ritual samagri. Handcrafted in India with timeless Vedic reverence.
            </p>
            <div className="mt-6 flex items-center gap-6 text-xs font-semibold text-orange-950/60">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>100% Vedic Consecration</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="size-4 text-[#ea580c]" />
                <span>Handcrafted by Temple Artisans</span>
              </span>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-b from-white to-orange-50/50 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#ea580c] block mb-1">
                Join Our Devotional Circle
              </span>
              <h3 className="font-serif text-xl font-bold text-[#431407] sm:text-2xl">
                Receive Sacred Guidance &amp; Offers
              </h3>
              <p className="mt-2 text-xs text-orange-950/70 leading-relaxed sm:text-sm">
                Subscribe for auspicious calendar reminders, festival preparation guides, and 10% off your first samagri offering.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-6 flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                className="h-12 flex-1 rounded-full border border-orange-200 bg-white px-5 text-xs text-[#431407] placeholder:text-orange-900/40 focus:border-[#ea580c] focus:outline-none focus:ring-1 focus:ring-[#ea580c] sm:text-sm shadow-inner"
              />
              <button
                type="submit"
                className="h-12 inline-flex items-center justify-center gap-2 rounded-full bg-[#7c2d12] px-7 text-xs font-bold text-white shadow-md transition-all hover:bg-[#9a3412] sm:text-sm shrink-0 active:scale-98"
              >
                <span>Subscribe</span>
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="py-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          <FooterColumn title="Offerings" links={productLinks} />
          <FooterColumn title="Devotional Care" links={customerServiceLinks} />
          <FooterColumn title="Our Path" links={companyLinks} />
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#431407] sm:text-base">
              Sanctuary Hours
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-orange-950/70 sm:text-sm">
              Monday – Sunday: 6:00 AM – 9:00 PM IST
              <br />
              Vedic Altar Support: Online 24/7
            </p>
            <div className="mt-4 inline-block rounded-lg bg-orange-100/80 px-3 py-1.5 text-xs font-semibold text-[#7c2d12] border border-orange-200/60">
              Free Express Shipping across India
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-orange-200/80 py-8 text-xs text-orange-950/60 font-medium">
          <p>© 2026 Saffron Blessings. All Auspicious Rights Reserved.</p>
          <ul className="flex flex-wrap items-center gap-6">
            {policyLinks.map((link) => (
              <li key={link}>
                <Link href={getFooterHref(link)} className="transition-colors hover:text-[#ea580c]">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </footer>
  );
}
