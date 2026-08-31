"use client";

import { useState } from "react";
import { usePwaStore } from "@/lib/pwa/usePwa";

export function OfflineIndicator() {
  const isOnline = usePwaStore((state) => state.isOnline);
  const checkConnectivity = usePwaStore((state) => state.checkConnectivity);
  const [isChecking, setIsChecking] = useState(false);

  if (isOnline) return null;

  const handleRetry = async () => {
    setIsChecking(true);
    await checkConnectivity();
    setTimeout(() => setIsChecking(false), 600);
  };

  return (
    <aside
      aria-label="Çevrimdışı Durum Çubuğu"
      className="bg-primary text-white border-b border-surface-variant/40 px-4 py-2 text-xs font-label-mono z-50 sticky top-0 flex flex-wrap items-center justify-between gap-2 shadow-lg"
    >
      <div className="flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <span className="font-bold tracking-widest text-amber-300 uppercase">
            [OFFLINE ARŞİV MODU]
          </span>
          <span className="text-surface-dim text-[11px] sm:text-xs">
            Bağlantı kesildi. Önceden yüklenen koleksiyonlar ve sepetiniz çevrimdışı bellekte saklanıyor.
          </span>
        </div>
      </div>

      <button
        onClick={handleRetry}
        disabled={isChecking}
        className="px-3 py-1 bg-surface text-primary hover:bg-surface-variant uppercase text-[11px] font-bold tracking-wider transition-colors disabled:opacity-50 shrink-0 flex items-center gap-1.5 cursor-pointer"
      >
        {isChecking ? (
          <>
            <span className="inline-block w-2.5 h-2.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            KONTROL EDİLİYOR...
          </>
        ) : (
          "YENİDEN DENE"
        )}
      </button>
    </aside>
  );
}
