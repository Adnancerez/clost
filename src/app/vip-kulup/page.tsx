"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Award, Copy, Check, Zap, Gift } from "lucide-react";
import { useLoyaltyStore } from "@/lib/store/useLoyaltyStore";

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
    const success = redeemReward(cost, codePrefix, title, discount);
    if (!success) {
      alert("Yetersiz CLOST Puanı. Alışveriş yaparak veya yorum yazarak puan kazanabilirsiniz.");
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <main className="flex-grow flex flex-col">
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
                KULLANILABİLİR BAKİYE
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-price-lg text-3xl md:text-4xl font-bold">
                  {points.toLocaleString("tr-TR")}
                </span>
                <span className="font-label-mono text-xs uppercase">CLOST PUANI (CP)</span>
              </div>
            </div>

            <div className="flex justify-between items-end border-t border-white/20 pt-3 text-[10px] font-label-mono opacity-80 uppercase">
              <span>HESAP: CLOST-CLUB</span>
              <span>ÜYELİK: ÖMÜR BOYU</span>
            </div>
          </div>

          {/* Tier Progress & Benefits Details */}
          <div className="lg:col-span-6 flex flex-col gap-6 font-label-mono text-xs">
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="uppercase text-primary font-bold">
                  Mevcut Kademe: {tier}
                </span>
                {progress.nextTier ? (
                  <span className="text-on-surface-variant">
                    {progress.nextTier} Kademesine {progress.pointsNeeded} CP Kaldı
                  </span>
                ) : (
                  <span className="text-green-600 font-bold uppercase">
                    Zirve Kademedesiniz (Mimar)
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-variant h-2 border border-primary overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>

            {/* Tier Levels Guide */}
            <div className="flex flex-col gap-3 border-t border-outline-variant pt-4">
              <div
                className={`p-3 border flex justify-between items-center transition-colors ${
                  tier === "Operatif"
                    ? "border-primary bg-surface font-bold"
                    : "border-outline-variant bg-surface-container-low text-on-surface-variant"
                }`}
              >
                <div>
                  <span className="uppercase block text-primary">01 // OPERATİF (0 - 999 VP)</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Standart kargo ücretsiz, doğum günü çeki
                  </span>
                </div>
                {tier === "Operatif" && <span className="text-primary font-bold">MEVCUT</span>}
              </div>

              <div
                className={`p-3 border flex justify-between items-center transition-colors ${
                  tier === "Kıdemli"
                    ? "border-primary bg-surface font-bold"
                    : "border-outline-variant bg-surface-container-low text-on-surface-variant"
                }`}
              >
                <div>
                  <span className="uppercase block text-primary">02 // KIDEMLİ (1.000 - 2.999 VP)</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Tüm siparişlerde 2x puan, yeni droplara 1 saat erken erişim
                  </span>
                </div>
                {tier === "Kıdemli" && <span className="text-primary font-bold">MEVCUT</span>}
              </div>

              <div
                className={`p-3 border flex justify-between items-center transition-colors ${
                  tier === "Mimar"
                    ? "border-primary bg-surface font-bold"
                    : "border-outline-variant bg-surface-container-low text-on-surface-variant"
                }`}
              >
                <div>
                  <span className="uppercase block text-primary">03 // MİMAR (3.000+ VP)</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Özel prototip koleksiyonlar, VIP stilist desteği, sınırsız Express kargo
                  </span>
                </div>
                {tier === "Mimar" && <span className="text-primary font-bold">MEVCUT</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Catalog Section */}
      <section className="p-6 md:p-16 max-w-5xl mx-auto w-full flex flex-col gap-10">
        <div>
          <div className="flex items-center gap-2 font-label-mono text-xs uppercase text-primary mb-1">
            <Zap className="w-4 h-4 text-primary" />
            <span>ÖDÜL VE KUPON MERKEZİ</span>
          </div>
          <h3 className="font-headline-md uppercase tracking-tight text-primary text-xl md:text-2xl">
            Puanlarınızı İndirim Çekine Dönüştürün
          </h3>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-label-mono text-xs">
          {availableRewards.map((reward) => {
            const canAfford = points >= reward.cost;
            return (
              <div
                key={reward.id}
                className="border border-primary p-6 bg-surface flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <span className="font-headline-sm text-lg font-bold text-primary">
                      {reward.discount}
                    </span>
                    <span className="bg-primary text-on-primary px-2.5 py-1 text-[10px] font-bold">
                      {reward.cost} VP
                    </span>
                  </div>
                  <h4 className="font-bold uppercase text-primary">{reward.title}</h4>
                  <p className="text-on-surface-variant text-[11px] leading-relaxed">
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
          <h4 className="font-headline-sm uppercase text-primary text-base font-bold">
            Nasıl CLOST Puanı (CP) Kazanırım?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-label-mono text-xs">
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Alışveriş Yapın</span>
              <p className="text-on-surface-variant">Her 100 ₺ sipariş tutarı için anında 10 CP kazanın.</p>
            </div>
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Ürün Değerlendirin</span>
              <p className="text-on-surface-variant">Satın aldığınız ürünlere onaylı yorum yazarak 50 CP kazanın.</p>
            </div>
            <div className="p-4 border border-outline-variant bg-surface">
              <span className="font-bold text-primary uppercase block mb-1">Arkadaşını Davet Et</span>
              <p className="text-on-surface-variant">Davet linkinizle yapılan ilk alışverişte 200 CP kazanın.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
