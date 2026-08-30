"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ShoppingBag,
  Shuffle,
  Eye,
  EyeOff,
  Check,
  Layers,
  ArrowRight,
  ShieldCheck,
  Share2,
} from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { playClickSound, playAddCartSound } from "@/lib/audio/sound-effects";

export default function OutfitStudioPage() {
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  // Category slots
  const outerwearList = MOCK_PRODUCTS.filter(
    (p) =>
      p.productType?.toLowerCase().includes("dış") ||
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

  // Selected items
  const [selectedOuter, setSelectedOuter] = useState<Product>(
    outerwearList[0] || MOCK_PRODUCTS[0]
  );
  const [selectedTop, setSelectedTop] = useState<Product>(
    topsList[0] || MOCK_PRODUCTS[5]
  );
  const [selectedBottom, setSelectedBottom] = useState<Product>(
    bottomsList[0] || MOCK_PRODUCTS[2]
  );

  // Selected sizes
  const [outerSize, setOuterSize] = useState("M");
  const [topSize, setTopSize] = useState("L");
  const [bottomSize, setBottomSize] = useState("32");

  // Mannequin interactive toggles
  const [showOuterwear, setShowOuterwear] = useState(true);
  const [viewMode, setViewMode] = useState<"mannequin" | "grid">("mannequin");
  const [activeSlotFocus, setActiveSlotFocus] = useState<"outer" | "top" | "bottom" | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Calculate pricing & 10% Bundle Discount
  const outerPrice = showOuterwear ? parseFloat(selectedOuter.priceRange.minVariantPrice.amount) : 0;
  const topPrice = parseFloat(selectedTop.priceRange.minVariantPrice.amount);
  const bottomPrice = parseFloat(selectedBottom.priceRange.minVariantPrice.amount);
  const subtotal = outerPrice + topPrice + bottomPrice;
  const discountPercent = 10;
  const discountAmount = (subtotal * discountPercent) / 100;
  const finalTotal = subtotal - discountAmount;

  // Shuffle Random Outfit
  const handleShuffle = () => {
    playClickSound();
    const randomOuter = outerwearList[Math.floor(Math.random() * outerwearList.length)];
    const randomTop = topsList[Math.floor(Math.random() * topsList.length)];
    const randomBottom = bottomsList[Math.floor(Math.random() * bottomsList.length)];

    if (randomOuter) setSelectedOuter(randomOuter);
    if (randomTop) setSelectedTop(randomTop);
    if (randomBottom) setSelectedBottom(randomBottom);

    addToast({
      title: "Rastgele Kombin Oluşturuldu",
      message: "Yeni stil katmanları mankene uygulandı.",
      type: "info",
    });
  };

  // Add Outfit to Cart
  const handleAddOutfitToCart = () => {
    playAddCartSound();
    setIsAdding(true);

    const outfitItems = [
      ...(showOuterwear ? [{ product: selectedOuter, size: outerSize }] : []),
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

    addToast({
      title: "Kombin Sepete Eklendi",
      message: `%${discountPercent} stüdyo indirimiyle ${outfitItems.length} parça eklendi.`,
      type: "success",
    });

    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 400);
  };

  const handleShare = () => {
    playClickSound();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast({
        title: "Bağlantı Kopyalandı",
        message: "Kombin stüdyosu linki panonuza kaydedildi.",
        type: "info",
      });
    }
  };

  return (
    <main className="flex-grow pt-16 flex flex-col min-h-screen bg-surface">
      {/* Studio Header */}
      <header className="p-4 md:p-8 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              İNTERAKTİF GİYDİRME KABİNİ // 3 BOYUTLU STİL KATMANI
            </span>
          </div>
          <h1 className="font-display-lg-mobile md:font-headline-md uppercase tracking-tighter text-primary">
            KOMBİN STÜDYOSU
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShuffle}
            className="flex items-center gap-2 bg-surface hover:bg-surface-variant border border-primary px-4 py-2.5 font-label-mono text-xs uppercase tracking-wider text-primary transition-colors cursor-pointer"
          >
            <Shuffle className="w-4 h-4" /> Rastgele Stil Üret
          </button>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Kombini paylaş"
            className="p-2.5 border border-primary hover:bg-surface-variant text-primary transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Studio Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary max-w-[1920px] mx-auto w-full">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: INTERACTIVE VIRTUAL MANNEQUIN / BODY CANVAS                  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 p-4 md:p-8 bg-surface-container-low flex flex-col justify-between relative overflow-hidden">
          {/* Canvas Top Bar Controls */}
          <div className="flex justify-between items-center w-full border-b border-primary pb-3 font-label-mono text-xs uppercase">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-bold">CANLI MANKEN SİMÜLATÖRÜ</span>
            </div>

            {/* View Mode & Layer Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowOuterwear(!showOuterwear);
                }}
                className={`px-3 py-1 border border-primary flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] ${
                  showOuterwear
                    ? "bg-primary text-on-primary"
                    : "bg-surface text-on-surface-variant"
                }`}
              >
                {showOuterwear ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Dış Katman: {showOuterwear ? "Açık" : "Kapalı"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setViewMode(viewMode === "mannequin" ? "grid" : "mannequin");
                }}
                className="px-3 py-1 border border-primary bg-surface hover:bg-surface-variant text-primary text-[11px] cursor-pointer"
              >
                {viewMode === "mannequin" ? "Grid Görünümü" : "Manken Görünümü"}
              </button>
            </div>
          </div>

          {/* Center Mannequin Body Dressing Room */}
          {viewMode === "mannequin" ? (
            <div className="relative w-full min-h-[580px] md:min-h-[700px] flex items-center justify-center my-4 select-none">
              {/* Architectural Grid Background Lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Central Realistic Styled Mannequin Canvas */}
              <div className="relative w-full max-w-sm md:max-w-md h-[560px] md:h-[680px] border border-primary bg-surface shadow-2xl flex flex-col justify-between p-4 overflow-hidden">
                {/* Laser Scanline Beam on Update */}
                <div
                  key={`${selectedOuter.id}-${selectedTop.id}-${selectedBottom.id}-${showOuterwear}`}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent pointer-events-none z-30 shadow-[0_0_15px_rgba(74,222,128,0.8)] animate-laser-scan"
                />

                {/* Mannequin Head & Hood Contour */}
                <div className="w-full flex flex-col items-center justify-center pt-2 pb-1 relative z-10">
                  <div className="w-16 h-20 rounded-full border-2 border-primary bg-primary/90 flex flex-col items-center justify-center relative shadow-md">
                    {/* Futuristic Visor Line */}
                    <div className="w-10 h-2 bg-white/80 rounded-full my-1 animate-pulse" />
                    <span className="text-[8px] font-label-mono text-white/70 uppercase">
                      CL-AVATAR
                    </span>
                  </div>
                  <span className="text-[10px] font-label-mono text-on-surface-variant mt-1">
                    BOY: 185 CM // 76 KG
                  </span>
                </div>

                {/* Layer 1: Torso / Chest (Outerwear or Top) */}
                <div
                  onClick={() => setActiveSlotFocus(showOuterwear ? "outer" : "top")}
                  className={`relative w-full flex-1 mx-auto my-1 border transition-all duration-300 cursor-pointer overflow-hidden group ${
                    activeSlotFocus === "outer" || activeSlotFocus === "top"
                      ? "border-primary ring-2 ring-primary"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  {/* Outerwear vs Top Image Dynamic Render */}
                  {showOuterwear ? (
                    <div
                      key={`outer-${selectedOuter.id}`}
                      className="relative w-full h-full bg-surface-variant animate-fade-in-up"
                    >
                      <Image
                        src={selectedOuter.featuredImage?.url || selectedOuter.images[0]?.url || ""}
                        alt={selectedOuter.title}
                        fill
                        priority
                        sizes="400px"
                        className="object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hotspot Floating Tag */}
                      <div className="absolute top-2 left-2 bg-primary/95 text-on-primary font-label-mono text-[9px] uppercase px-2 py-1 flex items-center gap-1 shadow-md">
                        <Layers className="w-3 h-3" />
                        <span>DIŞ GİYİM: {selectedOuter.title} ({outerSize})</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-surface/90 border border-primary font-price-lg text-xs px-2 py-0.5 text-primary">
                        {parseFloat(selectedOuter.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                      </div>
                    </div>
                  ) : (
                    <div
                      key={`top-${selectedTop.id}`}
                      className="relative w-full h-full bg-surface-variant animate-fade-in-up"
                    >
                      <Image
                        src={selectedTop.featuredImage?.url || selectedTop.images[0]?.url || ""}
                        alt={selectedTop.title}
                        fill
                        priority
                        sizes="400px"
                        className="object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Hotspot Floating Tag */}
                      <div className="absolute top-2 left-2 bg-primary/95 text-on-primary font-label-mono text-[9px] uppercase px-2 py-1 flex items-center gap-1 shadow-md">
                        <Layers className="w-3 h-3" />
                        <span>İÇ KATMAN / ÜST: {selectedTop.title} ({topSize})</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-surface/90 border border-primary font-price-lg text-xs px-2 py-0.5 text-primary">
                        {parseFloat(selectedTop.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                      </div>
                    </div>
                  )}
                </div>

                {/* Layer 2: Legs / Lower Body (Pants / Cargo / Denim) */}
                <div
                  onClick={() => setActiveSlotFocus("bottom")}
                  className={`relative w-full flex-1 mx-auto my-1 border transition-all duration-300 cursor-pointer overflow-hidden group ${
                    activeSlotFocus === "bottom"
                      ? "border-primary ring-2 ring-primary"
                      : "border-outline-variant hover:border-primary"
                  }`}
                >
                  <div
                    key={`bottom-${selectedBottom.id}`}
                    className="relative w-full h-full bg-surface-variant animate-fade-in-up"
                  >
                    <Image
                      src={selectedBottom.featuredImage?.url || selectedBottom.images[0]?.url || ""}
                      alt={selectedBottom.title}
                      fill
                      priority
                      sizes="400px"
                      className="object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hotspot Floating Tag */}
                    <div className="absolute top-2 left-2 bg-primary/95 text-on-primary font-label-mono text-[9px] uppercase px-2 py-1 flex items-center gap-1 shadow-md">
                      <Layers className="w-3 h-3" />
                      <span>ALT GİYİM: {selectedBottom.title} ({bottomSize})</span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-surface/90 border border-primary font-price-lg text-xs px-2 py-0.5 text-primary">
                      {parseFloat(selectedBottom.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                    </div>
                  </div>
                </div>

                {/* Tactical Boots / Footwear Silhouette Base */}
                <div className="w-full h-12 border-t border-primary bg-primary text-on-primary flex items-center justify-between px-4 font-label-mono text-[10px] uppercase">
                  <span>CL-01 TAKTİK BOT SİLÜETİ</span>
                  <span className="text-white/70">TABAN: VIBRAM® // SİYAH</span>
                </div>
              </div>
            </div>
          ) : (
            /* Alternate 3-Slot Flat Grid View */
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto my-auto">
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
          )}

          {/* Left Canvas Bottom Summary Info */}
          <div className="border-t border-primary pt-3 flex flex-wrap justify-between items-center text-xs font-label-mono text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" /> %100 Orijinal Tasarım &amp; Ücretsiz Sigortalı Kargo
            </span>
            <span className="text-primary font-bold">
              TOPLAM {showOuterwear ? 3 : 2} PARÇA
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: WARDROBE SELECTOR & BUNDLE CHECKOUT ACTIONS                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 p-4 md:p-8 flex flex-col justify-between gap-6 bg-surface">
          <div className="flex flex-col gap-6">
            {/* Slot 1: Dış Giyim Seçici */}
            <div className="border border-primary p-4 md:p-5 bg-surface flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2 font-label-mono text-xs uppercase font-bold text-primary">
                  <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px]">
                    01
                  </span>
                  <span>DIŞ GİYİM (PARKA / CEKET / YELEK)</span>
                </div>
                <span className="font-price-lg text-xs text-primary font-bold">
                  {parseFloat(selectedOuter.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                </span>
              </div>

              {/* Item Carousel Selector */}
              <div className="grid grid-cols-3 gap-2">
                {outerwearList.map((item) => {
                  const isSelected = selectedOuter.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedOuter(item);
                        setActiveSlotFocus("outer");
                      }}
                      className={`p-2 border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-surface-variant ring-1 ring-primary"
                          : "border-outline-variant hover:border-primary bg-surface"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-surface-container-low overflow-hidden">
                        <Image
                          src={item.featuredImage?.url || item.images[0]?.url || ""}
                          alt={item.title}
                          fill
                          sizes="150px"
                          className="object-cover grayscale"
                        />
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-primary text-on-primary w-4 h-4 flex items-center justify-center text-[9px]">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <span className="font-body-md font-bold uppercase text-[10px] line-clamp-1">
                        {item.title}
                      </span>
                      <span className="font-price-lg text-[10px] text-on-surface-variant">
                        {parseFloat(item.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Size Selector for Outerwear */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant font-label-mono text-xs">
                <span className="text-on-surface-variant">BEDEN SEÇİMİ:</span>
                <div className="flex gap-1.5">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setOuterSize(sz);
                      }}
                      className={`w-8 h-8 flex items-center justify-center border font-label-mono text-xs transition-colors cursor-pointer ${
                        outerSize === sz
                          ? "border-primary bg-primary text-on-primary font-bold"
                          : "border-outline-variant hover:border-primary bg-surface text-primary"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 2: Üst Giyim Seçici */}
            <div className="border border-primary p-4 md:p-5 bg-surface flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2 font-label-mono text-xs uppercase font-bold text-primary">
                  <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px]">
                    02
                  </span>
                  <span>ÜST GİYİM (HOODIE / GÖMLEK / TİŞÖRT)</span>
                </div>
                <span className="font-price-lg text-xs text-primary font-bold">
                  {parseFloat(selectedTop.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                </span>
              </div>

              {/* Item Carousel Selector */}
              <div className="grid grid-cols-3 gap-2">
                {topsList.map((item) => {
                  const isSelected = selectedTop.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedTop(item);
                        setActiveSlotFocus("top");
                      }}
                      className={`p-2 border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-surface-variant ring-1 ring-primary"
                          : "border-outline-variant hover:border-primary bg-surface"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-surface-container-low overflow-hidden">
                        <Image
                          src={item.featuredImage?.url || item.images[0]?.url || ""}
                          alt={item.title}
                          fill
                          sizes="150px"
                          className="object-cover grayscale"
                        />
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-primary text-on-primary w-4 h-4 flex items-center justify-center text-[9px]">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <span className="font-body-md font-bold uppercase text-[10px] line-clamp-1">
                        {item.title}
                      </span>
                      <span className="font-price-lg text-[10px] text-on-surface-variant">
                        {parseFloat(item.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Size Selector for Tops */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant font-label-mono text-xs">
                <span className="text-on-surface-variant">BEDEN SEÇİMİ:</span>
                <div className="flex gap-1.5">
                  {["S", "M", "L", "XL"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setTopSize(sz);
                      }}
                      className={`w-8 h-8 flex items-center justify-center border font-label-mono text-xs transition-colors cursor-pointer ${
                        topSize === sz
                          ? "border-primary bg-primary text-on-primary font-bold"
                          : "border-outline-variant hover:border-primary bg-surface text-primary"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Slot 3: Alt Giyim Seçici */}
            <div className="border border-primary p-4 md:p-5 bg-surface flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <div className="flex items-center gap-2 font-label-mono text-xs uppercase font-bold text-primary">
                  <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px]">
                    03
                  </span>
                  <span>ALT GİYİM (DENİM / KARGO PANTOLON)</span>
                </div>
                <span className="font-price-lg text-xs text-primary font-bold">
                  {parseFloat(selectedBottom.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                </span>
              </div>

              {/* Item Carousel Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {bottomsList.map((item) => {
                  const isSelected = selectedBottom.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setSelectedBottom(item);
                        setActiveSlotFocus("bottom");
                      }}
                      className={`p-2 border text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-primary bg-surface-variant ring-1 ring-primary"
                          : "border-outline-variant hover:border-primary bg-surface"
                      }`}
                    >
                      <div className="relative aspect-[4/3] w-full bg-surface-container-low overflow-hidden">
                        <Image
                          src={item.featuredImage?.url || item.images[0]?.url || ""}
                          alt={item.title}
                          fill
                          sizes="150px"
                          className="object-cover grayscale"
                        />
                        {isSelected && (
                          <span className="absolute top-1 right-1 bg-primary text-on-primary w-4 h-4 flex items-center justify-center text-[9px]">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <span className="font-body-md font-bold uppercase text-[10px] line-clamp-1">
                        {item.title}
                      </span>
                      <span className="font-price-lg text-[10px] text-on-surface-variant">
                        {parseFloat(item.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Size Selector for Bottoms */}
              <div className="flex items-center justify-between pt-2 border-t border-outline-variant font-label-mono text-xs">
                <span className="text-on-surface-variant">BEDEN SEÇİMİ:</span>
                <div className="flex gap-1.5">
                  {["30", "32", "34", "36"].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        playClickSound();
                        setBottomSize(sz);
                      }}
                      className={`w-8 h-8 flex items-center justify-center border font-label-mono text-xs transition-colors cursor-pointer ${
                        bottomSize === sz
                          ? "border-primary bg-primary text-on-primary font-bold"
                          : "border-outline-variant hover:border-primary bg-surface text-primary"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Final Checkout Block */}
          <div className="border border-primary p-6 bg-surface-container-low flex flex-col gap-4 font-label-mono text-xs mt-4">
            <div className="flex justify-between items-center border-b border-outline-variant pb-2">
              <span className="text-on-surface-variant">ARA TOPLAM</span>
              <span>{subtotal.toLocaleString("tr-TR")} ₺</span>
            </div>

            <div className="flex justify-between items-center text-green-700 dark:text-green-400 font-bold">
              <span>STÜDYO KOMBİN İNDİRİMİ (%10)</span>
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
              onClick={handleAddOutfitToCart}
              className="w-full bg-primary text-on-primary h-14 flex items-center justify-center gap-2 uppercase tracking-widest font-label-mono text-xs hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50 mt-2 font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {isAdding ? "Sepete Ekleniyor..." : "Kombini Sepete Ekle (%10 İndirimli)"}
              </span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </main>
  );
}
