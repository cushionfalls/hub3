"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatNpr } from "@/lib/currency";
import {
  IconArrowRight,
  IconCart,
  IconMinus,
  IconPlus,
  IconShieldCheck,
  IconTruck,
  IconX,
} from "./icons";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    savings,
    totalItems,
  } = useCart();

  const [leaving, setLeaving] = useState(false);

  const close = () => {
    setLeaving(true);
    window.setTimeout(() => {
      setIsCartOpen(false);
      setLeaving(false);
    }, 200);
  };

  useEffect(() => {
    if (!isCartOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        className={`absolute inset-0 bg-black/60 ${
          leaving ? "animate-overlay-out" : "animate-overlay-in"
        }`}
        onClick={close}
      />

      <aside
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper ${
          leaving ? "animate-drawer-out" : "animate-drawer-in"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
          <h2 className="display text-[30px] leading-none">
            Your bag{" "}
            <span className="font-sans text-[13px] font-semibold text-muted">
              ({totalItems})
            </span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center text-ink transition-colors hover:text-coral"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-paper-deep px-5 py-3 sm:px-6">
          <div className="flex items-center gap-2 text-[11.5px] font-medium text-ink">
            <IconTruck className="h-4 w-4 text-coral" />
            Free same-day delivery inside Kathmandu Valley
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted">
            <IconShieldCheck className="h-3.5 w-3.5" />
            Official warranty included on every product
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center bg-paper-deep">
              <IconCart className="h-7 w-7 text-ink" />
            </span>
            <h3 className="display mt-5 text-[28px] leading-none">
              Your bag is empty
            </h3>
            <p className="mt-2 max-w-[260px] text-[12.5px] leading-relaxed text-muted">
              Your next daily carry is waiting. Start with the gear everyone is
              talking about.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-5 inline-flex h-11 items-center gap-2 bg-ink px-6 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
            >
              Start shopping
              <IconArrowRight className="h-4 w-4" />
            </button>
            <Link
              href="/collections?deals=true"
              onClick={close}
              className="mt-4 text-[11.5px] font-semibold text-cobalt underline underline-offset-4"
            >
              Or jump straight to the deals
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3.5">
                    <Link
                      href={`/products/${item.id.split("::")[0]}`}
                      onClick={close}
                      className="grid h-[88px] w-[88px] shrink-0 place-items-center bg-paper-deep p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.id.split("::")[0]}`}
                          onClick={close}
                          className="line-clamp-2 text-[12.5px] font-medium leading-snug text-ink transition-colors hover:text-coral"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="grid h-6 w-6 shrink-0 place-items-center text-muted transition-colors hover:text-ink"
                        >
                          <IconX className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {item.variant ? (
                        <p className="mt-1 text-[11px] text-muted">
                          {item.variant}
                        </p>
                      ) : null}

                      <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                        <div className="flex h-8 items-center bg-paper-deep">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="grid h-8 w-8 place-items-center text-ink transition-colors hover:bg-line"
                          >
                            <IconMinus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-[12px] font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="grid h-8 w-8 place-items-center text-ink transition-colors hover:bg-line"
                          >
                            <IconPlus className="h-3 w-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-[12.5px] font-semibold text-ink">
                            {formatNpr(item.price * item.quantity)}
                          </p>
                          {item.originalPrice &&
                          item.originalPrice > item.price ? (
                            <p className="text-[10.5px] text-muted line-through">
                              {formatNpr(item.originalPrice * item.quantity)}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-paper-deep px-5 py-5 sm:px-6">
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatNpr(subtotal)}</span>
                </div>
                {savings > 0 ? (
                  <div className="flex items-center justify-between text-cobalt">
                    <span>You save</span>
                    <span className="font-semibold">−{formatNpr(savings)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between text-muted">
                  <span>Delivery</span>
                  <span className="text-ink">Free</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[13px] font-semibold">Total</span>
                <span className="text-[19px] font-bold">
                  {formatNpr(subtotal)}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 flex h-12 items-center justify-between bg-coral px-6 text-[13px] font-semibold text-white transition-colors hover:bg-ink"
              >
                Checkout
                <IconArrowRight className="h-4 w-4" />
              </Link>

              <button
                type="button"
                onClick={close}
                className="mt-2 flex h-10 w-full items-center justify-center text-[11.5px] font-semibold text-muted transition-colors hover:text-ink"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
