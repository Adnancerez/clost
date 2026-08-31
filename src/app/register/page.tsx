"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight, CheckSquare } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useToastStore } from "@/lib/store/useToastStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const { addToast } = useToastStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted) {
      setError("Lütfen üyelik ve gizlilik şartlarını onaylayın.");
      return;
    }

    const res = await register(name, email, password, phone);
    if (res.success) {
      addToast({
        title: "Kayıt Başarılı",
        message: `CLOST Arşivine hoş geldiniz, ${name}.`,
        type: "success",
      });
      router.push("/account");
    } else {
      setError(res.message || "Kayıt oluşturulamadı.");
    }
  };

  return (
    <main className="flex-grow pt-16 flex flex-col items-center justify-center p-4 md:p-12 min-h-[calc(100vh-64px)] bg-surface">
      <div className="w-full max-w-md bg-surface border-2 border-primary p-6 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="border-b border-primary pb-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              YENİ MÜŞTERİ KAYDI
            </span>
          </div>
          <h1 className="font-headline-sm text-2xl uppercase tracking-tight text-primary font-bold">
            CLOST HESABI OLUŞTURUN
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-950 text-red-200 border border-red-800 text-xs font-label-mono">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-label-mono text-xs">
          <div>
            <label className="block uppercase text-primary font-bold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Ad Soyad
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız ve Soyadınız"
              required
              className="w-full border border-primary p-3 bg-surface text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            />
          </div>

          <div>
            <label className="block uppercase text-primary font-bold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> E-Posta Adresi
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@clost.store"
              required
              className="w-full border border-primary p-3 bg-surface text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            />
          </div>

          <div>
            <label className="block uppercase text-primary font-bold mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Telefon Numarası (Opsiyonel)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+90 5XX XXX XX XX"
              className="w-full border border-primary p-3 bg-surface text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            />
          </div>

          <div>
            <label className="block uppercase text-primary font-bold mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Şifre Belirleyin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="En az 4 karakter"
              required
              minLength={4}
              className="w-full border border-primary p-3 bg-surface text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            />
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-start gap-2 my-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 border-primary rounded-none accent-primary cursor-pointer mt-0.5"
            />
            <label htmlFor="terms" className="text-on-surface-variant text-[11px] cursor-pointer select-none leading-relaxed">
              <Link href="/about" target="_blank" className="text-primary underline font-bold">
                Kullanım Koşulları
              </Link>{" "}
              ve{" "}
              <Link href="/about" target="_blank" className="text-primary underline font-bold">
                Gizlilik Politikası
              </Link>
              &apos;nı okudum ve kabul ediyorum.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs font-bold gap-2 mt-2"
          >
            {isLoading ? "Hesap Oluşturuluyor..." : <><span>Hesap Oluştur &amp; Giriş Yap</span> <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Login CTA */}
        <div className="mt-8 text-center font-label-mono text-xs text-on-surface-variant border-t border-primary/20 pt-4">
          Zaten bir hesabınız var mı?{" "}
          <Link href="/login" className="text-primary font-bold underline hover:opacity-75">
            Giriş Yapın →
          </Link>
        </div>
      </div>
    </main>
  );
}
