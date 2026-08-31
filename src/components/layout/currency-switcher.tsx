"use client";

import React, { useSyncExternalStore } from "react";
import { Globe } from "lucide-react";
import { useCurrencyStore, CURRENCIES, CurrencyCode } from "@/lib/store/useCurrencyStore";

const emptySubscribe = () => () => {};

export function CurrencySwitcher({ variant = "header" }: { variant?: "header" | "footer" }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  if (!isMounted) {
    return (
      <div className="font-label-mono text-xs text-on-surface-variant flex items-center gap-1 opacity-60">
        <span>TRY ₺</span>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-2 border border-primary p-2 bg-surface">
        <Globe className="w-3.5 h-3.5 text-primary" />
        <span className="font-label-mono text-xs uppercase text-on-surface-variant">Para Birimi:</span>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
          className="bg-transparent font-label-mono text-xs uppercase font-bold text-primary focus:outline-none cursor-pointer"
        >
          {Object.values(CURRENCIES).map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol}) — {c.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        aria-label="Para Birimi Değiştir"
        className="bg-transparent font-label-mono text-[11px] uppercase font-bold text-primary hover:text-on-surface-variant focus:outline-none cursor-pointer py-1 pr-1 border-b border-transparent hover:border-primary transition-colors"
      >
        {Object.values(CURRENCIES).map((c) => (
          <option key={c.code} value={c.code} className="bg-surface text-primary text-xs">
            {c.code} {c.symbol}
          </option>
        ))}
      </select>
    </div>
  );
}
