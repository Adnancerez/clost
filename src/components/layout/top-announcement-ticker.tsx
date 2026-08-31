"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export function TopAnnouncementTicker() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText("CLOST10");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const textChunk =
    "CLOST DROP '24 YAYINDA • 1.500 ₺ ÜZERİ TÜM TÜRKİYE'YE ÜCRETSİZ SİGORTALI TESLİMAT • %10 İNDİRİM KODU: CLOST10 • 16:00'A KADAR AYNI GÜN KARGO • 14 GÜN KOŞULSUZ İADE & DEĞİŞİM • 14.5 OZ RAW DENIM & KOMPAKT PAMUK • ";

  return (
    <aside
      aria-label="Canlı Duyuru ve Kampanya Bandı"
      className="fixed top-0 left-0 right-0 z-50 h-8 bg-primary text-on-primary font-label-mono text-[11px] leading-8 flex items-center justify-between border-b border-surface/20 select-none overflow-hidden"
    >
      {/* Infinite Smooth Scrolling Single-Line Marquee */}
      <div className="ticker-wrap flex-1 h-8 leading-8 overflow-hidden">
        <div className="ticker h-8 leading-8 flex items-center text-white uppercase tracking-widest font-semibold hover:[animation-play-state:paused] cursor-default">
          <span className="inline-block whitespace-nowrap pr-8">
            {textChunk} {textChunk}
          </span>
          <span className="inline-block whitespace-nowrap pr-8">
            {textChunk} {textChunk}
          </span>
        </div>
      </div>

      {/* Quick 1-Click Promo Code Copy Button on Right */}
      <div className="flex-shrink-0 z-10 px-3 bg-primary border-l border-white/20 h-8 flex items-center">
        <button
          type="button"
          onClick={handleCopy}
          title="Kupon Kodunu Kopyala"
          className="flex items-center gap-1.5 px-2 py-0.5 border border-white/40 hover:border-white text-[10px] uppercase font-bold text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10"
        >
          <span>KOD: CLOST10</span>
          {copied ? (
            <Check className="w-3 h-3 text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3 opacity-80" />
          )}
        </button>
      </div>
    </aside>
  );
}
