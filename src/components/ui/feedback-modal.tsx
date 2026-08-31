"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { X, MessageSquareHeart, Star, Send, CheckCircle2, Bug, Sparkles, ShoppingBag, ThumbsUp } from "lucide-react";
import { useFeedbackStore, FeedbackType } from "@/lib/store/useFeedbackStore";
import { useToastStore } from "@/lib/store/useToastStore";

export function FeedbackModal() {
  const pathname = usePathname();
  const { isOpen, closeFeedback, addFeedback } = useFeedbackStore();
  const { addToast } = useToastStore();

  const [type, setType] = useState<FeedbackType>("experience");
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addFeedback({
        type,
        rating,
        message: message.trim(),
        email: email.trim() || undefined,
        pageUrl: pathname || "/",
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      addToast({
        title: "Geri Bildiriminiz Alındı!",
        message: "Değerli görüşleriniz için teşekkür ederiz. Sistemimize kaydedildi.",
        type: "success",
      });

      setTimeout(() => {
        setIsSuccess(false);
        setMessage("");
        setEmail("");
        setRating(5);
        closeFeedback();
      }, 1800);
    }, 400);
  };

  const categories = [
    { id: "experience", label: "Alışveriş Deneyimi", icon: ShoppingBag },
    { id: "product", label: "Ürün Kalitesi & Kalıp", icon: Sparkles },
    { id: "bug", label: "Hata / Teknik Bildirim", icon: Bug },
    { id: "suggestion", label: "Öneri & İstek", icon: ThumbsUp },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeFeedback}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg bg-surface border-2 border-primary shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200 font-sans">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeFeedback}
          aria-label="Kapat"
          className="absolute top-4 right-4 text-primary hover:opacity-70 cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in zoom-in-90 duration-300">
            <div className="w-16 h-16 bg-primary text-white flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="font-headline-sm uppercase text-xl font-bold tracking-tight text-primary">
              Geri Bildiriminiz Gönderildi
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant max-w-xs leading-relaxed">
              Görüşleriniz CLOST ürün ve kullanıcı deneyimini mükemmelleştirmek için doğrudan ekibimize iletildi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1 text-primary">
                <MessageSquareHeart className="w-5 h-5" />
                <span className="font-label-mono text-xs uppercase font-bold tracking-wider">
                  MÜŞTERİ GERİ BİLDİRİMİ
                </span>
              </div>
              <h2 className="font-headline-sm uppercase text-primary text-xl font-bold tracking-tight">
                Görüşlerinizi Bizimle Paylaşın
              </h2>
              <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
                Sitemiz, ürünlerimiz veya alışveriş deneyiminiz hakkında ne düşünüyorsunuz?
              </p>
            </div>

            {/* Category Type Pills */}
            <div className="flex flex-col gap-2">
              <label className="font-label-mono text-xs uppercase text-primary font-bold">
                Kategori Seçin:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = type === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setType(cat.id as FeedbackType)}
                      className={`p-2.5 border text-left flex items-center gap-2 font-label-mono text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-primary text-white border-primary font-bold"
                          : "bg-surface text-primary border-outline-variant hover:border-primary"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Satisfaction Star Rating */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-label-mono text-xs uppercase text-primary font-bold">
                  Memnuniyet Dereceniz:
                </label>
                <span className="font-label-mono text-xs text-primary font-bold">
                  {rating === 5 && "★★★★★ (Kusursuz)"}
                  {rating === 4 && "★★★★☆ (Çok İyi)"}
                  {rating === 3 && "★★★☆☆ (Orta)"}
                  {rating === 2 && "★★☆☆☆ (Geliştirilmeli)"}
                  {rating === 1 && "★☆☆☆☆ (Kötü)"}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          active
                            ? "fill-primary text-primary"
                            : "text-outline-variant hover:text-primary"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5 font-label-mono text-xs">
              <label className="text-primary uppercase font-bold">
                Mesajınız / Öneriniz *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Düşüncelerinizi, karşılaştığınız bir sorunu veya sitede görmek istediğiniz bir özelliği yazın..."
                className="w-full bg-surface border border-primary p-3 focus:outline-none focus:ring-1 focus:ring-primary text-xs leading-relaxed resize-none"
              />
            </div>

            {/* Email (Optional) */}
            <div className="flex flex-col gap-1.5 font-label-mono text-xs">
              <label className="text-on-surface-variant uppercase">
                E-Posta Adresiniz (Geri dönüş için opsiyonel)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="adiniz@ornek.com"
                className="w-full bg-surface border border-outline-variant focus:border-primary p-2.5 focus:outline-none text-xs"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className="w-full bg-primary text-white font-label-mono h-12 flex items-center justify-center gap-2 hover:bg-surface-variant hover:text-primary border border-primary transition-colors uppercase tracking-widest text-xs font-bold cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                "Gönderiliyor..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Geri Bildirimi Gönder</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
