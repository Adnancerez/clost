"use client";

import React, { useState } from "react";
import { Check, SlidersHorizontal, X, RotateCcw } from "lucide-react";
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
  const [inStockOnly, setInStockOnly] = useState<boolean>(
    initialFilters.inStockOnly || false
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = ["Dış Giyim", "Üst Giyim", "Alt Giyim"];
  const upperSizes = ["S", "M", "L", "XL"];
  const lowerSizes = ["30", "32", "34", "36"];
  
  const colors = [
    { name: "Siyah", hex: "#000000", label: "Siyah" },
    { name: "Gri", hex: "#4A4A4A", label: "Kömür / Gri" },
    { name: "Beyaz", hex: "#ffffff", label: "Beyaz / Kemik" },
    { name: "Yeşil", hex: "#4d5b4a", label: "Zeytin / Haki" },
  ];

  const priceRanges = [
    { id: "all", label: "Tüm Fiyatlar" },
    { id: "under-1500", label: "1.500 ₺ Altı" },
    { id: "1500-3000", label: "1.500 ₺ - 3.000 ₺" },
    { id: "over-3000", label: "3.000 ₺ Üzeri" },
  ];

  const activeFiltersCount =
    selectedCategories.length +
    selectedSizes.length +
    selectedColors.length +
    (selectedPrice !== "all" ? 1 : 0) +
    (inStockOnly ? 1 : 0);

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
      inStockOnly,
    });
  };

  const handleSizeToggle = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updated);
    onFilterChange({
      category: selectedCategories,
      size: updated,
      color: selectedColors,
      priceRange: selectedPrice,
      inStockOnly,
    });
  };

  const handleColorToggle = (colorName: string) => {
    const updated = selectedColors.includes(colorName)
      ? selectedColors.filter((c) => c !== colorName)
      : [...selectedColors, colorName];
    setSelectedColors(updated);
    onFilterChange({
      category: selectedCategories,
      size: selectedSizes,
      color: updated,
      priceRange: selectedPrice,
      inStockOnly,
    });
  };

  const handlePriceChange = (priceId: string) => {
    setSelectedPrice(priceId);
    onFilterChange({
      category: selectedCategories,
      size: selectedSizes,
      color: selectedColors,
      priceRange: priceId,
      inStockOnly,
    });
  };

  const handleStockToggle = (checked: boolean) => {
    setInStockOnly(checked);
    onFilterChange({
      category: selectedCategories,
      size: selectedSizes,
      color: selectedColors,
      priceRange: selectedPrice,
      inStockOnly: checked,
    });
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrice("all");
    setInStockOnly(false);
    onFilterChange({});
  };

  const filterContent = (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      {/* Active Count & Clear Header */}
      <div className="flex justify-between items-center border-b border-primary pb-3 font-label-mono text-xs uppercase">
        <span className="font-bold text-primary">
          Filtreler {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </span>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-on-surface-variant hover:text-primary underline flex items-center gap-1 cursor-pointer text-[11px]"
          >
            <RotateCcw className="w-3 h-3" /> Sıfırla
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-mono text-xs uppercase text-primary font-bold">
          Kategori
        </h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((category) => {
            const isChecked = selectedCategories.includes(category);
            return (
              <label
                key={category}
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 select-none font-label-mono text-xs text-primary"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 border-primary rounded-none focus:ring-0 cursor-pointer accent-primary"
                />
                <span className="uppercase">{category}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-mono text-xs uppercase text-primary font-bold">
          Beden (Üst &amp; Dış Giyim)
        </h3>
        <div className="grid grid-cols-4 gap-1.5 font-label-mono text-xs">
          {upperSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-2 border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary border-primary font-bold"
                    : "bg-surface text-primary border-outline-variant hover:border-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        <h4 className="font-label-mono text-[11px] uppercase text-on-surface-variant font-bold mt-1">
          Pantolon / Bel Ölçüsü (Alt Giyim)
        </h4>
        <div className="grid grid-cols-4 gap-1.5 font-label-mono text-xs">
          {lowerSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => handleSizeToggle(size)}
                className={`py-2 border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-on-primary border-primary font-bold"
                    : "bg-surface text-primary border-outline-variant hover:border-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-mono text-xs uppercase text-primary font-bold">
          Renk Paleti
        </h3>
        <div className="flex flex-col gap-2">
          {colors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => handleColorToggle(color.name)}
                className={`p-2 border flex items-center justify-between font-label-mono text-xs uppercase transition-colors cursor-pointer ${
                  isSelected
                    ? "border-primary bg-surface-container-low font-bold"
                    : "border-outline-variant hover:border-primary bg-surface"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 border border-primary/40 inline-block"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col gap-3">
        <h3 className="font-label-mono text-xs uppercase text-primary font-bold">
          Fiyat Aralığı
        </h3>
        <div className="flex flex-col gap-2 font-label-mono text-xs">
          {priceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 select-none text-primary"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPrice === range.id}
                onChange={() => handlePriceChange(range.id)}
                className="h-4 w-4 border-primary focus:ring-0 cursor-pointer accent-primary"
              />
              <span className="uppercase">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Stock Availability Toggle */}
      <div className="border-t border-outline-variant pt-4">
        <label className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 select-none font-label-mono text-xs text-primary font-bold uppercase">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => handleStockToggle(e.target.checked)}
            className="h-4 w-4 border-primary rounded-none focus:ring-0 cursor-pointer accent-primary"
          />
          <span>Sadece Stoktaki Ürünler</span>
        </label>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          className="w-full bg-primary text-on-primary font-label-mono text-xs h-12 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer md:hidden font-bold"
        >
          {productCount} Ürünü Göster
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Trigger Bar */}
      <div className="md:hidden sticky top-24 z-30 bg-surface border-b border-primary p-3 flex justify-between items-center w-full">
        <span className="font-label-mono text-xs uppercase text-primary font-bold">
          Filtrele &amp; Sırala ({productCount} Ürün)
        </span>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-primary bg-primary text-on-primary font-label-mono text-xs uppercase cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtrele</span>
        </button>
      </div>

      {/* Mobile Filter Slide-out Modal */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px]"
          />
          <div className="relative z-10 w-full max-w-xs h-full bg-surface border-r border-primary flex flex-col overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-primary">
              <span className="font-headline-sm uppercase text-sm font-bold">Filtreler</span>
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
      <aside className="hidden md:block w-[280px] lg:w-[300px] flex-shrink-0 border-r border-primary bg-surface sticky top-24 h-[calc(100vh-96px)] overflow-y-auto no-scrollbar left-0">
        {filterContent}
      </aside>
    </>
  );
}
