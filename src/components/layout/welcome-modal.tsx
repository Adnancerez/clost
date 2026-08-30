"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { X, Tag, Copy, Check } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";

const emptySubscribe = () => () => {};

export function WelcomeModal() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("clost_welcome_dismissed");
      if (!dismissed) {
        // Subtle 6.5s delay to avoid disrupting the initial browsing experience
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 6500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const { addToast } = useToastStore();

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("clost_welcome_dismissed", "true");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("clost_welcome_dismissed", "true");
      }
      addToast({
        title: "Bültene Kaydoldunuz",
        message: "HOSGELDIN10 kupon kodunuz tanımlandı.",
        type: "success",
      });
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("HOSGELDIN10");
    setCopied(true);
    addToast({
      title: "Kupon Kopyalandı",
      message: "HOSGELDIN10 kodu panoya kopyalandı.",
      type: "info",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div onClick={handleClose} className="fixed inset-0 bg-black/70 backdrop-blur-[2px] animate-in fade-in" />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-md bg-surface border border-primary p-6 md:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Kapat"
          className="absolute top-4 right-4 p-1 text-primary hover:bg-surface-variant cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubscribed ? (
          <div className="flex flex-col items-center text-center gap-4 py-4 animate-in fade-in">
            <div className="w-12 h-12 border border-primary bg-primary text-on-primary flex items-center justify-center">
              <Tag className="w-6 h-6" />
            </div>

            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant">
                TEBRİKLER // İNDİRİM KODUNUZ HAZIR
              </span>
              <h2 className="font-headline-sm uppercase text-primary mt-1">
                %10 İNDİRİM KAZANDINIZ
              </h2>
            </div>

            <div className="w-full border-2 border-dashed border-primary p-4 bg-surface-container-low flex items-center justify-between font-label-mono">
              <span className="text-base font-bold text-primary tracking-wider">
                HOSGELDIN10
              </span>
              <button
                onClick={handleCopyCode}
                className="bg-primary text-on-primary px-4 py-2 text-xs uppercase flex items-center gap-1.5 hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                {copied ? (
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

            <p className="font-label-mono text-[11px] text-on-surface-variant">
              Kupon kodunu ödeme adımındaki &quot;İndirim Kuponu&quot; alanına yazarak kullanabilirsiniz.
            </p>

            <button
              onClick={handleClose}
              className="w-full bg-primary text-on-primary p-3.5 font-label-mono text-xs uppercase hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer mt-2"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-primary pb-1 inline-block">
                İLK ERİŞİM &amp; BÜLTEN
              </span>
              <h2 className="font-headline-sm uppercase text-primary mt-2">
                İLK SİPARİŞE ÖZEL %10 AVANTAJ
              </h2>
              <p className="font-body-md text-xs text-on-surface-variant mt-2 leading-relaxed">
                CLOST editoryal bültenine kaydolun; yeni drop&apos;lardan, sınırlı stoklu parçalardan ilk siz haberdar olun ve anında %10 ilk sipariş kodu kazanın.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ"
                className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary uppercase focus:outline-none"
              />

              <button
                type="submit"
                className="w-full bg-primary text-on-primary h-12 font-label-mono text-xs uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                İndirim Kodumu Al
              </button>
            </form>

            <button
              onClick={handleClose}
              className="text-center font-label-mono text-[11px] text-on-surface-variant hover:text-primary uppercase cursor-pointer mt-1 underline"
            >
              Şimdilik Teşekkürler, İndirimsiz Devam Et
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
