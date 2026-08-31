"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, User, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useToastStore } from "@/lib/store/useToastStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await login(email, password);
    if (res.success) {
      addToast({
        title: "Giriş Başarılı",
        message: `Hoş geldiniz, ${email}.`,
        type: "success",
      });
      router.push("/account");
    } else {
      setError(res.message || "Giriş başarısız oldu.");
    }
  };

  const handleFillDemoCustomer = () => {
    setEmail("musteri@clost.store");
    setPassword("clost123");
    setError(null);
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@clost.store");
    setPassword("admin123");
    setError(null);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-12 min-h-[calc(100vh-88px)] bg-surface">
      <div className="w-full max-w-md bg-surface border-2 border-primary p-6 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="border-b border-primary pb-4 mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label-mono text-xs uppercase text-on-surface-variant">
              MÜŞTERİ &amp; ÜYE GİRİŞİ
            </span>
          </div>
          <h1 className="font-headline-sm text-2xl uppercase tracking-tight text-primary font-bold">
            HESABINIZA GİRİŞ YAPIN
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 bg-red-950 text-red-200 border border-red-800 text-xs font-label-mono">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-label-mono text-xs">
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="uppercase text-primary font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Şifre
              </label>
              <button
                type="button"
                onClick={() => addToast({ title: "Şifre Sıfırlama", message: "Demo ortamında şifreniz: clost123 veya admin123", type: "info" })}
                className="text-on-surface-variant hover:text-primary underline text-[11px]"
              >
                Şifremi Unuttum?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border border-primary p-3 pr-10 bg-surface text-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 my-1">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 border-primary rounded-none accent-primary cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-on-surface-variant cursor-pointer select-none">
              Beni Hatırla (30 Gün)
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs font-bold gap-2 mt-2"
          >
            {isLoading ? "Giriş Yapılıyor..." : <><span>Giriş Yap</span> <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>

        {/* Demo Fast Logins */}
        <div className="mt-8 border-t border-outline-variant pt-6 font-label-mono text-xs">
          <span className="text-on-surface-variant uppercase text-[10px] block mb-2 font-bold">
            HIZLI DEMO GİRİŞİ:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleFillDemoCustomer}
              className="p-2 border border-primary/40 bg-surface hover:border-primary hover:bg-surface-variant text-left transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span className="truncate">Demo Müşteri</span>
            </button>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="p-2 border border-primary/40 bg-surface hover:border-primary hover:bg-surface-variant text-left transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="truncate">Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Register CTA */}
        <div className="mt-6 text-center font-label-mono text-xs text-on-surface-variant border-t border-primary/20 pt-4">
          Henüz CLOST üyesi değil misiniz?{" "}
          <Link href="/register" className="text-primary font-bold underline hover:opacity-75">
            Hesap Oluşturun →
          </Link>
        </div>
      </div>
    </main>
  );
}
