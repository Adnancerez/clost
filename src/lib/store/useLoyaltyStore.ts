import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UnlockedCoupon {
  id: string;
  code: string;
  title: string;
  discount: string;
  redeemedAt: string;
}

export interface TierProgress {
  current: number;
  max: number;
  percentage: number;
  nextTier?: string;
  pointsNeeded?: number;
}

interface LoyaltyStore {
  points: number;
  tier: "Operatif" | "Kıdemli" | "Mimar";
  unlockedCoupons: UnlockedCoupon[];
  redeemReward: (cost: number, codePrefix: string, title: string, discount: string) => boolean;
  addPoints: (amount: number) => void;
  resetLoyalty: () => void;
  getTierProgress: () => TierProgress;
}

export const useLoyaltyStore = create<LoyaltyStore>()(
  persist(
    (set, get) => ({
      points: 2450,
      tier: "Kıdemli",
      unlockedCoupons: [
        {
          id: "cp-01",
          code: "VIP100-8821",
          title: "100 ₺ Hediye İndirim Kuponu",
          discount: "100 ₺",
          redeemedAt: "20 Ağustos 2026",
        },
      ],

      resetLoyalty: () => {
        set({ points: 0, tier: "Operatif", unlockedCoupons: [] });
      },

      redeemReward: (cost, codePrefix, title, discount) => {
        const { points, unlockedCoupons } = get();
        if (points < cost) return false;

        const serial = Math.floor(1000 + Math.random() * 9000);
        const newCoupon: UnlockedCoupon = {
          id: `cp-${Date.now()}`,
          code: `${codePrefix}-${serial}`,
          title,
          discount,
          redeemedAt: "Bugün",
        };

        const remainingPoints = points - cost;
        let newTier: "Operatif" | "Kıdemli" | "Mimar" = "Operatif";
        if (remainingPoints >= 4000) newTier = "Mimar";
        else if (remainingPoints >= 1500) newTier = "Kıdemli";

        set({
          points: remainingPoints,
          tier: newTier,
          unlockedCoupons: [newCoupon, ...unlockedCoupons],
        });

        return true;
      },

      addPoints: (amount) => {
        const nextPoints = get().points + amount;
        let newTier: "Operatif" | "Kıdemli" | "Mimar" = "Operatif";
        if (nextPoints >= 4000) newTier = "Mimar";
        else if (nextPoints >= 1500) newTier = "Kıdemli";

        set({ points: nextPoints, tier: newTier });
      },

      getTierProgress: () => {
        const { points } = get();
        if (points >= 4000) {
          return { current: points, max: 5000, percentage: 100 };
        }
        if (points >= 1500) {
          return {
            current: points - 1500,
            max: 2500,
            percentage: Math.min(100, Math.round(((points - 1500) / 2500) * 100)),
            nextTier: "Mimar",
            pointsNeeded: 4000 - points,
          };
        }
        return {
          current: points,
          max: 1500,
          percentage: Math.min(100, Math.round((points / 1500) * 100)),
          nextTier: "Kıdemli",
          pointsNeeded: 1500 - points,
        };
      },
    }),
    {
      name: "clost_loyalty_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
