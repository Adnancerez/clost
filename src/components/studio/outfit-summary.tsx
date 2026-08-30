"use client";

import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export interface OutfitSummaryProps {
  subtotal: number;
  discountAmount: number;
  discountPercent: number;
  finalTotal: number;
  isAdding: boolean;
  onAddOutfitToCart: () => void;
}

export function OutfitSummary({
  subtotal,
  discountAmount,
  discountPercent,
  finalTotal,
  isAdding,
  onAddOutfitToCart,
}: OutfitSummaryProps) {
  return (
    <div className="border border-primary p-6 bg-surface-container-low flex flex-col gap-4 font-label-mono text-xs mt-4">
      <div className="flex justify-between items-center border-b border-outline-variant pb-2">
        <span className="text-on-surface-variant">ARA TOPLAM</span>
        <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
      </div>

      <div className="flex justify-between items-center text-green-700 dark:text-green-400 font-bold">
        <span>STÜDYO KOMBİN İNDİRİMİ (%{discountPercent})</span>
        <span>-{discountAmount.toLocaleString("tr-TR")} ₺</span>
      </div>

      <div className="flex justify-between items-center text-on-surface-variant">
        <span>SİGORTALI HIZLI TESLİMAT</span>
        <span className="text-green-600 font-bold">ÜCRETSİZ</span>
      </div>

      <div className="flex justify-between items-baseline border-t border-primary pt-3">
        <span className="font-headline-sm uppercase text-primary text-base">
          ÖDENECEK TUTAR
        </span>
        <span className="font-price-lg text-2xl font-bold text-primary">
          {finalTotal.toLocaleString("tr-TR")} ₺
        </span>
      </div>

      <MagneticButton
        type="button"
        disabled={isAdding}
        onClick={onAddOutfitToCart}
        className="w-full bg-primary text-on-primary h-14 flex items-center justify-center gap-2 uppercase tracking-widest font-label-mono text-xs hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50 mt-2 font-bold"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>
          {isAdding ? "Sepete Ekleniyor..." : `Kombini Sepete Ekle (%${discountPercent} İndirimli)`}
        </span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </MagneticButton>
    </div>
  );
}
