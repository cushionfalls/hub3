"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatNpr } from "@/lib/currency";
import {
  IconArrowRight,
  IconCheck,
  IconPackage,
  IconShieldCheck,
  IconTruck,
} from "@/components/icons";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on delivery", detail: "Pay when it lands" },
  { id: "esewa", label: "eSewa", detail: "Instant wallet payment" },
  { id: "khalti", label: "Khalti", detail: "Instant wallet payment" },
  { id: "card", label: "Card", detail: "Visa / Mastercard" },
];

export default function CheckoutClient() {
  const { cartItems, subtotal, savings, totalItems, clearCart } = useCart();
  const [delivery, setDelivery] = useState("delivery");
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "Kathmandu",
    address: "",
    notes: "",
  });

  const update = (key: keyof typeof form) => (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setOrderNumber(`CC-${Math.floor(100000 + Math.random() * 900000)}`);
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (placed) {
    return (
      <div className="container-wide flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-[600px] text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center bg-coral text-white">
            <IconCheck className="h-6 w-6" />
          </span>
          <h1 className="display mt-6 text-[42px] leading-[0.95] sm:text-[56px]">
            You&apos;re all set
          </h1>
          <p className="mx-auto mt-4 max-w-[400px] text-[13px] leading-relaxed text-muted">
            Order <span className="font-semibold text-ink">#{orderNumber}</span>{" "}
            is in. We&apos;ll call you on {form.phone || "your number"} to
            confirm delivery details.
          </p>

          <div className="mt-8 grid gap-4 text-left sm:grid-cols-3">
            {[
              { icon: IconShieldCheck, label: "Official warranty" },
              { icon: IconTruck, label: "Same-day dispatch" },
              { icon: IconPackage, label: "Sealed packaging" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0 text-coral" />
                  <span className="text-[12px] font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>

          <Link
            href="/collections"
            className="mt-8 inline-flex h-11 items-center gap-2 bg-ink px-6 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
          >
            Keep exploring
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container-wide flex min-h-[65vh] items-center justify-center py-16">
        <div className="text-center">
          <h1 className="display text-[48px] leading-none sm:text-[64px]">
            Your bag is empty
          </h1>
          <p className="mx-auto mt-4 max-w-[340px] text-[13px] leading-relaxed text-muted">
            Add something worth carrying. The full shelf is one click away.
          </p>
          <Link
            href="/collections"
            className="mt-6 inline-flex h-11 items-center gap-2 bg-ink px-6 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
          >
            Shop all gear
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-8 sm:py-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="display text-[46px] leading-[0.95] sm:text-[64px]">
          Checkout
        </h1>
        <p className="max-w-[320px] text-[12px] leading-relaxed text-muted sm:pb-2 sm:text-right">
          {totalItems} item{totalItems === 1 ? "" : "s"} · Free delivery ·
          Official warranty included
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mt-8 grid gap-7 lg:grid-cols-[1fr_380px] lg:gap-10"
      >
        <div className="space-y-3">
          {/* Contact */}
          <section className="bg-paper-deep p-5 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[15px] font-semibold">Contact details</h2>
              <span className="text-[11.5px] text-muted">Required</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="Full name">
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Suman Rai"
                  className="store-input"
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone number">
                <input
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+977 98XXXXXXXX"
                  className="store-input"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className="store-input"
                  autoComplete="email"
                />
              </Field>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-paper-deep p-5 sm:p-7">
            <h2 className="text-[15px] font-semibold">Delivery</h2>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                {
                  id: "delivery",
                  title: "Home delivery",
                  detail: "Free · Same day inside the valley",
                },
                {
                  id: "pickup",
                  title: "Store pickup",
                  detail: "Free · Ready in about 2 hours",
                },
              ].map((option) => {
                const active = delivery === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setDelivery(option.id)}
                    className={`border-l-4 p-4 text-left transition-colors ${
                      active
                        ? "border-coral bg-paper"
                        : "border-transparent bg-paper hover:border-line"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-[12.5px] font-semibold">
                        {option.title}
                      </span>
                      <span
                        className={`grid h-4 w-4 place-items-center bg-paper-deep ${
                          active ? "text-coral" : "text-transparent"
                        }`}
                      >
                        <IconCheck className="h-3 w-3" />
                      </span>
                    </span>
                    <span className="mt-1 block text-[11px] text-muted">
                      {option.detail}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Field label="City">
                <select
                  value={form.city}
                  onChange={update("city")}
                  className="store-input"
                >
                  <option>Kathmandu</option>
                  <option>Lalitpur</option>
                  <option>Bhaktapur</option>
                  <option>Pokhara</option>
                  <option>Chitwan</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Landmark / area">
                <input
                  required={delivery === "delivery"}
                  value={form.address}
                  onChange={update("address")}
                  placeholder="Baneshwor, near..."
                  className="store-input"
                  autoComplete="street-address"
                />
              </Field>
              <Field label="Order notes (optional)" className="sm:col-span-2">
                <textarea
                  value={form.notes}
                  onChange={update("notes")}
                  rows={3}
                  placeholder="Anything we should know?"
                  className="store-input resize-none"
                />
              </Field>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-paper-deep p-5 sm:p-7">
            <h2 className="text-[15px] font-semibold">Payment</h2>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {PAYMENT_METHODS.map((method) => {
                const active = payment === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPayment(method.id)}
                    className={`flex items-center justify-between gap-2 border-l-4 px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-coral bg-paper"
                        : "border-transparent bg-paper hover:border-line"
                    }`}
                  >
                    <span>
                      <span className="block text-[12.5px] font-semibold">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-muted">
                        {method.detail}
                      </span>
                    </span>
                    <span
                      className={`grid h-4 w-4 place-items-center bg-paper-deep ${
                        active ? "text-coral" : "text-transparent"
                      }`}
                    >
                      <IconCheck className="h-3 w-3" />
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[11px] text-muted">
              <IconShieldCheck className="h-3.5 w-3.5 text-cobalt" />
              This is a demo checkout. No payment will be taken.
            </p>
          </section>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-[104px]">
          <div className="bg-paper-deep">
            <div className="flex items-center justify-between px-5 py-4">
              <h2 className="text-[16px] font-semibold">Your order</h2>
              <span className="text-[11.5px] text-muted">
                {totalItems} item{totalItems === 1 ? "" : "s"}
              </span>
            </div>

            <div className="max-h-[320px] overflow-y-auto px-5">
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex gap-3">
                    <div className="grid h-16 w-16 shrink-0 place-items-center bg-paper p-1.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[12px] font-medium leading-snug">
                        {item.name}
                      </p>
                      <p className="mt-1 text-[11px] text-muted">
                        Qty {item.quantity}
                        {item.variant ? ` · ${item.variant}` : ""}
                      </p>
                      <p className="mt-1 text-[12px] font-semibold">
                        {formatNpr(item.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 py-4">
              <div className="space-y-2 text-[12px]">
                <div className="flex items-center justify-between text-muted">
                  <span>Subtotal</span>
                  <span className="text-ink">{formatNpr(subtotal)}</span>
                </div>
                {savings > 0 ? (
                  <div className="flex items-center justify-between text-cobalt">
                    <span>Savings</span>
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
                <span className="text-[20px] font-bold">
                  {formatNpr(subtotal)}
                </span>
              </div>

              <button
                type="submit"
                className="mt-4 flex h-12 w-full items-center justify-between bg-coral px-5 text-[12.5px] font-semibold text-white transition-colors hover:bg-ink"
              >
                Place order
                <IconArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[10.5px] leading-relaxed text-muted">
                By placing your order you agree to our{" "}
                <Link
                  href="/terms-conditions"
                  className="underline underline-offset-2"
                >
                  terms
                </Link>{" "}
                and{" "}
                <Link href="/returns" className="underline underline-offset-2">
                  returns policy
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[11.5px] text-muted">
            <IconTruck className="h-4 w-4 text-coral" />
            Order before 3pm for same-day delivery.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[11.5px] font-medium text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
