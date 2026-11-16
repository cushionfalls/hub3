"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATALOG } from "@/data/catalog";
import {
  CATEGORY_NAMES,
  PRICE_MAX_USD,
  productsForBrand,
} from "@/data/storefront";
import ProductCard from "@/components/ProductCard";
import { discountPercent, formatNprValue, toNpr } from "@/lib/currency";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconChevronDown,
  IconFilter,
  IconStar,
  IconX,
} from "@/components/icons";

const BRAND_OPTIONS = ["Insta360", "JBL", "Ugreen", "Anker"].map((brand) => ({
  label: brand === "Ugreen" ? "UGREEN" : brand,
  value: brand,
  count: productsForBrand(brand).length,
}));

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest arrivals" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "discount", label: "Biggest discount" },
];

const RATING_OPTIONS = [0, 4, 4.5];
const MAX_NPR = toNpr(PRICE_MAX_USD);

interface FilterPanelProps {
  selectedBrands: string[];
  toggleBrand: (brand: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  dealsOnly: boolean;
  setDealsOnly: (value: boolean) => void;
  priceMax: number;
  setPriceMax: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  clearFilters: () => void;
  activeCount: number;
}

export default function CollectionsClient() {
  const searchParams = useSearchParams();
  return <CollectionsView key={searchParams.toString()} />;
}

function CollectionsView() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";
  const brandParam = searchParams.get("brand") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const dealsParam = searchParams.get("deals") === "true";
  const sortParam = searchParams.get("sort") ?? "";

  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam ? [brandParam] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [dealsOnly, setDealsOnly] = useState(dealsParam);
  const [priceMax, setPriceMax] = useState(PRICE_MAX_USD);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState(
    SORT_OPTIONS.some((option) => option.value === sortParam)
      ? sortParam
      : "featured"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((current) =>
      current.includes(brand)
        ? current.filter((item) => item !== brand)
        : [...current, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setDealsOnly(false);
    setPriceMax(PRICE_MAX_USD);
    setMinRating(0);
  };

  const activeCount =
    selectedBrands.length +
    selectedCategories.length +
    (dealsOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (priceMax < PRICE_MAX_USD ? 1 : 0);

  const query = queryParam.trim().toLowerCase();

  const products = useMemo(() => {
    const filtered = CATALOG.filter((product) => {
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }
      if (dealsOnly && discountPercent(product.price, product.originalPrice) <= 0) {
        return false;
      }
      if (product.price > priceMax) return false;
      if (product.rating < minRating) return false;
      if (query) {
        const haystack = [
          product.title,
          product.brand,
          product.category,
          product.series,
          product.description,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...filtered];
    switch (sort) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "reviews":
        return sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
      case "discount":
        return sorted.sort(
          (a, b) =>
            discountPercent(b.price, b.originalPrice) -
            discountPercent(a.price, a.originalPrice)
        );
      case "newest":
        return sorted.reverse();
      default:
        return sorted;
    }
  }, [selectedBrands, selectedCategories, dealsOnly, priceMax, minRating, query, sort]);

  const title = queryParam
    ? `“${queryParam}”`
    : selectedCategories.length === 1
      ? selectedCategories[0]
      : selectedBrands.length === 1
        ? `${selectedBrands[0] === "Ugreen" ? "UGREEN" : selectedBrands[0]} gear`
        : "All gear";
  const describe = () => {
    if (queryParam) return "Everything we found for that search.";
    if (selectedCategories.length === 1) return "The full shelf, filtered.";
    if (selectedBrands.length === 1) return "Official stock from a brand we trust.";
    return "Every official product we carry, in one place.";
  };

  return (
    <div>
      {/* Page hero */}
      <section className="bg-paper">
        <div className="container-wide pb-9 pt-8 sm:pb-12 sm:pt-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="display max-w-[900px] text-[54px] leading-[0.95] sm:text-[76px] lg:text-[90px]">
                {title}
              </h1>
              <p className="mt-4 max-w-[480px] text-[13px] leading-relaxed text-muted">
                {describe()} Official warranty, same-day delivery and no
                grey-market surprises.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/collections?deals=true"
                className="inline-flex h-10 items-center gap-2 bg-coral px-4 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
              >
                <IconBolt className="h-3.5 w-3.5" />
                Deals only
              </Link>
              <Link
                href="/collections?sort=newest"
                className="inline-flex h-10 items-center gap-2 bg-ink px-4 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
              >
                New arrivals
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-7 sm:py-9 lg:py-12">
        <div className="grid items-start gap-7 lg:grid-cols-[244px_minmax(0,1fr)] lg:gap-9">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-[104px]">
              <FilterPanel
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                dealsOnly={dealsOnly}
                setDealsOnly={setDealsOnly}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                minRating={minRating}
                setMinRating={setMinRating}
                clearFilters={clearFilters}
                activeCount={activeCount}
              />

              <div className="mt-6 bg-ink p-5 text-paper">
                <p className="text-[13px] font-semibold">Need help choosing?</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#b8b8b8]">
                  Tell us what you shoot, listen to or carry and we will narrow
                  it down.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex h-9 items-center gap-1.5 bg-coral px-4 text-[11px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                >
                  Ask the team
                  <IconArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="inline-flex h-10 items-center gap-2 bg-paper-deep px-4 text-[12px] font-semibold lg:hidden"
                >
                  <IconFilter className="h-4 w-4" />
                  Filters
                  {activeCount > 0 ? (
                    <span className="text-[11px] font-bold text-coral">
                      {activeCount}
                    </span>
                  ) : null}
                </button>

                <p className="text-[12px] text-muted">
                  <span className="font-semibold text-ink">
                    {products.length}
                  </span>{" "}
                  products
                  {queryParam ? (
                    <span className="hidden sm:inline">
                      {" "}
                      for <span className="text-ink">“{queryParam}”</span>
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {activeCount > 0 ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[11px] font-semibold text-cobalt underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                ) : null}

                <div className="relative">
                  <label htmlFor="sort" className="sr-only">
                    Sort products
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="h-10 appearance-none bg-paper-deep pl-4 pr-9 text-[12px] font-semibold text-ink outline-none transition-colors hover:bg-line focus:bg-line"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="mt-5 flex flex-col items-center justify-center bg-paper-deep px-6 py-16 text-center">
                <h2 className="text-[22px] font-semibold text-ink">
                  Nothing matched
                </h2>
                <p className="mt-2 max-w-[320px] text-[13px] leading-relaxed text-muted">
                  Try a different search, loosen the filters, or browse the full
                  shelf.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex h-10 items-center gap-2 bg-ink px-5 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
                >
                  Reset filters
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[85] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="animate-menu-in absolute inset-y-0 left-0 flex w-[88vw] max-w-[360px] flex-col bg-paper">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p className="text-[18px] font-semibold">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center text-ink"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <FilterPanel
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                dealsOnly={dealsOnly}
                setDealsOnly={setDealsOnly}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                minRating={minRating}
                setMinRating={setMinRating}
                clearFilters={clearFilters}
                activeCount={activeCount}
              />
            </div>
            <div className="border-t border-line p-4">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-11 w-full items-center justify-center gap-2 bg-ink text-[12px] font-semibold text-paper"
              >
                Show {products.length} products
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterPanel({
  selectedBrands,
  toggleBrand,
  selectedCategories,
  toggleCategory,
  dealsOnly,
  setDealsOnly,
  priceMax,
  setPriceMax,
  minRating,
  setMinRating,
  clearFilters,
  activeCount,
}: FilterPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold">Filters</p>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clearFilters}
            className="text-[11px] font-semibold text-cobalt underline underline-offset-4"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div>
        <h3 className="text-[13px] font-semibold text-ink">Brands</h3>
        <div className="mt-2 space-y-0.5">
          {BRAND_OPTIONS.map((brand) => {
            const checked = selectedBrands.includes(brand.value);
            return (
              <label
                key={brand.value}
                className="flex cursor-pointer items-center gap-2.5 px-1 py-2 transition-colors hover:bg-paper-deep"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand.value)}
                  className="sr-only"
                />
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center border ${
                    checked
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-paper"
                  }`}
                >
                  {checked ? <IconCheck className="h-3 w-3" /> : null}
                </span>
                <span className="flex-1 text-[12.5px] font-medium text-ink">
                  {brand.label}
                </span>
                <span className="text-[11px] text-muted">{brand.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-semibold text-ink">Categories</h3>
        <div className="mt-2 space-y-0.5">
          {CATEGORY_NAMES.map((category) => {
            const checked = selectedCategories.includes(category);
            const count = CATALOG.filter(
              (product) => product.category === category
            ).length;
            return (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2.5 px-1 py-2 transition-colors hover:bg-paper-deep"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category)}
                  className="sr-only"
                />
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center border ${
                    checked
                      ? "border-ink bg-ink text-white"
                      : "border-line bg-paper"
                  }`}
                >
                  {checked ? <IconCheck className="h-3 w-3" /> : null}
                </span>
                <span className="flex-1 text-[12.5px] font-medium text-ink">
                  {category}
                </span>
                <span className="text-[11px] text-muted">{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-ink">Max price</h3>
          <span className="text-[12px] font-semibold text-ink">
            {formatNprValue(toNpr(priceMax))}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={PRICE_MAX_USD}
          step={10}
          value={priceMax}
          onChange={(event) => setPriceMax(Number(event.target.value))}
          aria-label="Maximum price"
          className="store-range mt-4 w-full"
        />
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted">
          <span>Rs 0</span>
          <span>{formatNprValue(MAX_NPR)}</span>
        </div>
      </div>

      <div>
        <h3 className="text-[13px] font-semibold text-ink">Customer rating</h3>
        <div className="mt-2 space-y-0.5">
          {RATING_OPTIONS.map((rating) => {
            const checked = minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => setMinRating(rating)}
                className="flex w-full items-center gap-2.5 px-1 py-2 text-left transition-colors hover:bg-paper-deep"
              >
                <span
                  className={`grid h-4 w-4 shrink-0 place-items-center border ${
                    checked ? "border-ink bg-ink" : "border-line bg-paper"
                  }`}
                >
                  {checked ? <span className="h-1.5 w-1.5 bg-white" /> : null}
                </span>
                {rating === 0 ? (
                  <span className="text-[12.5px] font-medium text-ink">
                    All ratings
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[12.5px] font-medium text-ink">
                    <IconStar className="h-3 w-3 text-coral" />
                    {rating} and up
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDealsOnly(!dealsOnly)}
        className="flex w-full items-center gap-2.5 px-1 py-2 text-left"
      >
        <span
          className={`grid h-4 w-4 shrink-0 place-items-center border ${
            dealsOnly ? "border-ink bg-ink text-white" : "border-line bg-paper"
          }`}
        >
          {dealsOnly ? <IconCheck className="h-3 w-3" /> : null}
        </span>
        <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
          <IconBolt className="h-3.5 w-3.5 text-coral" />
          Deals only
        </span>
      </button>
    </div>
  );
}

