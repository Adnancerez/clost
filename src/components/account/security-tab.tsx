"use client";

import React, { useState } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";
import { playClickSound } from "@/lib/audio/sound-effects";

export function SecurityTab() {
  const { addToast } = useToastStore();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    if (newPassword !== confirmPassword) {
      addToast({
        title: "Şifreler Eşleşmiyor",
        message: "Yeni şifre ve tekrarı birbiriyle aynı olmalıdır.",
        type: "warning",
      });
      return;
    }

    addToast({
      title: "Şifre Güncellendi",
      message: "Hesap güvenliğiniz başarıyla güncellendi.",
      type: "success",
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h2 className="font-headline-sm uppercase text-primary text-base border-b border-outline-variant pb-2">
        Güvenlik &amp; Giriş Ayarları
      </h2>

      {/* 2FA Security Box */}
      <div className="border border-primary p-5 bg-surface flex items-center justify-between font-label-mono text-xs">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
          <div>
            <p className="font-bold text-primary uppercase">İKİ ADIMLI DOĞRULAMA (2FA)</p>
            <p className="text-on-surface-variant text-[11px]">
              Girişlerde SMS ve E-posta onay kodu zorunludur.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setTwoFactorEnabled(!twoFactorEnabled);
            addToast({
              title: twoFactorEnabled ? "2FA Devre Dışı Bırakıldı" : "2FA Etkinleştirildi",
              message: "Güvenlik tercihiniz güncellendi.",
              type: "info",
            });
          }}
          className={`px-3 py-1 border border-primary text-[10px] uppercase font-bold cursor-pointer transition-colors ${
            twoFactorEnabled
              ? "bg-primary text-on-primary"
              : "bg-surface text-on-surface-variant"
          }`}
        >
          {twoFactorEnabled ? "AKTİF" : "KAPALI"}
        </button>
      </div>

      {/* Password Change Form */}
      <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 font-label-mono text-xs">
        <div>
          <label className="block text-on-surface-variant uppercase mb-1">MEVCUT ŞİFRE</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-on-surface-variant uppercase mb-1">YENİ ŞİFRE</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="En az 8 karakter"
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-on-surface-variant uppercase mb-1">YENİ ŞİFRE (TEKRAR)</label>
          <div className="relative">
            <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="En az 8 karakter"
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary py-3.5 uppercase tracking-widest font-bold transition-colors cursor-pointer mt-2"
        >
          Şifreyi Güncelle
        </button>
      </form>
    </div>
  );
}
