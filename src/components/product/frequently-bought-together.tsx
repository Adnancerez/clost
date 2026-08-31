"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function FrequentlyBoughtTogether({
  currentProduct,
  allProducts,
}: FrequentlyBoughtTogetherProps) {
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  // Find 1 smart complementary product
  const complementary =
    allProducts.find((p) => {
      if (p.id === currentProduct.id) return false;
      if (currentProduct.productType === "Üst Giyim" || currentProduct.productType === "Dış Giyim") {
        return p.productType === "Alt Giyim";
      }
      return p.productType === "Üst Giyim" || p.productType === "Dış Giyim";
    }) || allProducts.find((p) => p.id !== currentProduct.id) || allProducts[0];

  const [includeMain, setIncludeMain] = useState(true);
  const [includeComplementary, setIncludeComplementary] = useState(true);
  const [mainSize, setMainSize] = useState("M");
  const [compSize, setCompSize] = useState(
    complementary.productType === "Alt Giyim" ? "32" : "M"
  );
  const [isAdding, setIsAdding] = useState(false);

  const mainPrice = parseFloat(currentProduct.priceRange.minVariantPrice.amount);
  const compPrice = parseFloat(complementary.priceRange.minVariantPrice.amount);

  let rawTotal = 0;
  if (includeMain) rawTotal += mainPrice;
  if (includeComplementary) rawTotal += compPrice;

  // 10% discount if both are selected
  const isBundle = includeMain && includeComplementary;
  const discount = isBundle ? (rawTotal * 10) / 100 : 0;
  const finalTotal = rawTotal - discount;

  const handleAddToCart = () => {
    if (!includeMain && !includeComplementary) return;
    setIsAdding(true);

    if (includeMain) {
      const v = currentProduct.variants[0];
      addItem({
        productId: currentProduct.id,
        variantId: v.id,
        title: currentProduct.title,
        handle: currentProduct.handle,
        variantTitle: `${mainSize} / Siyah`,
        selectedOptions: [{ name: "Beden", value: mainSize }],
        price: mainPrice,
        image: currentProduct.featuredImage?.url || currentProduct.images[0]?.url,
        sku: v.sku || currentProduct.sku,
      });
    }

    if (includeComplementary) {
      const v = complementary.variants[0];
      addItem({
        productId: complementary.id,
        variantId: v.id,
        title: complementary.title,
        handle: complementary.handle,
        variantTitle: `${compSize} / Siyah`,
        selectedOptions: [{ name: "Beden", value: compSize }],
        price: compPrice,
        image: complementary.featuredImage?.url || complementary.images[0]?.url,
        sku: v.sku || complementary.sku,
      });
    }

    addToast({
      title: isBundle ? "Kombin Seti Sepete Eklendi (%10 İndirimli)" : "Ürün Sepete Eklendi",
      message: `${isBundle ? "2 Parça Set" : "1 Parça"} • Toplam: ${finalTotal.toLocaleString("tr-TR")} ₺`,
      type: "success",
      actionLabel: "Sepeti Gör",
      onAction: () => openCart(),
    });

    setTimeout(() => setIsAdding(false), 400);
  };

  return (
    <section className="p-4 sm:p-6 md:p-10 border-b border-primary bg-surface font-label-mono text-xs">
      <div className="border-b border-primary pb-4 mb-6">
        <span className="text-[10px] uppercase text-on-surface-variant block mb-1 font-bold">
          AKILLI SOKAK KOMBİNİ
        </span>
        <h2 className="font-headline-sm uppercase text-primary text-xl font-bold">
          BİRLİKTE HARİKA DURUR
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-low border border-primary p-6">
        {/* Products Visual Row */}
        <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-4">
          {/* Main Product Card */}
          <div className="flex items-center gap-4 border border-primary bg-surface p-3 flex-1 w-full">
            <input
              type="checkbox"
              checked={includeMain}
              onChange={(e) => setIncludeMain(e.target.checked)}
              className="w-4 h-4 accent-primary rounded-none cursor-pointer"
            />
            <div className="w-16 h-20 relative bg-surface-variant shrink-0 border border-outline-variant">
              <Image
                src={currentProduct.featuredImage?.url || currentProduct.images[0]?.url || ""}
                alt={currentProduct.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-bold text-primary truncate block uppercase">
                {currentProduct.title}
              </span>
              <span className="text-on-surface-variant text-[11px] block mt-0.5">
                {mainPrice.toLocaleString("tr-TR")} ₺
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] text-on-surface-variant uppercase">Beden:</span>
                <select
                  value={mainSize}
                  onChange={(e) => setMainSize(e.target.value)}
                  className="border border-primary bg-surface p-1 text-[10px] font-bold"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="shrink-0 p-2 border border-primary bg-surface flex items-center justify-center font-bold">
            <Plus className="w-4 h-4 text-primary" />
          </div>

          {/* Complementary Product Card */}
          <div className="flex items-center gap-4 border border-primary bg-surface p-3 flex-1 w-full">
            <input
              type="checkbox"
              checked={includeComplementary}
              onChange={(e) => setIncludeComplementary(e.target.checked)}
              className="w-4 h-4 accent-primary rounded-none cursor-pointer"
            />
            <div className="w-16 h-20 relative bg-surface-variant shrink-0 border border-outline-variant">
              <Image
                src={complementary.featuredImage?.url || complementary.images[0]?.url || ""}
                alt={complementary.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${complementary.handle}`}
                className="font-bold text-primary truncate block uppercase hover:underline"
              >
                {complementary.title}
              </Link>
              <span className="text-on-surface-variant text-[11px] block mt-0.5">
                {compPrice.toLocaleString("tr-TR")} ₺
              </span>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] text-on-surface-variant uppercase">Beden:</span>
                <select
                  value={compSize}
                  onChange={(e) => setCompSize(e.target.value)}
                  className="border border-primary bg-surface p-1 text-[10px] font-bold"
                >
                  {complementary.productType === "Alt Giyim" ? (
                    <>
                      <option value="30">30</option>
                      <option value="32">32</option>
                      <option value="34">34</option>
                      <option value="36">36</option>
                    </>
                  ) : (
                    <>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bundle Action Box */}
        <div className="lg:col-span-4 border border-primary bg-surface p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface-variant">Seçilen Parçalar:</span>
              <span className="font-bold text-primary">
                {(includeMain ? 1 : 0) + (includeComplementary ? 1 : 0)} Parça
              </span>
            </div>

            {isBundle && (
              <div className="flex justify-between items-center text-xs text-emerald-700 font-bold mt-1">
                <span>%10 Kombin İndirimi:</span>
                <span>-{discount.toLocaleString("tr-TR")} ₺</span>
              </div>
            )}

            <div className="border-t border-primary/20 pt-2 mt-2 flex justify-between items-baseline">
              <span className="font-bold uppercase text-primary">Toplam:</span>
              <span className="font-price-lg text-primary text-xl font-bold">
                {finalTotal.toLocaleString("tr-TR")} ₺
              </span>
            </div>
          </div>

          <button
            type="button"
            disabled={(!includeMain && !includeComplementary) || isAdding}
            onClick={handleAddToCart}
            className="w-full bg-primary text-on-primary h-12 flex items-center justify-center uppercase font-bold tracking-wider hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isBundle ? "İkiliyi Sepete Ekle (%10 İndirim)" : "Seçileni Sepete Ekle"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
