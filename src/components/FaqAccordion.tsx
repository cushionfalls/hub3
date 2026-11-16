"use client";

import React, { useState } from "react";
import { IconPlus } from "./icons";

export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-4">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[12.5px] font-semibold leading-snug text-ink sm:text-[13.5px]">
                {item.question}
              </span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center text-ink transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <IconPlus className="h-3.5 w-3.5" />
              </span>
            </button>
            {isOpen ? (
              <p className="pb-4 pr-8 text-[12px] leading-[1.8] text-muted">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
