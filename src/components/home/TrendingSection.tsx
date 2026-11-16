"use client";

import React, { useMemo, useState } from "react";
import { TRENDING_PRODUCTS } from "@/data/storefront";
import ProductCard from "../ProductCard";
import SectionHeading from "../SectionHeading";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "cameras", label: "Cameras" },
  { key: "audio", label: "Audio" },
  { key: "power", label: "Power" },
  { key: "charging", label: "Charging" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

const matchesFilter = (key: FilterKey, category: string) => {
  if (key === "all") return true;
  if (key === "cameras") return category === "Action Cameras";
  if (key === "audio")
    return ["Speakers", "Headphones", "Earbuds"].includes(category);
  if (key === "power") return category === "Power Banks";
  return ["Chargers", "Cables", "Hubs & Docks"].includes(category);
};

export default function TrendingSection() {
  const [active, setActive] = useState<FilterKey>("all");

  const products = useMemo(
    () =>
      TRENDING_PRODUCTS.filter((product) =>
        matchesFilter(active, product.category)
      ).slice(0, 8),
    [active]
  );

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeading
          title="Popular right now"
          description="The products customers are adding to their bags this week."
          action={{ label: "Browse everything", href: "/collections" }}
        />

        <div className="no-scrollbar mt-7 flex items-center gap-6 overflow-x-auto border-b border-line pb-0">
          {FILTERS.map((filter) => {
            const isActive = active === filter.key;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                className={`shrink-0 border-b-2 pb-3 text-[13px] font-semibold transition-colors ${
                  isActive
                    ? "border-coral text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 ? (
          <div className="mt-8 bg-paper-deep p-10 text-center">
            <p className="text-[18px] font-semibold text-ink">
              Nothing in this shelf yet.
            </p>
            <p className="mt-1 text-[13px] text-muted">
              Try another category or browse the full collection.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
