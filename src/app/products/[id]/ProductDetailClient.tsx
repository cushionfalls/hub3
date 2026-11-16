"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ProductItem, ProductSwatch } from "@/data/catalog";
import { getBrandLogo } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { discountPercent, formatNpr } from "@/lib/currency";
import ProductCard from "@/components/ProductCard";
import {
  IconArrowRight,
  IconCart,
  IconCheck,
  IconHeart,
  IconMinus,
  IconPackage,
  IconPlus,
  IconShare,
  IconShieldCheck,
  IconStar,
  IconTruck,
} from "@/components/icons";

interface ProductDetailClientProps {
  product: ProductItem;
  relatedProducts: ProductItem[];
}

type TabKey = "overview" | "specs" | "reviews";

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState<ProductSwatch>(
    product.swatches?.[0] ?? { name: "Black", color: "#121310" }
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.availableStorage?.[0] ?? product.storage ?? ""
  );
  const [quantity, setQuantity] = useState(1);
  const [shared, setShared] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const discount = discountPercent(product.price, product.originalPrice);

  const variantLabel = useMemo(() => {
    return [selectedStorage, selectedSwatch?.name].filter(Boolean).join(" · ");
  }, [selectedStorage, selectedSwatch]);

  const cartId = `${product.id}::${variantLabel || "Standard"}`;

  const addItem = () => {
    addToCart({
      id: cartId,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: gallery[0],
      variant: variantLabel,
      quantity,
    });
  };

  const buyNow = () => {
    addItem();
    router.push("/checkout");
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        window.setTimeout(() => setShared(false), 2200);
      }
    } catch {
      /* dismissed */
    }
  };

  const specs = Object.entries(product.specs ?? {});
  const keyFeatures = specs.slice(0, 4);
  const reviews = product.reviews ?? [];

  const tabs: { id: TabKey; label: string; count?: number }[] = [
    { id: "overview", label: "Overview" },
    { id: "specs", label: "Specifications" },
    { id: "reviews", label: "Reviews", count: product.reviewsCount },
  ];

  return (
    <div className="bg-paper">
      <div className="container-wide py-8 sm:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-[104px]">
            <div className="relative aspect-square overflow-hidden bg-paper-deep">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={
                  wishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center bg-paper transition-colors ${
                  wishlisted ? "text-coral" : "text-ink hover:text-coral"
                }`}
              >
                <IconHeart
                  className="h-5 w-5"
                  fill={wishlisted ? "currentColor" : "none"}
                />
              </button>

              <img
                src={gallery[selectedImage]}
                alt={product.title}
                className="h-full w-full object-contain p-10 sm:p-14"
              />
            </div>

            {gallery.length > 1 ? (
              <div className="mt-3 flex items-center gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image + index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                    className={`grid h-16 w-16 place-items-center border-2 bg-paper-deep p-2 transition-colors ${
                      selectedImage === index
                        ? "border-ink"
                        : "border-transparent hover:border-line"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-[11.5px] text-muted">
                Free delivery in Kathmandu Valley · 1-year official warranty ·
                7-day returns
              </p>
            )}
          </div>

          {/* Buy panel */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <img
                src={getBrandLogo(product.brand)}
                alt={product.brand}
                className="h-5 max-w-[100px] object-contain object-left"
              />
              <span className="text-[11.5px] text-muted">{product.series}</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11.5px] font-semibold text-cobalt">
                <IconCheck className="h-3.5 w-3.5" />
                In stock
              </span>
            </div>

            <h1 className="mt-3 text-[28px] font-semibold leading-[1.15] text-ink sm:text-[36px]">
              {product.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconStar
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= Math.round(product.rating)
                        ? "text-coral"
                        : "text-line"
                    }`}
                  />
                ))}
              </span>
              <span className="text-[12px] font-semibold">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[12px] text-muted">
                {product.reviewsCount} reviews
              </span>
              <span className="text-[12px] text-muted">·</span>
              <span className="text-[12px] text-muted">{product.category}</span>
            </div>

            <p className="mt-4 max-w-[540px] text-[13px] leading-[1.75] text-ink-soft">
              {product.description}
            </p>

            <div className="mt-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[30px] font-bold leading-none text-ink sm:text-[36px]">
                  {formatNpr(product.price)}
                </span>
                {product.originalPrice > product.price ? (
                  <span className="text-[13px] text-muted line-through">
                    {formatNpr(product.originalPrice)}
                  </span>
                ) : null}
                {discount > 0 ? (
                  <span className="text-[12px] font-semibold text-coral">
                    Save {discount}%
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[11.5px] text-muted">
                Inclusive of all taxes · Free delivery
              </p>
            </div>

            {/* Swatches */}
            {product.swatches && product.swatches.length > 0 ? (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold text-ink">Colour</p>
                  <p className="text-[12px] text-muted">{selectedSwatch.name}</p>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-3">
                  {product.swatches.map((swatch) => {
                    const active = selectedSwatch.name === swatch.name;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => setSelectedSwatch(swatch)}
                        aria-label={swatch.name}
                        title={swatch.name}
                        className={`h-7 w-7 border-2 p-0.5 transition-colors ${
                          active
                            ? "border-ink"
                            : "border-transparent hover:border-line"
                        }`}
                      >
                        <span
                          className="block h-full w-full"
                          style={{ backgroundColor: swatch.color }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Storage / size */}
            {product.availableStorage && product.availableStorage.length > 0 ? (
              <div className="mt-5">
                <p className="text-[12px] font-semibold text-ink">
                  {product.category === "Power Banks" ? "Capacity" : "Option"}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {product.availableStorage.map((option) => {
                    const active = selectedStorage === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedStorage(option)}
                        className={`h-10 px-4 text-[12px] font-semibold transition-colors ${
                          active
                            ? "bg-ink text-paper"
                            : "bg-paper-deep text-ink hover:bg-line"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Quantity + CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <div className="flex h-12 items-center bg-paper-deep">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-12 w-11 place-items-center text-ink transition-colors hover:bg-line"
                >
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-7 text-center text-[13px] font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                  className="grid h-12 w-11 place-items-center text-ink transition-colors hover:bg-line"
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={addItem}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-coral px-6 text-[12.5px] font-semibold text-white transition-colors hover:bg-[#a90f16]"
              >
                <IconCart className="h-4 w-4" />
                Add to bag
              </button>

              <button
                type="button"
                onClick={buyNow}
                className="inline-flex h-12 items-center justify-center gap-2 bg-ink px-5 text-[12px] font-semibold text-paper transition-colors hover:bg-cobalt"
              >
                Buy now
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                <IconShare className="h-3.5 w-3.5" />
                {shared ? "Link copied" : "Share"}
              </button>
              <span className="text-[11.5px] text-muted">·</span>
              <span className="text-[11.5px] text-muted">
                Free store pickup in 2 hours
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {[
                {
                  icon: IconTruck,
                  title: "Same-day delivery",
                  text: "Order before 3pm inside Kathmandu Valley.",
                },
                {
                  icon: IconShieldCheck,
                  title: "Official warranty",
                  text: "1-year manufacturer cover, handled locally.",
                },
                {
                  icon: IconPackage,
                  title: "Sealed official stock",
                  text: "Sourced through authorized channels only.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <div>
                      <p className="text-[12.5px] font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 sm:mt-16">
          <div className="no-scrollbar flex items-center gap-7 overflow-x-auto border-b border-line">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-px shrink-0 border-b-2 pb-3 text-[12.5px] font-semibold transition-colors ${
                    active
                      ? "border-coral text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                  {tab.count ? (
                    <span className="ml-1.5 text-[11px] font-normal text-muted">
                      ({tab.count})
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div>
            {activeTab === "overview" ? (
              <div className="grid gap-10 py-8 lg:grid-cols-[1fr_0.65fr] lg:gap-16">
                <div>
                  <h2 className="text-[20px] font-semibold text-ink">
                    About this product
                  </h2>
                  <p className="mt-3 max-w-[640px] text-[13px] leading-[1.85] text-ink-soft">
                    {product.description}
                  </p>

                  {keyFeatures.length > 0 ? (
                    <dl className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                      {keyFeatures.map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-[11.5px] font-semibold text-muted">
                            {key}
                          </dt>
                          <dd className="mt-1 text-[13px] leading-snug text-ink">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </div>

                <div>
                  <h3 className="text-[14px] font-semibold text-ink">
                    In the box
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {product.inTheBox.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[12.5px] leading-snug text-ink-soft"
                      >
                        <IconCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {activeTab === "specs" ? (
              <div className="py-8">
                <h2 className="text-[20px] font-semibold text-ink">
                  Specifications
                </h2>
                <dl className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
                  {specs.map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-[11.5px] font-semibold text-muted">
                        {key}
                      </dt>
                      <dd className="mt-1 text-[13px] leading-snug text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}

            {activeTab === "reviews" ? (
              <div className="grid gap-10 py-8 lg:grid-cols-[260px_1fr] lg:gap-16">
                <div>
                  <p className="text-[56px] font-bold leading-none text-ink">
                    {product.rating.toFixed(1)}
                  </p>
                  <div className="mt-2 flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IconStar
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          star <= Math.round(product.rating)
                            ? "text-coral"
                            : "text-line"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-muted">
                    Based on {product.reviewsCount} verified purchases
                  </p>

                  <div className="mt-5 space-y-2">
                    {[5, 4, 3, 2, 1].map((star, index) => {
                      const widths = [78, 14, 5, 2, 1];
                      return (
                        <div key={star} className="flex items-center gap-2.5">
                          <span className="w-2 text-[10.5px] text-muted">
                            {star}
                          </span>
                          <span className="h-1.5 flex-1 bg-paper-deep">
                            <span
                              className="block h-full bg-ink"
                              style={{ width: `${widths[index]}%` }}
                            />
                          </span>
                          <span className="w-8 text-right text-[10px] text-muted">
                            {widths[index]}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-8">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <article key={review.id}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <IconStar
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.rating
                                    ? "text-coral"
                                    : "text-line"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10.5px] text-muted">
                            {review.date}
                          </span>
                        </div>
                        <h3 className="mt-2 text-[13.5px] font-semibold text-ink">
                          {review.title}
                        </h3>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-soft">
                          {review.comment}
                        </p>
                        <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                          {review.author}
                          {review.verified ? (
                            <span className="inline-flex items-center gap-1 text-cobalt">
                              <IconCheck className="h-3 w-3" />
                              Verified purchase
                            </span>
                          ) : null}
                        </p>
                      </article>
                    ))
                  ) : (
                    <div>
                      <p className="text-[16px] font-semibold text-ink">
                        No reviews yet
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-muted">
                        Bought this? Tell the next person what you think.
                      </p>
                    </div>
                  )}

                  <p className="text-[11.5px] text-muted">
                    Every review is from a verified order.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="bg-paper-deep py-12 sm:py-16">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-4">
            <h2 className="display text-[36px] leading-none sm:text-[48px]">
              You might also like
            </h2>
            <Link
              href="/collections"
              className="hidden items-center gap-2 text-[12px] font-semibold text-ink sm:inline-flex"
            >
              View all
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
