"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface GarmentSlotProps {
  slotNumber: string;
  title: string;
  items: Product[];
  selectedItem: Product;
  onSelectItem: (item: Product) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  sizes: string[];
  onFocusSlot?: () => void;
}

export function GarmentSlot({
  slotNumber,
  title,
  items,
  selectedItem,
  onSelectItem,
  selectedSize,
  onSelectSize,
  sizes,
  onFocusSlot,
}: GarmentSlotProps) {
  return (
    <div className="border border-primary p-4 md:p-5 bg-surface flex flex-col gap-3">
      <div className="flex justify-between items-center border-b border-outline-variant pb-2">
        <div className="flex items-center gap-2 font-label-mono text-xs uppercase font-bold text-primary">
          <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-[10px]">
            {slotNumber}
          </span>
          <span>{title}</span>
        </div>
        <span className="font-price-lg text-xs text-primary font-bold">
          {parseFloat(selectedItem.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
        </span>
      </div>

      {/* Item Carousel Selector */}
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => {
          const isSelected = selectedItem.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playClickSound();
                onSelectItem(item);
                if (onFocusSlot) onFocusSlot();
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

      {/* Size Selector */}
      <div className="flex items-center justify-between pt-2 border-t border-outline-variant font-label-mono text-xs">
        <span className="text-on-surface-variant">BEDEN SEÇİMİ:</span>
        <div className="flex gap-1.5">
          {sizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={() => {
                playClickSound();
                onSelectSize(sz);
              }}
              className={`w-8 h-8 flex items-center justify-center border font-label-mono text-xs transition-colors cursor-pointer ${
                selectedSize === sz
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
  );
}
