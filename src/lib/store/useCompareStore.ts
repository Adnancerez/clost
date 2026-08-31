import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/lib/shopify/types";

import { useToastStore } from "./useToastStore";

interface CompareStore {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  getCount: () => number;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCompare: (product) => {
        const { items } = get();
        if (items.length >= 4) {
          useToastStore.getState().addToast({
            title: "Karşılaştırma Limiti",
            message: "En fazla 4 ürünü aynı anda karşılaştırabilirsiniz.",
            type: "warning",
          });
          return;
        }
        if (!items.some((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeFromCompare: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      toggleCompare: (product) => {
        const { items, addToCompare, removeFromCompare } = get();
        if (items.some((item) => item.id === product.id)) {
          removeFromCompare(product.id);
        } else {
          addToCompare(product);
        }
      },

      isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearCompare: () => set({ items: [] }),

      getCount: () => get().items.length,
    }),
    {
      name: "clost_compare_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
