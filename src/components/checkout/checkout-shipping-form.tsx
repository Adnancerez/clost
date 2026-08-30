"use client";

import React from "react";
import { Truck, Gift } from "lucide-react";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface CheckoutShippingFormProps {
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  district: string;
  setDistrict: (val: string) => void;
  address: string;
  setAddress: (val: string) => void;
  postalCode: string;
  setPostalCode: (val: string) => void;
  shippingMethod: "standard" | "express";
  setShippingMethod: (val: "standard" | "express") => void;
  isFreeShipping: boolean;
  isGift: boolean;
  setIsGift: (val: boolean) => void;
  giftNote: string;
  setGiftNote: (val: string) => void;
}

export function CheckoutShippingForm({
  email,
  setEmail,
  phone,
  setPhone,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  city,
  setCity,
  district,
  setDistrict,
  address,
  setAddress,
  postalCode,
  setPostalCode,
  shippingMethod,
  setShippingMethod,
  isFreeShipping,
  isGift,
  setIsGift,
  giftNote,
  setGiftNote,
}: CheckoutShippingFormProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Contact Info */}
      <div className="border border-primary p-6 bg-surface">
        <h2 className="font-headline-sm uppercase text-primary text-base mb-4 flex items-center gap-2">
          <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-xs">
            1
          </span>
          <span>İletişim Bilgileri</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-label-mono text-xs">
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">
              E-POSTA ADRESİ *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@clost.store"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">
              TELEFON NUMARASI *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
        </div>
      </div>

      {/* 2. Shipping Address */}
      <div className="border border-primary p-6 bg-surface">
        <h2 className="font-headline-sm uppercase text-primary text-base mb-4 flex items-center gap-2">
          <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-xs">
            2
          </span>
          <span>Teslimat Adresi</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-label-mono text-xs mb-4">
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">AD *</label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Adınız"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">SOYAD *</label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Soyadınız"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-label-mono text-xs mb-4">
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">İL *</label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="İstanbul"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">İLÇE *</label>
            <input
              type="text"
              required
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Beşiktaş"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
          <div>
            <label className="block text-on-surface-variant uppercase mb-1">POSTA KODU</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="34349"
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase"
            />
          </div>
        </div>

        <div className="font-label-mono text-xs">
          <label className="block text-on-surface-variant uppercase mb-1">AÇIK ADRES *</label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Mahalle, Cadde, Sokak, Bina No, Daire No"
            className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase resize-none"
          />
        </div>
      </div>

      {/* 3. Delivery Method */}
      <div className="border border-primary p-6 bg-surface">
        <h2 className="font-headline-sm uppercase text-primary text-base mb-4 flex items-center gap-2">
          <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center text-xs">
            3
          </span>
          <span>Kargo Seçeneği</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-label-mono text-xs">
          <label
            onClick={() => {
              playClickSound();
              setShippingMethod("standard");
            }}
            className={`border p-4 flex flex-col gap-2 cursor-pointer transition-colors ${
              shippingMethod === "standard"
                ? "border-primary bg-surface-variant"
                : "border-outline-variant hover:border-primary"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold uppercase text-primary flex items-center gap-2">
                <Truck className="w-4 h-4" /> Standart Kargo (Yurtiçi)
              </span>
              <span className="text-primary font-bold">
                {isFreeShipping ? "ÜCRETSİZ" : "60 ₺"}
              </span>
            </div>
            <p className="text-on-surface-variant text-[11px]">
              1-3 iş günü içerisinde sigortalı teslimat.
            </p>
          </label>

          <label
            onClick={() => {
              playClickSound();
              setShippingMethod("express");
            }}
            className={`border p-4 flex flex-col gap-2 cursor-pointer transition-colors ${
              shippingMethod === "express"
                ? "border-primary bg-surface-variant"
                : "border-outline-variant hover:border-primary"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold uppercase text-primary flex items-center gap-2">
                <Truck className="w-4 h-4" /> Express VIP Kargo
              </span>
              <span className="text-primary font-bold">150 ₺</span>
            </div>
            <p className="text-on-surface-variant text-[11px]">
              İstanbul içi Aynı Gün / Diğer İller Ertesi Gün Teslimat.
            </p>
          </label>
        </div>
      </div>

      {/* 4. Gift Option */}
      <div className="border border-primary p-6 bg-surface">
        <label className="flex items-center gap-3 cursor-pointer font-label-mono text-xs uppercase text-primary font-bold select-none">
          <input
            type="checkbox"
            checked={isGift}
            onChange={(e) => {
              playClickSound();
              setIsGift(e.target.checked);
            }}
            className="w-4 h-4 accent-primary"
          />
          <span className="flex items-center gap-1.5">
            <Gift className="w-4 h-4" /> Bu sipariş bir hediyedir (Fiyatsız Hediye Faturası &amp; Özel Kutu)
          </span>
        </label>

        {isGift && (
          <div className="mt-4 pt-4 border-t border-outline-variant font-label-mono text-xs animate-in fade-in duration-200">
            <label className="block text-on-surface-variant uppercase mb-1">
              HEDİYE KARTI NOTUNUZ (OPSİYONEL)
            </label>
            <textarea
              rows={2}
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              placeholder="Alıcıya iletilmesini istediğiniz özel not..."
              className="w-full bg-surface border border-primary p-3 focus:outline-none uppercase resize-none text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}
