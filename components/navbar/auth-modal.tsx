"use client";

import { useState, useEffect } from "react";
import {
  User,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Package,
  Flame,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

// ─── Shopify hosted-account URLs (zero maintenance) ─────────────────────────
const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "ui11g6-zh.myshopify.com";

const SHOPIFY_URLS = {
  login:    `https://${SHOPIFY_DOMAIN}/account/login`,
  register: `https://${SHOPIFY_DOMAIN}/account/register`,
  account:  `https://${SHOPIFY_DOMAIN}/account`,
  orders:   `https://${SHOPIFY_DOMAIN}/account/orders`,
  logout:   `https://${SHOPIFY_DOMAIN}/account/logout`,
};

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");

  // Reset tab whenever modal reopens
  useEffect(() => {
    if (open) setActiveTab("signin");
  }, [open]);

  const handleShopifyLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-orange-200/80 bg-[#fffaf3] p-0 text-[#7c2d12] shadow-2xl sm:max-w-md"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#ea580c] p-6 text-white shadow-md">
          <div className="absolute -right-6 -top-6 size-36 rounded-full bg-orange-400/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 right-4 size-32 rounded-full border border-white/10 opacity-30 pointer-events-none" />

          <SheetHeader className="relative z-10 p-0 text-left">
            <div className="inline-flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white mb-3 shadow-inner">
              <Flame className="size-5 text-amber-300 fill-amber-300" />
            </div>
            <SheetTitle className="text-white text-xl font-bold tracking-tight font-serif">
              Your Devotional Account
            </SheetTitle>
            <SheetDescription className="text-orange-100/80 text-[13px] leading-relaxed mt-1">
              Sign in or create an account to track offerings, manage addresses, and earn Saffron Blessings.
            </SheetDescription>
          </SheetHeader>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-orange-100/70 p-1 border border-orange-200/60">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={`rounded-lg py-2.5 text-[13px] font-medium transition-all duration-200 ${
                activeTab === "signin"
                  ? "bg-white text-[#ea580c] shadow-sm font-semibold"
                  : "text-orange-950/70 hover:text-[#7c2d12]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`rounded-lg py-2.5 text-[13px] font-medium transition-all duration-200 ${
                activeTab === "register"
                  ? "bg-white text-[#ea580c] shadow-sm font-semibold"
                  : "text-orange-950/70 hover:text-[#7c2d12]"
              }`}
            >
              Create Account
            </button>
          </div>

          {activeTab === "signin" ? (
            <div className="space-y-4">
              <p className="text-[13px] text-orange-950/70 leading-relaxed">
                Sign in to your account to access your orders, saved addresses, and blessings rewards.
              </p>

              {/* Primary CTA — Shopify hosted login */}
              <button
                type="button"
                onClick={() => handleShopifyLink(SHOPIFY_URLS.login)}
                className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-[#ea580c] to-[#d97706] px-5 py-4 text-[14px] font-semibold text-white shadow-lg shadow-orange-600/25 transition hover:opacity-95 group"
              >
                <span className="flex items-center gap-2.5">
                  <User className="size-4" />
                  <span>Sign In to My Account</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Secure note */}
              <div className="flex items-center gap-2 text-[12px] text-orange-950/55 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                <span>Secure authentication powered by Shopify. Your data is protected.</span>
              </div>

              {/* What you get */}
              <div className="rounded-xl border border-orange-200/70 bg-white p-4 space-y-3">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#7c2d12]">After signing in you can:</p>
                {[
                  { icon: Package, text: "Track puja samagri orders & dispatches" },
                  { icon: Flame, text: "Accumulate Saffron Blessings rewards" },
                  { icon: ShieldCheck, text: "Save mandir delivery addresses" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-[13px] text-orange-950/75">
                    <Icon className="size-3.5 text-[#ea580c] shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Forgot password link */}
              <button
                type="button"
                onClick={() => handleShopifyLink(`${SHOPIFY_URLS.login}#recover`)}
                className="w-full text-center text-[12px] font-semibold text-[#ea580c] hover:underline"
              >
                Forgot your password? Reset it here
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[13px] text-orange-950/70 leading-relaxed">
                Create a free account to begin your devotional journey with Saffron Blessings.
              </p>

              {/* Primary CTA — Shopify hosted register */}
              <button
                type="button"
                onClick={() => handleShopifyLink(SHOPIFY_URLS.register)}
                className="w-full flex items-center justify-between rounded-xl bg-gradient-to-r from-[#7c2d12] to-[#9a3412] px-5 py-4 text-[14px] font-semibold text-white shadow-lg shadow-orange-900/20 transition hover:opacity-95 group"
              >
                <span className="flex items-center gap-2.5">
                  <Flame className="size-4 text-amber-300 fill-amber-300/60" />
                  <span>Create Account (+250 Blessings)</span>
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Secure note */}
              <div className="flex items-center gap-2 text-[12px] text-orange-950/55 font-medium">
                <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                <span>Your account is created securely via Shopify. No spam, ever.</span>
              </div>

              {/* Membership perks */}
              <div className="rounded-xl border border-orange-200/70 bg-white p-4 space-y-3">
                <p className="text-[12px] font-bold uppercase tracking-wider text-[#7c2d12]">Free membership includes:</p>
                {[
                  "250 Welcome Blessings credited on signup",
                  "Order tracking for every sacred offering",
                  "Priority puja kit dispatch on festivals",
                  "Exclusive ritual guidance & muhurat alerts",
                ].map((perk) => (
                  <div key={perk} className="flex items-start gap-2 text-[13px] text-orange-950/75">
                    <ChevronRight className="size-3.5 text-[#ea580c] mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-[12px] text-orange-950/55">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signin")}
                  className="font-semibold text-[#ea580c] hover:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Footer — always visible */}
        <div className="border-t border-orange-200/80 bg-orange-50/60 p-4 space-y-2">
          {/* Full account portal link */}
          <a
            href={SHOPIFY_URLS.account}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/80 bg-white py-2.5 text-[13px] font-semibold text-[#7c2d12] shadow-sm transition hover:bg-orange-50 hover:border-orange-400"
          >
            <span>Manage My Account</span>
            <ExternalLink className="size-3.5 text-[#ea580c]" />
          </a>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-orange-950/50">
              Secure authentication by Shopify
            </span>
            <a
              href={SHOPIFY_URLS.logout}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition"
            >
              <LogOut className="size-3.5" />
              <span>Sign Out</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
