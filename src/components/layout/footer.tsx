"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquareHeart } from "lucide-react";
import {
  FOOTER_SECTIONS,
  SOCIAL_LINKS,
  PAYMENT_METHODS,
} from "@/lib/constants/navigation";
import { useToastStore } from "@/lib/store/useToastStore";
import { useFeedbackStore } from "@/lib/store/useFeedbackStore";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToastStore();
  const { openFeedback } = useFeedbackStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      addToast({
        title: "Bültene Kaydoldunuz",
        message: "%10 indirim kodunuz: CLOST10",
        type: "success",
      });
    }
  };

  return (
    <footer className="w-full bg-surface mt-auto">
      <div className="px-4 md:px-10">
        {/* Top: Brand + Newsletter */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-outline-variant">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-display-lg-mobile md:text-[80px] md:leading-[72px] font-light tracking-tight text-primary uppercase"
            >
              CLOST
            </Link>
            <p className="font-body-md text-on-surface-variant text-sm leading-relaxed max-w-xs">
              Y2K, Acubi, Skater ve Harajuku sokak modası arşivi. Kullanışlılık
              için tasarlandı.
            </p>
            <button
              type="button"
              onClick={openFeedback}
              className="mt-2 flex items-center gap-1.5 font-label-mono text-xs text-primary underline hover:opacity-60 cursor-pointer w-max"
            >
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>Geri Bildirim / Öneri Gönder</span>
            </button>
          </div>

          <div className="flex flex-col gap-3 md:items-end md:justify-center">
            <span className="font-label-mono text-on-surface-variant text-xs">
              Bülten
            </span>
            {subscribed ? (
              <p className="font-body-md text-sm text-primary">
                ✓ Bültene başarıyla abone oldunuz.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full md:w-80 border-b border-outline-variant focus-within:border-primary transition-colors"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="bg-transparent border-none focus:outline-none font-body-md text-sm px-0 py-2.5 w-full text-primary placeholder-on-surface-variant"
                />
                <button
                  type="submit"
                  className="font-label-mono text-xs text-primary hover:opacity-60 px-2 cursor-pointer"
                >
                  Kayıt Ol
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: Link Columns + Social */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          {FOOTER_SECTIONS.map((sec) => (
            <div key={sec.title} className="flex flex-col gap-3">
              <span className="font-label-mono text-primary text-xs">
                {sec.title}
              </span>
              {sec.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="font-body-md text-on-surface-variant text-sm hover:text-primary transition-colors leading-snug"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="font-label-mono text-primary text-xs">
              Takip Et
            </span>
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-md text-on-surface-variant text-sm hover:text-primary transition-colors leading-snug"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright + Payment */}
        <div className="py-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-body-md text-on-surface-variant text-xs">
            © 2026 clost.tr — Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="font-label-mono text-on-surface-variant text-[10px]"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
