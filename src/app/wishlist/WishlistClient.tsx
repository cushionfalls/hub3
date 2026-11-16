"use client";

import React from "react";
import Link from "next/link";
import { CATALOG } from "@/data/catalog";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import {
  IconArrowRight,
  IconCart,
  IconHeart,
  IconX,
} from "@/components/icons";

const PICKS = [
  "insta360-x5",
  "jbl-flip-7",
  "anker-prime-26k-300w",
  "ugreen-nexode-100w",
]
  .map((id) => CATALOG.find((product) => product.id === id))
  .filter((product) => Boolean(product));

export default function WishlistClient() {
  const { ids, hydrated, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const saved = CATALOG.filter((product) => ids.includes(product.id));

  const addAll = () => {
    saved.forEach((product) => {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        variant: product.storage,
      });
    });
  };

  return (
    <div className="container-wide py-8 sm:py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-[clamp(44px,7vw,84px)] leading-[0.95]">
            Saved for later
          </h1>
          <p className="mt-3 max-w-[520px] text-[13px] leading-relaxed text-muted">
            The gear you are still thinking about. Saves stay on this device, so
            you can come back when the budget agrees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[12px] text-muted">
            {hydrated ? `${ids.length} saved` : "Loading…"}
          </span>
          {saved.length > 0 ? (
            <>
              <button
                type="button"
                onClick={addAll}
                className="inline-flex h-10 items-center gap-1.5 bg-ink px-4 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
              >
                <IconCart className="h-3.5 w-3.5" />
                Add all to bag
              </button>
              <button
                type="button"
                onClick={clearWishlist}
                className="inline-flex h-10 items-center gap-1.5 px-3 text-[12px] font-semibold text-muted transition-colors hover:text-coral"
              >
                <IconX className="h-3.5 w-3.5" />
                Clear
              </button>
            </>
          ) : null}
        </div>
      </div>

      {!hydrated ? (
        <div className="mt-8 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[0, 1, 2, 3].map((item) => (
            <div key={item}>
              <div className="aspect-square animate-pulse bg-paper-deep" />
              <div className="mt-3 h-4 w-2/3 animate-pulse bg-paper-deep" />
              <div className="mt-2 h-4 w-1/3 animate-pulse bg-paper-deep" />
            </div>
          ))}
        </div>
      ) : saved.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
            {saved.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 bg-paper-deep px-5 py-4">
            <div>
              <p className="text-[12.5px] font-semibold text-ink">
                Still deciding? Talk it through.
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                Tell us how you shoot, listen or travel and we will narrow it
                down.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-9 items-center gap-1.5 bg-ink px-4 text-[11.5px] font-semibold text-paper transition-colors hover:bg-coral"
            >
              Ask the team
              <IconArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-8 grid items-stretch gap-3 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-paper-deep p-7 sm:p-10">
            <span className="grid h-12 w-12 place-items-center bg-paper">
              <IconHeart className="h-5 w-5 text-coral" />
            </span>
            <h2 className="display mt-6 text-[40px] leading-[0.95] sm:text-[52px]">
              Nothing saved yet
            </h2>
            <p className="mt-4 max-w-[420px] text-[12.5px] leading-relaxed text-muted">
              Tap the heart on any product to park it here. Your shortlist
              follows you across pages and survives a refresh.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/collections"
                className="inline-flex h-11 items-center gap-2 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
              >
                Explore the shelves
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/collections?deals=true"
                className="text-[12px] font-semibold text-ink underline underline-offset-4"
              >
                See today&apos;s deals
              </Link>
            </div>
          </div>

          <div className="bg-cobalt p-7 text-white sm:p-9">
            <h2 className="display text-[34px] leading-[0.95] sm:text-[42px]">
              Start with the icons
            </h2>
            <ul className="mt-6 space-y-4">
              {PICKS.slice(0, 3).map((product) =>
                product ? (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      className="group flex items-center gap-3"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center bg-white p-1.5">
                        <img
                          src={product.image}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[12.5px] font-semibold">
                          {product.title}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-white">
                          {product.category}
                        </span>
                      </span>
                      <IconArrowRight className="h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
      )}

      {hydrated && saved.length === 0 ? (
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-[28px]">Popular right now</h2>
            <Link
              href="/collections"
              className="text-[12px] font-semibold text-cobalt underline underline-offset-4"
            >
              View all
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {PICKS.map((product) =>
              product ? (
                <ProductCard key={product.id} product={product} />
              ) : null
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
