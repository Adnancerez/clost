"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";

export interface ShopTheLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  lookTitle: string;
  products: Product[];
}

export function ShopTheLookModal({
  isOpen,
  onClose,
  lookTitle,
  products,
}: ShopTheLookModalProps) {
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      const sizeOpt = p.options.find(
        (o) => o.name.toLowerCase() === "beden" || o.name.toLowerCase() === "size"
      );
      initial[p.id] = sizeOpt?.values[0] || "M";
    });
    return initial;
  });

  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  const rawTotal = products.reduce(
    (acc, p) => acc + parseFloat(p.priceRange.minVariantPrice.amount),
    0
  );

  const bundleDiscount = (rawTotal * 10) / 100; // %10 set indirimi
  const finalTotal = rawTotal - bundleDiscount;

  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddAllToCart = () => {
    setIsAdding(true);

    products.forEach((product) => {
      const size = selectedSizes[product.id] || "M";
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
      title: "Lookbook Seti Sepete Eklendi",
      message: `${lookTitle} (${products.length} Parça • %10 İndirimli: ${finalTotal.toLocaleString("tr-TR")} ₺)`,
      type: "success",
      actionLabel: "Sepeti Gör",
      onAction: () => openCart(),
    });

    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-surface border border-primary p-6 md:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-primary pb-4">
          <div>
            <span className="font-label-mono text-xs uppercase text-on-surface-variant block">
              EDİTORYAL STİL SETİ
            </span>
            <h2 className="font-headline-sm uppercase text-primary mt-0.5">
              {lookTitle}
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-variant cursor-pointer border border-transparent hover:border-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Items List */}
        <div className="flex flex-col gap-4 divide-y divide-outline-variant">
          {products.map((product) => {
            const sizeOption = product.options.find(
              (opt) => opt.name.toLowerCase() === "beden" || opt.name.toLowerCase() === "size"
            );
            const sizes = sizeOption?.values || ["S", "M", "L", "XL"];
            const currentSize = selectedSizes[product.id] || "M";

            return (
              <div key={product.id} className="flex gap-4 pt-4 first:pt-0">
                <div className="w-20 h-24 flex-shrink-0 bg-surface-variant border border-outline-variant relative overflow-hidden">
                  <Image
                    src={product.featuredImage?.url || product.images[0]?.url || ""}
                    alt={product.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-body-md font-bold uppercase text-primary text-sm line-clamp-1">
                      {product.title}
                    </h3>
                    <span className="font-price-lg text-sm text-primary mt-1 block">
                      {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                    </span>
                  </div>

                  {/* Size Selector for this item */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-label-mono text-xs text-on-surface-variant uppercase">
                      Beden:
                    </span>
                    <div className="flex gap-1">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSizeChange(product.id, s)}
                          className={`w-8 h-8 border border-primary font-label-mono text-xs cursor-pointer transition-colors ${
                            currentSize === s
                              ? "bg-primary text-on-primary font-bold"
                              : "bg-surface text-primary hover:bg-surface-variant"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle Summary & Action */}
        <div className="border-t border-primary pt-6 flex flex-col gap-4 bg-surface-container-low p-4">
          <div className="flex justify-between items-center font-label-mono text-xs">
            <span className="text-on-surface-variant">Set Parça Sayısı:</span>
            <span className="font-bold text-primary">{products.length} Parça</span>
          </div>
          <div className="flex justify-between items-center font-label-mono text-xs text-primary">
            <span className="font-bold">%10 Set İndirimi:</span>
            <span>-{bundleDiscount.toLocaleString("tr-TR")} ₺</span>
          </div>
          <div className="flex justify-between items-baseline border-t border-outline-variant pt-2">
            <span className="font-body-lg uppercase font-bold text-primary text-sm">
              Set Toplamı:
            </span>
            <span className="font-price-lg text-primary text-xl font-bold">
              {finalTotal.toLocaleString("tr-TR")} ₺
            </span>
          </div>

          <button
            type="button"
            disabled={isAdding}
            onClick={handleAddAllToCart}
            className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs gap-2 font-bold"
          >
            {isAdding ? (
              "Set Sepete Ekleniyor..."
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Tüm Seti Sepete Ekle ({products.length} Parça)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
