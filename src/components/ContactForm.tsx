"use client";

import React, { useState } from "react";
import { IconArrowRight, IconCheck } from "./icons";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Product question");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="mt-5 bg-paper-deep p-5 text-center not-prose">
        <span className="mx-auto grid h-10 w-10 place-items-center bg-coral text-white">
          <IconCheck className="h-5 w-5" />
        </span>
        <p className="mt-3 text-[13px] font-semibold text-ink">
          Thanks, {name || "friend"} — message received.
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-muted">
          A member of our team will get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setName("");
            setEmail("");
            setMessage("");
          }}
          className="mt-3 text-[11.5px] font-semibold text-cobalt underline underline-offset-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-5 grid gap-3.5 not-prose sm:grid-cols-2"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="text-[12px] font-medium text-muted"
        >
          Full name
        </label>
        <input
          id="contact-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="store-input mt-1.5"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="text-[12px] font-medium text-muted"
        >
          Email
        </label>
        <input
          id="contact-email"
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="store-input mt-1.5"
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="contact-subject"
          className="text-[12px] font-medium text-muted"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="store-input mt-1.5"
        >
          <option>Product question</option>
          <option>Order or delivery</option>
          <option>Warranty or return</option>
          <option>Store pickup</option>
          <option>Bulk / corporate order</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="contact-message"
          className="text-[12px] font-medium text-muted"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can we help?"
          className="store-input mt-1.5 resize-y"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 bg-coral px-6 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
        >
          Send message
          <IconArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </form>
  );
}
