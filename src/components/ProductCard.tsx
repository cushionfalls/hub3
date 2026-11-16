"use client";

import React from "react";
import Link from "next/link";
import type { ProductItem } from "@/data/catalog";
import { discountPercent, formatNpr } from "@/lib/currency";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { IconHeart, IconPlus, IconStar } from "./icons";

interface ProductCardProps {
  product: ProductItem;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const percent = discountPercent(product.price, product.originalPrice);

  return (
    <article
      className={`group relative flex h-full flex-col bg-paper ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-paper-deep">
        <Link
          href={`/products/${product.id}`}
          aria-label={product.title}
          className="absolute inset-0 z-[1]"
        />

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-[2] grid h-8 w-8 place-items-center transition-colors ${
            wishlisted ? "text-coral" : "text-ink hover:text-coral"
          }`}
        >
          <IconHeart
            className="h-4 w-4"
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          draggable={false}
          className="relative z-0 h-full w-full object-contain p-7 transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:p-9"
        />

        <button
          type="button"
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.title,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.image,
              variant: product.storage,
            })
          }
          aria-label={`Add ${product.title} to bag`}
          className="absolute bottom-3 right-3 z-[3] grid h-9 w-9 place-items-center bg-ink text-paper transition-colors hover:bg-coral"
        >
          <IconPlus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
          <span>{product.brand}</span>
          <span className="flex items-center gap-1">
            <IconStar className="h-2.5 w-2.5 text-coral" />
            {product.rating.toFixed(1)}
            <span>({product.reviewsCount})</span>
          </span>
        </div>

        <h3 className="mt-1 line-clamp-2 text-[13.5px] font-semibold leading-snug text-ink">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-2.5">
          <p className="text-[15px] font-bold text-ink">
            {formatNpr(product.price)}
          </p>
          {product.originalPrice > product.price ? (
            <p className="text-[11.5px] text-muted line-through">
              {formatNpr(product.originalPrice)}
            </p>
          ) : null}
          {percent > 0 ? (
            <p className="text-[11px] font-semibold text-coral">
              Save {percent}%
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
