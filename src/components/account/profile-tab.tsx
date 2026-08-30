"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Award } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";
import { playClickSound } from "@/lib/audio/sound-effects";

export interface ProfileTabProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
}

export function ProfileTab({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
}: ProfileTabProps) {
  const { addToast } = useToastStore();
  const [profileSaved, setProfileSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setProfileSaved(true);
    addToast({
      title: "Profil Güncellendi",
      message: "Kişisel bilgileriniz başarıyla kaydedildi.",
      type: "success",
    });
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h2 className="font-headline-sm uppercase text-primary text-base border-b border-outline-variant pb-2">
        Profil &amp; Üyelik Bilgileri
      </h2>

      {/* VIP Status Banner */}
      <div className="border border-primary p-5 bg-surface flex items-center justify-between font-label-mono text-xs">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-primary" />
          <div>
            <p className="font-bold text-primary uppercase">CLOST VIP TIER // BLACK LEVEL</p>
            <p className="text-on-surface-variant text-[11px]">
              Toplam 2.450 Puan • Bir Sonraki Drop İçin Erken Erişim Aktif
            </p>
          </div>
        </div>
        <span className="bg-primary text-on-primary px-3 py-1 text-[10px] uppercase font-bold">
          AKTİF
        </span>
      </div>

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-4 font-label-mono text-xs">
        <div>
          <label className="block text-on-surface-variant uppercase mb-1">AD SOYAD</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3 uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-on-surface-variant uppercase mb-1">E-POSTA ADRESİ</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3 uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-on-surface-variant uppercase mb-1">TELEFON</label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-surface border border-primary pl-10 pr-3 py-3 uppercase"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary py-3.5 uppercase tracking-widest font-bold transition-colors cursor-pointer mt-2"
        >
          {profileSaved ? "✓ Bilgiler Kaydedildi" : "Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
