"use client";

import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ShieldAlert } from "lucide-react";

interface TrackingResult {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  recipient: string;
  destination: string;
  currentStatus: string;
  currentStep: number; // 1 to 5
  estimatedDelivery: string;
  timeline: {
    title: string;
    description: string;
    time: string;
    completed: boolean;
    current?: boolean;
  }[];
}

export default function CargoTrackingPage() {
  const [query, setQuery] = useState("ORD-94218-TR");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<TrackingResult | null>({
    orderId: "ORD-94218-TR",
    trackingNumber: "YK-889124012TR",
    carrier: "Yurtiçi Kargo",
    recipient: "Caner K.",
    destination: "Beşiktaş / İstanbul",
    currentStatus: "Kargonuz Dağıtımda // Kurye Teslimat İçin Yolda",
    currentStep: 4,
    estimatedDelivery: "Bugün 14:00 - 17:00",
    timeline: [
      {
        title: "Sipariş Alındı & Onaylandı",
        description: "Sipariş sistem tarafından işlendi ve depoya aktarıldı.",
        time: "24 Ağustos 2026 - 10:14",
        completed: true,
      },
      {
        title: "Paketlendi & Kalite Kontrol",
        description: "Ürünler kalite kontrolünden geçti, barkodlandı ve paketlendi.",
        time: "24 Ağustos 2026 - 14:30",
        completed: true,
      },
      {
        title: "Kargoya Verildi // Transfer Merkezi",
        description: "Yurtiçi Kargo Ayazağa Transfer Merkezine teslim edildi.",
        time: "24 Ağustos 2026 - 18:45",
        completed: true,
      },
      {
        title: "Dağıtımda",
        description: "Kurye teslimat adresine doğru hareket halindedir.",
        time: "25 Ağustos 2026 - 09:15",
        completed: true,
        current: true,
      },
      {
        title: "Teslim Edildi",
        description: "Alıcıya imza karşılığı teslim edilecek.",
        time: "Tahmini Bugün",
        completed: false,
      },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        orderId: query.toUpperCase(),
        trackingNumber: `YK-${Math.floor(100000000 + Math.random() * 900000000)}TR`,
        carrier: "Yurtiçi Kargo",
        recipient: "Değerli Müşterimiz",
        destination: "Kadıköy / İstanbul",
        currentStatus: "Kargoya Verildi // Transfer Merkezinde İşleniyor",
        currentStep: 3,
        estimatedDelivery: "1 - 2 İş Günü",
        timeline: [
          {
            title: "Sipariş Alındı & Onaylandı",
            description: "Sipariş işleme alındı.",
            time: "Dün 15:30",
            completed: true,
          },
          {
            title: "Paketleme Tamamlandı",
            description: "Ürün kontrol edilip kutulandı.",
            time: "Dün 17:45",
            completed: true,
          },
          {
            title: "Kargoya Verildi // Transfer Merkezinde",
            description: "Yurtiçi Kargo ana dağıtım merkezine ulaştı.",
            time: "Bugün 08:20",
            completed: true,
            current: true,
          },
          {
            title: "Dağıtım Şubesine Sevkiyat",
            description: "Bölge dağıtım şubesine yönlendirildi.",
            time: "İşlemde",
            completed: false,
          },
          {
            title: "Teslim Edildi",
            description: "Alıcıya teslimat gerçekleştirilecek.",
            time: "Bekleniyor",
            completed: false,
          },
        ],
      });
    }, 600);
  };

  return (
    <main className="flex-grow pt-16 flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            LOJİSTİK &amp; TESLİMAT TAKİBİ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            KARGO TAKİBİ
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Yurtiçi Kargo güvencesiyle 7/24 canlı koli takip sistemi.
        </p>
      </header>

      {/* Tracking Search Input Bar */}
      <section className="border-b border-primary p-6 md:p-10 bg-surface-container-low">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-outline absolute left-4 top-4" />
              <input
                type="text"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SİPARİŞ KODU VEYA TAKİP NO (ÖRN: ORD-94218-TR)"
                className="w-full border border-primary bg-surface pl-11 pr-4 py-3.5 font-label-mono text-xs uppercase text-primary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSearching ? "Sorgulanıyor..." : "Kargo Sorgula"}
            </button>
          </form>
        </div>
      </section>

      {/* Tracking Result View */}
      {result && (
        <section className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full flex flex-col gap-8">
          {/* Status Card */}
          <div className="border border-primary p-6 md:p-8 bg-surface flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant pb-6">
              <div>
                <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                  GÜNCEL DURUM:
                </span>
                <h2 className="font-headline-sm text-primary uppercase text-lg mt-1">
                  {result.currentStatus}
                </h2>
              </div>
              <div className="bg-primary text-on-primary px-4 py-2 font-label-mono text-xs uppercase">
                Tahmini Teslimat: {result.estimatedDelivery}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-label-mono text-xs">
              <div>
                <span className="text-on-surface-variant block mb-1">SİPARİŞ KODU</span>
                <span className="text-primary font-bold">{result.orderId}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block mb-1">TAKİP NUMARASI</span>
                <span className="text-primary font-bold">{result.trackingNumber}</span>
              </div>
              <div>
                <span className="text-on-surface-variant block mb-1">KARGO ŞİRKETİ</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> {result.carrier}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant block mb-1">TESLİMAT ADRESİ</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {result.destination}
                </span>
              </div>
            </div>
          </div>

          {/* Step Timeline */}
          <div className="border border-primary p-6 md:p-8 bg-surface flex flex-col gap-6">
            <h3 className="font-headline-sm uppercase text-primary text-base flex items-center gap-2">
              <Clock className="w-4 h-4" /> Kargo Hareketleri
            </h3>

            <div className="flex flex-col gap-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant">
              {result.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 relative z-10">
                  <div
                    className={`w-7 h-7 flex-shrink-0 flex items-center justify-center border transition-colors ${
                      step.current
                        ? "bg-primary text-white border-primary ring-2 ring-primary ring-offset-2"
                        : step.completed
                        ? "bg-primary text-white border-primary"
                        : "bg-surface text-outline-variant border-outline-variant"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Package className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <h4
                        className={`font-body-md font-bold uppercase text-sm ${
                          step.completed ? "text-primary" : "text-on-surface-variant"
                        }`}
                      >
                        {step.title}
                      </h4>
                      <span className="font-label-mono text-xs text-on-surface-variant">
                        {step.time}
                      </span>
                    </div>
                    <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Notice */}
          <div className="flex items-center gap-3 p-4 border border-outline-variant bg-surface-container-low font-label-mono text-xs text-on-surface">
            <ShieldAlert className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              Kargonuzla ilgili bir gecikme yaşamanız durumunda sağ alttaki Canlı Destek butonundan bize anında ulaşabilirsiniz.
            </span>
          </div>
        </section>
      )}
    </main>
  );
}
