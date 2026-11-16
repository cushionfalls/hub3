"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { BRANDS, CATEGORY_CARDS, NAV_ITEMS } from "@/data/storefront";
import {
  IconArrowRight,
  IconCart,
  IconChevronDown,
  IconHeart,
  IconMenu,
  IconSearch,
  IconUser,
  IconX,
} from "./icons";

const POPULAR_SEARCHES = [
  "Insta360 X5",
  "JBL Flip 7",
  "Anker Prime",
  "UGREEN Nexode",
];

export default function Header() {
  const pathname = usePathname();
  return <HeaderShell key={pathname} />;
}

function HeaderShell() {
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeAll = () => {
    setMegaOpen(false);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    closeAll();
    router.push(
      value ? `/collections?q=${encodeURIComponent(value)}` : "/collections"
    );
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAll();
    };
    const onPointerDown = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMegaOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkClass =
    "inline-flex h-10 items-center gap-1.5 whitespace-nowrap px-3 text-[13px] font-medium text-ink transition-colors hover:text-coral";

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full border-b border-line bg-paper"
      >
        <div className="container-wide flex h-[72px] items-center justify-between gap-4 lg:h-[80px]">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {NAV_ITEMS.map((item) =>
              item.label === "Shop All" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setMegaOpen((open) => !open);
                  }}
                  aria-expanded={megaOpen}
                  className={navLinkClass}
                >
                  Shop
                  <IconChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      megaOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link key={item.label} href={item.href} className={navLinkClass}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={() => {
                setMegaOpen(false);
                setSearchOpen((open) => !open);
              }}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className="hidden h-10 items-center gap-2 px-3 text-[13px] font-medium text-ink transition-colors hover:text-coral md:flex"
            >
              <IconSearch className="h-4 w-4" />
              <span className="hidden xl:inline">Search</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMegaOpen(false);
                setSearchOpen((open) => !open);
              }}
              aria-label="Search"
              className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-coral md:hidden"
            >
              <IconSearch className="h-[18px] w-[18px]" />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              className="hidden h-10 w-10 place-items-center text-ink transition-colors hover:text-coral sm:grid"
            >
              <IconUser className="h-[19px] w-[19px]" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ""}`}
              className="relative hidden h-10 w-10 place-items-center text-ink transition-colors hover:text-coral sm:grid"
            >
              <IconHeart className="h-[18px] w-[18px]" />
              {wishlistCount > 0 ? (
                <span className="absolute right-1 top-1 text-[10px] font-bold text-coral">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>

            <button
              type="button"
              onClick={() => {
                closeAll();
                setIsCartOpen(true);
              }}
              className="ml-1 flex h-10 items-center gap-2 bg-ink px-3 text-[12px] font-semibold text-paper transition-colors hover:bg-coral sm:h-11 sm:px-4"
            >
              <IconCart className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Bag</span>
              <span className="text-white">({totalItems})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMegaOpen(false);
                setSearchOpen(false);
                setMobileOpen(true);
              }}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-coral lg:hidden"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {megaOpen ? (
          <div className="absolute inset-x-0 top-full hidden border-b border-line bg-paper lg:block">
            <div className="container-wide grid gap-10 py-8 xl:grid-cols-[1.1fr_1fr_0.8fr]">
              <div>
                <p className="text-[12px] font-semibold text-muted">
                  Shop by category
                </p>
                <div className="mt-3 grid grid-cols-2 gap-x-8">
                  {CATEGORY_CARDS.map((category) => (
                    <Link
                      key={category.label}
                      href={category.href}
                      onClick={closeAll}
                      className="border-b border-line py-3 text-[13px] font-medium text-ink transition-colors hover:text-coral"
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-muted">
                  Shop by brand
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {BRANDS.map((brand) => (
                    <Link
                      key={brand.name}
                      href={brand.href}
                      onClick={closeAll}
                      className="flex items-center gap-3 bg-paper-deep p-3 transition-colors hover:bg-line"
                    >
                      <span className="grid h-9 w-12 shrink-0 place-items-center bg-paper px-1.5">
                        <img
                          src={brand.logo}
                          alt=""
                          className="max-h-4 max-w-full object-contain"
                        />
                      </span>
                      <span className="text-[12px] font-semibold text-ink">
                        {brand.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-ink p-5 text-paper">
                <p className="text-[12px] font-semibold text-paper">
                  Need help choosing?
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-paper">
                  Tell us how you shoot, listen or travel and we will narrow it
                  down.
                </p>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="mt-4 inline-flex h-10 items-center gap-2 bg-coral px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                >
                  Talk to our team
                  <IconArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {searchOpen ? (
          <div className="absolute inset-x-0 top-full border-b border-line bg-paper">
            <div className="container-wide py-7 sm:py-9">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink">
                  Search products
                </p>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="grid h-8 w-8 place-items-center text-ink transition-colors hover:text-coral"
                >
                  <IconX className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={submitSearch} className="mt-3">
                <div className="flex items-center gap-3 border-b-2 border-ink pb-2">
                  <IconSearch className="h-6 w-6 shrink-0 text-ink" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    aria-label="Search products"
                    placeholder="What are you looking for?"
                    className="min-w-0 flex-1 bg-transparent py-1 text-[20px] font-medium text-ink outline-none placeholder:text-muted sm:text-[26px] [&::-webkit-search-cancel-button]:hidden"
                  />
                  <button
                    type="submit"
                    className="hidden h-10 items-center gap-2 bg-ink px-5 text-[12px] font-semibold text-paper transition-colors hover:bg-coral sm:flex"
                  >
                    Search
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="mt-5">
                <p className="text-[12px] font-semibold text-muted">
                  Popular searches
                </p>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        closeAll();
                        router.push(
                          `/collections?q=${encodeURIComponent(term)}`
                        );
                      }}
                      className="text-[13px] font-medium text-ink transition-colors hover:text-coral"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[80] flex lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="animate-menu-in relative z-10 flex h-full w-[88vw] max-w-[390px] flex-col bg-paper">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center text-ink transition-colors hover:text-coral"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/account"
                  onClick={closeAll}
                  className="flex items-center gap-2 bg-paper-deep px-3 py-3 text-[12px] font-semibold text-ink"
                >
                  <IconUser className="h-4 w-4 text-coral" />
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={closeAll}
                  className="flex items-center gap-2 bg-paper-deep px-3 py-3 text-[12px] font-semibold text-ink"
                >
                  <IconHeart className="h-4 w-4 text-coral" />
                  Wishlist
                  {wishlistCount > 0 ? (
                    <span className="ml-auto text-[11px] font-bold text-coral">
                      {wishlistCount}
                    </span>
                  ) : null}
                </Link>
              </div>

              <nav className="mt-5">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeAll}
                    className="flex items-center justify-between border-b border-line py-4 text-[16px] font-semibold text-ink"
                  >
                    {item.label}
                    <IconArrowRight className="h-4 w-4 text-muted" />
                  </Link>
                ))}
              </nav>

              <p className="mt-6 text-[12px] font-semibold text-muted">
                Shop by brand
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {BRANDS.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    onClick={closeAll}
                    className="flex items-center gap-2 bg-paper-deep p-2.5"
                  >
                    <span className="grid h-8 w-10 shrink-0 place-items-center bg-paper px-1">
                      <img
                        src={brand.logo}
                        alt=""
                        className="max-h-3.5 max-w-full object-contain"
                      />
                    </span>
                    <span className="text-[11px] font-semibold text-ink">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                onClick={closeAll}
                className="mt-5 flex items-center justify-between border border-line px-4 py-3 text-[12px] font-semibold text-ink"
              >
                Contact support
                <IconArrowRight className="h-4 w-4 text-coral" />
              </Link>
            </div>

            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => {
                  closeAll();
                  setIsCartOpen(true);
                }}
                className="flex h-11 w-full items-center justify-between bg-ink px-4 text-[12px] font-semibold text-paper"
              >
                <span>View bag</span>
                <span>{totalItems} items</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
