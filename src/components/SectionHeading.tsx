import Link from "next/link";
import React from "react";

interface SectionHeadingProps {
  title: React.ReactNode;
  description?: string;
  action?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  title,
  description,
  action,
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}
    >
      <div className="max-w-[820px]">
        <h2
          className={`display text-[38px] leading-[0.95] sm:text-[52px] lg:text-[62px] ${
            isDark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-4 max-w-[520px] text-[13px] leading-relaxed sm:text-[14px] ${
              isDark ? "text-[#b8b8b8]" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className={`inline-flex h-10 shrink-0 items-center gap-2 self-start px-5 text-[12px] font-semibold transition-colors sm:self-auto ${
            isDark
              ? "bg-paper text-ink hover:bg-coral hover:text-white"
              : "bg-ink text-paper hover:bg-coral"
          }`}
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
