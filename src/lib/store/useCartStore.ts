import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // unique item id: variantId
  productId: string;
  variantId: string;
  title: string;
  handle: string;
  variantTitle: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export interface AddItemInput {
  productId: string;
  variantId: string;
  title: string;
  handle: string;
  variantTitle: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: number;
  quantity?: number;
  image?: string;
  sku?: string;
}

interface CartStore {
  isOpen: boolean;
  cartId: string | null;
  items: CartItem[];

  // Drawer controls
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCartId: (cartId: string | null) => void;

  // Cart operations
  addItem: (item: AddItemInput) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;

  // Calculated values
  getTotalQuantity: () => number;
  getSubtotal: () => number;
  getFreeShippingThreshold: () => number;
  getFreeShippingRemaining: () => number;
  getFreeShippingProgress: () => number;
}

const FREE_SHIPPING_THRESHOLD = 1500; // 1.500 ₺ ücretsiz kargo limiti

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      isOpen: false,
      cartId: null,
      items: [
        {
          id: "var_02_l_blk",
          productId: "prod_02",
          variantId: "var_02_l_blk",
          title: "Fonksiyonel Ceket",
          handle: "utility-jacket",
          variantTitle: "L / Siyah",
          selectedOptions: [
            { name: "Beden", value: "L" },
            { name: "Renk", value: "Siyah" },
          ],
          price: 2400,
          quantity: 1,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
        },
      ],

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartId: (cartId) => set({ cartId }),

      addItem: (input) => {
        const { items } = get();
        const existingIndex = items.findIndex((i) => i.variantId === input.variantId);
        const qtyToAdd = input.quantity || 1;

        if (existingIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += qtyToAdd;
          set({ items: updatedItems, isOpen: true });
        } else {
          const newItem: CartItem = {
            id: input.variantId,
            productId: input.productId,
            variantId: input.variantId,
            title: input.title,
            handle: input.handle,
            variantTitle: input.variantTitle,
            selectedOptions: input.selectedOptions,
            price: input.price,
            quantity: qtyToAdd,
            image: input.image,
            sku: input.sku,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getFreeShippingThreshold: () => FREE_SHIPPING_THRESHOLD,

      getFreeShippingRemaining: () => {
        const subtotal = get().getSubtotal();
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      },

      getFreeShippingProgress: () => {
        const subtotal = get().getSubtotal();
        return Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
      },
    }),
    {
      name: "clost_cart_storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartId: state.cartId,
        items: state.items,
      }),
    }
  )
);
