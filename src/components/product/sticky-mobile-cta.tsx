"use client";

import React, { useState } from "react";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";

export interface StickyMobileCTAProps {
  product: Product;
}

export function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { addItem } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const defaultVariant = product.variants[0];

  const handleAdd = () => {
    if (!defaultVariant?.availableForSale) return;

    setIsAdding(true);
    addItem({
      productId: product.id,
      variantId: defaultVariant.id,
      title: product.title,
      handle: product.handle,
      variantTitle: defaultVariant.title,
      selectedOptions: defaultVariant.selectedOptions,
      price: price,
      image: product.featuredImage?.url || product.images[0]?.url,
      sku: defaultVariant.sku || product.sku,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 400);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-primary p-4 flex items-center justify-between gap-4 shadow-lg">
      <div className="flex flex-col">
        <span className="font-label-mono text-xs uppercase text-on-surface-variant truncate max-w-[150px]">
          {product.title}
        </span>
        <span className="font-price-lg text-primary text-sm">
          {price.toLocaleString("tr-TR")} ₺
        </span>
      </div>

      <button
        onClick={handleAdd}
        disabled={isAdding || !product.availableForSale}
        className="flex-1 bg-primary text-on-primary h-12 flex items-center justify-center font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50"
      >
        {isAdding
          ? "Ekleniyor..."
          : product.availableForSale
          ? "Sepete Ekle"
          : "Tükendi"}
      </button>
    </div>
  );
}
