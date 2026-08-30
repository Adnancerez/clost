"use client";

import React from "react";
import { CreditCard, Landmark, PackageCheck, ShieldCheck } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface CheckoutPaymentFormProps {
  paymentMethod: "card" | "bank" | "cod";
  setPaymentMethod: (val: "card" | "bank" | "cod") => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardHolder: string;
  setCardHolder: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvv: string;
  setCardCvv: (val: string) => void;
}

export function CheckoutPaymentForm({
  paymentMethod,
  setPaymentMethod,
  cardNumber,
  setCardNumber,
  cardHolder,
  setCardHolder,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
}: CheckoutPaymentFormProps) {
  return (
    <div className="border border-primary p-6 bg-surface mt-6">
      <h2 className="font-headline-sm uppercase text-primary text-base mb-4 flex items-center gap-2">
        <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-xs">
          4
        </span>
        <span>Ödeme Yöntemi</span>
      </h2>

      {/* Payment Selection Tabs */}
      <div className="grid grid-cols-3 gap-2 font-label-mono text-xs mb-6">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setPaymentMethod("card");
          }}
          className={`p-3 border flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
            paymentMethod === "card"
              ? "border-primary bg-primary text-on-primary font-bold"
              : "border-outline-variant hover:border-primary text-primary"
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-[11px] uppercase">Kredi / Banka Kartı</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setPaymentMethod("bank");
          }}
          className={`p-3 border flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
            paymentMethod === "bank"
              ? "border-primary bg-primary text-on-primary font-bold"
              : "border-outline-variant hover:border-primary text-primary"
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span className="text-[11px] uppercase">Havale / EFT</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playClickSound();
            setPaymentMethod("cod");
          }}
          className={`p-3 border flex flex-col items-center gap-1.5 transition-colors cursor-pointer ${
            paymentMethod === "cod"
              ? "border-primary bg-primary text-on-primary font-bold"
              : "border-outline-variant hover:border-primary text-primary"
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span className="text-[11px] uppercase">Kapıda Ödeme</span>
        </button>
      </div>

      {/* Method: Credit Card */}
      {paymentMethod === "card" && (
        <div className="flex flex-col gap-4 font-label-mono text-xs animate-in fade-in duration-200">
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">
              KART ÜZERİNDEKİ İSİM *
            </label>
            <input
              type="text"
              required
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="CANER KAYA"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-on-surface-variant uppercase mb-1">
              KART NUMARASI *
            </label>
            <input
              type="text"
              required
              maxLength={19}
              value={cardNumber}
              onChange={(e) => {
                const val = e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{4})/g, "$1 ")
                  .trim();
                setCardNumber(val);
              }}
              placeholder="0000 0000 0000 0000"
              className="w-full bg-surface border border-primary p-3 focus:outline-none tracking-widest uppercase font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">
                SON KULLANMA (AA/YY) *
              </label>
              <input
                type="text"
                required
                maxLength={5}
                value={cardExpiry}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "");
                  if (val.length > 2) {
                    val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                  }
                  setCardExpiry(val);
                }}
                placeholder="12/28"
                className="w-full bg-surface border border-primary p-3 focus:outline-none tracking-wider uppercase font-mono"
              />
            </div>
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">CVV / CVC *</label>
              <input
                type="password"
                required
                maxLength={4}
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                placeholder="•••"
                className="w-full bg-surface border border-primary p-3 focus:outline-none tracking-widest uppercase font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-on-surface-variant text-[11px] pt-2">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Kart bilgileriniz 256-Bit SSL şifreleme ile korunmaktadır. Sunucularımızda saklanmaz.</span>
          </div>
        </div>
      )}

      {/* Method: Bank Transfer */}
      {paymentMethod === "bank" && (
        <div className="p-4 border border-outline-variant bg-surface-container-low font-label-mono text-xs flex flex-col gap-2 animate-in fade-in duration-200">
          <p className="font-bold text-primary uppercase">CLOST RESMİ BANKA HESABI:</p>
          <div className="flex flex-col gap-1 text-on-surface-variant">
            <p><strong>Banka:</strong> Garanti BBVA</p>
            <p><strong>Alıcı:</strong> CLOST TEKSTİL VE TASARIM A.Ş.</p>
            <p><strong>IBAN:</strong> TR12 0006 2000 0001 2345 6789 01</p>
            <p><strong>Açıklama:</strong> Sipariş ID kodunuzu ekleyiniz.</p>
          </div>
        </div>
      )}

      {/* Method: Cash on Delivery */}
      {paymentMethod === "cod" && (
        <div className="p-4 border border-outline-variant bg-surface-container-low font-label-mono text-xs flex flex-col gap-2 animate-in fade-in duration-200">
          <p className="font-bold text-primary uppercase">KAPIDA NAKİT VEYA KARTLA ÖDEME:</p>
          <p className="text-on-surface-variant">
            Kargonuz teslim edilirken kuryeye nakit veya POS cihazı üzerinden kredi kartı ile güvenle ödeme yapabilirsiniz. (+25 ₺ kapıda tahsilat hizmet bedeli uygulanır).
          </p>
        </div>
      )}
    </div>
  );
}
