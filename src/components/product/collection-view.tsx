"use client";

import React, { useState, useMemo } from "react";
import { Product, Collection, FilterOptions } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";
import { FilterSidebar } from "./filter-sidebar";
import { X, ArrowUpDown } from "lucide-react";

export interface CollectionViewProps {
  collection: Collection;
  initialProducts: Product[];
}

export function CollectionView({
  collection,
  initialProducts,
}: CollectionViewProps) {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<string>("newest");
  const [visibleCount, setVisibleCount] = useState<number>(9);

  // Match color families
  const matchesColorFamily = (optionValue: string, requestedColor: string): boolean => {
    const val = optionValue.toLowerCase();
    const req = requestedColor.toLowerCase();

    if (req === "sarı") {
      return val.includes("sarı") || val.includes("yellow") || val.includes("volt");
    }
    if (req === "mor") {
      return val.includes("mor") || val.includes("purple") || val.includes("asit");
    }
    if (req === "turuncu") {
      return val.includes("turuncu") || val.includes("orange") || val.includes("siber");
    }
    if (req === "mavi") {
      return val.includes("mavi") || val.includes("blue") || val.includes("yeşil");
    }
    if (req === "lacivert") {
      return val.includes("lacivert") || val.includes("indigo") || val.includes("raw");
    }
    return val.includes(req);
  };

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Category filter
    if (filters.category && filters.category.length > 0) {
      result = result.filter(
        (p) =>
          p.productType &&
          filters.category?.some(
            (c) => c.toLowerCase() === p.productType?.toLowerCase()
          )
      );
    }

    // Size filter (Matches S/M/L/XL or 30/32/34/36)
    if (filters.size && filters.size.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) =>
          v.selectedOptions.some(
            (opt) =>
              (opt.name.toLowerCase() === "beden" || opt.name.toLowerCase() === "size") &&
              filters.size?.some(
                (s) => s.toLowerCase() === opt.value.toLowerCase()
              )
          )
        ) ||
        p.options.some((opt) =>
          (opt.name.toLowerCase() === "beden" || opt.name.toLowerCase() === "size") &&
          opt.values.some((val) =>
            filters.size?.some((s) => s.toLowerCase() === val.toLowerCase())
          )
        )
      );
    }

    // Color filter with family matching
    if (filters.color && filters.color.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) =>
          v.selectedOptions.some(
            (opt) =>
              (opt.name.toLowerCase() === "renk" || opt.name.toLowerCase() === "color") &&
              filters.color?.some((c) => matchesColorFamily(opt.value, c))
          )
        ) ||
        p.options.some((opt) =>
          (opt.name.toLowerCase() === "renk" || opt.name.toLowerCase() === "color") &&
          opt.values.some((val) =>
            filters.color?.some((c) => matchesColorFamily(val, c))
          )
        )
      );
    }

    // Price filter
    if (filters.priceRange && filters.priceRange !== "all") {
      if (filters.priceRange === "under-1500") {
        result = result.filter(
          (p) => parseFloat(p.priceRange.minVariantPrice.amount) < 1500
        );
      } else if (filters.priceRange === "1500-3000") {
        result = result.filter((p) => {
          const price = parseFloat(p.priceRange.minVariantPrice.amount);
          return price >= 1500 && price <= 3000;
        });
      } else if (filters.priceRange === "over-3000") {
        result = result.filter(
          (p) => parseFloat(p.priceRange.minVariantPrice.amount) > 3000
        );
      }
    }

    // In Stock filter
    if (filters.inStockOnly) {
      result = result.filter(
        (p) => p.availableForSale && p.variants.some((v) => v.availableForSale)
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.title.localeCompare(b.title, "tr"));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.title.localeCompare(a.title, "tr"));
    }

    return result;
  }, [initialProducts, filters, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Active filter removals
  const removeCategory = (cat: string) => {
    const updated = (filters.category || []).filter((c) => c !== cat);
    setFilters({ ...filters, category: updated });
  };

  const removeSize = (sz: string) => {
    const updated = (filters.size || []).filter((s) => s !== sz);
    setFilters({ ...filters, size: updated });
  };

  const removeColor = (col: string) => {
    const updated = (filters.color || []).filter((c) => c !== col);
    setFilters({ ...filters, color: updated });
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const hasActiveFilters =
    (filters.category && filters.category.length > 0) ||
    (filters.size && filters.size.length > 0) ||
    (filters.color && filters.color.length > 0) ||
    (filters.priceRange && filters.priceRange !== "all") ||
    filters.inStockOnly;

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1920px] mx-auto min-h-screen">
      {/* Sidebar Filter (Sticky Desktop / Slide-out Mobile) */}
      <FilterSidebar
        initialFilters={filters}
        onFilterChange={setFilters}
        productCount={filteredProducts.length}
      />

      {/* Product Catalog Grid */}
      <section className="flex-grow p-4 md:p-10 flex flex-col justify-between">
        <div>
          {/* Catalog Header */}
          <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-primary pb-6">
            <div>
              <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block mb-1 font-bold">
                KATALOG GÖRÜNÜMÜ // SUMMER &apos;24
              </span>
              <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
                {collection.title}
              </h1>
              <p className="font-label-mono text-on-surface-variant mt-1 text-xs">
                {filteredProducts.length} ÜRÜN LİSTELENİYOR
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 border border-primary p-2 bg-surface">
              <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
              <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                Sırala:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-label-mono text-xs uppercase focus:outline-none cursor-pointer text-primary pr-2 font-bold"
              >
                <option value="newest">En Yeniler (Varsayılan)</option>
                <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                <option value="name-asc">İsim: A - Z</option>
                <option value="name-desc">İsim: Z - A</option>
              </select>
            </div>
          </header>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="mb-6 p-3 bg-surface-container-low border border-primary/40 flex flex-wrap items-center gap-2 font-label-mono text-xs">
              <span className="text-on-surface-variant uppercase text-[10px] font-bold mr-1">
                AKTİF FİLTRELER:
              </span>

              {filters.category?.map((cat) => (
                <button
                  key={cat}
                  onClick={() => removeCategory(cat)}
                  className="bg-primary text-on-primary px-2.5 py-1 text-[11px] uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Kategori: {cat}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.size?.map((sz) => (
                <button
                  key={sz}
                  onClick={() => removeSize(sz)}
                  className="bg-primary text-on-primary px-2.5 py-1 text-[11px] uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Beden: {sz}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.color?.map((col) => (
                <button
                  key={col}
                  onClick={() => removeColor(col)}
                  className="bg-primary text-on-primary px-2.5 py-1 text-[11px] uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Renk: {col}</span>
                  <X className="w-3 h-3" />
                </button>
              ))}

              {filters.priceRange && filters.priceRange !== "all" && (
                <button
                  onClick={() => setFilters({ ...filters, priceRange: "all" })}
                  className="bg-primary text-on-primary px-2.5 py-1 text-[11px] uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Fiyat: {filters.priceRange}</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              {filters.inStockOnly && (
                <button
                  onClick={() => setFilters({ ...filters, inStockOnly: false })}
                  className="bg-primary text-on-primary px-2.5 py-1 text-[11px] uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  <span>Sadece Stoktaki</span>
                  <X className="w-3 h-3" />
                </button>
              )}

              <button
                onClick={clearAllFilters}
                className="text-red-600 underline text-[11px] uppercase ml-auto hover:opacity-75 cursor-pointer font-bold"
              >
                Tümünü Temizle
              </button>
            </div>
          )}

          {/* Product Cards */}
          {displayedProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-primary p-8 bg-surface">
              <p className="font-headline-sm uppercase text-primary text-base">
                Seçilen filtrelere uygun parça bulunamadı.
              </p>
              <p className="font-label-mono text-xs text-on-surface-variant mt-2">
                Farklı bir beden, renk veya kategori seçmeyi deneyebilir veya filtreleri sıfırlayabilirsiniz.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="mt-6 bg-primary text-on-primary font-label-mono text-xs px-6 py-3 uppercase tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {displayedProducts.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={idx < 3}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-16 flex justify-center border-t border-primary pt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="border border-primary px-12 py-4 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer font-bold"
            >
              Daha Fazla Ürün Göster ({filteredProducts.length - visibleCount} Kalan)
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
