"use client";

import React, { useState, useEffect } from "react";
import { Timer, Bell, Check, Sparkles, Flame } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";

export function DropCountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  const [contactInput, setContactInput] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const { addToast } = useToastStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInput.trim()) return;

    setIsRegistered(true);
    addToast({
      title: "VIP Drop Listesine Eklendiniz! 🚀",
      message: "Drop 02 yayına girdiğinde 1 saat önceden SMS ve E-posta ile bilgilendirileceksiniz.",
      type: "success",
    });
    setContactInput("");
  };

  return (
    <section className="border-b border-primary bg-primary text-on-primary py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
        {/* Left Info */}
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 font-label-mono text-xs text-yellow-300 font-bold uppercase">
            <Flame className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>SINIRLI ÜRETİM SOKAK DROP &apos;02</span>
          </div>
          <h2 className="font-headline-md uppercase text-2xl md:text-4xl tracking-tighter font-bold">
            NEON CYBERPUNK // GELECEK DROP
          </h2>
          <p className="font-body-md text-xs md:text-sm text-on-primary/80 max-w-lg leading-relaxed">
            Yalnızca 100 adet numaralı üretim. Ağır gramajlı kumaşlar, reflektif dikişler ve krom aksesuarlar.
          </p>
        </div>

        {/* Middle: Live Digital Countdown Blocks */}
        <div className="flex items-center gap-3 md:gap-4 font-label-mono">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 md:p-4 min-w-[64px] md:min-w-[80px] text-center">
            <span className="font-price-lg text-2xl md:text-3xl font-bold block">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase text-white/70 tracking-widest mt-1 block">GÜN</span>
          </div>
          <span className="text-xl font-bold text-white/50">:</span>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 md:p-4 min-w-[64px] md:min-w-[80px] text-center">
            <span className="font-price-lg text-2xl md:text-3xl font-bold block">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase text-white/70 tracking-widest mt-1 block">SAAT</span>
          </div>
          <span className="text-xl font-bold text-white/50">:</span>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 md:p-4 min-w-[64px] md:min-w-[80px] text-center">
            <span className="font-price-lg text-2xl md:text-3xl font-bold block">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase text-white/70 tracking-widest mt-1 block">DAKİKA</span>
          </div>
          <span className="text-xl font-bold text-white/50">:</span>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 md:p-4 min-w-[64px] md:min-w-[80px] text-center">
            <span className="font-price-lg text-2xl md:text-3xl font-bold text-yellow-300 block">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase text-white/70 tracking-widest mt-1 block">SANİYE</span>
          </div>
        </div>

        {/* Right: VIP Early Access Form */}
        <div className="w-full lg:w-auto flex flex-col gap-2 min-w-[280px] sm:min-w-[340px]">
          {isRegistered ? (
            <div className="bg-white/10 border border-emerald-400 p-4 text-center font-label-mono text-xs flex items-center justify-center gap-2 text-emerald-300 font-bold">
              <Check className="w-4 h-4" />
              <span>Erken Erişim Listesine Kaydedildiniz!</span>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-2">
              <span className="font-label-mono text-[11px] uppercase text-white/80 font-bold">
                1 Saat Önceden Haberdar Olun:
              </span>
              <div className="flex border border-white/30 focus-within:border-white">
                <input
                  type="text"
                  required
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  placeholder="Telefon veya E-posta girin"
                  className="bg-black/40 px-3 py-2.5 font-label-mono text-xs text-white placeholder-white/50 focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-label-mono text-xs px-4 py-2.5 uppercase font-bold hover:bg-yellow-300 transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
                >
                  <Bell className="w-3.5 h-3.5" /> Katıl
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
