import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CurrencyCode = "TRY" | "USD" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateFromTRY: number; // e.g. 1 TRY = 0.029 USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  TRY: {
    code: "TRY",
    symbol: "₺",
    name: "Türk Lirası",
    rateFromTRY: 1,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    rateFromTRY: 0.029,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    rateFromTRY: 0.027,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    rateFromTRY: 0.023,
  },
};

interface CurrencyStore {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInTRY: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "TRY",
      setCurrency: (currency) => set({ currency }),
      formatPrice: (amountInTRY) => {
        const { currency } = get();
        const config = CURRENCIES[currency] || CURRENCIES.TRY;
        const converted = amountInTRY * config.rateFromTRY;

        if (currency === "TRY") {
          return `${Math.round(converted).toLocaleString("tr-TR")} ₺`;
        }
        if (currency === "USD") {
          return `$${converted.toFixed(2)}`;
        }
        if (currency === "EUR") {
          return `€${converted.toFixed(2)}`;
        }
        if (currency === "GBP") {
          return `£${converted.toFixed(2)}`;
        }
        return `${converted.toFixed(2)} ${currency}`;
      },
    }),
    {
      name: "clost_currency_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
