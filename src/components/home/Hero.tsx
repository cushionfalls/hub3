"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HERO_SLIDES, TRUST_ITEMS, type HeroSlide } from "@/data/storefront";
import { formatNpr } from "@/lib/currency";
import {
  IconArrowRight,
  IconHeadset,
  IconRefresh,
  IconShieldCheck,
  IconTruck,
} from "../icons";

const TRUST_ICONS = {
  shield: IconShieldCheck,
  truck: IconTruck,
  refresh: IconRefresh,
  headset: IconHeadset,
};

const PANEL_TONE: Record<HeroSlide["tone"], string> = {
  coral: "bg-coral",
  cobalt: "bg-cobalt",
  paper: "bg-paper-deep",
};

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const slide = HERO_SLIDES[active];
  const product = slide.product;
  const onLight = slide.tone === "paper";

  useEffect(() => {
    if (focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % HERO_SLIDES.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [focused, active]);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setFocused(false);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="container-wide py-6 sm:py-8"
    >
      <div
        className="grid overflow-hidden lg:grid-cols-[0.9fr_1.1fr]"
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={handleBlur}
      >
        <div className="flex flex-col justify-between bg-paper pb-6 pt-2 lg:py-8 lg:pr-12">
          <div key={product.id} className="animate-hero-fade">
            <h1 className="display min-h-[1.84em] max-w-[5em] text-[clamp(3.6rem,7.4vw,7rem)] leading-[0.92]">
              {slide.headline}
            </h1>

            <p className="mt-6 min-h-[4.9em] max-w-[480px] text-[15px] leading-relaxed text-ink-soft sm:min-h-[3.25em]">
              {slide.blurb}
            </p>
          </div>

          <div className="mt-9 flex items-center gap-2">
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.product.id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${item.headline}`}
                aria-current={index === active ? "true" : undefined}
                className="group flex h-8 w-10 items-center"
              >
                <span
                  className={`h-1.5 w-full transition-colors ${
                    index === active
                      ? "bg-coral"
                      : "bg-line group-hover:bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div
          className={`relative flex min-h-[440px] flex-col justify-between p-6 transition-colors duration-500 sm:min-h-[500px] sm:p-8 lg:min-h-[560px] ${PANEL_TONE[slide.tone]}`}
        >
          <p
            key={`${product.id}-title`}
            className={`animate-hero-fade line-clamp-2 text-[13px] font-semibold sm:line-clamp-1 ${
              onLight ? "text-ink" : "text-white"
            }`}
          >
            {product.title}
          </p>

          <div className="relative min-h-[200px] flex-1">
            {HERO_SLIDES.map((item, index) => (
              <img
                key={item.product.id}
                src={item.product.image}
                alt={item.product.title}
                className={`absolute inset-0 h-full w-full object-contain p-2 transition-opacity duration-700 ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div
            key={`${product.id}-meta`}
            className="animate-hero-fade flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <p
                className={`text-[12px] ${
                  onLight ? "text-muted" : "text-white"
                }`}
              >
                {product.series}
                {product.storage ? ` · ${product.storage}` : ""}
              </p>
              <p
                className={`mt-1 text-[24px] font-bold ${
                  onLight ? "text-ink" : "text-white"
                }`}
              >
                {formatNpr(product.price)}
              </p>
            </div>
            <Link
              href={`/products/${product.id}`}
              className={`inline-flex h-10 items-center gap-2 px-4 text-[12px] font-semibold transition-colors ${
                onLight
                  ? "bg-ink text-paper hover:bg-cobalt"
                  : "bg-white text-ink hover:bg-ink hover:text-white"
              }`}
            >
              View product
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 bg-paper-deep p-6 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => {
          const Icon = TRUST_ICONS[item.icon];
          return (
            <div key={item.title} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
