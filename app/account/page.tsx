"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
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

const devotionalFocusOptions = [
  "Daily Puja & Aarti",
  "Meditation & Mala Japa",
  "Temple Decor & Brassware",
  "Festival Celebrations",
];

export default function AccountPage() {
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

  // Wishlist mock items
  const [wishlist] = useState([products[2], products[1]]);

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
      blessingsCount: 250,
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
    <div className="min-h-[calc(100vh-140px)] bg-[#fffaf3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6 flex items-center justify-between text-[13px] text-[#7c2d12]">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#ea580c] transition font-medium">
            <ArrowLeft className="size-4" />
            <span>Return to Sanctuary Home</span>
          </Link>
          <span className="text-orange-950/60 uppercase tracking-widest text-[11px] font-semibold">
            {user ? "Devotee Member Altar" : "Sanctuary Authentication"}
          </span>
        </div>

        {!user ? (
          /* LOGGED OUT VIEW: FULL PAGE AUTHENTICATION SANCTUARY */
          <div className="mx-auto max-w-[540px] rounded-3xl border border-orange-200/80 bg-white p-8 shadow-xl shadow-orange-900/5">
            <div className="text-center mb-8">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c2d12] to-[#ea580c] text-white mb-4 shadow-md">
                <Flame className="size-7 text-amber-300 fill-amber-300 animate-pulse" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#7c2d12] font-serif">
                Enter Your Devotional Sanctuary
              </h1>
              <p className="mt-2 text-[14px] text-orange-950/70 max-w-[420px] mx-auto leading-relaxed">
                Sign in to track sacred offerings, save mandir addresses, and accumulate Saffron Blessings on every ritual.
              </p>
            </div>

            {/* Tabs */}
            <div className="grid grid-cols-2 rounded-2xl bg-orange-100/70 p-1.5 border border-orange-200/60 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("signin")}
                className={`rounded-xl py-3 text-[14px] font-medium transition-all duration-200 ${
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
                className={`rounded-xl py-3 text-[14px] font-medium transition-all duration-200 ${
                  activeTab === "register"
                    ? "bg-white text-[#ea580c] shadow-sm font-semibold"
                    : "text-orange-950/70 hover:text-[#7c2d12]"
                }`}
              >
                Create Account
              </button>
            </div>

            {activeTab === "signin" ? (
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
                    className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
                      className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 pr-11 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ea580c] to-[#d97706] py-4 text-[15px] font-semibold text-white shadow-lg shadow-orange-600/25 transition duration-200 hover:opacity-95 hover:shadow-orange-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                >
                  Sign In to Sanctuary
                </button>
              </form>
            ) : (
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
                    className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
                    className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
                    className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3.5 text-[14px] text-orange-950 placeholder-orange-950/35 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
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
                        className={`rounded-xl border px-3.5 py-3 text-[13px] font-medium transition-all text-left flex items-center justify-between ${
                          selectedFocus === focus
                            ? "border-[#ea580c] bg-orange-500/10 text-[#ea580c] font-semibold ring-1 ring-orange-500/30"
                            : "border-orange-200/80 bg-white/60 text-orange-950/75 hover:border-orange-300"
                        }`}
                      >
                        <span>{focus}</span>
                        {selectedFocus === focus && <Check className="size-4 shrink-0 text-[#ea580c]" />}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-[#ea580c] to-[#d97706] py-4 text-[15px] font-semibold text-white shadow-lg shadow-orange-600/25 transition duration-200 hover:opacity-95 hover:shadow-orange-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40"
                >
                  Join Saffron Blessings (+250 Blessings)
                </button>
              </form>
            )}

            {/* Instant Demo Login Banner */}
            <div className="mt-6 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 to-orange-50 p-5 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700">
                  <Flame className="size-5 text-[#ea580c] fill-orange-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-[#7c2d12]">
                    Want an Instant Sanctuary Preview?
                  </h4>
                  <p className="mt-1 text-[13px] text-orange-950/75 leading-relaxed">
                    Experience the full devotional portal with pre-loaded orders, saved mandir addresses, and blessings.
                  </p>
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="mt-3.5 inline-flex items-center gap-1.5 rounded-xl bg-[#7c2d12] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#9a3412]"
                  >
                    <span>🙏 Enter as Aarav Sharma (Demo)</span>
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN VIEW: DEVOTEE SANCTUARY DASHBOARD */
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">
            {/* Sidebar Profile Card */}
            <div className="rounded-3xl border border-orange-200/80 bg-white p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#ea580c] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center mt-8">
                <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-[#7c2d12] font-bold text-2xl shadow-xl ring-4 ring-white mb-3">
                  {user.name.slice(0, 2).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-[#7c2d12] font-serif flex items-center gap-1.5">
                  Namaste, {user.name} <span className="text-base">🙏</span>
                </h2>
                <p className="text-[13px] text-orange-950/60 mt-0.5">{user.email}</p>

                {/* Tier Badge */}
                <div className="mt-4 w-full rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 p-4 border border-orange-200/60 text-left shadow-inner">
                  <div className="flex items-center justify-between text-[13px] font-bold text-[#7c2d12] mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Award className="size-4 text-[#ea580c] fill-orange-400" />
                      {user.tier}
                    </span>
                    <span className="bg-[#ea580c] text-white px-2.5 py-0.5 rounded-full text-[11px]">
                      {user.blessingsCount.toLocaleString()} Blessings
                    </span>
                  </div>
                  <div className="w-full bg-orange-200/60 h-2 rounded-full overflow-hidden my-2">
                    <div
                      className="bg-gradient-to-r from-[#ea580c] to-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (user.blessingsCount / 2000) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-orange-950/70 font-medium">
                    <span>Devotee Since: {user.joinedDate}</span>
                    <span>Next Tier: 2,000</span>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="mt-6 w-full space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setPortalTab("orders")}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                      portalTab === "orders"
                        ? "bg-[#7c2d12] text-white font-semibold shadow-md"
                        : "text-orange-950/80 hover:bg-orange-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Package className="size-4" />
                      <span>Sacred Offerings & Orders</span>
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${portalTab === "orders" ? "bg-white/20 text-white" : "bg-orange-100 text-[#ea580c]"}`}>
                      {user.orders.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortalTab("addresses")}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                      portalTab === "addresses"
                        ? "bg-[#7c2d12] text-white font-semibold shadow-md"
                        : "text-orange-950/80 hover:bg-orange-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <MapPin className="size-4" />
                      <span>Sanctuary Mandirs</span>
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${portalTab === "addresses" ? "bg-white/20 text-white" : "bg-orange-100 text-[#ea580c]"}`}>
                      {user.addresses.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortalTab("wishlist")}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                      portalTab === "wishlist"
                        ? "bg-[#7c2d12] text-white font-semibold shadow-md"
                        : "text-orange-950/80 hover:bg-orange-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Heart className="size-4" />
                      <span>Devotional Wishlist</span>
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${portalTab === "wishlist" ? "bg-white/20 text-white" : "bg-orange-100 text-[#ea580c]"}`}>
                      {wishlist.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPortalTab("perks")}
                    className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-all ${
                      portalTab === "perks"
                        ? "bg-[#7c2d12] text-white font-semibold shadow-md"
                        : "text-orange-950/80 hover:bg-orange-50"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Award className="size-4" />
                      <span>Blessings & Rewards</span>
                    </span>
                    <ChevronRight className="size-4 opacity-70" />
                  </button>
                </div>

                <div className="mt-6 w-full pt-4 border-t border-orange-100 space-y-2">
                  <a
                    href={shopifyAccountUrl || "/contact"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50/50 py-2.5 text-[13px] font-semibold text-[#7c2d12] transition hover:bg-orange-100"
                  >
                    <span>🌐 Official Devotee Altar Portal</span>
                    <ExternalLink className="size-3.5 text-[#ea580c]" />
                  </a>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="size-4" />
                    <span>Sign Out of Sanctuary Altar</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="rounded-3xl border border-orange-200/80 bg-white p-6 sm:p-8 shadow-sm min-h-[520px]">
              {portalTab === "orders" && (
                <div className="space-y-6">
                  <div className="border-b border-orange-100 pb-4">
                    <h3 className="text-xl font-bold text-[#7c2d12] font-serif">
                      Sacred Offerings & Order History
                    </h3>
                    <p className="text-[13px] text-orange-950/60 mt-0.5">
                      Track your puja samagri dispatches, ritual kits, and devotional deliveries.
                    </p>
                  </div>

                  {user.orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/30 p-12 text-center">
                      <Package className="mx-auto size-12 text-orange-300 mb-3" />
                      <h4 className="text-[16px] font-bold text-[#7c2d12]">No ritual offerings placed yet</h4>
                      <p className="text-[14px] text-orange-950/60 mt-1 max-w-sm mx-auto">
                        Begin your devotional journey by bringing blessed samagri and brassware to your home altar.
                      </p>
                      <Link
                        href="/#sacred-store"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ea580c] px-5 py-3 text-[14px] font-semibold text-white shadow-md hover:bg-[#d97706] transition"
                      >
                        <span>Explore Sacred Offerings</span>
                        <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.orders.map((order) => (
                        <div
                          key={order.id}
                          className="rounded-2xl border border-orange-200/80 bg-gradient-to-r from-white to-orange-50/20 p-5 shadow-sm transition hover:border-orange-300"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 pb-3 mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[15px] font-bold text-[#7c2d12]">{order.id}</span>
                                <span className="text-orange-300">•</span>
                                <span className="text-[13px] font-medium text-orange-950/60">{order.date}</span>
                              </div>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                              order.status === "Blessed & Delivered"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : "bg-amber-50 text-amber-800 border border-amber-300/80"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="space-y-2 py-1">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2.5 text-[14px] font-medium text-orange-950">
                                <span className="size-2 rounded-full bg-[#ea580c]" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between pt-3 border-t border-orange-100/60 text-[13px]">
                            <span className="text-orange-950/60 font-medium">Total Offering Amount</span>
                            <span className="text-[16px] font-bold text-[#7c2d12]">{order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {portalTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-orange-100 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#7c2d12] font-serif">
                        Sanctuary Mandir Addresses
                      </h3>
                      <p className="text-[13px] text-orange-950/60 mt-0.5">
                        Manage your sacred delivery addresses for home altars and temple donations.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(!showAddAddress)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#ea580c] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#d97706] transition"
                    >
                      <Plus className="size-4" />
                      <span>Add Mandir Address</span>
                    </button>
                  </div>

                  {showAddAddress && (
                    <form onSubmit={handleAddAddress} className="rounded-2xl border border-orange-300 bg-orange-50/70 p-6 space-y-4 shadow-sm">
                      <h4 className="text-[15px] font-bold text-[#7c2d12] font-serif">Add New Sanctuary Address</h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                            Sanctuary Label (e.g. Home Mandir, Office Altar)
                          </label>
                          <input
                            type="text"
                            required
                            value={addrLabel}
                            onChange={(e) => setAddrLabel(e.target.value)}
                            placeholder="e.g. Ancestral Mandir (Varanasi)"
                            className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[12px] font-semibold uppercase tracking-wider text-[#7c2d12] mb-1.5">
                            Full Address, Landmark & PIN Code
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={addrDetails}
                            onChange={(e) => setAddrDetails(e.target.value)}
                            placeholder="Plot / Flat, Building Name, Street, City, State, PIN Code..."
                            className="w-full rounded-xl border border-orange-200 bg-white px-4 py-3 text-[14px] text-orange-950 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowAddAddress(false)}
                          className="rounded-xl px-4 py-2.5 text-[13px] font-semibold text-orange-950/70 hover:bg-orange-100 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-xl bg-[#7c2d12] px-5 py-2.5 text-[13px] font-semibold text-white shadow-md hover:bg-[#9a3412] transition"
                        >
                          Save Altar Address
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="relative rounded-2xl border border-orange-200/80 bg-white p-5 shadow-sm transition hover:border-orange-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[16px] text-[#7c2d12]">{addr.label}</span>
                              {addr.isDefault && (
                                <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold text-[#ea580c]">
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
                          <p className="text-[14px] text-orange-950/75 leading-relaxed">{addr.details}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-orange-50 flex justify-end">
                          <span className="text-[12px] font-medium text-emerald-700 flex items-center gap-1">
                            <ShieldCheck className="size-3.5" />
                            <span>Verified Mandir Location</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {portalTab === "wishlist" && (
                <div className="space-y-6">
                  <div className="border-b border-orange-100 pb-4">
                    <h3 className="text-xl font-bold text-[#7c2d12] font-serif">
                      Devotional Wishlist & Saved Offerings
                    </h3>
                    <p className="text-[13px] text-orange-950/60 mt-0.5">
                      Sacred items you have saved for upcoming pujas and rituals.
                    </p>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/30 p-12 text-center">
                      <Heart className="mx-auto size-12 text-orange-300 mb-3" />
                      <h4 className="text-[16px] font-bold text-[#7c2d12]">Your sacred wishlist is empty</h4>
                      <Link
                        href="/#sacred-store"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#ea580c] px-5 py-3 text-[14px] font-semibold text-white shadow-md hover:bg-[#d97706] transition"
                      >
                        <span>Explore Sacred Offerings</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between rounded-2xl border border-orange-200/80 bg-white p-5 shadow-sm transition hover:border-orange-300"
                        >
                          <div className="flex items-start gap-4">
                            <div className="size-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-3xl shrink-0">
                              🪔
                            </div>
                            <div>
                              <h4 className="text-[15px] font-bold text-[#7c2d12]">{item.title}</h4>
                              <p className="text-[12px] text-orange-950/60 mt-0.5">{item.subtitle}</p>
                              <div className="mt-2 text-[15px] font-bold text-[#ea580c]">{item.price}</div>
                            </div>
                          </div>
                          <div className="mt-5 pt-3 border-t border-orange-50 flex items-center justify-between">
                            <Link
                              href={`/product/${item.id}`}
                              className="text-[13px] font-semibold text-[#7c2d12] hover:underline"
                            >
                              View Ritual Kit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleMoveToBag(item)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-[#ea580c] px-4 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-[#d97706] transition"
                            >
                              <ShoppingBag className="size-4" />
                              <span>Move to Bag</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {portalTab === "perks" && (
                <div className="space-y-6">
                  <div className="border-b border-orange-100 pb-4">
                    <h3 className="text-xl font-bold text-[#7c2d12] font-serif">
                      Saffron Blessings Rewards & Devotional Tiers
                    </h3>
                    <p className="text-[13px] text-orange-950/60 mt-0.5">
                      Earn divine blessings with every offering and unlock sacred privileges.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-gradient-to-br from-[#7c2d12] via-[#9a3412] to-[#ea580c] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute right-0 top-0 size-64 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1 text-[13px] font-semibold text-amber-300 mb-3 backdrop-blur-sm">
                        <Award className="size-4 fill-amber-300" />
                        <span>Active Membership: {user.tier}</span>
                      </div>
                      <h4 className="text-2xl font-bold font-serif">
                        You have accumulated {user.blessingsCount.toLocaleString()} Saffron Blessings
                      </h4>
                      <p className="mt-2 text-[14px] text-orange-100/90 leading-relaxed">
                        Every Rs. 100 spent on daily puja samagri, brass diya sets, and festival kits credits 10 Blessings to your sanctuary altar. Redeem blessings for priority astrological consultations and muhurat alerts.
                      </p>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                          <span className="block text-2xl font-bold text-amber-200">Tier 1</span>
                          <span className="block text-[14px] font-bold text-white mt-0.5">Sacred Patron</span>
                          <span className="text-[12px] text-orange-200 mt-1 block">Priority Purnima & Amavasya shipping</span>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                          <span className="block text-2xl font-bold text-amber-200">Tier 2</span>
                          <span className="block text-[14px] font-bold text-white mt-0.5">Divine Benefactor</span>
                          <span className="text-[12px] text-orange-200 mt-1 block">Free astrological muhurat selection</span>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                          <span className="block text-2xl font-bold text-amber-200">Tier 3</span>
                          <span className="block text-[14px] font-bold text-white mt-0.5">Temple Guardian</span>
                          <span className="text-[12px] text-orange-200 mt-1 block">Annual priest puja at Varanasi ghats</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
