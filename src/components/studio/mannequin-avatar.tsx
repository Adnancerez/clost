"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Eye, EyeOff, Layers } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface MannequinAvatarProps {
  selectedOuter: Product;
  selectedTop: Product;
  selectedBottom: Product;
  outerSize: string;
  topSize: string;
  bottomSize: string;
  showOuterwear: boolean;
  setShowOuterwear: (show: boolean) => void;
  viewMode: "mannequin" | "grid";
  setViewMode: (mode: "mannequin" | "grid") => void;
  activeSlotFocus: "outer" | "top" | "bottom" | null;
  setActiveSlotFocus: (slot: "outer" | "top" | "bottom" | null) => void;
}

export function MannequinAvatar({
  selectedOuter,
  selectedTop,
  selectedBottom,
  outerSize,
  topSize,
  bottomSize,
  showOuterwear,
  setShowOuterwear,
  viewMode,
  setViewMode,
  activeSlotFocus,
  setActiveSlotFocus,
}: MannequinAvatarProps) {
  return (
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

            {/* Tactical Boots Base */}
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
    </div>
  );
}
