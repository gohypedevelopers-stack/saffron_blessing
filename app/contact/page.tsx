import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import StaticPageShell from "@/components/pages/static-page-shell";

export const metadata: Metadata = {
  title: "Contact Us | Saffron Blessings",
  description: "Contact Saffron Blessings for puja kits, spiritual gifts, order support, and ritual guidance.",
};

export default function ContactPage() {
  return (
    <StaticPageShell
      eyebrow="Contact Us"
      title="Reach us for orders, guidance, and devotional support"
      intro="Have a question about puja kits, meditation malas, festival essentials, gifting, or delivery? Send a message and the Saffron Blessings team will help."
      highlights={[
        {
          title: "Order Help",
          body: "Ask about product details, order status, delivery, gift packaging, or choosing the right devotional kit.",
        },
        {
          title: "Ritual Guidance",
          body: "Get simple help selecting offerings for daily puja, meditation, griha pravesh, festivals, and home mandir decor.",
        },
        {
          title: "Business Support",
          body: "For bulk gifting, store partnerships, or custom devotional collections, contact us with your requirements.",
        },
      ]}
    >
      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-[1120px] gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3 rounded-[8px] border border-orange-200 bg-white p-5 shadow-sm shadow-orange-900/5 sm:p-7">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-5 text-[#ea580c]" />
              <div>
                <h2 className="font-semibold text-[#7c2d12]">Email</h2>
                <p className="mt-1 text-[14px] text-orange-950/70">support@saffronblessings.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 size-5 text-[#ea580c]" />
              <div>
                <h2 className="font-semibold text-[#7c2d12]">Phone</h2>
                <p className="mt-1 text-[14px] text-orange-950/70">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 text-[#ea580c]" />
              <div>
                <h2 className="font-semibold text-[#7c2d12]">Store</h2>
                <p className="mt-1 text-[14px] leading-7 text-orange-950/70">
                  Saffron Blessings Devotional Store, India
                </p>
              </div>
            </div>
          </div>

          <form className="rounded-[8px] border border-orange-200 bg-white p-5 shadow-sm shadow-orange-900/5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-[13px] font-medium text-[#7c2d12]">
                Name
                <input className="h-11 rounded-md border border-orange-200 bg-[#fffaf3] px-3 text-[14px] outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20" />
              </label>
              <label className="grid gap-2 text-[13px] font-medium text-[#7c2d12]">
                Email
                <input type="email" className="h-11 rounded-md border border-orange-200 bg-[#fffaf3] px-3 text-[14px] outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20" />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-[13px] font-medium text-[#7c2d12]">
              Message
              <textarea rows={5} className="resize-none rounded-md border border-orange-200 bg-[#fffaf3] px-3 py-3 text-[14px] outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-orange-500/20" />
            </label>
            <button
              type="button"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#ea580c] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#c2410c]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </StaticPageShell>
  );
}
