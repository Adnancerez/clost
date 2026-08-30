"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FOOTER_SECTIONS } from "@/lib/constants/navigation";
import { playClickSound, playSuccessSound } from "@/lib/audio/sound-effects";
import { useToastStore } from "@/lib/store/useToastStore";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToastStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      playSuccessSound();
      setSubscribed(true);
      setEmail("");
      addToast({
        title: "Bültene Kaydoldunuz",
        message: "%10 indirim kodunuz: HOSGELDIN10",
        type: "success",
      });
    }
  };

  return (
    <footer className="w-full py-12 px-4 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-8 bg-surface border-t border-primary mt-auto">
      {/* Brand & Mission */}
      <div className="md:col-span-1">
        <div className="font-headline-sm font-bold text-primary mb-2 uppercase tracking-tighter">
          CLOST
        </div>
        <p className="font-label-mono text-on-surface-variant text-xs max-w-[240px] leading-relaxed">
          © 2026 CLOST.<br />KULLANIŞLILIK İÇİN TASARLANDI.
        </p>
      </div>

      {/* Structured Links */}
      <div className="md:col-span-3 flex flex-col sm:flex-row gap-8 sm:gap-14 justify-end">
        {FOOTER_SECTIONS.map((sec) => (
          <div key={sec.title} className="flex flex-col gap-2 font-label-mono text-xs">
            <span className="uppercase text-primary font-bold mb-1">{sec.title}</span>
            {sec.links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                onClick={playClickSound}
                className="text-on-surface-variant hover:text-primary underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Newsletter */}
        <div className="flex flex-col gap-2 w-full sm:w-72">
          <span className="font-label-mono uppercase text-primary font-bold mb-1 text-xs">
            Arşiv E-Bülteni
          </span>
          {subscribed ? (
            <p className="font-label-mono text-xs text-primary uppercase border border-primary p-2">
              ✓ Bültene başarıyla abone oldunuz
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex border-b border-primary focus-within:border-primary transition-colors"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-POSTA ADRESİNİZ"
                className="bg-transparent border-none focus:outline-none font-label-mono text-xs px-0 py-2 w-full text-primary placeholder-on-surface-variant uppercase"
              />
              <button
                type="submit"
                className="font-label-mono text-xs text-primary hover:opacity-70 px-2 uppercase cursor-pointer"
              >
                Kayıt Ol
              </button>
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}
