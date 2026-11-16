"use client";

import React, { useState } from "react";
import { IconArrowRight, IconCheck } from "../icons";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-cobalt text-white">
      <div className="container-wide grid gap-10 py-14 sm:py-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
        <div>
          <h2 className="display text-[50px] leading-[0.95] sm:text-[68px]">
            Get new arrivals first
          </h2>
          <p className="mt-5 max-w-[440px] text-[14px] leading-relaxed text-white">
            New products, restocks and occasional member prices. One email a
            week, no spam.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {["Early access", "Member prices", "Unsubscribe anytime"].map(
              (perk) => (
                <span
                  key={perk}
                  className="flex items-center gap-1.5 text-[12px] text-white"
                >
                  <IconCheck className="h-3.5 w-3.5" />
                  {perk}
                </span>
              )
            )}
          </div>
        </div>

        <div>
          {subscribed ? (
            <div className="bg-white p-6 text-ink">
              <p className="flex items-center gap-2 text-[14px] font-semibold">
                <IconCheck className="h-4 w-4 text-coral" />
                You are on the list.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                Watch your inbox for the next drop.
              </p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <label htmlFor="newsletter-email" className="text-[12px] text-white">
                Email address
              </label>
              <div className="mt-2 flex bg-white">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 bg-transparent px-4 text-[13px] text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  className="flex h-12 shrink-0 items-center gap-1.5 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
                >
                  Join
                  <IconArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-[11px] text-white">
                By subscribing you agree to our privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
