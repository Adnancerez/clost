import React from "react";

export interface TickerProps {
  text?: string;
}

export function Ticker({
  text = "Tüm Türkiye'ye Ücretsiz Kargo • Birinci Sınıf Ağır Gramaj Kumaş • Fonksiyonel Tasarım • CLOST Temel Koleksiyon • ",
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
