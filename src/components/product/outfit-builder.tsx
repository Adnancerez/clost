"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShoppingBag, Check, ArrowRight, RefreshCw, Scissors } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";

export interface OutfitBuilderProps {
  products: Product[];
}

export function OutfitBuilder({ products }: OutfitBuilderProps) {
  // Filter tops & bottoms
  const topProducts = useMemo(
    () => products.filter((p) => p.productType === "Üst Giyim" || p.productType === "Dış Giyim"),
    [products]
  );
  const bottomProducts = useMemo(
    () => products.filter((p) => p.productType === "Alt Giyim"),
    [products]
  );

  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);

  const currentTop = topProducts[selectedTopIndex] || topProducts[0];
  const currentBottom = bottomProducts[selectedBottomIndex] || bottomProducts[0];

  // Size selections
  const [topSize, setTopSize] = useState("M");
  const [bottomSize, setBottomSize] = useState("32");
  const [isAdding, setIsAdding] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  // Price calculations with 15% discount
  const topPrice = parseFloat(currentTop?.priceRange.minVariantPrice.amount || "0");
  const bottomPrice = parseFloat(currentBottom?.priceRange.minVariantPrice.amount || "0");
  const subtotal = topPrice + bottomPrice;
  const discountRate = 0.15; // %15 Kombin İndirimi
  const discountAmount = subtotal * discountRate;
  const finalPrice = subtotal - discountAmount;

  const handleAddBundleToCart = () => {
    if (!currentTop || !currentBottom) return;

    setIsAdding(true);

    // 1. Add Top item
    addItem({
      productId: currentTop.id,
      variantId: `${currentTop.id}-${topSize}-bundle`,
      title: `${currentTop.title} (Kombin Set)`,
      handle: currentTop.handle,
      variantTitle: `${topSize} / %15 Kombin İndirimli`,
      selectedOptions: [{ name: "Beden", value: topSize }],
      price: Math.round(topPrice * 0.85),
      image: currentTop.featuredImage?.url || currentTop.images[0]?.url,
      sku: currentTop.sku,
    });

    // 2. Add Bottom item
    addItem({
      productId: currentBottom.id,
      variantId: `${currentBottom.id}-${bottomSize}-bundle`,
      title: `${currentBottom.title} (Kombin Set)`,
      handle: currentBottom.handle,
      variantTitle: `${bottomSize} / %15 Kombin İndirimli`,
      selectedOptions: [{ name: "Beden", value: bottomSize }],
      price: Math.round(bottomPrice * 0.85),
      image: currentBottom.featuredImage?.url || currentBottom.images[0]?.url,
      sku: currentBottom.sku,
    });

    addToast({
      title: "Kombin Set Sepete Eklendi! 🎉",
      message: `%15 indirimle ${Math.round(discountAmount).toLocaleString("tr-TR")} ₺ kazandınız.`,
      type: "success",
      actionLabel: "Sepeti Gör",
      onAction: () => openCart(),
    });

    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleRandomize = () => {
    const randomTop = Math.floor(Math.random() * topProducts.length);
    const randomBottom = Math.floor(Math.random() * bottomProducts.length);
    setSelectedTopIndex(randomTop);
    setSelectedBottomIndex(randomBottom);
  };

  return (
    <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row border-b border-primary bg-surface min-h-[calc(100vh-64px)]">
      {/* Left Column: Top Selection Carousel */}
      <section className="w-full lg:w-[32%] border-b lg:border-b-0 lg:border-r border-primary p-6 md:p-10 flex flex-col justify-between bg-surface-container-low">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-primary pb-3 font-label-mono text-xs">
            <span className="font-bold text-primary uppercase flex items-center gap-1.5">
              <span>01 // ÜST GİYİM SEÇİN</span>
            </span>
            <span className="text-on-surface-variant text-[11px]">
              {selectedTopIndex + 1} / {topProducts.length}
            </span>
          </div>

          {/* Top Product Card */}
          <div className="border-2 border-primary bg-surface p-4 flex flex-col gap-4 shadow-sm">
            <div className="relative aspect-[4/5] w-full bg-surface-variant overflow-hidden border border-primary">
              {currentTop && (
                <Image
                  src={currentTop.featuredImage?.url || currentTop.images[0]?.url || ""}
                  alt={currentTop.title}
                  fill
                  sizes="400px"
                  className="object-cover object-top transition-transform duration-500"
                />
              )}
              <span className="absolute top-2 left-2 bg-primary text-white font-label-mono text-[10px] px-2 py-0.5 uppercase font-bold">
                {currentTop?.productType}
              </span>
            </div>

            <div>
              <h3 className="font-headline-sm uppercase text-primary text-base font-bold line-clamp-1">
                {currentTop?.title}
              </h3>
              <span className="font-price-lg text-primary text-base font-bold block mt-1">
                {topPrice.toLocaleString("tr-TR")} ₺
              </span>
            </div>

            {/* Size Selector for Top */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant font-label-mono text-xs">
              <span className="text-on-surface-variant text-[11px] font-bold uppercase">
                Beden Seçin:
              </span>
              <div className="grid grid-cols-4 gap-1">
                {["S", "M", "L", "XL"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setTopSize(sz)}
                    className={`py-1.5 border text-center transition-colors cursor-pointer font-bold ${
                      topSize === sz
                        ? "bg-primary text-white border-primary"
                        : "bg-surface text-primary border-outline-variant hover:border-primary"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip for Tops */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {topProducts.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedTopIndex(idx)}
                className={`relative aspect-[3/4] border transition-all overflow-hidden cursor-pointer ${
                  selectedTopIndex === idx
                    ? "border-2 border-primary ring-2 ring-primary ring-offset-1"
                    : "border-outline-variant opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={p.featuredImage?.url || p.images[0]?.url || ""}
                  alt={p.title}
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Middle Column: Interactive Live Outfit Canvas */}
      <section className="w-full lg:w-[36%] border-b lg:border-b-0 lg:border-r border-primary p-6 md:p-10 flex flex-col justify-between items-center bg-surface relative">
        {/* Top Studio HUD */}
        <div className="w-full flex justify-between items-center border-b border-primary pb-3 font-label-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-primary uppercase">CANLI KOMBİN STÜDYOSU</span>
          </div>

          <button
            type="button"
            onClick={handleRandomize}
            className="flex items-center gap-1 text-[11px] uppercase text-primary border border-primary px-2.5 py-1 hover:bg-surface-variant transition-colors cursor-pointer font-bold"
          >
            <RefreshCw className="w-3 h-3" /> Rastgele Kombin
          </button>
        </div>

        {/* Visual Split-Canvas Stack */}
        <div className="w-full max-w-sm my-6 flex flex-col border-2 border-primary shadow-2xl bg-surface-variant overflow-hidden">
          {/* Top Half */}
          <div className="relative aspect-[16/11] w-full border-b-2 border-dashed border-primary overflow-hidden">
            {currentTop && (
              <Image
                src={currentTop.images[0]?.url || currentTop.featuredImage?.url || ""}
                alt={currentTop.title}
                fill
                priority
                sizes="400px"
                className="object-cover object-top"
              />
            )}
            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white font-label-mono text-[9px] px-2 py-0.5 uppercase">
              ÜST: {topSize}
            </div>
          </div>

          {/* Bottom Half */}
          <div className="relative aspect-[16/11] w-full overflow-hidden">
            {currentBottom && (
              <Image
                src={currentBottom.images[0]?.url || currentBottom.featuredImage?.url || ""}
                alt={currentBottom.title}
                fill
                priority
                sizes="400px"
                className="object-cover object-center"
              />
            )}
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-white font-label-mono text-[9px] px-2 py-0.5 uppercase">
              ALT: {bottomSize}
            </div>
          </div>
        </div>

        {/* Style Tag & Synergy Badge */}
        <div className="w-full bg-surface-container-low border border-primary p-3 flex justify-between items-center font-label-mono text-xs">
          <div className="flex items-center gap-1.5 text-primary">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-bold uppercase text-[11px]">Y2K Skater Silüeti</span>
          </div>
          <span className="bg-primary text-on-primary px-2 py-0.5 text-[10px] font-bold uppercase">
            %100 UYUMLU SET
          </span>
        </div>
      </section>

      {/* Right Column: Bottom Selection & Bundle Checkout */}
      <section className="w-full lg:w-[32%] p-6 md:p-10 flex flex-col justify-between bg-surface-container-low">
        <div>
          <div className="flex justify-between items-center mb-4 border-b border-primary pb-3 font-label-mono text-xs">
            <span className="font-bold text-primary uppercase flex items-center gap-1.5">
              <span>02 // ALT GİYİM SEÇİN</span>
            </span>
            <span className="text-on-surface-variant text-[11px]">
              {selectedBottomIndex + 1} / {bottomProducts.length}
            </span>
          </div>

          {/* Bottom Product Card */}
          <div className="border-2 border-primary bg-surface p-4 flex flex-col gap-4 shadow-sm">
            <div className="relative aspect-[4/5] w-full bg-surface-variant overflow-hidden border border-primary">
              {currentBottom && (
                <Image
                  src={currentBottom.featuredImage?.url || currentBottom.images[0]?.url || ""}
                  alt={currentBottom.title}
                  fill
                  sizes="400px"
                  className="object-cover object-top transition-transform duration-500"
                />
              )}
              <span className="absolute top-2 left-2 bg-primary text-white font-label-mono text-[10px] px-2 py-0.5 uppercase font-bold">
                {currentBottom?.productType}
              </span>
            </div>

            <div>
              <h3 className="font-headline-sm uppercase text-primary text-base font-bold line-clamp-1">
                {currentBottom?.title}
              </h3>
              <span className="font-price-lg text-primary text-base font-bold block mt-1">
                {bottomPrice.toLocaleString("tr-TR")} ₺
              </span>
            </div>

            {/* Size Selector for Bottom */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant font-label-mono text-xs">
              <span className="text-on-surface-variant text-[11px] font-bold uppercase">
                Beden Seçin:
              </span>
              <div className="grid grid-cols-4 gap-1">
                {["30", "32", "34", "36"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setBottomSize(sz)}
                    className={`py-1.5 border text-center transition-colors cursor-pointer font-bold ${
                      bottomSize === sz
                        ? "bg-primary text-white border-primary"
                        : "bg-surface text-primary border-outline-variant hover:border-primary"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Strip for Bottoms */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {bottomProducts.map((p, idx) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedBottomIndex(idx)}
                className={`relative aspect-[3/4] border transition-all overflow-hidden cursor-pointer ${
                  selectedBottomIndex === idx
                    ? "border-2 border-primary ring-2 ring-primary ring-offset-1"
                    : "border-outline-variant opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={p.featuredImage?.url || p.images[0]?.url || ""}
                  alt={p.title}
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Bundle Summary & Add to Cart Footer */}
        <div className="mt-8 border-t-2 border-primary pt-6 flex flex-col gap-4 font-label-mono text-xs">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span>Tekil Liste Fiyatı:</span>
            <span className="line-through">{subtotal.toLocaleString("tr-TR")} ₺</span>
          </div>

          <div className="flex justify-between items-center text-emerald-700 font-bold">
            <span className="flex items-center gap-1">
              <Scissors className="w-3.5 h-3.5" /> Kombin İndirimi (%15):
            </span>
            <span>-{Math.round(discountAmount).toLocaleString("tr-TR")} ₺</span>
          </div>

          <div className="flex justify-between items-baseline border-t border-primary pt-2">
            <span className="font-bold text-primary uppercase text-sm">SET TOPLAMI:</span>
            <span className="font-price-lg text-primary text-xl font-bold">
              {Math.round(finalPrice).toLocaleString("tr-TR")} ₺
            </span>
          </div>

          <button
            type="button"
            disabled={isAdding}
            onClick={handleAddBundleToCart}
            className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs font-bold gap-2 shadow-xl"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAdding ? "Set Ekleniyor..." : "Kombini %15 İndirimle Sepete Ekle"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
