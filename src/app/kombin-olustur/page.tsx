"use client";

import React, { useState } from "react";
import { Shuffle, Share2 } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { playClickSound, playAddCartSound } from "@/lib/audio/sound-effects";
import { MannequinAvatar } from "@/components/studio/mannequin-avatar";
import { GarmentSlot } from "@/components/studio/garment-slot";
import { OutfitSummary } from "@/components/studio/outfit-summary";

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
        {/* Left: Mannequin Avatar */}
        <MannequinAvatar
          selectedOuter={selectedOuter}
          selectedTop={selectedTop}
          selectedBottom={selectedBottom}
          outerSize={outerSize}
          topSize={topSize}
          bottomSize={bottomSize}
          showOuterwear={showOuterwear}
          setShowOuterwear={setShowOuterwear}
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeSlotFocus={activeSlotFocus}
          setActiveSlotFocus={setActiveSlotFocus}
        />

        {/* Right: Wardrobe Selectors & Checkout */}
        <div className="lg:col-span-6 p-4 md:p-8 flex flex-col justify-between gap-6 bg-surface">
          <div className="flex flex-col gap-6">
            <GarmentSlot
              slotNumber="01"
              title="DIŞ GİYİM (PARKA / CEKET / YELEK)"
              items={outerwearList}
              selectedItem={selectedOuter}
              onSelectItem={setSelectedOuter}
              selectedSize={outerSize}
              onSelectSize={setOuterSize}
              sizes={["S", "M", "L", "XL"]}
              onFocusSlot={() => setActiveSlotFocus("outer")}
            />

            <GarmentSlot
              slotNumber="02"
              title="ÜST GİYİM (HOODIE / GÖMLEK / TİŞÖRT)"
              items={topsList}
              selectedItem={selectedTop}
              onSelectItem={setSelectedTop}
              selectedSize={topSize}
              onSelectSize={setTopSize}
              sizes={["S", "M", "L", "XL"]}
              onFocusSlot={() => setActiveSlotFocus("top")}
            />

            <GarmentSlot
              slotNumber="03"
              title="ALT GİYİM (DENİM / KARGO PANTOLON)"
              items={bottomsList}
              selectedItem={selectedBottom}
              onSelectItem={setSelectedBottom}
              selectedSize={bottomSize}
              onSelectSize={setBottomSize}
              sizes={["30", "32", "34", "36"]}
              onFocusSlot={() => setActiveSlotFocus("bottom")}
            />
          </div>

          <OutfitSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            discountPercent={discountPercent}
            finalTotal={finalTotal}
            isAdding={isAdding}
            onAddOutfitToCart={handleAddOutfitToCart}
          />
        </div>
      </div>
    </main>
  );
}
