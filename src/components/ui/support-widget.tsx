"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Truck, HelpCircle, Phone } from "lucide-react";

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl =
    "https://wa.me/905000000000?text=" +
    encodeURIComponent("Merhaba, CLOST siparişim ve ürünler hakkında bilgi almak istiyorum.");

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end select-none">
      {/* Support Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 border border-primary bg-surface shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-primary text-on-primary flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h3 className="font-headline-sm text-xs uppercase font-bold tracking-wider">
                  CLOST // Canlı Destek
                </h3>
              </div>
              <p className="font-label-mono text-[10px] opacity-80 mt-0.5">
                Müşteri Deneyimi Ekibi Çevrimiçi (10:00 - 20:00)
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 text-on-primary cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 flex flex-col gap-4 font-label-mono text-xs bg-surface">
            <p className="text-on-surface-variant text-[11px] leading-relaxed">
              Sorularınız, beden tavsiyesi veya sipariş takibiniz için size yardımcı olmaya hazırız.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col gap-2">
              <Link
                href="/kargo-takip"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 p-2.5 border border-outline-variant bg-surface-container-low hover:border-primary transition-colors text-primary"
              >
                <Truck className="w-4 h-4 text-primary" />
                <span>Kargom Nerede? (Canlı Takip)</span>
              </Link>

              <Link
                href="/sss"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 p-2.5 border border-outline-variant bg-surface-container-low hover:border-primary transition-colors text-primary"
              >
                <HelpCircle className="w-4 h-4 text-primary" />
                <span>Sıkça Sorulan Sorular (İade &amp; Değişim)</span>
              </Link>
            </div>

            {/* WhatsApp Direct Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] text-white p-3 flex items-center justify-center gap-2 font-bold uppercase tracking-wider hover:opacity-90 transition-opacity border border-[#25D366] cursor-pointer text-xs"
            >
              <Send className="w-4 h-4" /> WhatsApp ile Canlı Yazışın
            </a>

            <div className="flex items-center justify-center gap-2 text-[10px] text-on-surface-variant pt-2 border-t border-outline-variant">
              <Phone className="w-3 h-3 text-primary" />
              <span>Müşteri Hizmetleri: 0850 000 00 00</span>
            </div>
          </div>
        </div>
      )}

      {/* Trigger Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Destek penceresini kapat" : "Canlı desteğe bağlan"}
        className="w-12 h-12 border border-primary bg-primary text-on-primary flex items-center justify-center shadow-lg hover:bg-surface-variant hover:text-primary transition-colors cursor-pointer"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default SupportWidget;
