"use client";

import React, { useState } from "react";
import { IconArrowRight, IconCheck } from "./icons";

type Mode = "signin" | "register";

export default function AccountForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");

  if (done) {
    return (
      <div className="mt-5 bg-paper p-5 text-center not-prose">
        <span className="mx-auto grid h-10 w-10 place-items-center bg-coral text-white">
          <IconCheck className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[12.5px] font-semibold text-ink">
          {name ? `Welcome, ${name}.` : "You are all set."}
        </p>
        <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
          This is a demo storefront, so no live account was created. Cart,
          wishlist and checkout still work normally on this device.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-3 text-[11.5px] font-semibold text-cobalt underline underline-offset-2"
        >
          Back to form
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 not-prose">
      <div className="flex gap-5 border-b border-line">
        {(["signin", "register"] as Mode[]).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`-mb-px border-b-2 pb-2 text-[12px] font-semibold transition-colors ${
              mode === value
                ? "border-coral text-ink"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {value === "signin" ? "Sign in" : "Create account"}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setDone(true);
        }}
        className="mt-4 grid gap-3.5"
      >
        {mode === "register" ? (
          <div>
            <label
              htmlFor="account-name"
              className="text-[12px] font-medium text-muted"
            >
              Full name
            </label>
            <input
              id="account-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="store-input mt-1.5"
            />
          </div>
        ) : null}

        <div>
          <label
            htmlFor="account-email"
            className="text-[12px] font-medium text-muted"
          >
            Email
          </label>
          <input
            id="account-email"
            required
            type="email"
            placeholder="you@example.com"
            className="store-input mt-1.5"
          />
        </div>

        <div>
          <label
            htmlFor="account-password"
            className="text-[12px] font-medium text-muted"
          >
            Password
          </label>
          <input
            id="account-password"
            required
            type="password"
            placeholder="••••••••"
            className="store-input mt-1.5"
          />
        </div>

        <button
          type="submit"
          className="mt-1 inline-flex h-11 items-center justify-center gap-2 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
        >
          {mode === "signin" ? "Sign in" : "Create my account"}
          <IconArrowRight className="h-3.5 w-3.5" />
        </button>
        <p className="text-center text-[10.5px] leading-relaxed text-muted">
          Demo only — no password is stored or sent anywhere.
        </p>
      </form>
    </div>
  );
}
