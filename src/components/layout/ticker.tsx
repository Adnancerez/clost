import React from "react";

export interface TickerProps {
  text?: string;
}

export function Ticker({
  text = "Tüm Türkiye'ye 1.500 ₺ Üzeri Ücretsiz Kargo • Y2K & Gen-Z Streetwear Archive • 14.5 oz Raw Denim & Kompakt Pamuk • Yeni Drop '24 Yayında • ",
}: TickerProps) {
  return (
    <div className="border-b border-outline-variant bg-surface py-2 text-on-surface-variant select-none">
      <div className="ticker-wrap font-label-mono text-xs uppercase tracking-widest">
        <div className="ticker">
          <span>
            {text} {text} {text} {text}
          </span>
          <span>
            {text} {text} {text} {text}
          </span>
        </div>
      </div>
    </div>
  );
}
