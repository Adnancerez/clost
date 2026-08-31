"use client";

import { useState, useEffect } from "react";
import { usePwaStore } from "@/lib/pwa/usePwa";

export function PwaInstallPrompt() {
  const isInstallable = usePwaStore((state) => state.isInstallable);
  const isInstalled = usePwaStore((state) => state.isInstalled);
  const isIos = usePwaStore((state) => state.isIos);
  const isInstallModalOpen = usePwaStore((state) => state.isInstallModalOpen);
  const promptInstall = usePwaStore((state) => state.promptInstall);
  const dismissInstallPrompt = usePwaStore((state) => state.dismissInstallPrompt);
  const closeInstallModal = usePwaStore((state) => state.closeInstallModal);
  const openInstallModal = usePwaStore((state) => state.openInstallModal);

  const [hasPromptedBanner, setHasPromptedBanner] = useState(false);

  // Auto-show unobtrusive floating banner after 4 seconds if installable
  useEffect(() => {
    if (isInstalled) return;

    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem("clost_pwa_dismissed");
      if (!dismissed) {
        setHasPromptedBanner(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isInstalled]);

  if (isInstalled) return null;

  const handleInstallClick = async () => {
    if (isIos) {
      openInstallModal();
    } else {
      const installed = await promptInstall();
      if (!installed) {
        openInstallModal();
      }
    }
  };

  const handleDismissBanner = () => {
    setHasPromptedBanner(false);
    dismissInstallPrompt();
  };

  return (
    <>
      {/* 1. Floating Desktop/Mobile Discreet Pill Banner */}
      {hasPromptedBanner && (isInstallable || isIos) && !isInstallModalOpen && (
        <aside
          aria-label="PWA Yükleme Önerisi"
          className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 max-w-sm w-[calc(100vw-32px)] md:w-96 bg-primary text-white border border-surface-variant/40 shadow-2xl p-4 animate-fade-in-up font-label-mono text-xs"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-none"></span>
              <span className="font-bold tracking-widest uppercase">
                CLOST APP // PWA
              </span>
            </div>
            <button
              onClick={handleDismissBanner}
              className="text-surface-dim hover:text-white p-1 cursor-pointer"
              aria-label="Kapat"
            >
              ✕
            </button>
          </div>

          <p className="text-surface-dim text-[11px] mb-3 leading-relaxed">
            Hızlı başlatma, çevrimdışı arşiv kataloğu ve optimize edilmiş performans için ana ekranınıza yükleyin.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2 bg-surface text-primary hover:bg-surface-variant font-bold text-center uppercase tracking-wider transition-colors cursor-pointer"
            >
              UYGULAMAYI YÜKLE
            </button>
            <button
              onClick={handleDismissBanner}
              className="px-3 py-2 border border-surface-variant/40 text-surface-dim hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
            >
              SONRA
            </button>
          </div>
        </aside>
      )}

      {/* 2. Detailed Brutalist Installation Modal (for iOS or Deep Features) */}
      {isInstallModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-surface text-on-surface border-2 border-primary max-w-md w-full p-6 shadow-2xl font-label-mono">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-primary pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary"></span>
                <span className="font-headline-sm text-sm font-bold tracking-tight text-primary uppercase">
                  CLOST TERMINAL // YÜKLEME REHBERİ
                </span>
              </div>
              <button
                onClick={closeInstallModal}
                className="p-1 hover:opacity-60 text-primary font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Feature List */}
            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 bg-surface-container-low border border-primary/20">
                <span className="font-bold text-primary block mb-1">
                  01 / ÇEVRİMDIŞI ARŞİV
                </span>
                <p className="text-on-surface-variant text-[11px]">
                  İnternet bağlantınız kopsa bile ürün detaylarını inceleyebilir ve sepetinizi yönetebilirsiniz.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low border border-primary/20">
                <span className="font-bold text-primary block mb-1">
                  02 / SIFIR GECİKME &amp; HIZ
                </span>
                <p className="text-on-surface-variant text-[11px]">
                  Tam donanım hızlandırmalı modern techwear deneyimi ve akıcı sayfa geçişleri.
                </p>
              </div>

              <div className="p-3 bg-surface-container-low border border-primary/20">
                <span className="font-bold text-primary block mb-1">
                  03 / BAĞIMSIZ APP DENEYİMİ
                </span>
                <p className="text-on-surface-variant text-[11px]">
                  Tam ekran modunda tarayıcı çubuğu olmadan tam odaklanmış alışveriş.
                </p>
              </div>
            </div>

            {/* iOS Safari Specific Step-by-Step Instructions */}
            {isIos ? (
              <div className="border border-primary p-3 bg-primary text-white text-[11px] mb-4 space-y-2">
                <span className="font-bold block tracking-wider uppercase text-amber-300">
                  IPHONE / SAFARI İÇİN ADIMLAR:
                </span>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-white text-primary font-bold">1</span>
                  <span>Safari alt menüsündeki <strong>Paylaş</strong> (Kare ve yukarı ok) ikonuna dokunun.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-white text-primary font-bold">2</span>
                  <span>Aşağı kaydırıp <strong>&quot;Ana Ekrana Ekle&quot;</strong> seçeneğini seçin.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-white text-primary font-bold">3</span>
                  <span>Sağ üstteki <strong>&quot;Ekle&quot;</strong> butonuna basın.</span>
                </div>
              </div>
            ) : (
              <button
                onClick={async () => {
                  await promptInstall();
                  closeInstallModal();
                }}
                className="w-full py-3 bg-primary text-white hover:bg-surface-variant hover:text-primary font-bold uppercase tracking-widest border border-primary transition-colors text-xs mb-3 cursor-pointer"
              >
                HEMEN YÜKLE
              </button>
            )}

            <button
              onClick={() => {
                closeInstallModal();
                dismissInstallPrompt();
              }}
              className="w-full py-2 border border-primary text-primary hover:bg-surface-variant font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer"
            >
              KAPAT
            </button>
          </div>
        </div>
      )}
    </>
  );
}
