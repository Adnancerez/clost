import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ProductReview {
  id: string;
  productHandle: string;
  author: string;
  rating: number; // 1 - 5
  date: string;
  verified: boolean;
  sizePurchased: string;
  fitVerdict: "Tam Beden" | "Oversize / Dökümlü" | "Dar Kalıp";
  heightWeight?: string;
  comment: string;
  likes: number;
}

interface ReviewsStore {
  reviews: Record<string, ProductReview[]>;
  getReviewsByHandle: (handle: string) => ProductReview[];
  getAverageRating: (handle: string) => { average: number; count: number };
  addReview: (handle: string, review: Omit<ProductReview, "id" | "date" | "likes">) => void;
  likeReview: (handle: string, reviewId: string) => void;
}

const DEFAULT_REVIEWS: Record<string, ProductReview[]> = {
  "sloid-unicorn-graphic-zip-hoodie": [
    {
      id: "rev_01",
      productHandle: "sloid-unicorn-graphic-zip-hoodie",
      author: "Derin A.",
      rating: 5,
      date: "24 Ağustos 2026",
      verified: true,
      sizePurchased: "M",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "172 cm / 58 kg",
      comment:
        "Sarı rengi fotoğraftakinden bile daha canlı! Kumaşı çok kalın ve fermuarı tok duruyor. Unicorn baskısı serigrafi olduğu için yıkamada hiç bozulmadı, tam aradığım Y2K parçası.",
      likes: 18,
    },
    {
      id: "rev_02",
      productHandle: "sloid-unicorn-graphic-zip-hoodie",
      author: "Kaan T.",
      rating: 5,
      date: "18 Ağustos 2026",
      verified: true,
      sizePurchased: "L",
      fitVerdict: "Tam Beden",
      heightWeight: "183 cm / 74 kg",
      comment:
        "Kolundaki şeritler ve Japonca tipografi çok iyi düşünülmüş. Oversize duruşu mükemmel.",
      likes: 9,
    },
  ],
  "jelly-star-striped-longsleeve": [
    {
      id: "rev_03",
      productHandle: "jelly-star-striped-longsleeve",
      author: "Ece K.",
      rating: 5,
      date: "27 Ağustos 2026",
      verified: true,
      sizePurchased: "S",
      fitVerdict: "Oversize / Dökümlü",
      heightWeight: "165 cm / 50 kg",
      comment:
        "Turkuaz rengi ve koldaki sarı yıldız aplikeleri aşırı tatlı! Baggy pantolonlarla kombinleyince tam TikTok/Pinterest stili oluyor.",
      likes: 24,
    },
  ],
  "ultra-baggy-balloon-raw-denim": [
    {
      id: "rev_04",
      productHandle: "ultra-baggy-balloon-raw-denim",
      author: "Mert S.",
      rating: 5,
      date: "29 Ağustos 2026",
      verified: true,
      sizePurchased: "32",
      fitVerdict: "Tam Beden",
      heightWeight: "180 cm / 72 kg",
      comment:
        "Paça genişliği ve ayakkabı üzerine dökülmesi efsane. 14.5 oz sert raw denim hissiyatı gerçek 2000'ler skater pantolonları gibi.",
      likes: 31,
    },
  ],
  "starlet-retro-pop-baby-tee": [
    {
      id: "rev_05",
      productHandle: "starlet-retro-pop-baby-tee",
      author: "Melis B.",
      rating: 5,
      date: "25 Ağustos 2026",
      verified: true,
      sizePurchased: "S",
      fitVerdict: "Tam Beden",
      heightWeight: "168 cm / 52 kg",
      comment:
        "Kalıbı vücudu tam sarıyor, crop boyu tam bel hizasında. Kırmızı yıldız baskısı çok tatlı.",
      likes: 14,
    },
  ],
};

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: DEFAULT_REVIEWS,

      getReviewsByHandle: (handle: string) => {
        return get().reviews[handle] || [];
      },

      getAverageRating: (handle: string) => {
        const list = get().reviews[handle] || [];
        if (list.length === 0) return { average: 5.0, count: 0 };
        const sum = list.reduce((acc, r) => acc + r.rating, 0);
        return {
          average: Math.round((sum / list.length) * 10) / 10,
          count: list.length,
        };
      },

      addReview: (handle, reviewData) => {
        const currentList = get().reviews[handle] || [];
        const newReview: ProductReview = {
          ...reviewData,
          id: `rev_${Date.now()}`,
          date: "Bugün",
          likes: 0,
        };
        set((state) => ({
          reviews: {
            ...state.reviews,
            [handle]: [newReview, ...currentList],
          },
        }));
      },

      likeReview: (handle, reviewId) => {
        const currentList = get().reviews[handle] || [];
        const updated = currentList.map((r) =>
          r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
        );
        set((state) => ({
          reviews: {
            ...state.reviews,
            [handle]: updated,
          },
        }));
      },
    }),
    {
      name: "clost_reviews_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
