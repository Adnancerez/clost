"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Award, Copy, Check, Zap, Gift } from "lucide-react";
import { useLoyaltyStore } from "@/lib/store/useLoyaltyStore";
import { playClickSound } from "@/lib/audio/sound-effects";

const emptySubscribe = () => () => {};

export default function VIPClubPage() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { points, tier, unlockedCoupons, redeemReward, getTierProgress } = useLoyaltyStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isMounted) return null;

  const progress = getTierProgress();

  const availableRewards = [
    {
      id: "rw-100",
      cost: 500,
      codePrefix: "VIP100",
      title: "100 ₺ İndirim Çeki",
      discount: "100 ₺",
      description: "Tüm koleksiyonda alt limitsiz 100 ₺ indirim sağlar.",
    },
    {
      id: "rw-250",
      cost: 1000,
      codePrefix: "VIP250",
      title: "250 ₺ İndirim Çeki",
      discount: "250 ₺",
      description: "1.000 ₺ ve üzeri alışverişlerde anında 250 ₺ indirim.",
    },
    {
      id: "rw-600",
      cost: 2000,
      codePrefix: "VIP600",
      title: "600 ₺ Büyük Sepet Çeki",
      discount: "600 ₺",
      description: "2.500 ₺ ve üzeri alışverişlerde geçerli 600 ₺ indirim kuponu.",
    },
  ];

  const handleRedeem = (cost: number, codePrefix: string, title: string, discount: string) => {
    playClickSound();
    const success = redeemReward(cost, codePrefix, title, discount);
    if (!success) {
      alert("Yetersiz VOID Puanı. Alışveriş yaparak veya yorum yazarak puan kazanabilirsiniz.");
    }
  };

  const handleCopy = (code: string) => {
    playClickSound();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            ÖZEL SADAKAT &amp; AYRICALIK PROGRAMI
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            VIP ARŞİV KULÜBÜ
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Alışveriş yaptıkça puan kazanın, rütbenizi yükseltin ve özel kuponlar açın.
        </p>
      </header>

      {/* Member Card & Tier Progress Section */}
      <section className="border-b border-primary bg-surface-container-low p-6 md:p-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Digital VIP Pass Card */}
          <div className="lg:col-span-6 w-full aspect-[1.6/1] border-2 border-primary bg-primary text-on-primary p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label-mono text-[10px] tracking-widest uppercase opacity-80 block">
                  CLOST // VIP OPERATIVE PASS
                </span>
                <span className="font-headline-sm uppercase text-lg font-bold">
                  {tier} KADEMESİ
                </span>
              </div>
              <Award className="w-6 h-6 text-white" />
            </div>

            <div>
              <span className="font-label-mono text-[10px] uppercase opacity-70 block">
                MEVCUT SADAKAT PUANI
              </span>
              <span className="font-price-lg text-3xl md:text-4xl font-bold tracking-tight">
                {points.toLocaleString("tr-TR")} VP
              </span>
            </div>

            <div className="flex justify-between items-end border-t border-white/20 pt-3 font-label-mono text-[11px]">
              <div>
                <span className="opacity-70 block text-[9px] uppercase">ÜYE:</span>
                <span className="font-bold uppercase">Caner Kaya</span>
              </div>
              <div className="text-right font-mono text-white/90">
                <span>KOD: VA-VIP-88219</span>
              </div>
            </div>
          </div>

          {/* Tier Progress Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-primary pb-1 inline-block">
                RÜTBE İLERLEMESİ
              </span>
              <h2 className="font-headline-sm uppercase text-primary text-2xl mt-2">
                {tier === "Mimar" ? "Mimar Kademesi (En Yüksek Seviye)" : `${tier} → Mimar Seviyesi`}
              </h2>
              <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                Mimar seviyesine ulaştığınızda tüm yeni sezon drop&apos;larına 24 saat önceden erken erişim ve tüm siparişlerde daimi %5 ekstra indirim kazanırsınız.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-label-mono text-xs">
                <span>Mevcut İlerleme</span>
                <span className="font-bold text-primary">{Math.round(progress.percentage)}%</span>
              </div>
              <div className="w-full h-3 border border-primary bg-surface p-0.5">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 font-label-mono text-[11px] text-center">
              <div className="p-2 border border-outline-variant bg-surface">
                <span className="text-on-surface-variant block">0 - 1500 VP</span>
                <span className="font-bold text-primary uppercase">Operatif</span>
              </div>
              <div className="p-2 border border-primary bg-surface font-bold text-primary uppercase">
                <span className="text-on-surface-variant block font-normal">1500 - 4000 VP</span>
                <span>Kıdemli</span>
              </div>
              <div className="p-2 border border-outline-variant bg-surface">
                <span className="text-on-surface-variant block">4000+ VP</span>
                <span className="font-bold text-primary uppercase">Mimar</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Redemption Section */}
      <section className="p-6 md:p-12 max-w-5xl mx-auto w-full flex flex-col gap-10">
        <div>
          <h3 className="font-headline-sm uppercase text-primary text-xl flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Puanları İndirim Kuponuna Çevirin
          </h3>
          <p className="font-label-mono text-xs text-on-surface-variant mt-1">
            Biriktirdiğiniz VOID Puanları (VP) harcayarak anında kullanabileceğiniz indirim kodları açın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableRewards.map((reward) => {
            const canAfford = points >= reward.cost;
            return (
              <div
                key={reward.id}
                className="border border-primary bg-surface p-6 flex flex-col justify-between gap-6"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-price-lg text-primary text-2xl font-bold">
                      {reward.discount}
                    </span>
                    <span className="font-label-mono text-xs uppercase bg-primary text-on-primary px-2 py-0.5">
                      {reward.cost} VP
                    </span>
                  </div>

                  <h4 className="font-body-md font-bold uppercase text-primary text-sm">
                    {reward.title}
                  </h4>
                  <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                    {reward.description}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => handleRedeem(reward.cost, reward.codePrefix, reward.title, reward.discount)}
                  className={`w-full py-3 font-label-mono text-xs uppercase tracking-wider transition-colors cursor-pointer border border-primary ${
                    canAfford
                      ? "bg-primary text-on-primary hover:bg-surface-variant hover:text-primary"
                      : "bg-surface-variant text-outline cursor-not-allowed opacity-60"
                  }`}
                >
                  {canAfford ? "Kuponu Aç" : "Yetersiz Puan"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Unlocked Coupons Area */}
        {unlockedCoupons.length > 0 && (
          <div className="border border-primary p-6 md:p-8 bg-surface-container-low flex flex-col gap-4">
            <h4 className="font-headline-sm uppercase text-primary text-base flex items-center gap-2">
              <Gift className="w-4 h-4" /> Açılan Aktif Kuponlarınız ({unlockedCoupons.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {unlockedCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="border border-primary bg-surface p-4 flex justify-between items-center font-label-mono text-xs"
                >
                  <div>
                    <span className="font-bold text-primary uppercase text-sm block">
                      {coupon.code}
                    </span>
                    <span className="text-on-surface-variant text-[11px]">
                      {coupon.title} • {coupon.redeemedAt}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(coupon.code)}
                    className="bg-primary text-on-primary px-4 py-2 uppercase flex items-center gap-1 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" /> Kopyalandı
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Kopyala
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How to Earn Points Guide */}
        <div className="border-t border-primary pt-8 flex flex-col gap-4">
          <h4 className="font-headline-sm uppercase text-primary text-base">
            Nasıl VOID Puanı (VP) Kazanırım?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-label-mono text-xs">
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Alışveriş Yapın</span>
              <p className="text-on-surface-variant">Her 100 ₺ sipariş tutarı için anında 10 VP kazanın.</p>
            </div>
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Ürün Değerlendirin</span>
              <p className="text-on-surface-variant">Satın aldığınız ürünlere onaylı yorum yazarak 50 VP kazanın.</p>
            </div>
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Arkadaşını Davet Et</span>
              <p className="text-on-surface-variant">Davet linkinizle yapılan ilk alışverişte 200 VP kazanın.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
