"use client";

import React, { useState } from "react";
import { Sparkles, Bell, Truck, ShieldCheck, Flame, Lock } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { FitFinderModal } from "./fit-finder-modal";
import { BackInStockModal } from "./back-in-stock-modal";
import { playClickSound, playAddCartSound } from "@/lib/audio/sound-effects";

export interface VariantSelectorProps {
  product: Product;
}

export function VariantSelector({ product }: VariantSelectorProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [isFitFinderOpen, setIsFitFinderOpen] = useState(false);
  const [isStockAlertOpen, setIsStockAlertOpen] = useState(false);

  // Extract color options
  const colorOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "renk" || opt.name.toLowerCase() === "color"
  );
  const colors = colorOption?.values || ["Siyah"];
  const [selectedColor, setSelectedColor] = useState<string>(colors[0] || "Siyah");

  // Extract size options
  const sizeOption = product.options.find(
    (opt) => opt.name.toLowerCase() === "beden" || opt.name.toLowerCase() === "size"
  );
  const sizes = sizeOption?.values || ["S", "M", "L", "XL"];

  // Default selected size: first available size, or "M"
  const defaultSize =
    sizes.find((s) => {
      const v = product.variants.find((variant) =>
        variant.selectedOptions.some(
          (o) =>
            (o.name.toLowerCase() === "beden" || o.name.toLowerCase() === "size") &&
            o.value === s
        )
      );
      return v ? v.availableForSale : true;
    }) || sizes[0];

  const [selectedSize, setSelectedSize] = useState<string>(defaultSize);

  // Find currently active variant
  const currentVariant =
    product.variants.find((v) => {
      const hasColor = v.selectedOptions.some(
        (o) =>
          (o.name.toLowerCase() === "renk" || o.name.toLowerCase() === "color") &&
          o.value.toLowerCase() === selectedColor.toLowerCase()
      );
      const hasSize = v.selectedOptions.some(
        (o) =>
          (o.name.toLowerCase() === "beden" || o.name.toLowerCase() === "size") &&
          o.value.toLowerCase() === selectedSize.toLowerCase()
      );
      return hasColor && hasSize;
    }) || product.variants[0];

  const isCurrentAvailable = currentVariant ? currentVariant.availableForSale : true;

  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  const handleAddToCart = () => {
    if (!isCurrentAvailable) {
      setIsStockAlertOpen(true);
      return;
    }

    playAddCartSound();
    setIsAdding(true);
    addItem({
      productId: product.id,
      variantId: currentVariant
        ? currentVariant.id
        : `${product.id}-${selectedSize}-${selectedColor}`,
      title: product.title,
      handle: product.handle,
      variantTitle: `${selectedSize} / ${selectedColor}`,
      selectedOptions: [
        { name: "Beden", value: selectedSize },
        { name: "Renk", value: selectedColor },
      ],
      price: parseFloat(
        currentVariant?.price?.amount || product.priceRange.minVariantPrice.amount
      ),
      image: product.featuredImage?.url || product.images[0]?.url,
      sku: currentVariant?.sku || product.sku,
    });

    addToast({
      title: "Sepete Eklendi",
      message: `${product.title} (${selectedSize} / ${selectedColor})`,
      type: "success",
      actionLabel: "Sepeti Gör",
      onAction: () => openCart(),
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  const getColorClass = (colorName: string) => {
    const c = colorName.toLowerCase();
    if (c === "siyah" || c === "black") return "bg-primary text-on-primary";
    if (c === "beyaz" || c === "white") return "bg-white text-black";
    if (c === "gri" || c === "gray" || c === "grey") return "bg-surface-variant text-black";
    if (c === "haki" || c === "olive") return "bg-[#5d5f5f] text-white";
    return "bg-surface-variant text-black";
  };

  return (
    <div className="flex flex-col">
      {/* Color Selection */}
      {colors.length > 0 && (
        <div className="p-4 md:p-10 border-b border-primary">
          <div className="font-label-mono text-primary mb-4 uppercase text-xs">
            RENK: {selectedColor}
          </div>
          <div className="flex gap-4">
            {colors.map((color) => {
              const isSelected = selectedColor.toLowerCase() === color.toLowerCase();
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedColor(color);
                  }}
                  aria-label={color}
                  className={`w-10 h-10 border border-primary transition-transform cursor-pointer ${getColorClass(
                    color
                  )} ${isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:opacity-80"}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="p-4 md:p-10 border-b border-primary">
        <div className="flex justify-between items-center mb-4 font-label-mono text-xs">
          <span className="text-primary uppercase font-bold">BEDEN</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setIsFitFinderOpen(true);
              }}
              className="text-primary font-bold hover:opacity-70 flex items-center gap-1 cursor-pointer uppercase border-b border-primary pb-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" /> AKILLI BEDENİMİ BUL
            </button>
            <button
              type="button"
              onClick={() =>
                alert(
                  "Beden Tablosu (cm):\nS: Göğüs 92-96 | Boy 170-178\nM: Göğüs 97-102 | Boy 175-185\nL: Göğüs 103-108 | Boy 180-190\nXL: Göğüs 109-115 | Boy 185-195"
                )
              }
              className="text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4 cursor-pointer uppercase"
            >
              BEDEN TABLOSU
            </button>
          </div>
        </div>

        {/* 4-column Size Grid */}
        <div className="grid grid-cols-4 gap-[1px] bg-primary border border-primary mb-4">
          {sizes.map((size) => {
            const variantForSize = product.variants.find((v) =>
              v.selectedOptions.some(
                (o) =>
                  (o.name.toLowerCase() === "beden" || o.name.toLowerCase() === "size") &&
                  o.value.toLowerCase() === size.toLowerCase()
              )
            );
            const isAvailable = variantForSize ? variantForSize.availableForSale : true;
            const isSelected = selectedSize.toLowerCase() === size.toLowerCase();

            if (!isAvailable) {
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setSelectedSize(size);
                  }}
                  className={`h-12 flex items-center justify-center font-label-mono text-xs strike-through cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-surface-variant text-on-surface-variant hover:bg-surface"
                  }`}
                  title="Stokta Yok - Tıklayıp Haber Alabilirsiniz"
                >
                  {size}
                </button>
              );
            }

            return (
              <button
                key={size}
                type="button"
                onClick={() => {
                  playClickSound();
                  setSelectedSize(size);
                }}
                className={`h-12 flex items-center justify-center font-label-mono text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-surface hover:bg-surface-variant text-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {product.modelInfo && (
          <p className="font-label-mono text-on-surface-variant text-xs uppercase tracking-widest mt-2">
            {product.modelInfo}
          </p>
        )}
      </div>

      {/* Add to Cart or Back in Stock Alert CTA */}
      <div className="p-4 md:p-10 border-b border-primary flex flex-col gap-4">
        {/* Live Social Proof / Viewer Pulse */}
        <div className="flex items-center justify-between text-xs font-label-mono bg-surface-container-low p-2.5 border border-outline-variant">
          <div className="flex items-center gap-2 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="uppercase text-[11px] font-bold">14 Kişi Şu An İnceliyor</span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant text-[11px] uppercase">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>Son 24 Saatte 22 Satıldı</span>
          </div>
        </div>

        {isCurrentAvailable ? (
          <button
            type="button"
            disabled={isAdding}
            onClick={handleAddToCart}
            className="w-full bg-primary text-white font-label-mono h-14 flex items-center justify-center hover:bg-surface-variant hover:text-primary border border-primary transition-colors duration-200 uppercase tracking-widest cursor-pointer text-xs font-bold"
          >
            {isAdding ? "Ekleniyor..." : "Sepete Ekle"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsStockAlertOpen(true)}
            className="w-full bg-surface-variant text-primary font-label-mono h-14 flex items-center justify-center hover:bg-primary hover:text-on-primary border border-primary transition-colors duration-200 uppercase tracking-widest cursor-pointer text-xs gap-2 font-bold"
          >
            <Bell className="w-4 h-4" /> Tekrar Gelince Haber Ver ({selectedSize})
          </button>
        )}

        {/* Guarantees & Conversion Trust Badges */}
        <div className="flex flex-col gap-2.5 pt-2 font-label-mono text-[11px] text-on-surface-variant border-t border-outline-variant">
          <div className="flex items-center gap-2.5">
            <Truck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>16:00&apos;a kadar siparişlerde <strong>Aynı Gün Kargo</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>14 Gün Koşulsuz Ücretsiz İade ve Değişim</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Lock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            <span>256-Bit SSL Korumalı Güvenli Ödeme Altyapısı</span>
          </div>
        </div>
      </div>

      {/* Fit Finder Modal */}
      <FitFinderModal
        isOpen={isFitFinderOpen}
        onClose={() => setIsFitFinderOpen(false)}
        onSelectSize={(size) => setSelectedSize(size)}
        productTitle={product.title}
      />

      {/* Back in Stock Modal */}
      <BackInStockModal
        isOpen={isStockAlertOpen}
        onClose={() => setIsStockAlertOpen(false)}
        productTitle={product.title}
        variantTitle={`${selectedSize} / ${selectedColor}`}
      />
    </div>
  );
}
