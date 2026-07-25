"use client";

import Link from "next/link";
import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { dropdownItems, flatItems } from "@/components/home/content";
import type { NavDropdownItem } from "@/components/home/content";
import { readLocalCart, SHOPIFY_CART_EVENT } from "@/lib/cart-store";

const SHOPIFY_LOGIN_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "ui11g6-zh.myshopify.com"}/account/login`;


const navHrefs: Record<string, string> = {
  Home: "/",
  "About Us": "/about",
  "Contact Us": "/contact",
  OFFERINGS: "/#sacred-store",
  RITUALS: "/#rituals",
  GUIDANCE: "/#guidance",
  "Puja Essentials": "/product/55-smart-tv",
  "Meditation Tools": "/product/techno-projector",
  "Sacred Gifts": "/product/yuqos-neosound-flex",
  "Daily Puja": "/product/55-smart-tv",
  "Festival Kits": "/product/15-dpf",
  "Temple Decor": "/product/iprojector-2-plus",
  "Spiritual Consultation": "/#guidance",
  "Prayer Requests": "/contact",
  "Sacred Learning": "/#guidance",
};

function getNavHref(label: string) {
  return navHrefs[label] || "/";
}

function BrandLogo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-8 items-center justify-center rounded-full bg-[#ea580c] text-[13px] font-semibold text-white shadow-sm shadow-orange-900/20">
        SB
      </span>
      <span className="leading-none">
        <span className="block text-[17px] font-semibold tracking-tight text-[#7c2d12] sm:text-[20px]">
          Saffron Blessings
        </span>
        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-[#ea580c] sm:block">
          Puja & Devotion
        </span>
      </span>
    </span>
  );
}

function IconLink({
  children,
  label,
  href,
  onClick,
  external,
}: {
  children: ReactNode;
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="relative inline-flex size-8 items-center justify-center rounded-full text-[#7c2d12] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
    >
      {children}
    </Link>
  );
}

function FlatNavLink({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={getNavHref(label)}
      onClick={onClick}
      className="inline-flex h-full min-w-max items-center gap-1 px-2.5 text-[13px] font-medium tracking-tight text-[#7c2d12] transition-colors duration-200 hover:text-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
    >
      <span>{label}</span>
    </Link>
  );
}

function DropdownNavItem({
  label,
  items,
  open,
  onToggle,
  onOpen,
  onClose,
}: NavDropdownItem & {
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
}) {
  const panelId = `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-menu`;

  return (
    <div className="relative h-full" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        onFocus={onOpen}
        className="inline-flex h-full min-w-max items-center gap-0.5 px-2.5 text-[13px] font-medium tracking-tight text-[#7c2d12] transition-colors duration-200 hover:text-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
      >
        <span>{label}</span>
        <ChevronDown
          className={`size-3.5 stroke-[2.15] transition-transform duration-200 ${
            open ? "translate-y-px rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={panelId}
          className="absolute left-1/2 top-full z-40 w-[260px] -translate-x-1/2 pt-2"
        >
          <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-[0_20px_50px_rgba(194,65,12,0.14)]">
            <Link
              href={getNavHref(label)}
              onClick={onClose}
              className="block bg-[linear-gradient(180deg,rgba(255,247,237,0.95),rgba(255,255,255,1))] px-4 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-orange-700 transition-colors hover:text-[#ea580c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/25"
            >
              View all {label.toLowerCase()}
            </Link>
            <div className="p-2">
              {items.map((item) => (
                <Link
                  key={item}
                  href={getNavHref(item)}
                  onClick={onClose}
                  className="flex items-center rounded-xl px-3 py-2 text-[13px] text-orange-950/75 transition-colors hover:bg-orange-50 hover:text-orange-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/25"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileDropdown({
  label,
  items,
  onNavigate,
}: NavDropdownItem & {
  onNavigate: () => void;
}) {
  return (
    <details className="group rounded-xl border border-orange-200 bg-white/70">
      <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 text-[14px] font-medium text-[#7c2d12]">
        <span>{label}</span>
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-orange-100 p-2">
        <Link
          href={getNavHref(label)}
          onClick={onNavigate}
          className="flex rounded-lg px-3 py-2 text-[13px] font-medium text-[#ea580c] hover:bg-orange-50"
        >
          View all {label.toLowerCase()}
        </Link>
        {items.map((item) => (
          <Link
            key={item}
            href={getNavHref(item)}
            onClick={onNavigate}
            className="flex rounded-lg px-3 py-2 text-[13px] text-orange-950/75 hover:bg-orange-50"
          >
            {item}
          </Link>
        ))}
      </div>
    </details>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    function syncState() {
      setCartCount(readLocalCart().reduce((total, item) => total + item.quantity, 0));
    }

    syncState();
    window.addEventListener(SHOPIFY_CART_EVENT, syncState);
    window.addEventListener("storage", syncState);
    return () => {
      window.removeEventListener(SHOPIFY_CART_EVENT, syncState);
      window.removeEventListener("storage", syncState);
    };
  }, []);



  const handleNavigate = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-orange-200/80 bg-[#fffaf3]/95 backdrop-blur-md transition-all duration-300"
    >
      <div className="mx-auto flex h-[56px] max-w-[1600px] items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:grid lg:grid-cols-[220px_1fr_220px]">
        <Link
          href="/"
          onClick={handleNavigate}
          className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
        >
          <BrandLogo />
        </Link>

        <nav className="hidden items-center justify-center gap-1 lg:flex xl:gap-2" aria-label="Main navigation">
          <FlatNavLink label={flatItems[0]} />
          <DropdownNavItem
            {...dropdownItems[0]}
            open={openMenu === dropdownItems[0].label}
            onToggle={() =>
              setOpenMenu((current) =>
                current === dropdownItems[0].label ? null : dropdownItems[0].label
              )
            }
            onOpen={() => setOpenMenu(dropdownItems[0].label)}
            onClose={() => setOpenMenu(null)}
          />
          <DropdownNavItem
            {...dropdownItems[1]}
            open={openMenu === dropdownItems[1].label}
            onToggle={() =>
              setOpenMenu((current) =>
                current === dropdownItems[1].label ? null : dropdownItems[1].label
              )
            }
            onOpen={() => setOpenMenu(dropdownItems[1].label)}
            onClose={() => setOpenMenu(null)}
          />
          <DropdownNavItem
            {...dropdownItems[2]}
            open={openMenu === dropdownItems[2].label}
            onToggle={() =>
              setOpenMenu((current) =>
                current === dropdownItems[2].label ? null : dropdownItems[2].label
              )
            }
            onOpen={() => setOpenMenu(dropdownItems[2].label)}
            onClose={() => setOpenMenu(null)}
          />
          <FlatNavLink label={flatItems[1]} />
          <FlatNavLink label={flatItems[2]} />
        </nav>

        <div className="hidden shrink-0 items-center justify-self-end gap-1 sm:flex sm:gap-2">
          <IconLink href="/#sacred-store" label="Search products">
            <Search className="size-[15px] stroke-[1.7]" />
          </IconLink>
          <IconLink href={SHOPIFY_LOGIN_URL} label="Sign in to my account" external>
            <User className="size-[16px] stroke-[1.8]" />
          </IconLink>
          <IconLink href="/cart" label={`Shopping bag with ${cartCount} items`}>
            <ShoppingBag className="size-[15px] stroke-[1.7]" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#ea580c] px-1 text-[9px] font-semibold leading-4 text-white">
                {cartCount}
              </span>
            ) : null}
          </IconLink>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:hidden">
          <IconLink href="/#sacred-store" label="Search products">
            <Search className="size-[15px] stroke-[1.7]" />
          </IconLink>
          <IconLink href={SHOPIFY_LOGIN_URL} label="Sign in to my account" external>
            <User className="size-[16px] stroke-[1.8]" />
          </IconLink>
          <IconLink href="/cart" label={`Shopping bag with ${cartCount} items`}>
            <ShoppingBag className="size-[15px] stroke-[1.7]" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-[#ea580c] px-1 text-[9px] font-semibold leading-4 text-white">
                {cartCount}
              </span>
            ) : null}
          </IconLink>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((current) => !current)}
            className="inline-flex size-8 items-center justify-center rounded-full text-[#7c2d12] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30"
          >
            {mobileOpen ? <X className="size-[15px] stroke-[1.8]" /> : <Menu className="size-[15px] stroke-[1.8]" />}
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="fixed inset-x-0 top-[56px] z-40 max-h-[calc(100vh-56px)] overflow-y-auto border-t border-orange-200 bg-[#fffaf3] sm:top-[72px] sm:max-h-[calc(100vh-72px)] lg:hidden">
          <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6">
            <div className="grid gap-1">
              <FlatNavLink label={flatItems[0]} onClick={handleNavigate} />
              <MobileDropdown {...dropdownItems[0]} onNavigate={handleNavigate} />
              <MobileDropdown {...dropdownItems[1]} onNavigate={handleNavigate} />
              <MobileDropdown {...dropdownItems[2]} onNavigate={handleNavigate} />
              <FlatNavLink label={flatItems[1]} onClick={handleNavigate} />
              <FlatNavLink label={flatItems[2]} onClick={handleNavigate} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
