"use client";

import React, { useState } from "react";
import { X, Sparkles, Check } from "lucide-react";

export interface FitFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
  productTitle: string;
}

export function FitFinderModal({
  isOpen,
  onClose,
  onSelectSize,
  productTitle,
}: FitFinderModalProps) {
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(75);
  const [bodyType, setBodyType] = useState<"slim" | "standard" | "athletic" | "plus">("standard");
  const [fitPreference, setFitPreference] = useState<"fitted" | "regular" | "oversized">("oversized");
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  if (!isOpen) return null;

  const calculateSize = (e: React.FormEvent) => {
    e.preventDefault();

    // BMI calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let baseSizeIndex = 1; // 0: S, 1: M, 2: L, 3: XL

    if (bmi < 20.5) {
      baseSizeIndex = 0; // S
    } else if (bmi < 24.5) {
      baseSizeIndex = 1; // M
    } else if (bmi < 28.5) {
      baseSizeIndex = 2; // L
    } else {
      baseSizeIndex = 3; // XL
    }

    // Adjust for height
    if (height > 188 && baseSizeIndex < 3) {
      baseSizeIndex += 1;
    } else if (height < 168 && baseSizeIndex > 0) {
      baseSizeIndex -= 1;
    }

    // Adjust for fit preference
    if (fitPreference === "oversized" && baseSizeIndex < 3) {
      baseSizeIndex = Math.min(3, baseSizeIndex + 1);
    } else if (fitPreference === "fitted" && baseSizeIndex > 0) {
      baseSizeIndex = Math.max(0, baseSizeIndex - 1);
    }

    const sizeMap = ["S", "M", "L", "XL"];
    const result = sizeMap[baseSizeIndex] || "M";
    setCalculatedSize(result);
  };

  const handleApplySize = () => {
    if (calculatedSize) {
      onSelectSize(calculatedSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-[2px] animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg bg-surface border border-primary p-6 md:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-primary pb-4">
          <div>
            <div className="flex items-center gap-2 text-primary font-label-mono text-xs uppercase">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Yapay Zeka Destekli Kalıp Analizi</span>
            </div>
            <h2 className="font-headline-sm uppercase text-primary mt-1">
              Akıllı Beden Sihirbazı
            </h2>
            <p className="font-label-mono text-xs text-on-surface-variant mt-0.5">
              {productTitle} için en ideal bedeni hesaplayın.
            </p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-surface-variant cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {calculatedSize ? (
          <div className="flex flex-col items-center text-center gap-6 py-4 animate-in fade-in">
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              BOY: {height} CM // KİLO: {weight} KG
            </span>

            <div className="w-24 h-24 border-2 border-primary bg-primary text-on-primary flex items-center justify-center font-display-lg-mobile text-3xl font-bold">
              {calculatedSize}
            </div>

            <div>
              <h3 className="font-headline-sm uppercase text-primary">
                Sizin İçin Önerilen Beden: {calculatedSize}
              </h3>
              <p className="font-body-md text-xs text-on-surface-variant mt-2 max-w-xs mx-auto">
                Vücut ölçüleriniz ve {fitPreference === "oversized" ? "oversized" : fitPreference === "fitted" ? "dar kesim" : "standart"} kalıp tercihiniz doğrultusunda hesaplanmıştır.
              </p>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setCalculatedSize(null)}
                className="flex-1 border border-primary p-3.5 font-label-mono text-xs uppercase hover:bg-surface-variant transition-colors cursor-pointer"
              >
                Yeniden Hesapla
              </button>
              <button
                onClick={handleApplySize}
                className="flex-1 bg-primary text-on-primary p-3.5 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Bu Bedeni Seç ({calculatedSize})
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={calculateSize} className="flex flex-col gap-5">
            {/* Height & Weight Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center font-label-mono text-xs uppercase text-primary">
                  <span>Boy (cm)</span>
                  <span className="font-bold">{height} cm</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={210}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="accent-black cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center font-label-mono text-xs uppercase text-primary">
                  <span>Kilo (kg)</span>
                  <span className="font-bold">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={130}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="accent-black cursor-pointer"
                />
              </div>
            </div>

            {/* Body Type */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-xs uppercase text-primary">Vücut Yapısı</label>
              <div className="grid grid-cols-4 gap-1.5 font-label-mono text-xs">
                {[
                  { id: "slim", label: "Zayıf" },
                  { id: "standard", label: "Standart" },
                  { id: "athletic", label: "Atletik" },
                  { id: "plus", label: "Kalıplı" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBodyType(item.id as "slim" | "standard" | "athletic" | "plus")}
                    className={`p-2 border border-primary uppercase cursor-pointer transition-colors ${
                      bodyType === item.id ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Preference */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-xs uppercase text-primary">Kalıp / Duruş Tercihi</label>
              <div className="grid grid-cols-3 gap-1.5 font-label-mono text-xs">
                {[
                  { id: "fitted", label: "Dar Kesim" },
                  { id: "regular", label: "Tam Beden" },
                  { id: "oversized", label: "Oversized" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFitPreference(item.id as "fitted" | "regular" | "oversized")}
                    className={`p-2 border border-primary uppercase cursor-pointer transition-colors ${
                      fitPreference === item.id ? "bg-primary text-on-primary" : "bg-surface hover:bg-surface-variant"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
            >
              İdeal Bedenimi Hesapla
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
