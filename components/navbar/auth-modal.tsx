"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Check,
  Plus,
  ExternalLink,
  ShieldCheck,
  Eye,
  EyeOff,
  Award,
  ShoppingBag,
  Trash2,
  ChevronRight,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  LocalUser,
  readLocalAuth,
  loginLocalAuth,
  logoutLocalAuth,
  addLocalAddress,
  removeLocalAddress,
  SAFFRON_AUTH_EVENT,
  DEMO_DEVOTEE,
} from "@/lib/auth-store";
import { addLocalCartItem } from "@/lib/cart-store";
import { getShopifyStorefrontUrl } from "@/lib/shopify";
import { products } from "@/components/home/content";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const devotionalFocusOptions = [
  "Daily Puja & Aarti",
  "Meditation & Mala Japa",
  "Temple Decor & Brassware",
  "Festival Celebrations",
];

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [portalTab, setPortalTab] = useState<"orders" | "addresses" | "wishlist" | "perks">("orders");

  // Sign In Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Register Form State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [selectedFocus, setSelectedFocus] = useState(devotionalFocusOptions[0]);

  // New Address State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addrLabel, setAddrLabel] = useState("");
  const [addrDetails, setAddrDetails] = useState("");

  // Wishlist mock items (using real products from content.ts)
  const [wishlist, setWishlist] = useState([products[2], products[1]]);

  useEffect(() => {
    function syncAuth() {
      setUser(readLocalAuth());
    }

    syncAuth();
    window.addEventListener(SAFFRON_AUTH_EVENT, syncAuth);
    return () => window.removeEventListener(SAFFRON_AUTH_EVENT, syncAuth);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your sacred email or mobile number.");
      return;
    }
    const loggedInUser = loginLocalAuth({
      email: email.trim(),
      name: email.split("@")[0] ? email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Devotee",
    });
    toast.success(`🙏 Namaste, ${loggedInUser.name}! Welcome to your sanctuary.`);
  };

  const handleDemoLogin = () => {
    const loggedInUser = loginLocalAuth(DEMO_DEVOTEE);
    toast.success(`🙏 Logged in as ${loggedInUser.name}! Explore your blessings and offerings.`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      toast.error("Please fill in your name and email to establish your sanctuary.");
      return;
    }
    const newUser = loginLocalAuth({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || "+91 99887 76655",
      devotionalFocus: selectedFocus,
      blessingsCount: 250, // Welcome bonus
      joinedDate: "Today",
    });
    toast.success("🎉 Sacred Account created! 250 Welcome Blessings credited to your altar.");
  };

  const handleLogout = () => {
    logoutLocalAuth();
    toast.info("You have signed out of your sanctuary altar.");
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrLabel.trim() || !addrDetails.trim()) {
      toast.error("Please enter both a label and address details.");
      return;
    }
    addLocalAddress({
      label: addrLabel.trim(),
      details: addrDetails.trim(),
    });
    setAddrLabel("");
    setAddrDetails("");
    setShowAddAddress(false);
    toast.success("📍 Sanctuary address saved successfully.");
  };

  const handleRemoveAddress = (id: string) => {
    removeLocalAddress(id);
    toast.info("Sanctuary address removed.");
  };

  const handleMoveToBag = (prod: (typeof products)[0]) => {
    addLocalCartItem({
      variantId: prod.id,
      title: prod.title,
      price: prod.price,
      image: prod.image,
      alt: prod.alt,
      href: `/product/${prod.id}`,
    });
    toast.success(`🛍️ "${prod.title}" added to your sacred shopping bag.`);
  };

  const shopifyAccountUrl = getShopifyStorefrontUrl("/account");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-orange-200/80 bg-[#fffaf3] p-0 text-[#7c2d12] shadow-2xl sm:max-w-lg"
      >
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#ea580c] p-6 text-white shadow-md">
          <div className="absolute -right-6 -top-6 size-36 rounded-full bg-orange-400/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 right-4 size-32 rounded-full border border-white/10 opacity-30 pointer-events-none" />
          
          <SheetHeader className="relative z-10 p-0 text-left">
            {!user ? (
              <>
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm text-white mb-2 shadow-inner">
                  <Flame className="size-5 text-amber-300 fill-amber-300 animate-pulse" />
                </div>
                <SheetTitle className="text-[22px] font-bold tracking-tight text-white font-serif">
                  Sacred Member Sanctuary
                </SheetTitle>
                <SheetDescription className="text-[13px] text-orange-100/90 leading-relaxed">
                  Sign in or register to receive blessings, track ritual offerings, and customize your daily devotion.
                </SheetDescription>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-[#7c2d12] font-bold text-lg shadow-lg ring-2 ring-white/40">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold tracking-tight font-serif flex items-center gap-1.5">
                        Namaste, {user.name.split(" ")[0]} <span className="text-base">🙏</span>
                      </h3>
                      <p className="text-[12px] text-orange-200 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Tier & Blessings Badge */}
                <div className="mt-2 rounded-xl bg-black/20 backdrop-blur-md p-3.5 border border-white/15 shadow-inner">
                  <div className="flex items-center justify-between text-[13px] font-medium text-amber-200 mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="size-4 text-amber-300 fill-amber-300" />
                      {user.tier}
                    </span>
                    <span className="font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full text-[12px]">
                      {user.blessingsCount.toLocaleString()} Blessings
                    </span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-300 to-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (user.blessingsCount / 2000) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1.5 text-[11px] text-orange-200/80">
                    <span>Devotional Focus: {user.devotionalFocus}</span>
                    <span>Next Tier: 2,000</span>
                  </div>
                </div>
              </>
            )}
          </SheetHeader>
        </div>

        {/* Body Section */}
        <div className="flex-1 overflow-y-auto p-6">
          {!user ? (
            /* Logged Out View */
            <div className="flex flex-col gap-6">
              {/* Tabs */}
              <div className="grid grid-cols-2 rounded-xl bg-orange-100/70 p-1 border border-orange-200/60">
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
                /* Sign In Form */
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                      Email or Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. aarav.sharma@example.com"
                      className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => toast.success("A sacred password reset link has been dispatched to your email.")}
                        className="text-[12px] text-[#ea580c] hover:underline font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 pr-11 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-orange-800/60 hover:text-orange-900"
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ea580c] to-[#d97706] py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-orange-600/25 transition duration-200 hover:opacity-95 hover:shadow-orange-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                  >
                    Sign In to Sanctuary
                  </button>
                </form>
              ) : (
                /* Register Form */
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="e.g. aarav@example.com"
                      className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-2">
                      Primary Devotional Focus
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {devotionalFocusOptions.map((focus) => (
                        <button
                          key={focus}
                          type="button"
                          onClick={() => setSelectedFocus(focus)}
                          className={`rounded-xl border px-3 py-2.5 text-[12px] font-medium transition-all text-left flex items-center justify-between ${
                            selectedFocus === focus
                              ? "border-[#ea580c] bg-orange-500/10 text-[#ea580c] font-semibold ring-1 ring-orange-500/30"
                              : "border-orange-200/80 bg-white/60 text-orange-950/75 hover:border-orange-300"
                          }`}
                        >
                          <span>{focus}</span>
                          {selectedFocus === focus && <Check className="size-3.5 shrink-0 text-[#ea580c]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ea580c] to-[#d97706] py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-orange-600/25 transition duration-200 hover:opacity-95 hover:shadow-orange-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                  >
                    Join Saffron Blessings (+250 Blessings)
                  </button>
                </form>
              )}

              {/* Instant Demo Login Banner for Delight */}
              <div className="mt-4 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
                    <Flame className="size-5 text-[#ea580c] fill-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[13px] font-bold text-[#7c2d12]">
                      Want an Instant Sanctuary Preview?
                    </h4>
                    <p className="mt-0.5 text-[12px] text-orange-950/75 leading-normal">
                      Experience the full devotional portal with pre-loaded orders, saved mandir addresses, and blessings.
                    </p>
                    <button
                      type="button"
                      onClick={handleDemoLogin}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#7c2d12] px-3.5 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-[#9a3412]"
                    >
                      <span>🙏 Enter as Aarav Sharma (Demo)</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Logged In Member Portal View */
            <div className="flex flex-col gap-6">
              {/* Navigation Pill Menu */}
              <div className="grid grid-cols-4 gap-1 rounded-xl bg-orange-100/70 p-1 border border-orange-200/60">
                <button
                  type="button"
                  onClick={() => setPortalTab("orders")}
                  className={`flex flex-col items-center justify-center rounded-lg py-2 text-[11px] font-medium transition-all ${
                    portalTab === "orders"
                      ? "bg-white text-[#ea580c] font-bold shadow-sm"
                      : "text-orange-950/70 hover:text-[#7c2d12]"
                  }`}
                >
                  <Package className="size-4 mb-0.5" />
                  <span>Offerings</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPortalTab("addresses")}
                  className={`flex flex-col items-center justify-center rounded-lg py-2 text-[11px] font-medium transition-all ${
                    portalTab === "addresses"
                      ? "bg-white text-[#ea580c] font-bold shadow-sm"
                      : "text-orange-950/70 hover:text-[#7c2d12]"
                  }`}
                >
                  <MapPin className="size-4 mb-0.5" />
                  <span>Mandirs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPortalTab("wishlist")}
                  className={`flex flex-col items-center justify-center rounded-lg py-2 text-[11px] font-medium transition-all ${
                    portalTab === "wishlist"
                      ? "bg-white text-[#ea580c] font-bold shadow-sm"
                      : "text-orange-950/70 hover:text-[#7c2d12]"
                  }`}
                >
                  <Heart className="size-4 mb-0.5" />
                  <span>Wishlist</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPortalTab("perks")}
                  className={`flex flex-col items-center justify-center rounded-lg py-2 text-[11px] font-medium transition-all ${
                    portalTab === "perks"
                      ? "bg-white text-[#ea580c] font-bold shadow-sm"
                      : "text-orange-950/70 hover:text-[#7c2d12]"
                  }`}
                >
                  <Award className="size-4 mb-0.5" />
                  <span>Rewards</span>
                </button>
              </div>

              {/* Portal Content */}
              {portalTab === "orders" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#7c2d12] flex items-center justify-between">
                    <span>Sacred Offerings & Orders</span>
                    <span className="text-[11px] font-normal text-orange-900/60">{user.orders.length} orders</span>
                  </h4>

                  {user.orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-white/50 p-6 text-center">
                      <Package className="mx-auto size-8 text-orange-300 mb-2" />
                      <p className="text-[13px] font-medium text-orange-950">No ritual offerings yet</p>
                      <p className="text-[12px] text-orange-950/60 mt-1">Begin your devotional journey by exploring sacred puja kits.</p>
                      <button
                        type="button"
                        onClick={() => { onOpenChange(false); window.location.href = "/#sacred-store"; }}
                        className="mt-3 inline-flex items-center gap-1 rounded-xl bg-orange-100 px-3 py-1.5 text-[12px] font-semibold text-[#ea580c] hover:bg-orange-200/70"
                      >
                        Shop Puja Samagri
                      </button>
                    </div>
                  ) : (
                    user.orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-orange-200/80 bg-white p-4 shadow-sm transition hover:border-orange-300"
                      >
                        <div className="flex items-center justify-between border-b border-orange-100 pb-2 mb-2">
                          <div>
                            <span className="text-[13px] font-bold text-[#7c2d12]">{order.id}</span>
                            <span className="ml-2 text-[11px] text-orange-950/60">{order.date}</span>
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                            order.status === "Blessed & Delivered"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-amber-50 text-amber-700 border border-amber-200/60"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[13px] text-orange-950/85">
                              <span className="size-1.5 rounded-full bg-[#ea580c]" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center justify-between pt-2 border-t border-orange-50 text-[12px]">
                          <span className="text-orange-950/60">Total Offering</span>
                          <span className="font-bold text-[#7c2d12]">{order.total}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {portalTab === "addresses" && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#7c2d12]">
                      Sanctuary Mandir Addresses
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="inline-flex items-center gap-1 rounded-lg bg-orange-100 px-2.5 py-1 text-[11px] font-semibold text-[#ea580c] hover:bg-orange-200/70"
                    >
                      <Plus className="size-3" />
                      <span>Add Mandir</span>
                    </button>
                  </div>

                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="rounded-2xl border border-orange-300 bg-orange-50/70 p-4 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#7c2d12] mb-1">
                          Sanctuary Label (e.g. Home Mandir, Office Altar)
                        </label>
                        <input
                          type="text"
                          required
                          value={addrLabel}
                          onChange={(e) => setAddrLabel(e.target.value)}
                          placeholder="e.g. Ancestral Mandir"
                          className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-[13px] text-orange-950 focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#7c2d12] mb-1">
                          Full Address & Landmark
                        </label>
                        <textarea
                          required
                          rows={2}
                          value={addrDetails}
                          onChange={(e) => setAddrDetails(e.target.value)}
                          placeholder="Street, Building, City, PIN Code..."
                          className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-[13px] text-orange-950 focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="rounded-lg px-3 py-1.5 text-[12px] font-medium text-orange-950/70 hover:bg-orange-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-lg bg-[#ea580c] px-3 py-1.5 text-[12px] font-semibold text-white shadow-sm hover:bg-[#d97706]"
                        >
                          Save Sanctuary
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-2.5">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="relative rounded-2xl border border-orange-200/80 bg-white p-4 shadow-sm transition hover:border-orange-300"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[14px] text-[#7c2d12]">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-[#ea580c]">
                                Default Altar
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveAddress(addr.id)}
                            className="text-orange-400 hover:text-red-600 transition"
                            title="Remove address"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <p className="mt-1 text-[13px] text-orange-950/75 leading-relaxed">{addr.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portalTab === "wishlist" && (
                <div className="flex flex-col gap-3">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#7c2d12]">
                    Devotional Wishlist
                  </h4>
                  {wishlist.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-white/50 p-6 text-center">
                      <Heart className="mx-auto size-8 text-orange-300 mb-2" />
                      <p className="text-[13px] font-medium text-orange-950">Your sacred wishlist is empty</p>
                    </div>
                  ) : (
                    wishlist.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-2xl border border-orange-200/80 bg-white p-3.5 shadow-sm transition hover:border-orange-300"
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center overflow-hidden">
                            <span className="text-xl">🪔</span>
                          </div>
                          <div>
                            <h5 className="text-[13px] font-bold text-[#7c2d12]">{item.title}</h5>
                            <span className="text-[12px] font-semibold text-[#ea580c]">{item.price}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleMoveToBag(item)}
                          className="inline-flex items-center gap-1 rounded-xl bg-[#ea580c] px-3 py-2 text-[12px] font-semibold text-white shadow-sm hover:bg-[#d97706] transition"
                        >
                          <ShoppingBag className="size-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {portalTab === "perks" && (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-gradient-to-br from-[#7c2d12] to-[#9a3412] p-5 text-white shadow-md">
                    <div className="flex items-center gap-2 text-amber-300 font-bold text-[14px] mb-1">
                      <Award className="size-4 fill-amber-300" />
                      <span>Saffron Blessings Program</span>
                    </div>
                    <p className="text-[12px] text-orange-100/90 leading-relaxed">
                      Every ritual offering earns Saffron Blessings points. Accumulate blessings to unlock priest consultations, astrology muhurat alerts, and exclusive temple samagri.
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-center text-[12px]">
                      <div className="bg-white/10 rounded-xl p-2">
                        <span className="block font-bold text-amber-200">10 Blessings</span>
                        <span className="text-[10px] text-orange-200">Per Rs. 100 Offering</span>
                      </div>
                      <div className="bg-white/10 rounded-xl p-2">
                        <span className="block font-bold text-amber-200">Free Puja Kit</span>
                        <span className="text-[10px] text-orange-200">At 2,000 Blessings</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-orange-200 bg-white p-4 space-y-2 text-[12px]">
                    <div className="flex items-center gap-2.5 font-semibold text-[#7c2d12]">
                      <ShieldCheck className="size-4 text-emerald-600" />
                      <span>Sacred Patron Privileges Active</span>
                    </div>
                    <p className="text-orange-950/70 pl-6">
                      Priority dispatch on Purnima & Amavasya puja samagri orders.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="border-t border-orange-200/80 bg-orange-50/60 p-4 space-y-2">
          {user && (
            <a
              href={shopifyAccountUrl || "/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-300/80 bg-white py-2.5 text-[13px] font-semibold text-[#7c2d12] shadow-sm transition hover:bg-orange-50 hover:border-orange-400"
            >
              <span>🌐 Access Sanctuary Member Altar</span>
              <ExternalLink className="size-3.5 text-[#ea580c]" />
            </a>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-orange-950/60">
              {user ? "Authenticated Sanctuary" : "Secure Devotional Encryption"}
            </span>
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="size-3.5" />
                <span>Sign Out of Altar</span>
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
