"use client";

import React from "react";
import Link from "next/link";
import { Truck, Printer, RefreshCw } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useToastStore } from "@/lib/store/useToastStore";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";
import { playAddCartSound, playClickSound } from "@/lib/audio/sound-effects";

export interface OrderItem {
  id: string;
  date: string;
  total: number;
  status: string;
  tracking: string;
  items: string;
  isDelivered?: boolean;
}

export interface OrdersTabProps {
  orders: OrderItem[];
  onOpenInvoice: (order: OrderItem) => void;
}

export function OrdersTab({ orders, onOpenInvoice }: OrdersTabProps) {
  const { addItem, openCart } = useCartStore();
  const { addToast } = useToastStore();

  const handleReorder = (order: OrderItem) => {
    playAddCartSound();
    const product = MOCK_PRODUCTS[0];
    if (product && product.variants[0]) {
      const v = product.variants[0];
      addItem({
        productId: product.id,
        variantId: v.id,
        title: product.title,
        handle: product.handle,
        variantTitle: "M / Siyah",
        selectedOptions: v.selectedOptions,
        price: parseFloat(v.price.amount),
        image: product.featuredImage?.url || product.images[0]?.url,
        sku: v.sku || product.sku,
      });

      addToast({
        title: "Sipariş Sepete Eklendi",
        message: `${order.id} siparişindeki parçalar sepete aktarıldı.`,
        type: "success",
      });

      openCart();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-headline-sm uppercase text-primary text-base border-b border-outline-variant pb-2">
        Geçmiş Siparişlerim ({orders.length})
      </h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-primary p-5 bg-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary transition-colors"
          >
            <div className="flex flex-col gap-1 font-label-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{order.id}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                    order.isDelivered
                      ? "bg-primary text-on-primary"
                      : "bg-surface-variant text-primary border border-primary"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <span className="text-on-surface-variant">Tarih: {order.date}</span>
              <span className="text-primary font-bold">{order.items}</span>
              <span className="text-on-surface-variant text-[11px]">
                Takip No: {order.tracking}
              </span>
            </div>

            <div className="flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-outline-variant">
              <span className="font-price-lg text-lg font-bold text-primary">
                {order.total.toLocaleString("tr-TR")} ₺
              </span>

              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/kargo-takip?trackCode=${order.tracking}`}
                  onClick={playClickSound}
                  className="bg-surface hover:bg-surface-variant border border-primary px-3 py-1.5 font-label-mono text-[11px] uppercase flex items-center gap-1 text-primary transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" /> Kargo Takip
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    onOpenInvoice(order);
                  }}
                  className="bg-surface hover:bg-surface-variant border border-primary px-3 py-1.5 font-label-mono text-[11px] uppercase flex items-center gap-1 text-primary transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> E-Fatura
                </button>

                <button
                  type="button"
                  onClick={() => handleReorder(order)}
                  className="bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary px-3 py-1.5 font-label-mono text-[11px] uppercase flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Tekrar Sipariş Ver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
