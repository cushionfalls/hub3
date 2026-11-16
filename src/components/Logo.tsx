import Link from "next/link";
import React from "react";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
  size?: "sm" | "md";
}

export default function Logo({
  variant = "dark",
  className = "",
  size = "md",
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      aria-label="Cellucity Hub — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center ${
          size === "sm" ? "h-8 w-8" : "h-9 w-9"
        } ${isLight ? "bg-paper" : "bg-ink"}`}
      >
        <span
          aria-hidden
          className="block"
          style={{
            width: size === "sm" ? 19 : 22,
            height: size === "sm" ? 15 : 18,
            backgroundColor: "#d71920",
            WebkitMaskImage: "url('/logo/mark-white.png')",
            maskImage: "url('/logo/mark-white.png')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </span>

      <span className="flex flex-col justify-center leading-none">
        <span
          className={`font-display text-[22px] uppercase leading-none ${
            isLight ? "text-paper" : "text-ink"
          }`}
        >
          Cellucity
        </span>
        <span
          className={`mt-1 text-[10px] font-medium ${
            isLight ? "text-paper" : "text-muted"
          }`}
        >
          Hub · Kathmandu
        </span>
      </span>
    </Link>
  );
}
