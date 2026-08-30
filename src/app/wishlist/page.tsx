"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { ProductCard } from "@/components/product/product-card";

const emptySubscribe = () => () => {};

export default function WishlistPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { items, clearWishlist } = useWishlistStore();

  if (!isMounted) return null;

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            KAYDEDİLENLER // İSTEK LİSTESİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            FAVORİLERİM ({items.length})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 border border-primary px-4 py-2 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Tümünü Temizle
          </button>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 p-6 md:p-12 max-w-[1920px] mx-auto w-full">
        {items.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
            <ShoppingBag className="w-12 h-12 text-outline" />
            <h2 className="font-headline-sm uppercase text-primary">
              Favori Listeniz Boş
            </h2>
            <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-sm">
              Beğendiğiniz ürünlerin üzerindeki kalp ikonuna tıklayarak favorilerinize ekleyebilirsiniz.
            </p>
            <Link
              href="/collections/all"
              className="mt-4 bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors"
            >
              Koleksiyonu Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
