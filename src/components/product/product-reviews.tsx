"use client";

import React, { useState } from "react";
import { Star, CheckCircle, MessageSquarePlus } from "lucide-react";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  sizePurchased: string;
  fit: "Tam Beden" | "Dar Kesim" | "Oversized";
  comment: string;
}

export interface ProductReviewsProps {
  productId: string;
  productTitle: string;
}

export function ProductReviews({ productTitle }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      author: "Caner K.",
      rating: 5,
      date: "18 Ağustos 2026",
      sizePurchased: "M",
      fit: "Tam Beden",
      comment:
        "Kumaş kalitesi ve dikiş mimarisi inanılmaz. Su iticilik ve kapüşon yapısı tam bir techwear şaheseri. Beklediğimden çok daha tok bir duruşu var.",
    },
    {
      id: "rev-2",
      author: "Eren D.",
      rating: 5,
      date: "04 Ağustos 2026",
      sizePurchased: "L",
      fit: "Oversized",
      comment:
        "Oversized kesimi çok başarılı. 188 cm boy için L beden tam istediğim dökümlü silueti verdi. Paketleme ve kargo çok hızlıydı.",
    },
    {
      id: "rev-3",
      author: "Burak S.",
      rating: 4,
      date: "29 Temmuz 2026",
      sizePurchased: "S",
      fit: "Tam Beden",
      comment:
        "Fermuar kalitesi ve ceplerin yerleşimi çok fonksiyonel. Minimalist ve sert tasarım arayanlara kesinlikle tavsiye ederim.",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [sizePurchased, setSizePurchased] = useState("M");
  const [fit, setFit] = useState<"Tam Beden" | "Dar Kesim" | "Oversized">("Tam Beden");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author,
      rating,
      date: "Bugün",
      sizePurchased,
      fit,
      comment,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setAuthor("");
    setComment("");
    setTimeout(() => {
      setIsFormOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="p-4 md:p-10 border-b border-primary bg-surface flex flex-col gap-8">
      {/* Header & Rating Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary pb-6">
        <div>
          <span className="font-label-mono text-xs uppercase text-on-surface-variant block mb-1">
            DOĞRULANMIŞ DEĞERLENDİRMELER
          </span>
          <h3 className="font-headline-sm uppercase text-primary">
            Müşteri Yorumları ({reviews.length})
          </h3>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-2">
            <span className="font-price-lg text-2xl text-primary font-bold">
              {averageRating}
            </span>
            <span className="font-label-mono text-xs text-on-surface-variant">/ 5.0</span>
            <div className="flex text-primary ml-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(Number(averageRating))
                      ? "fill-primary text-primary"
                      : "text-outline-variant"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 border border-primary px-4 py-2 font-label-mono text-xs uppercase hover:bg-primary hover:text-on-primary transition-colors cursor-pointer bg-surface"
          >
            <MessageSquarePlus className="w-4 h-4" /> {isFormOpen ? "Kapat" : "Yorum Yaz"}
          </button>
        </div>
      </div>

      {/* Write Review Form */}
      {isFormOpen && (
        <div className="p-6 border border-primary bg-surface-container-low flex flex-col gap-4 animate-in fade-in">
          <h4 className="font-body-md font-bold uppercase text-primary text-sm">
            {productTitle} İçin Değerlendirme Yazın
          </h4>

          {submitted ? (
            <p className="font-label-mono text-xs text-primary uppercase border border-primary p-3 bg-surface">
              ✓ Yorumunuz başarıyla yayınlandı. Teşekkür ederiz.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Rating Picker */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Puan</label>
                  <div className="flex gap-1 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= rating
                              ? "fill-primary text-primary"
                              : "text-outline-variant"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Adınız"
                    className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none"
                  />
                </div>

                {/* Size & Fit */}
                <div className="flex flex-col gap-1">
                  <label className="font-label-mono text-xs uppercase text-primary">Beden / Kalıp</label>
                  <div className="flex gap-2">
                    <select
                      value={sizePurchased}
                      onChange={(e) => setSizePurchased(e.target.value)}
                      className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                    <select
                      value={fit}
                      onChange={(e) => setFit(e.target.value as "Tam Beden" | "Dar Kesim" | "Oversized")}
                      className="border border-primary bg-surface p-2.5 font-label-mono text-xs text-primary focus:outline-none flex-1"
                    >
                      <option value="Tam Beden">Tam Beden</option>
                      <option value="Oversized">Oversized</option>
                      <option value="Dar Kesim">Dar Kesim</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Comment Text */}
              <div className="flex flex-col gap-1">
                <label className="font-label-mono text-xs uppercase text-primary">Yorumunuz</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Kumaş dokusu, kalıp ve kullanım deneyiminiz hakkında detay paylaşın..."
                  className="border border-primary bg-surface p-3 font-body-md text-sm text-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="self-start bg-primary text-on-primary font-label-mono text-xs px-8 py-3 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer"
              >
                Yorumu Gönder
              </button>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="flex flex-col divide-y divide-primary border border-primary">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 flex flex-col gap-3 bg-surface">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-body-md font-bold text-primary text-sm">
                    {rev.author}
                  </span>
                  <span className="flex items-center gap-1 font-label-mono text-[10px] uppercase text-primary border border-outline-variant px-1.5 py-0.5">
                    <CheckCircle className="w-3 h-3 text-primary" /> Doğrulanmış Alıcı
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-primary">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= rev.rating
                            ? "fill-primary text-primary"
                            : "text-outline-variant"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-label-mono text-xs text-on-surface-variant">
                    {rev.date}
                  </span>
                </div>
              </div>

              <div className="font-label-mono text-xs text-on-surface-variant text-right">
                <span>Alınan Beden: {rev.sizePurchased}</span>
                <span className="block text-[11px]">Kalıp: {rev.fit}</span>
              </div>
            </div>

            <p className="font-body-md text-sm text-primary leading-relaxed mt-1">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
