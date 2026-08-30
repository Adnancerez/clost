"use client";

import React, { useState } from "react";
import { Check, SlidersHorizontal, X } from "lucide-react";
import { FilterOptions } from "@/lib/shopify/types";

export interface FilterSidebarProps {
  initialFilters?: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  productCount?: number;
}

export function FilterSidebar({
  initialFilters = {},
  onFilterChange,
  productCount = 8,
}: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.category || []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>(
    initialFilters.size || []
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialFilters.color || []
  );
  const [selectedPrice, setSelectedPrice] = useState<string>(
    initialFilters.priceRange || "all"
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = ["Dış Giyim", "Üst Giyim", "Alt Giyim", "Aksesuar"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Siyah", hex: "#000000" },
    { name: "Beyaz", hex: "#ffffff" },
    { name: "Gri", hex: "#4A4A4A" },
    { name: "Haki", hex: "#5d5f5f" },
  ];
  const priceRanges = [
    { id: "all", label: "Tüm Fiyatlar" },
    { id: "under-1500", label: "1.500 ₺ Altı" },
    { id: "1500-3000", label: "1.500 ₺ - 3.000 ₺" },
    { id: "over-3000", label: "3.000 ₺ Üzeri" },
  ];

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    onFilterChange({
      category: updated,
      size: selectedSizes,
      color: selectedColors,
      priceRange: selectedPrice,
    });
  };

  const handleSizeToggle = (size: string) => {
    if (size === "XXL") return; // Demo stok dışı
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updated);
    onFilterChange({
      category: selectedCategories,
      size: updated,
      color: selectedColors,
      priceRange: selectedPrice,
    });
  };

  const handleColorToggle = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updated);
    onFilterChange({
      category: selectedCategories,
      size: selectedSizes,
      color: updated,
      priceRange: selectedPrice,
    });
  };

  const handlePriceChange = (priceId: string) => {
    setSelectedPrice(priceId);
    onFilterChange({
      category: selectedCategories,
      size: selectedSizes,
      color: selectedColors,
      priceRange: priceId,
    });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrice("all");
    onFilterChange({});
  };

  const filterContent = (
    <div className="p-4 md:p-10 flex flex-col gap-10">
      {/* Category Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-label-mono text-xs uppercase border-b border-primary pb-2 text-primary font-bold">
          Kategori
        </h3>
        <div className="flex flex-col gap-3">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer hover:opacity-70 select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 text-primary border-primary rounded-none focus:ring-0 cursor-pointer accent-black"
                />
                <span className="font-body-md text-sm uppercase text-primary">
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-label-mono text-xs uppercase border-b border-primary pb-2 text-primary font-bold">
          Beden
        </h3>
        <div className="grid grid-cols-4 gap-1">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            const isUnavailable = size === "XXL";

            if (isUnavailable) {
              return (
                <button
                  key={size}
                  disabled
                  className="border border-outline-variant text-outline-variant p-2 flex items-center justify-center font-label-mono text-xs strike-through cursor-not-allowed bg-surface"
                >
                  {size}
                </button>
              );
            }

            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`border border-primary p-2 flex items-center justify-center font-label-mono text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary"
                    : "bg-surface hover:bg-primary hover:text-on-primary text-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-label-mono text-xs uppercase border-b border-primary pb-2 text-primary font-bold">
          Renk
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorToggle(color.name)}
                aria-label={color.name}
                style={{ backgroundColor: color.hex }}
                className={`w-8 h-8 border border-primary flex items-center justify-center cursor-pointer transition-transform ${
                  isSelected ? "ring-2 ring-primary ring-offset-2 scale-105" : "hover:opacity-80"
                }`}
              >
                {isSelected && (
                  <Check
                    className={`w-4 h-4 ${
                      color.name === "Beyaz" ? "text-black" : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col gap-4">
        <h3 className="font-label-mono text-xs uppercase border-b border-primary pb-2 text-primary font-bold">
          Fiyat Aralığı
        </h3>
        <div className="flex flex-col gap-3">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-3 cursor-pointer hover:opacity-70 select-none"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPrice === range.id}
                onChange={() => handlePriceChange(range.id)}
                className="h-4 w-4 text-primary border-primary focus:ring-0 cursor-pointer accent-black"
              />
              <span className="font-label-mono text-xs uppercase text-primary">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            setIsMobileOpen(false);
          }}
          className="w-full bg-primary text-on-primary font-label-mono text-xs h-14 uppercase tracking-widest hover:bg-surface-tint transition-colors cursor-pointer"
        >
          Filtreleri Uygula
        </button>
        <button
          type="button"
          onClick={handleClearAll}
          className="w-full bg-transparent text-primary font-label-mono text-xs h-14 uppercase tracking-widest border border-primary hover:bg-surface-variant transition-colors cursor-pointer"
        >
          Tümünü Temizle
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Trigger Bar */}
      <div className="md:hidden sticky top-16 z-30 bg-surface border-b border-primary p-4 flex justify-between items-center w-full">
        <span className="font-label-mono text-xs uppercase text-primary">
          Filtrele &amp; Sırala ({productCount} Ürün)
        </span>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center justify-center w-8 h-8 border border-primary cursor-pointer hover:bg-surface-variant"
        >
          <SlidersHorizontal className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50"
          />
          <div className="relative z-10 w-full max-w-sm h-full bg-surface border-r border-primary flex flex-col overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center p-4 border-b border-primary">
              <span className="font-headline-sm uppercase text-sm">Filtreler</span>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}

      {/* Desktop Sticky Aside */}
      <aside className="hidden md:block w-[320px] flex-shrink-0 border-r border-primary bg-surface sticky top-16 h-[calc(100vh-64px)] overflow-y-auto no-scrollbar left-0">
        {filterContent}
      </aside>
    </>
  );
}
