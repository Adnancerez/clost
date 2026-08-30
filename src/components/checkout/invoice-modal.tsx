"use client";

import React from "react";
import { X, Printer, FileText } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  orderDate?: string;
  customerName?: string;
  customerAddress?: string;
  customerCity?: string;
  items: InvoiceItem[];
  totalAmount: number;
  paymentMethod?: string;
}

export function InvoiceModal({
  isOpen,
  onClose,
  orderNumber,
  orderDate = "30.08.2026",
  customerName = "Caner Kaya",
  customerAddress = "Levent Mah. Cömert Sok. No: 12 Kat: 3",
  customerCity = "Beşiktaş / İstanbul",
  items,
  totalAmount,
  paymentMethod = "Kredi Kartı / Tek Çekim",
}: InvoiceModalProps) {
  if (!isOpen) return null;

  const kdvRate = 0.2; // %20 KDV
  const matrah = totalAmount / (1 + kdvRate);
  const kdvAmount = totalAmount - matrah;

  const handlePrint = () => {
    playClickSound();
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-[2px] animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-3xl bg-surface border-2 border-primary p-6 md:p-10 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Modal Actions */}
        <div className="flex justify-between items-center border-b border-primary pb-4">
          <div className="flex items-center gap-2 font-label-mono text-xs text-primary font-bold uppercase">
            <FileText className="w-4 h-4" />
            <span>RESMİ E-ARŞİV FATURA GÖRÜNÜMÜ</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-primary text-on-primary font-label-mono text-xs px-4 py-2 uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Yazdır / PDF İndir
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-surface-variant cursor-pointer text-primary">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="border border-primary p-6 md:p-8 bg-surface-container-low flex flex-col gap-6 font-label-mono text-xs text-primary">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-primary pb-6 gap-4">
            <div>
              <h2 className="font-headline-sm uppercase tracking-tighter text-xl">
                CLOST TEKSTİL A.Ş.
              </h2>
              <span className="text-[11px] text-on-surface-variant block mt-0.5">
                Maslak V.D. 9283019284 | MERSİS: 0928301928400001
              </span>
              <span className="text-[11px] text-on-surface-variant block">
                Levent Mah. Cömert Sok. No: 12, Beşiktaş / İstanbul
              </span>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 border-outline-variant pt-2 sm:pt-0 w-full sm:w-auto">
              <span className="font-bold text-sm uppercase bg-primary text-on-primary px-2.5 py-1 inline-block">
                E-ARŞİV FATURA
              </span>
              <span className="block text-[11px] mt-2">
                Fatura No: <strong className="font-bold">EAR{orderNumber.replace(/[^0-9]/g, "") || "2026000094218"}</strong>
              </span>
              <span className="block text-[11px] text-on-surface-variant">
                Tarih: {orderDate} / 01:55:00
              </span>
            </div>
          </div>

          {/* Customer / Consignee Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-primary pb-6 text-xs">
            <div>
              <span className="font-bold uppercase text-on-surface-variant block mb-1">
                SAYIN (ALICI):
              </span>
              <span className="font-bold text-primary block uppercase">{customerName}</span>
              <span className="text-on-surface-variant block mt-0.5">{customerAddress}</span>
              <span className="text-on-surface-variant block">{customerCity}</span>
            </div>

            <div className="sm:text-right">
              <span className="font-bold uppercase text-on-surface-variant block mb-1">
                SİPARİŞ VE ÖDEME:
              </span>
              <span className="block">Sipariş No: <strong className="font-bold">{orderNumber}</strong></span>
              <span className="block text-on-surface-variant mt-0.5">Ödeme Tipi: {paymentMethod}</span>
              <span className="block text-on-surface-variant">Para Birimi: TRY (₺)</span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-primary text-[10px] uppercase text-on-surface-variant">
                  <th className="py-2">No</th>
                  <th className="py-2">Ürün / Hizmet Açıklaması</th>
                  <th className="py-2 text-center">Adet</th>
                  <th className="py-2 text-right">Birim Fiyat</th>
                  <th className="py-2 text-right">KDV (%20)</th>
                  <th className="py-2 text-right">Toplam Tutar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-xs">
                {items.map((item, idx) => {
                  const itemMatrah = (item.price * item.quantity) / 1.2;
                  const itemKdv = item.price * item.quantity - itemMatrah;
                  return (
                    <tr key={idx}>
                      <td className="py-3 font-mono">{idx + 1}</td>
                      <td className="py-3 font-bold uppercase">{item.name}</td>
                      <td className="py-3 text-center font-mono">{item.quantity}</td>
                      <td className="py-3 text-right font-mono">{item.price.toLocaleString("tr-TR")} ₺</td>
                      <td className="py-3 text-right font-mono">{itemKdv.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺</td>
                      <td className="py-3 text-right font-mono font-bold">{(item.price * item.quantity).toLocaleString("tr-TR")} ₺</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="border-t-2 border-primary pt-4 flex flex-col items-end gap-1.5 text-xs">
            <div className="flex justify-between w-64 text-on-surface-variant">
              <span>Mal/Hizmet Matrahı:</span>
              <span className="font-mono">{matrah.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺</span>
            </div>
            <div className="flex justify-between w-64 text-on-surface-variant">
              <span>Hesaplanan KDV (%20):</span>
              <span className="font-mono">{kdvAmount.toLocaleString("tr-TR", { maximumFractionDigits: 2 })} ₺</span>
            </div>
            <div className="flex justify-between w-64 text-primary font-bold text-sm border-t border-primary pt-2 mt-1">
              <span>ÖDENECEK TOPLAM:</span>
              <span className="font-price-lg text-base">{totalAmount.toLocaleString("tr-TR")} ₺</span>
            </div>
          </div>

          {/* Legal Stamp Notice */}
          <div className="border-t border-outline-variant pt-3 text-[10px] text-on-surface-variant uppercase text-center">
            Bu fatura 213 sayılı V.U.K. hükümlerine göre elektronik ortamda tanzim edilmiştir. Islak imza gerektirmez.
          </div>
        </div>
      </div>
    </div>
  );
}
