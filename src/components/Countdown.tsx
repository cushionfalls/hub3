"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  tone?: "light" | "dark";
}

export default function Countdown({ tone = "dark" }: CountdownProps) {
  const [time, setTime] = useState({
    hours: "--",
    minutes: "--",
    seconds: "--",
  });

  useEffect(() => {
    const target = new Date();
    target.setHours(23, 59, 59, 999);

    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const hours = Math.floor(diff / 3_600_000);
      const minutes = Math.floor((diff % 3_600_000) / 60_000);
      const seconds = Math.floor((diff % 60_000) / 1000);
      setTime({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const isDark = tone === "dark";

  return (
    <div
      className={`flex items-baseline gap-2 text-[26px] font-bold tabular-nums ${
        isDark ? "text-paper" : "text-ink"
      }`}
    >
      <span>{time.hours}</span>
      <span className={isDark ? "text-coral" : "text-coral"}>:</span>
      <span>{time.minutes}</span>
      <span className="text-coral">:</span>
      <span>{time.seconds}</span>
    </div>
  );
}
