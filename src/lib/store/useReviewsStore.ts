import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductReview {
  id: string;
  productHandle: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  sizePurchased: string;
  fitVerdict: "Dar Kalıp" | "Tam Beden" | "Oversize / Dökümlü";
  heightWeight?: string;
  comment: string;
  likes: number;
}

interface ReviewsState {
  reviews: Record<string, ProductReview[]>;
  getReviewsByHandle: (handle: string) => ProductReview[];
  getAverageRating: (handle: string) => { average: number; count: number };
  addReview: (handle: string, review: Omit<ProductReview, "id" | "date" | "likes">) => void;
  likeReview: (handle: string, reviewId: string) => void;
}

const DEFAULT_REVIEWS: Record<string, ProductReview[]> = {
  "cyber-neon-rugby-boxy-polo": [
    {
      id: "rev_01",
      productHandle: "cyber-neon-rugby-boxy-polo",
      author: "Caner K.",
      rating: 5,
      date: "28 Ağustos 2026",
      verified: true,
      sizePurchased: "M",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "182 cm / 72 kg",
      comment:
        "Neon yeşil ve kobalt mavisi şeritlerin canlılığı inanılmaz! Yaka dik ve kaliteli duruyor, kumaşı terletmeyen ağır pique pamuk.",
      likes: 18,
    },
    {
      id: "rev_02",
      productHandle: "cyber-neon-rugby-boxy-polo",
      author: "Eren T.",
      rating: 5,
      date: "22 Ağustos 2026",
      verified: true,
      sizePurchased: "L",
      fitVerdict: "Tam Beden",
      heightWeight: "185 cm / 80 kg",
      comment:
        "Baggy raw jorts ile mükemmel kombinlendi. Skater silüeti arayanlar kesinlikle kendi bedenini almalı.",
      likes: 12,
    },
  ],
  "volt-yellow-mesh-summer-track-jacket": [
    {
      id: "rev_03",
      productHandle: "volt-yellow-mesh-summer-track-jacket",
      author: "Deniz Y.",
      rating: 5,
      date: "29 Ağustos 2026",
      verified: true,
      sizePurchased: "L",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "180 cm / 75 kg",
      comment:
        "Volt sarısı rengi sokakta direkt dikkat çekiyor. Sırttaki file havalandırma yaz akşamları için ideal.",
      likes: 24,
    },
  ],
  "acid-purple-cyber-kanji-heavyweight-tee": [
    {
      id: "rev_04",
      productHandle: "acid-purple-cyber-kanji-heavyweight-tee",
      author: "Mert S.",
      rating: 5,
      date: "25 Ağustos 2026",
      verified: true,
      sizePurchased: "M",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "178 cm / 68 kg",
      comment:
        "Sıvı krom kabartma baskı efsane yapılmış. Yıkadım dökülme veya çatlama olmadı, kumaşı çok tok.",
      likes: 15,
    },
  ],
  "ultra-baggy-raw-denim-skater-jorts": [
    {
      id: "rev_05",
      productHandle: "ultra-baggy-raw-denim-skater-jorts",
      author: "Ozan B.",
      rating: 5,
      date: "27 Ağustos 2026",
      verified: true,
      sizePurchased: "32",
      fitVerdict: "Tam Beden",
      heightWeight: "183 cm / 76 kg",
      comment:
        "14.5 oz ham selvedge denim kalitesi hissettiriyor. Turuncu punteriz dikişler ve diz altına inen geniş paça tam 2000'ler.",
      likes: 31,
    },
  ],
  "cyber-orange-lightweight-parachute-cargo-pants": [
    {
      id: "rev_06",
      productHandle: "cyber-orange-lightweight-parachute-cargo-pants",
      author: "Bora K.",
      rating: 5,
      date: "26 Ağustos 2026",
      verified: true,
      sizePurchased: "M",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "181 cm / 73 kg",
      comment:
        "Rengi fotoğraftaki gibi bomba! Bungee stoperler sayesinde paçayı istediğiniz bollukta ayarlayabiliyorsunuz.",
      likes: 20,
    },
  ],
};

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: DEFAULT_REVIEWS,

      getReviewsByHandle: (handle: string) => {
        return get().reviews[handle] || [];
      },

      getAverageRating: (handle: string) => {
        const revs = get().getReviewsByHandle(handle);
        if (revs.length === 0) return { average: 5.0, count: 0 };

        const sum = revs.reduce((acc, curr) => acc + curr.rating, 0);
        return {
          average: parseFloat((sum / revs.length).toFixed(1)),
          count: revs.length,
        };
      },

      addReview: (handle, reviewData) => {
        set((state) => {
          const current = state.reviews[handle] || [];
          const newReview: ProductReview = {
            ...reviewData,
            id: `rev_${Date.now()}`,
            productHandle: handle,
            date: "Bugün",
            likes: 0,
          };
          return {
            reviews: {
              ...state.reviews,
              [handle]: [newReview, ...current],
            },
          };
        });
      },

      likeReview: (handle, reviewId) => {
        set((state) => {
          const current = state.reviews[handle] || [];
          const updated = current.map((r) =>
            r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
          );
          return {
            reviews: {
              ...state.reviews,
              [handle]: updated,
            },
          };
        });
      },
    }),
    {
      name: "clost-product-reviews",
    }
  )
);
