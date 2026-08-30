"use client";

import React, { useState, useEffect, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight, History, Plus } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { playClickSound, playAddCartSound } from "@/lib/audio/sound-effects";

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptySubscribe = () => () => {};

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("clost_recent_searches");
        if (stored) {
          return JSON.parse(stored);
        }
      } catch {
        // ignore JSON parse error
      }
    }
    return [];
  });
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter((t) => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
    setRecentSearches(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("clost_recent_searches", JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("clost_recent_searches");
    }
  };

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return MOCK_PRODUCTS.filter(
      (product) =>
        product.title.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.productType?.toLowerCase().includes(q) ||
        product.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const popularTags = ["Parka", "Kargo", "Denim", "Hoodie", "Dış Giyim", "Yelek"];

  const handleQuickAdd = (product: typeof MOCK_PRODUCTS[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playAddCartSound();

    const firstVariant = product.variants[0];
    const size = firstVariant?.selectedOptions.find((o) => o.name.toLowerCase() === "beden")?.value || "M";
    const color = firstVariant?.selectedOptions.find((o) => o.name.toLowerCase() === "renk")?.value || "Siyah";

    addItem({
      productId: product.id,
      variantId: firstVariant?.id || `${product.id}-default`,
      title: product.title,
      handle: product.handle,
      variantTitle: `${size} / ${color}`,
      selectedOptions: [
        { name: "Beden", value: size },
        { name: "Renk", value: color },
      ],
      price: parseFloat(firstVariant?.price.amount || product.priceRange.minVariantPrice.amount),
      image: product.featuredImage?.url || product.images[0]?.url,
      sku: firstVariant?.sku || product.sku,
    });

    addToast({
      title: "Hızlı Sepete Eklendi",
      message: `${product.title} (${size}) sepete eklendi.`,
      type: "success",
      actionLabel: "Sepeti Aç",
      onAction: () => openCart(),
    });
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mt-16 bg-surface border border-primary shadow-2xl flex flex-col max-h-[85vh] animate-in slide-in-from-top-4">
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-5 border-b border-primary gap-4">
          <Search className="w-6 h-6 text-primary flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                saveRecentSearch(query);
              }
            }}
            placeholder="ARŞİVDE ARA (PARKA, KARGO, HOODIE, DENIM)..."
            className="w-full bg-transparent border-none focus:outline-none font-label-mono text-sm md:text-base text-primary placeholder-on-surface-variant uppercase tracking-wider"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="font-label-mono text-xs text-on-surface-variant hover:text-primary uppercase cursor-pointer mr-2"
            >
              Temizle
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Aramayı kapat"
            className="p-1 text-primary hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Tags and Recent Searches */}
        {!query && (
          <div className="p-6 border-b border-outline-variant bg-surface-container-low flex flex-col gap-4">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-label-mono text-xs uppercase text-on-surface-variant flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> Son Aramalar:
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="font-label-mono text-[10px] uppercase text-outline hover:text-primary underline cursor-pointer"
                  >
                    Temizle
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        playClickSound();
                        setQuery(term);
                      }}
                      className="font-label-mono text-xs uppercase px-3 py-1.5 border border-outline-variant bg-surface hover:border-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
                Popüler Aramalar:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      playClickSound();
                      setQuery(tag);
                      saveRecentSearch(tag);
                    }}
                    className="font-label-mono text-xs uppercase px-3 py-1.5 border border-primary bg-surface hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6">
          {query ? (
            searchResults.length > 0 ? (
              <div className="flex flex-col gap-4">
                <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                  {searchResults.length} Ürün Bulundu
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 border border-primary p-3 bg-surface hover:bg-surface-variant transition-colors group relative"
                    >
                      <Link
                        href={`/products/${product.handle}`}
                        onClick={() => {
                          saveRecentSearch(query);
                          onClose();
                        }}
                        className="w-20 h-24 flex-shrink-0 bg-surface-variant relative overflow-hidden border border-outline-variant"
                      >
                        <Image
                          src={product.featuredImage?.url || product.images[0]?.url || ""}
                          alt={product.title}
                          fill
                          sizes="80px"
                          className="object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between py-1">
                        <Link
                          href={`/products/${product.handle}`}
                          onClick={() => {
                            saveRecentSearch(query);
                            onClose();
                          }}
                        >
                          <h4 className="font-body-md font-bold uppercase text-primary line-clamp-1 text-sm hover:underline">
                            {product.title}
                          </h4>
                          <p className="font-label-mono text-xs text-on-surface-variant mt-1">
                            {product.productType || "Fonksiyonel"} / {product.sku || "VA-ARCHIVE"}
                          </p>
                        </Link>

                        <div className="flex justify-between items-center mt-2">
                          <span className="font-price-lg text-primary text-sm font-bold">
                            {parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString("tr-TR")} ₺
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleQuickAdd(product, e)}
                              title="Hızlı Sepete Ekle"
                              className="p-1.5 bg-primary text-on-primary hover:bg-surface hover:text-primary border border-primary transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <Link
                              href={`/products/${product.handle}`}
                              onClick={() => {
                                saveRecentSearch(query);
                                onClose();
                              }}
                              className="font-label-mono text-xs text-primary flex items-center group-hover:translate-x-1 transition-transform uppercase"
                            >
                              İncele <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-label-mono uppercase text-on-surface-variant text-sm">
                  &quot;{query}&quot; aramasına uygun ürün bulunamadı.
                </p>
              </div>
            )
          ) : (
            <div className="py-12 text-center text-on-surface-variant font-label-mono text-xs uppercase tracking-widest">
              Yukarıdan aramak istediğiniz anahtar kelimeyi girin veya popüler etiketlere tıklayın.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
