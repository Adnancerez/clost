"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, User } from "lucide-react";

export default function SizeGuidePage() {
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(75);
  const [fitPreference, setFitPreference] = useState<"boxy" | "oversized" | "regular">("oversized");

  // Recommendation algorithm
  const getRecommendation = () => {
    const bmi = weight / Math.pow(height / 100, 2);
    let size = "M";
    let bottomSize = "32";

    if (height > 185 || weight > 85 || bmi > 26) {
      size = "L";
      bottomSize = "34";
    }
    if (height > 190 || weight > 95 || bmi > 29) {
      size = "XL";
      bottomSize = "36";
    }
    if (height < 172 && weight < 65) {
      size = "S";
      bottomSize = "30";
    }

    if (fitPreference === "oversized" && size === "M" && height > 178) {
      size = "L";
    }

    return { size, bottomSize };
  };

  const rec = getRecommendation();

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            KALIP &amp; SİLÜET MİMARİSİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            BEDEN REHBERİ
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Boy ve kilonuza göre monolitik kalıplarımızın vücudunuzda nasıl duracağını keşfedin.
        </p>
      </header>

      {/* Interactive Size Calculator Section */}
      <section className="border-b border-primary bg-surface-container-low p-6 md:p-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary border-b border-primary pb-1">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AKILLI SİLÜET HESAPLAYICI</span>
            </div>

            {/* Height Slider */}
            <div className="flex flex-col gap-2 font-label-mono text-xs">
              <div className="flex justify-between">
                <span>Boy:</span>
                <span className="font-bold text-primary">{height} cm</span>
              </div>
              <input
                type="range"
                min={160}
                max={205}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            {/* Weight Slider */}
            <div className="flex flex-col gap-2 font-label-mono text-xs">
              <div className="flex justify-between">
                <span>Kilo:</span>
                <span className="font-bold text-primary">{weight} kg</span>
              </div>
              <input
                type="range"
                min={50}
                max={125}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            {/* Fit Preference */}
            <div className="flex flex-col gap-2 font-label-mono text-xs">
              <span>Duruş / Kalıp Tercihi:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "regular", label: "Standart" },
                  { id: "boxy", label: "Mimari Boxy" },
                  { id: "oversized", label: "Oversized" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setFitPreference(item.id as "regular" | "boxy" | "oversized");
                    }}
                    className={`py-2.5 border uppercase transition-colors cursor-pointer text-xs ${
                      fitPreference === item.id
                        ? "bg-primary text-on-primary border-primary font-bold"
                        : "bg-surface text-primary border-outline-variant hover:border-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Output Card */}
          <div className="lg:col-span-6 w-full border-2 border-primary bg-surface p-6 md:p-8 flex flex-col justify-between gap-6 shadow-xl">
            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant block">
                SİZİN İÇİN ÖNERİLEN BOYUTLAR
              </span>
              <h2 className="font-headline-sm uppercase text-primary mt-1 text-2xl">
                İdeal Beden Eşleşmesi
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 font-label-mono">
              <div className="border border-primary p-4 bg-surface-container-low text-center">
                <span className="text-[11px] text-on-surface-variant block uppercase">
                  DIŞ &amp; ÜST GİYİM
                </span>
                <span className="font-display-lg text-4xl font-bold text-primary mt-1 block">
                  {rec.size}
                </span>
                <span className="text-[10px] text-primary block mt-1 uppercase font-bold">
                  {fitPreference === "oversized" ? "Dökümlü Duruş" : "Yapısal Duruş"}
                </span>
              </div>

              <div className="border border-primary p-4 bg-surface-container-low text-center">
                <span className="text-[11px] text-on-surface-variant block uppercase">
                  ALT GİYİM / PANTOLON
                </span>
                <span className="font-display-lg text-4xl font-bold text-primary mt-1 block">
                  {rec.bottomSize}
                </span>
                <span className="text-[10px] text-primary block mt-1 uppercase font-bold">
                  Geniş Paça Kesim
                </span>
              </div>
            </div>

            <Link
              href="/collections/all"
              className="bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Kataloğu Bu Bedenle Keşfet <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Model Stats & Measurement Tables */}
      <section className="p-6 md:p-12 max-w-[1920px] mx-auto w-full flex flex-col gap-12">
        {/* Model Spec Note */}
        <div className="border border-primary bg-surface p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <div>
              <span className="font-label-mono text-xs uppercase font-bold text-primary block">
                Kampanya Manken Ölçüleri:
              </span>
              <span className="font-body-md text-xs text-on-surface-variant">
                Boy: 188 cm | Kilo: 76 kg | Göğüs: 98 cm | Bel: 80 cm (Üzerindeki Dış Giyim: M, Pantolon: 32)
              </span>
            </div>
          </div>

          <Link
            href="/lookbook"
            className="font-label-mono text-xs uppercase text-primary underline"
          >
            Lookbook&apos;ta İncele ↗
          </Link>
        </div>

        {/* Detailed Measurement Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Table 1: Tops & Outerwear */}
          <div className="border border-primary bg-surface flex flex-col">
            <div className="p-4 border-b border-primary bg-surface-container-low font-headline-sm uppercase text-sm font-bold">
              01 // Dış Giyim &amp; Üst Giyim Ölçü Tablosu (cm)
            </div>
            <table className="w-full text-left font-label-mono text-xs">
              <thead>
                <tr className="border-b border-primary text-on-surface-variant">
                  <th className="p-3">Beden</th>
                  <th className="p-3">Göğüs Çevresi</th>
                  <th className="p-3">Sırt Genişliği</th>
                  <th className="p-3">Boy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr>
                  <td className="p-3 font-bold">S</td>
                  <td className="p-3">112 cm</td>
                  <td className="p-3">50 cm</td>
                  <td className="p-3">72 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">M</td>
                  <td className="p-3">118 cm</td>
                  <td className="p-3">52 cm</td>
                  <td className="p-3">74 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">L</td>
                  <td className="p-3">124 cm</td>
                  <td className="p-3">54 cm</td>
                  <td className="p-3">76 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">XL</td>
                  <td className="p-3">130 cm</td>
                  <td className="p-3">56 cm</td>
                  <td className="p-3">78 cm</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table 2: Bottoms */}
          <div className="border border-primary bg-surface flex flex-col">
            <div className="p-4 border-b border-primary bg-surface-container-low font-headline-sm uppercase text-sm font-bold">
              02 // Alt Giyim &amp; Pantolon Ölçü Tablosu (cm)
            </div>
            <table className="w-full text-left font-label-mono text-xs">
              <thead>
                <tr className="border-b border-primary text-on-surface-variant">
                  <th className="p-3">Beden</th>
                  <th className="p-3">Bel Çevresi</th>
                  <th className="p-3">İç Bacak</th>
                  <th className="p-3">Paça Genişliği</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr>
                  <td className="p-3 font-bold">30</td>
                  <td className="p-3">78 cm</td>
                  <td className="p-3">78 cm</td>
                  <td className="p-3">23 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">32</td>
                  <td className="p-3">82 cm</td>
                  <td className="p-3">80 cm</td>
                  <td className="p-3">24 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">34</td>
                  <td className="p-3">86 cm</td>
                  <td className="p-3">82 cm</td>
                  <td className="p-3">25 cm</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">36</td>
                  <td className="p-3">90 cm</td>
                  <td className="p-3">84 cm</td>
                  <td className="p-3">26 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
