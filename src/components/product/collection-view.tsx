"use client";

import React, { useState, useMemo } from "react";
import { Product, Collection, FilterOptions } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";
import { FilterSidebar } from "./filter-sidebar";

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
  const [visibleCount, setVisibleCount] = useState<number>(6);

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

    // Size filter
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
        )
      );
    }

    // Color filter
    if (filters.color && filters.color.length > 0) {
      result = result.filter((p) =>
        p.variants.some((v) =>
          v.selectedOptions.some(
            (opt) =>
              (opt.name.toLowerCase() === "renk" || opt.name.toLowerCase() === "color") &&
              filters.color?.some(
                (c) => c.toLowerCase() === opt.value.toLowerCase()
              )
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
    }

    return result;
  }, [initialProducts, filters, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1920px] mx-auto">
      {/* Sidebar Filter (Sticky Desktop / Modal Mobile) */}
      <FilterSidebar
        initialFilters={filters}
        onFilterChange={setFilters}
        productCount={filteredProducts.length}
      />

      {/* Product Catalog Grid */}
      <section className="flex-grow p-4 md:p-10">
        {/* Catalog Header */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-primary pb-6">
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
              {collection.title}
            </h1>
            <p className="font-body-md text-on-surface-variant mt-2 text-xs md:text-sm">
              {filteredProducts.length} ÜRÜN / SONBAHAR &apos;24
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              Sırala:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-b border-primary bg-transparent font-label-mono text-xs uppercase py-1 pr-6 focus:ring-0 cursor-pointer appearance-none rounded-none text-primary"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-low">Fiyat: Düşükten Yükseğe</option>
              <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>
        </header>

        {/* Product Cards */}
        {displayedProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-label-mono uppercase text-on-surface-variant text-xs">
              Seçilen filtrelere uygun ürün bulunamadı.
            </p>
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

        {/* Load More Button */}
        {visibleCount < filteredProducts.length && (
          <div className="mt-16 flex justify-center border-t border-primary pt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="border border-primary px-12 py-4 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
            >
              Daha Fazla Ürün Göster
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
