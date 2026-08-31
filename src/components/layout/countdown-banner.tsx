"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Clock, Copy, Check, X } from "lucide-react";

const emptySubscribe = () => () => {};

export function CountdownBanner() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: "07",
    minutes: "48",
    seconds: "22",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59
      );
      const diff = Math.max(0, endOfDay.getTime() - now.getTime());

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("VOID15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted || !isVisible) return null;

  return (
    <aside
      aria-label="Duyuru ve Kampanya Bandı"
      className="fixed top-0 left-0 right-0 z-50 h-7 bg-primary text-on-primary font-label-mono text-[10px] px-3 flex items-center justify-between border-b border-white/20 select-none"
    >
      <div className="flex items-center gap-2 max-w-full overflow-hidden mx-auto tracking-wider">
        <span className="truncate uppercase font-medium">
          1.500 ₺ Üzeri Ücretsiz Kargo • Sonbahar Drop 01 // Kod:
        </span>
        <button
          onClick={handleCopy}
          className="border border-white/40 hover:border-white px-1.5 py-0.2 flex items-center gap-1 font-bold text-white uppercase cursor-pointer text-[10px]"
        >
          VOID15 {copied ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
        </button>
        <span className="hidden lg:inline-flex items-center gap-1 opacity-80 pl-1 text-[10px]">
          <Clock className="w-2.5 h-2.5" /> {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        aria-label="Duyuruyu kapat"
        className="hover:opacity-70 cursor-pointer p-0.5 text-on-primary ml-1"
      >
        <X className="w-3 h-3" />
      </button>
    </aside>
  );
}
