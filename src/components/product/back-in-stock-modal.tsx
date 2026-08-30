"use client";

import React, { useState } from "react";
import { X, Bell, CheckCircle2 } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface BackInStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  variantTitle: string;
}

export function BackInStockModal({
  isOpen,
  onClose,
  productTitle,
  variantTitle,
}: BackInStockModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    playClickSound();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-[2px] animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-surface border border-primary p-6 md:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 p-1 text-primary hover:bg-surface-variant cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in">
            <div className="w-12 h-12 border border-primary bg-primary text-on-primary flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>

            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                STOK BİLDİRİM TALEBİ ALINDI
              </span>
              <h3 className="font-headline-sm uppercase text-primary mt-1">
                KAYDINIZ OLUŞTURULDU
              </h3>
            </div>

            <p className="font-body-md text-xs text-on-surface-variant max-w-xs leading-relaxed">
              <span className="font-bold text-primary">{productTitle} ({variantTitle})</span> stoğa girdiği an e-posta ve SMS ile ilk siz haberdar olacaksınız.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-primary text-on-primary p-3.5 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
            >
              Tamam
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-label-mono text-xs uppercase">
                <Bell className="w-4 h-4 text-primary" />
                <span>Tekrar Gelince Haber Ver</span>
              </div>
              <h2 className="font-headline-sm uppercase text-primary mt-1 text-lg">
                Stok Bildirim Listesi
              </h2>
              <div className="border-t border-outline-variant pt-2 mt-2 font-label-mono text-xs text-on-surface-variant">
                Seçilen Parça: <span className="font-bold text-primary uppercase">{productTitle}</span>
                <span className="block text-primary font-bold mt-0.5">Beden/Renk: {variantTitle}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@domain.com"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Telefon (SMS Bildirimi İçin)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XX XXX XX XX"
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
              >
                Stok Açıldığında Bildir
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
