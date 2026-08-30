"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { playClickSound, playAddCartSound } from "@/lib/audio/sound-effects";

export default function OutfitStudioPage() {
  const { addItem, openCart } = useCartStore();

  // Filter products by category slots
  const outerwearList = MOCK_PRODUCTS.filter(
    (p) =>
      p.productType?.toLowerCase().includes("dış") ||
      p.productType?.toLowerCase().includes("yelek") ||
      p.title.toLowerCase().includes("parka") ||
      p.title.toLowerCase().includes("ceket") ||
      p.title.toLowerCase().includes("yelek")
  );

  const topsList = MOCK_PRODUCTS.filter(
    (p) =>
      p.productType?.toLowerCase().includes("üst") ||
      p.title.toLowerCase().includes("hoodie") ||
      p.title.toLowerCase().includes("gömlek") ||
      p.title.toLowerCase().includes("kollu")
  );

  const bottomsList = MOCK_PRODUCTS.filter(
    (p) =>
      p.productType?.toLowerCase().includes("alt") ||
      p.title.toLowerCase().includes("denim") ||
      p.title.toLowerCase().includes("kargo") ||
      p.title.toLowerCase().includes("pantolon")
  );

  // Selected items state
  const [selectedOuter, setSelectedOuter] = useState<Product>(outerwearList[0] || MOCK_PRODUCTS[0]);
  const [selectedTop, setSelectedTop] = useState<Product>(topsList[0] || MOCK_PRODUCTS[5]);
  const [selectedBottom, setSelectedBottom] = useState<Product>(bottomsList[0] || MOCK_PRODUCTS[2]);

  // Selected sizes
  const [outerSize, setOuterSize] = useState("M");
  const [topSize, setTopSize] = useState("L");
  const [bottomSize, setBottomSize] = useState("32");

  const [isAdding, setIsAdding] = useState(false);

  // Calculate totals
  const subtotal =
    parseFloat(selectedOuter.priceRange.minVariantPrice.amount) +
    parseFloat(selectedTop.priceRange.minVariantPrice.amount) +
    parseFloat(selectedBottom.priceRange.minVariantPrice.amount);

  const discount = (subtotal * 10) / 100; // %10 Stüdyo Kombin İndirimi
  const finalTotal = subtotal - discount;

  const handleAddOutfitToCart = () => {
    playAddCartSound();
    setIsAdding(true);

    const outfitItems = [
      { product: selectedOuter, size: outerSize },
      { product: selectedTop, size: topSize },
      { product: selectedBottom, size: bottomSize },
    ];

    outfitItems.forEach(({ product, size }) => {
      const variant =
        product.variants.find((v) =>
          v.selectedOptions.some(
            (o) =>
              (o.name.toLowerCase() === "beden" || o.name.toLowerCase() === "size") &&
              o.value === size
          )
        ) || product.variants[0];

      addItem({
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        handle: product.handle,
        variantTitle: `${size} / ${
          variant.selectedOptions.find(
            (o) => o.name.toLowerCase() === "renk" || o.name.toLowerCase() === "color"
          )?.value || "Siyah"
        }`,
        selectedOptions: variant.selectedOptions,
        price: parseFloat(variant.price.amount),
        image: product.featuredImage?.url || product.images[0]?.url,
        sku: variant.sku || product.sku,
      });
    });

    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            İNTERAKTİF KOMBİN STÜDYOSU // 3 YUVALI TUVAL
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            KOMBİN OLUŞTURUCU
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Dış giyim, üst ve alt parçaları seçip kendi monolitik kombinini oluştur ve %10 indirimle sepete ekle.
        </p>
      </header>

      {/* Main Studio Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary max-w-[1920px] mx-auto w-full">
        {/* Left: 3-Item Visual Canvas */}
        <div className="lg:col-span-6 p-6 md:p-12 bg-surface-container-low flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary border-b border-primary pb-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>CANLI KOMBİN TUVALİ</span>
          </div>

          {/* 3 Stacked Cards */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
            {/* Slot 1: Outerwear */}
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[10px] uppercase text-center text-on-surface-variant">
                01 // DIŞ GİYİM
              </span>
              <div className="relative aspect-[3/4] border border-primary bg-surface overflow-hidden">
                <Image
                  src={selectedOuter.featuredImage?.url || selectedOuter.images[0]?.url || ""}
                  alt={selectedOuter.title}
                  fill
                  sizes="200px"
                  className="object-cover grayscale"
                />
              </div>
              <span className="font-body-md font-bold uppercase text-[11px] text-center line-clamp-1">
                {selectedOuter.title}
              </span>
            </div>

            {/* Slot 2: Top */}
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[10px] uppercase text-center text-on-surface-variant">
                02 // ÜST GİYİM
              </span>
              <div className="relative aspect-[3/4] border border-primary bg-surface overflow-hidden">
                <Image
                  src={selectedTop.featuredImage?.url || selectedTop.images[0]?.url || ""}
                  alt={selectedTop.title}
                  fill
                  sizes="200px"
                  className="object-cover grayscale"
                />
              </div>
              <span className="font-body-md font-bold uppercase text-[11px] text-center line-clamp-1">
                {selectedTop.title}
              </span>
            </div>

            {/* Slot 3: Bottom */}
            <div className="flex flex-col gap-2">
              <span className="font-label-mono text-[10px] uppercase text-center text-on-surface-variant">
                03 // ALT GİYİM
              </span>
              <div className="relative aspect-[3/4] border border-primary bg-surface overflow-hidden">
                <Image
                  src={selectedBottom.featuredImage?.url || selectedBottom.images[0]?.url || ""}
                  alt={selectedBottom.title}
                  fill
                  sizes="200px"
                  className="object-cover grayscale"
                />
              </div>
              <span className="font-body-md font-bold uppercase text-[11px] text-center line-clamp-1">
                {selectedBottom.title}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="w-full max-w-lg border border-primary bg-surface p-6 flex flex-col gap-3 font-label-mono text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Liste Fiyatı Toplamı:</span>
              <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
            </div>
            <div className="flex justify-between text-primary font-bold">
              <span>%10 Stüdyo Kombin İndirimi:</span>
              <span>-{discount.toLocaleString("tr-TR")} ₺</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-primary pt-3">
              <span className="font-bold text-sm uppercase">Kombin Fiyatı:</span>
              <span className="font-price-lg text-2xl font-bold text-primary">
                {finalTotal.toLocaleString("tr-TR")} ₺
              </span>
            </div>

            <button
              onClick={handleAddOutfitToCart}
              disabled={isAdding}
              className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs gap-2 mt-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {isAdding ? "Kombin Sepete Ekleniyor..." : "Kombini Sepete Ekle (3 Parça)"}
            </button>
          </div>
        </div>

        {/* Right: Slot Customizers */}
        <div className="lg:col-span-6 p-6 md:p-12 bg-surface flex flex-col gap-8">
          {/* Slot 1 Selector: Outerwear */}
          <div className="flex flex-col gap-3 border-b border-outline-variant pb-6">
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-xs uppercase font-bold text-primary">
                01 // DIŞ GİYİM SEÇİMİ
              </span>
              <span className="font-label-mono text-xs text-primary font-bold">
                {parseFloat(selectedOuter.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {outerwearList.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedOuter(prod);
                  }}
                  className={`p-2 border font-label-mono text-xs text-left cursor-pointer transition-colors ${
                    selectedOuter.id === prod.id
                      ? "border-2 border-primary bg-surface-container-low"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  <span className="block uppercase font-bold truncate text-[11px]">{prod.title}</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {parseFloat(prod.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Beden:</span>
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setOuterSize(s)}
                  className={`w-7 h-7 border border-primary font-label-mono text-xs cursor-pointer ${
                    outerSize === s ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slot 2 Selector: Tops */}
          <div className="flex flex-col gap-3 border-b border-outline-variant pb-6">
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-xs uppercase font-bold text-primary">
                02 // ÜST GİYİM SEÇİMİ
              </span>
              <span className="font-label-mono text-xs text-primary font-bold">
                {parseFloat(selectedTop.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {topsList.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedTop(prod);
                  }}
                  className={`p-2 border font-label-mono text-xs text-left cursor-pointer transition-colors ${
                    selectedTop.id === prod.id
                      ? "border-2 border-primary bg-surface-container-low"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  <span className="block uppercase font-bold truncate text-[11px]">{prod.title}</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {parseFloat(prod.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Beden:</span>
              {["S", "M", "L", "XL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setTopSize(s)}
                  className={`w-7 h-7 border border-primary font-label-mono text-xs cursor-pointer ${
                    topSize === s ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Slot 3 Selector: Bottoms */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-label-mono text-xs uppercase font-bold text-primary">
                03 // ALT GİYİM SEÇİMİ
              </span>
              <span className="font-label-mono text-xs text-primary font-bold">
                {parseFloat(selectedBottom.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {bottomsList.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedBottom(prod);
                  }}
                  className={`p-2 border font-label-mono text-xs text-left cursor-pointer transition-colors ${
                    selectedBottom.id === prod.id
                      ? "border-2 border-primary bg-surface-container-low"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  <span className="block uppercase font-bold truncate text-[11px]">{prod.title}</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {parseFloat(prod.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="font-label-mono text-xs text-on-surface-variant uppercase">Beden:</span>
              {["30", "32", "34", "36"].map((s) => (
                <button
                  key={s}
                  onClick={() => setBottomSize(s)}
                  className={`w-7 h-7 border border-primary font-label-mono text-xs cursor-pointer ${
                    bottomSize === s ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
