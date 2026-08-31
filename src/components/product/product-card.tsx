"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowLeftRight } from "lucide-react";
import { Product } from "@/lib/shopify/types";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { useCompareStore } from "@/lib/store/useCompareStore";

const emptySubscribe = () => () => {};

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { toggleCompare, isInCompare } = useCompareStore();

  const isFavorite = isMounted ? isInWishlist(product.id) : false;
  const inCompare = isMounted ? isInCompare(product.id) : false;
  const isNew = product.tags?.includes("Yeni") || product.tags?.includes("New");
  const isLowStock = product.tags?.includes("Stok Az") || product.tags?.includes("Low Stock");
  const imageUrl =
    product.featuredImage?.url ||
    product.images[0]?.url ||
    "/products/cyber-neon-rugby-polo-1.jpg";

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  return (
    <article className="group flex flex-col gap-2 relative select-none">
      <Link
        href={`/products/${product.handle}`}
        className="relative w-full aspect-4-5 border border-outline-variant overflow-hidden bg-surface-variant block"
      >
        {/* Primary Image */}
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${
            product.images?.[1] ? "group-hover:opacity-0 group-hover:scale-105" : "group-hover:scale-105"
          }`}
        />

        {/* Secondary Angle on Hover (Cross-fade) */}
        {product.images?.[1] && (
          <Image
            src={product.images[1].url}
            alt={`${product.title} - Detay Görünüm`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 pointer-events-none"
          />
        )}

        {/* Badges */}
        {isNew && (
          <div className="absolute top-4 left-4 bg-surface px-3 py-1 font-label-mono text-[10px] text-primary">
            Yeni
          </div>
        )}
        {isLowStock && (
          <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 font-label-mono text-[10px]">
            Son Parçalar
          </div>
        )}

        {/* Top Right Action Icons: Wishlist & Compare */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
            className={`w-9 h-9 border border-outline-variant flex items-center justify-center transition-colors cursor-pointer ${
              isFavorite
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface text-primary hover:bg-surface-variant"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-white text-white" : "text-primary"}`}
            />
          </button>

          <button
            type="button"
            onClick={handleCompareClick}
            aria-label={inCompare ? "Karşılaştırmadan çıkar" : "Karşılaştırmaya ekle"}
            className={`w-9 h-9 border border-outline-variant flex items-center justify-center transition-colors cursor-pointer ${
              inCompare
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface text-primary hover:bg-surface-variant"
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </Link>

      {/* Product Card Details */}
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col">
          <Link
            href={`/products/${product.handle}`}
            className="font-body-md tracking-tight text-primary hover:opacity-60 transition-opacity text-sm line-clamp-1"
          >
            {product.title}
          </Link>
          <p className="font-label-mono text-on-surface-variant text-[11px] mt-0.5">
            {product.options.find(
              (o) => o.name.toLowerCase() === "renk" || o.name.toLowerCase() === "color"
            )?.values[0] || "Siyah"}{" "}
            / {product.productType || "Fonksiyonel"}
          </p>
        </div>
        <span className="font-price-lg text-primary text-base">
          {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
        </span>
      </div>
    </article>
  );
}
