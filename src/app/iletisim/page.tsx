"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Calendar, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Showroom Ziyareti / VIP Randevu");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitted(true);
  };

  return (
    <main className="flex-grow flex flex-col">
      {/* Header */}
      <header className="p-6 md:p-12 border-b border-primary bg-surface flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-2">
            İSTANBUL SHOWROOM &amp; GENEL MERKEZ
          </span>
          <h1 className="font-display-lg-mobile md:font-display-lg uppercase tracking-tighter text-primary">
            İLETİŞİM &amp; SHOWROOM
          </h1>
        </div>
        <p className="font-label-mono text-xs uppercase text-on-surface-variant max-w-xs">
          Koleksiyonları yakından deneyimlemek için showroom randevusu oluşturun.
        </p>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-primary max-w-[1920px] mx-auto w-full">
        {/* Left Column: Location Info & Hours */}
        <div className="lg:col-span-5 p-6 md:p-12 bg-surface-container-low flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="font-label-mono text-xs uppercase text-on-surface-variant border-b border-primary pb-1 inline-block w-max">
              LOKASYON 01 // İSTANBUL
            </span>
            <h2 className="font-headline-sm uppercase text-primary text-xl">
              CLOST Showroom &amp; Tasarım Stüdyosu
            </h2>
            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Tüm temel arşiv parçalarının, prototiplerin ve kumaş örneklerinin sergilendiği monolitik showroom alanımız.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="flex flex-col gap-6 font-label-mono text-xs text-primary border-t border-b border-primary py-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase">Adres</span>
                <span className="text-on-surface-variant mt-0.5 block">
                  Levent Mah. Cömert Sok. No: 12, Kat: 3<br />
                  Beşiktaş / İstanbul, Türkiye
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase">Çalışma Saatleri</span>
                <span className="text-on-surface-variant mt-0.5 block">
                  Pazartesi – Cumartesi: 10:00 – 20:00<br />
                  Pazar: Yalnızca Özel Randevu İle
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase">Telefon &amp; WhatsApp</span>
                <span className="text-on-surface-variant mt-0.5 block">
                  0850 000 00 00 / +90 (212) 000 00 00
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block uppercase">E-Posta</span>
                <span className="text-on-surface-variant mt-0.5 block">
                  destek@clost.store / hello@clost.store
                </span>
              </div>
            </div>
          </div>

          {/* Google Maps External Link */}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-primary p-4 font-label-mono text-xs uppercase text-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
          >
            Google Haritalar&apos;da Aç ↗
          </a>
        </div>

        {/* Right Column: Appointment & Message Form */}
        <div className="lg:col-span-7 p-6 md:p-12 bg-surface flex flex-col gap-6">
          <div>
            <h2 className="font-headline-sm uppercase text-primary text-xl">
              VIP Randevu &amp; İletişim Formu
            </h2>
            <p className="font-label-mono text-xs text-on-surface-variant mt-1">
              Birebir stil danışmanlığı veya kurumsal talepleriniz için formu doldurun.
            </p>
          </div>

          {isSubmitted ? (
            <div className="border border-primary p-8 bg-surface-container-low flex flex-col items-center text-center gap-4 animate-in fade-in my-auto">
              <CheckCircle2 className="w-12 h-12 text-primary" />
              <h3 className="font-headline-sm uppercase text-primary">
                Talebiniz Alındı
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md">
                Sayın {name}, randevu ve mesaj talebiniz showroom koordinatörümüze iletilmiştir. En kısa sürede telefon veya e-posta yoluyla sizinle iletişime geçeceğiz.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 border border-primary px-8 py-3 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Ad Soyad *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Adınız Soyadınız"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">E-Posta *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@domain.com"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Telefon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XX XXX XX XX"
                    className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Talep Edilen Randevu Tarihi</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary w-full focus:outline-none"
                    />
                    <Calendar className="w-4 h-4 text-outline absolute right-3 top-3.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Konu</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border border-primary bg-surface p-3 font-label-mono text-xs text-primary focus:outline-none"
                >
                  <option value="Showroom Ziyareti / VIP Randevu">Showroom Ziyareti / VIP Randevu</option>
                  <option value="Sipariş & Kargo Danışmanlığı">Sipariş &amp; Kargo Danışmanlığı</option>
                  <option value="Özel Dikim & Beden Uyumu">Özel Dikim &amp; Beden Uyumu</option>
                  <option value="Basın & İş Birlikleri">Basın &amp; İş Birlikleri</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Mesajınız *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ziyaret saati tercihiniz veya öğrenmek istediğiniz detayları yazın..."
                  className="border border-primary bg-surface p-3 font-body-md text-sm text-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer text-xs mt-2 gap-2"
              >
                <Send className="w-4 h-4" /> Randevu &amp; Mesaj Talebi Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
