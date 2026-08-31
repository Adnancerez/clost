"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Star, ThumbsUp, CheckCircle2, MessageSquarePlus, X } from "lucide-react";
import { useReviewsStore, ProductReview } from "@/lib/store/useReviewsStore";
import { useToastStore } from "@/lib/store/useToastStore";

const emptySubscribe = () => () => {};

export function ProductReviews({ productHandle }: { productHandle: string }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { getReviewsByHandle, getAverageRating, addReview, likeReview } = useReviewsStore();
  const { addToast } = useToastStore();

  const reviews = isMounted ? getReviewsByHandle(productHandle) : [];
  const { average, count } = isMounted ? getAverageRating(productHandle) : { average: 5.0, count: 0 };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [sizePurchased, setSizePurchased] = useState("M");
  const [fitVerdict, setFitVerdict] = useState<ProductReview["fitVerdict"]>("Tam Beden");
  const [heightWeight, setHeightWeight] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview(productHandle, {
      productHandle,
      author: name.trim(),
      rating,
      verified: true,
      sizePurchased,
      fitVerdict,
      heightWeight: heightWeight.trim() || undefined,
      comment: comment.trim(),
    });

    addToast({
      title: "Değerlendirmeniz Alındı",
      message: "Yorumunuz için teşekkür ederiz.",
      type: "success",
    });

    setIsFormOpen(false);
    setName("");
    setComment("");
    setHeightWeight("");
  };

  // Fit calculations
  const totalFitReviews = reviews.length;
  const trueToSizeCount = reviews.filter((r) => r.fitVerdict === "Tam Beden").length;
  const oversizeCount = reviews.filter((r) => r.fitVerdict === "Oversize / Dökümlü").length;
  const smallCount = reviews.filter((r) => r.fitVerdict === "Dar Kalıp").length;

  const trueToSizePercent = totalFitReviews > 0 ? Math.round((trueToSizeCount / totalFitReviews) * 100) : 85;
  const oversizePercent = totalFitReviews > 0 ? Math.round((oversizeCount / totalFitReviews) * 100) : 15;
  const smallPercent = totalFitReviews > 0 ? Math.round((smallCount / totalFitReviews) * 100) : 0;

  return (
    <section className="p-4 sm:p-6 md:p-10 border-b border-primary bg-surface font-label-mono text-xs">
      {/* Header & Rating Summary */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary pb-6 mb-8">
        <div>
          <span className="text-[10px] uppercase text-on-surface-variant block mb-1 font-bold">
            DOĞRULANMIŞ SOKAK TOPLULUĞU
          </span>
          <h2 className="font-headline-sm uppercase text-primary text-xl font-bold">
            MÜŞTERİ DEĞERLENDİRMELERİ ({count})
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(average) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-price-lg text-primary text-base font-bold">
              {average.toFixed(1)} / 5.0
            </span>
            <span className="text-on-surface-variant text-[11px]">
              ({count} Kullanıcı Oyu)
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-primary text-on-primary uppercase font-bold hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer flex items-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Değerlendirme Yaz</span>
        </button>
      </div>

      {/* Fit Scale Progress Bar */}
      <div className="border border-primary bg-surface-container-low p-4 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-primary uppercase text-[11px]">
            KALIP &amp; SİLÜET UYUMU:
          </span>
          <span className="text-on-surface-variant text-[11px]">
            Müşterilerin <strong>%{trueToSizePercent}</strong> kadarı tam beden öneriyor
          </span>
        </div>

        {/* Multi-segment Bar */}
        <div className="w-full h-3 bg-surface border border-primary flex overflow-hidden">
          <div
            style={{ width: `${smallPercent}%` }}
            className="bg-amber-400 h-full transition-all"
            title={`Dar Kalıp: %${smallPercent}`}
          />
          <div
            style={{ width: `${trueToSizePercent}%` }}
            className="bg-emerald-500 h-full transition-all"
            title={`Tam Beden: %${trueToSizePercent}`}
          />
          <div
            style={{ width: `${oversizePercent}%` }}
            className="bg-sky-500 h-full transition-all"
            title={`Oversize / Dökümlü: %${oversizePercent}`}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-on-surface-variant mt-2 font-bold uppercase">
          <span>Dar Kalıp (%{smallPercent})</span>
          <span className="text-emerald-700">Tam Beden (%{trueToSizePercent})</span>
          <span>Oversize / Dökümlü (%{oversizePercent})</span>
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="border border-dashed border-primary p-8 text-center bg-surface-container-low">
          <p className="text-primary font-bold mb-2">Bu ürün için henüz yorum yazılmamış.</p>
          <p className="text-on-surface-variant text-[11px] mb-4">
            İlk değerlendirmeyi siz yazarak sokak topluluğuna ilham verin.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 border border-primary bg-surface hover:bg-primary hover:text-white uppercase font-bold"
          >
            İlk Yorumu Yaz
          </button>
        </div>
      ) : (
        <div className="divide-y divide-outline-variant border-t border-b border-primary">
          {reviews.map((rev) => (
            <div key={rev.id} className="py-6 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-sm uppercase">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 border border-emerald-300 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Doğrulanmış Alıcı
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-on-surface-variant">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span>•</span>
                    <span>Beden: <strong>{rev.sizePurchased}</strong></span>
                    {rev.heightWeight && (
                      <>
                        <span>•</span>
                        <span>{rev.heightWeight}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{rev.fitVerdict}</span>
                  </div>
                </div>

                <span className="text-[10px] text-on-surface-variant">{rev.date}</span>
              </div>

              <p className="font-body-md text-primary text-sm leading-relaxed mt-1">
                {rev.comment}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => likeReview(productHandle, rev.id)}
                  className="inline-flex items-center gap-1 text-[10px] text-on-surface-variant hover:text-primary p-1 border border-outline-variant hover:border-primary transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Faydalı Buldum ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog">
          <div onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/75 animate-in fade-in" />

          <div className="relative z-10 w-full max-w-lg bg-surface border-2 border-primary p-6 md:p-8 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-primary pb-3 mb-4">
              <h3 className="font-headline-sm uppercase text-primary text-base font-bold">
                DEĞERLENDİRME YAPIN
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1 hover:bg-surface-variant border border-transparent hover:border-primary cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-primary font-bold mb-1">Puanınız:</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-primary font-bold mb-1">Adınız / Rumuzunuz:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Derin A."
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-primary font-bold mb-1">Satın Alınan Beden:</label>
                  <select
                    value={sizePurchased}
                    onChange={(e) => setSizePurchased(e.target.value)}
                    className="w-full border border-primary p-2 bg-surface text-primary font-bold"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="30">30</option>
                    <option value="32">32</option>
                    <option value="34">34</option>
                    <option value="36">36</option>
                  </select>
                </div>

                <div>
                  <label className="block text-primary font-bold mb-1">Kalıp Nasıl Geldi?</label>
                  <select
                    value={fitVerdict}
                    onChange={(e) => setFitVerdict(e.target.value as ProductReview["fitVerdict"])}
                    className="w-full border border-primary p-2 bg-surface text-primary font-bold"
                  >
                    <option value="Tam Beden">Tam Beden</option>
                    <option value="Oversize / Dökümlü">Oversize / Dökümlü</option>
                    <option value="Dar Kalıp">Dar Kalıp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-primary font-bold mb-1">Boy / Kilo Bilgisi (Opsiyonel):</label>
                <input
                  type="text"
                  value={heightWeight}
                  onChange={(e) => setHeightWeight(e.target.value)}
                  placeholder="Örn: 175 cm / 62 kg"
                  className="w-full border border-primary p-2 bg-surface text-primary"
                />
              </div>

              <div>
                <label className="block text-primary font-bold mb-1">Yorumunuz:</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Kumaş dokusu, kalıbı ve kombin deneyiminizi paylaşın..."
                  required
                  className="w-full border border-primary p-2.5 bg-surface text-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary h-12 flex items-center justify-center uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors cursor-pointer font-bold mt-2"
              >
                Yorumu Yayınla
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
