"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, X } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { playClickSound } from "@/lib/audio/sound-effects";

const emptySubscribe = () => () => {};

export function CartDrawer() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const {
    isOpen,
    closeCart,
    items,
    removeItem,
    updateQuantity,
    getTotalQuantity,
    getSubtotal,
    getFreeShippingRemaining,
    getFreeShippingProgress,
  } = useCartStore();
  const { addToast } = useToastStore();

  // Prevent background body scroll when drawer is open
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

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isMounted) return null;

  const totalQuantity = getTotalQuantity();
  const subtotal = getSubtotal();
  const remaining = getFreeShippingRemaining();
  const progress = getFreeShippingProgress();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Container (Smooth Slide-In from Right) */}
      <div
        className={`relative z-10 w-full max-w-md h-full bg-surface border-l border-primary flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-primary bg-surface">
          <h2 className="font-headline-sm uppercase tracking-tighter text-primary">
            Sepet ({totalQuantity})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Sepeti kapat"
            className="p-1 text-primary hover:bg-surface-variant transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-surface-variant border-b border-primary p-4 text-center">
          <p className="font-label-mono text-on-surface-variant text-xs">
            {remaining > 0 ? (
              <>
                Ücretsiz kargo için{" "}
                <span className="font-bold text-primary">
                  {remaining.toLocaleString("tr-TR")} ₺
                </span>{" "}
                daha ürün ekleyin
              </>
            ) : (
              <span className="font-bold text-primary">
                ✓ Tüm Türkiye&apos;ye ücretsiz kargo hakkı kazandınız!
              </span>
            )}
          </p>
          <div className="w-full h-1.5 bg-surface-container-highest mt-2">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center gap-4">
              <p className="font-label-mono uppercase text-on-surface-variant text-xs">
                Alışveriş sepetiniz şu an boş.
              </p>
              <button
                onClick={closeCart}
                className="bg-primary text-on-primary font-label-mono text-xs px-6 py-3 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.variantId}
                className="flex gap-4 border border-outline-variant p-2.5 bg-surface"
              >
                {/* Thumbnail */}
                <div className="w-24 h-32 flex-shrink-0 bg-surface-variant border-r border-outline-variant relative overflow-hidden">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover grayscale"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-label-mono text-xs text-outline">
                      GÖRSEL YOK
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between py-1 pr-1">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="font-body-md font-bold uppercase hover:underline text-primary text-sm line-clamp-1"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => {
                          playClickSound();
                          removeItem(item.variantId);
                          addToast({
                            title: "Ürün Sepetten Çıkarıldı",
                            message: `${item.title} (${item.variantTitle}) sepetten kaldırıldı.`,
                            type: "info",
                          });
                        }}
                        aria-label="Ürünü sil"
                        className="text-outline hover:text-primary transition-colors cursor-pointer p-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="font-label-mono text-on-surface-variant text-xs mt-1">
                      {item.variantTitle}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <p className="font-price-lg text-primary text-base">
                      {item.price.toLocaleString("tr-TR")} ₺
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center border border-primary h-8">
                      <button
                        onClick={() => {
                          playClickSound();
                          updateQuantity(item.variantId, item.quantity - 1);
                        }}
                        className="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer font-label-mono"
                      >
                        -
                      </button>
                      <span className="font-label-mono text-xs w-8 text-center border-l border-r border-primary flex items-center justify-center h-full">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playClickSound();
                          updateQuantity(item.variantId, item.quantity + 1);
                        }}
                        className="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer font-label-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="border-t border-primary p-4 bg-surface">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body-lg uppercase font-bold text-primary text-base">
                Ara Toplam
              </span>
              <span className="font-price-lg text-primary text-lg">
                {subtotal.toLocaleString("tr-TR")} ₺
              </span>
            </div>
            <p className="font-label-mono text-on-surface-variant mb-4 text-xs">
              Kargo ve vergiler ödeme adımında hesaplanır.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs"
            >
              Siparişi Tamamla <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
