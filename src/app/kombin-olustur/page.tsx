import React from "react";
import { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { OutfitBuilder } from "@/components/product/outfit-builder";
import { Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Kombin Tasarımcısı // Mix & Match Stüdyosu — CLOST",
  description:
    "CLOST Y2K sokak modası parçalarını canlı model üzerinde eşleştirin, kendi sokak stilinizi yaratın ve %15 set indirimiyle sepete ekleyin.",
};

export default async function OutfitBuilderPage() {
  const products = await getProducts();

  return (
    <main className="flex-grow flex flex-col bg-surface">
      {/* Page Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            İNTERAKTİF SOKAK STÜDYOSU // Y2K SUMMER &apos;24
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary font-bold">
            KOMBİN TASARIMCISI
          </h1>
        </div>
        <div className="flex items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase font-bold">
          <Layers className="w-4 h-4 text-primary" />
          <span>Canlı Önizleme • Otomatik %15 İndirim</span>
        </div>
      </header>

      {/* Interactive Mix & Match Canvas Component */}
      <OutfitBuilder products={products} />
    </main>
  );
}
