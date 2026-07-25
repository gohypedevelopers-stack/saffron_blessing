"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Package,
  MapPin,
  Award,
  Flame,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

// ─── Shopify hosted-account URLs (zero maintenance) ─────────────────────────
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "ui11g6-zh.myshopify.com";

const SHOPIFY_URLS = {
  login:    `https://${SHOPIFY_DOMAIN}/account/login`,
  register: `https://${SHOPIFY_DOMAIN}/account/register`,
  account:  `https://${SHOPIFY_DOMAIN}/account`,
  orders:   `https://${SHOPIFY_DOMAIN}/account/orders`,
  addresses:`https://${SHOPIFY_DOMAIN}/account/addresses`,
  logout:   `https://${SHOPIFY_DOMAIN}/account/logout`,
  recover:  `https://${SHOPIFY_DOMAIN}/account/login#recover`,
};

const inputBase =
  "w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20";

export default function AccountPage() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#fffaf3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1100px]">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center justify-between text-[13px] text-[#7c2d12]">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#ea580c] transition font-medium">
            <ArrowLeft className="size-4" />
            <span>Return to Sanctuary Home</span>
          </Link>
          <span className="text-orange-950/50 uppercase tracking-widest text-[11px] font-semibold">
            Member Account
          </span>
        </div>

        {/* Hero card */}
        <div className="rounded-3xl border border-orange-200/80 bg-white overflow-hidden shadow-xl shadow-orange-900/5 mb-8">
          <div className="relative bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#ea580c] px-8 py-12 text-white text-center overflow-hidden">
            <div className="absolute -right-12 -top-12 size-48 rounded-full bg-orange-400/20 blur-2xl pointer-events-none" />
            <div className="absolute -left-12 bottom-0 size-40 rounded-full bg-orange-600/20 blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm mb-4 shadow-inner">
                <Flame className="size-8 text-amber-300 fill-amber-300/80" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-serif mb-2">
                Your Devotional Account
              </h1>
              <p className="text-orange-100/85 text-[15px] max-w-lg mx-auto leading-relaxed">
                Manage orders, addresses, and rewards — all securely through your Shopify account.
              </p>
            </div>
          </div>

          {/* Two primary CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 sm:p-8">
            <a
              href={SHOPIFY_URLS.login}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#ea580c] to-[#d97706] px-6 py-5 text-white shadow-lg shadow-orange-600/20 transition hover:opacity-95"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-0.5">Already a member?</p>
                <p className="text-[17px] font-bold">Sign In to My Account</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 group-hover:bg-white/30 transition">
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </a>

            <a
              href={SHOPIFY_URLS.register}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border-2 border-[#7c2d12] bg-white px-6 py-5 text-[#7c2d12] shadow-sm transition hover:bg-orange-50"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-950/50 mb-0.5">New here?</p>
                <p className="text-[17px] font-bold">Create Free Account</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 group-hover:bg-orange-200 transition">
                <User className="size-5" />
              </div>
            </a>
          </div>
        </div>

        {/* Quick links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Package,
              label: "Order History",
              description: "Track dispatches, ritual kits, and past offerings",
              url: SHOPIFY_URLS.orders,
            },
            {
              icon: MapPin,
              label: "Delivery Addresses",
              description: "Manage mandir and home altar delivery locations",
              url: SHOPIFY_URLS.addresses,
            },
            {
              icon: Award,
              label: "Account Settings",
              description: "Update your name, email, and account preferences",
              url: SHOPIFY_URLS.account,
            },
          ].map(({ icon: Icon, label, description, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-orange-200/80 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 border border-orange-100 transition group-hover:bg-[#ea580c] group-hover:border-[#ea580c] group-hover:text-white text-[#ea580c]">
                <Icon className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-[15px] text-[#7c2d12] group-hover:text-[#ea580c] transition flex items-center gap-1.5">
                  {label}
                  <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition shrink-0" />
                </h3>
                <p className="text-[12px] text-orange-950/60 mt-0.5 leading-relaxed">{description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Membership benefits panel */}
        <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-[#7c2d12] font-serif mb-6 border-b border-orange-100 pb-4">
            Saffron Blessings Membership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                tier: "Sacred Patron",
                range: "0 – 999 Blessings",
                perks: ["Priority Purnima & Amavasya shipping", "10 Blessings per Rs. 100 spent"],
              },
              {
                tier: "Divine Benefactor",
                range: "1,000 – 1,999 Blessings",
                perks: ["Free astrological muhurat selection", "Exclusive festival kit access"],
              },
              {
                tier: "Temple Guardian",
                range: "2,000+ Blessings",
                perks: ["Annual priest puja at Varanasi ghats", "Personal ritual guidance sessions"],
              },
            ].map((t, i) => (
              <div
                key={t.tier}
                className={`rounded-2xl p-5 border ${
                  i === 0
                    ? "border-orange-200 bg-orange-50/50"
                    : i === 1
                    ? "border-amber-200 bg-amber-50/40"
                    : "border-[#7c2d12]/20 bg-gradient-to-br from-[#7c2d12]/5 to-transparent"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Award className={`size-4 ${i === 2 ? "text-[#ea580c] fill-orange-400/50" : "text-[#ea580c]"}`} />
                  <h3 className="font-bold text-[14px] text-[#7c2d12]">{t.tier}</h3>
                </div>
                <p className="text-[11px] text-orange-950/50 font-medium mb-3">{t.range}</p>
                {t.perks.map((perk) => (
                  <div key={perk} className="flex items-start gap-1.5 text-[12px] text-orange-950/70 mb-1.5">
                    <ChevronRight className="size-3 text-[#ea580c] mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom utility strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-orange-200/60 bg-white px-6 py-4 shadow-sm">
          <div className="flex items-center gap-2 text-[12px] text-orange-950/55 font-medium">
            <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
            <span>Authentication and data handled securely by Shopify. We never store your password.</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={SHOPIFY_URLS.recover}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-semibold text-[#ea580c] hover:underline"
            >
              Forgot password?
            </a>
            <span className="text-orange-200">|</span>
            <a
              href={SHOPIFY_URLS.logout}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-red-600 hover:underline"
            >
              <LogOut className="size-3.5" />
              <span>Sign Out</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
