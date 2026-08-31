"use client";

import { usePwaStore } from "@/lib/pwa/usePwa";

export function PwaUpdateBanner() {
  const isUpdateAvailable = usePwaStore((state) => state.isUpdateAvailable);
  const applyUpdate = usePwaStore((state) => state.applyUpdate);

  if (!isUpdateAvailable) return null;

  return (
    <aside
      aria-label="Uygulama Güncelleme Bildirimi"
      className="bg-primary text-white border-b border-surface-variant/30 px-4 py-2 text-xs font-label-mono z-50 sticky top-0 flex flex-wrap items-center justify-between gap-2 shadow-xl animate-fade-in-up"
    >
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span className="font-bold tracking-wider text-emerald-300">
          [YENİ SÜRÜM YAYINLANDI]
        </span>
        <span className="text-surface-dim text-[11px] sm:text-xs">
          CLOST storefront güncellendi. Yeni koleksiyonlar ve geliştirmeler hazır.
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={applyUpdate}
          className="px-3 py-1 bg-surface text-primary hover:bg-surface-variant uppercase text-[11px] font-bold tracking-wider transition-colors cursor-pointer"
        >
          ŞİMDİ GÜNCELLE
        </button>
      </div>
    </aside>
  );
}
