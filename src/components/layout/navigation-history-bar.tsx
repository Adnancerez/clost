"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ChevronRight, Home } from "lucide-react";

const emptySubscribe = () => () => {};

export function NavigationHistoryBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted || pathname === "/") {
    return null;
  }

  // Parse path into human-readable breadcrumb items
  const segments = pathname.split("/").filter(Boolean);

  const getSegmentTitle = (segment: string, index: number): string => {
    const s = decodeURIComponent(segment).toLowerCase();
    const map: Record<string, string> = {
      collections: "Koleksiyonlar",
      products: "Ürünler",
      all: "Tüm Ürünler",
      new: "Yeni Gelenler",
      outerwear: "Dış Giyim",
      tops: "Üst Giyim",
      bottoms: "Alt Giyim",
      dergi: "Dergi & Kumaş Lab",
      lookbook: "Lookbook",
      about: "Manifesto & Hakkımızda",
      account: "Müşteri Hesabı",
      checkout: "Ödeme & Sepet",
      success: "Sipariş Onayı",
      "beden-rehberi": "Beden Rehberi",
      "iade-talebi": "İade & Değişim",
      "hediye-karti": "Hediye Kartı",
      kampanyalar: "Kampanyalar",
      "kargo-takip": "Kargo Takibi",
      karsilastir: "Ürün Karşılaştırma",
      wishlist: "Favoriler",
      sss: "Sıkça Sorulan Sorular",
      iletisim: "İletişim",
      dev: "Developer Paneli",
      "materyal-lab": "Materyal Lab",
    };

    if (map[s]) return map[s];

    // For product or article handles, format nicely
    return s
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleForward = () => {
    if (typeof window !== "undefined") {
      router.forward();
    }
  };

  return (
    <div className="w-full bg-surface border-b border-primary/40 px-4 md:px-10 py-2.5 flex flex-wrap justify-between items-center gap-2 font-label-mono text-[11px] uppercase text-on-surface-variant select-none">
      {/* Back / Forward Controls */}
      <div className="flex items-center gap-1.5 text-primary">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Geri git"
          title="Önceki Sayfaya Geri Dön"
          className="flex items-center gap-1 px-2.5 py-1 border border-primary/60 bg-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Geri</span>
        </button>

        <button
          type="button"
          onClick={handleForward}
          aria-label="İleri git"
          title="Sonraki Sayfaya İleri Git"
          className="flex items-center gap-1 px-2.5 py-1 border border-primary/60 bg-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
        >
          <span className="hidden sm:inline">İleri</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Breadcrumbs Trail */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-[10px] md:text-[11px]">
        <Link
          href="/"
          className="hover:text-primary transition-colors flex items-center gap-1"
        >
          <Home className="w-3 h-3" />
          <span>Ana Sayfa</span>
        </Link>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;
          const title = getSegmentTitle(segment, idx);

          return (
            <React.Fragment key={href}>
              <ChevronRight className="w-3 h-3 text-outline flex-shrink-0" />
              {isLast ? (
                <span className="text-primary font-bold truncate max-w-[200px] md:max-w-[320px]">
                  {title}
                </span>
              ) : (
                <Link
                  href={href}
                  className="hover:text-primary transition-colors truncate max-w-[140px]"
                >
                  {title}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
}
