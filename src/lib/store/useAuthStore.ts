import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserAddress {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressDetail: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin";
  avatar?: string;
  memberSince: string;
  addresses: UserAddress[];
}

interface AuthStore {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

// Initial Demo Accounts
const DEMO_CUSTOMER: UserProfile = {
  id: "usr_cust_01",
  name: "Adnan Çerez",
  email: "musteri@clost.store",
  phone: "+90 532 000 00 00",
  role: "customer",
  memberSince: "2024-03-15",
  addresses: [
    {
      id: "addr_1",
      title: "Ev Adresi",
      fullName: "Adnan Çerez",
      phone: "+90 532 000 00 00",
      city: "İstanbul",
      district: "Kadıköy",
      addressDetail: "Moda Cad. No: 42 Daire: 7",
      isDefault: true,
    },
    {
      id: "addr_2",
      title: "Ofis / Stüdyo",
      fullName: "Adnan Çerez",
      phone: "+90 532 000 00 00",
      city: "İstanbul",
      district: "Beşiktaş",
      addressDetail: "Levent Mah. Cömert Sok. No: 12 Kat: 4",
      isDefault: false,
    },
  ],
};

const DEMO_ADMIN: UserProfile = {
  id: "usr_admin_01",
  name: "CLOST Lead Architect",
  email: "admin@clost.store",
  phone: "+90 555 999 88 77",
  role: "admin",
  memberSince: "2024-01-01",
  addresses: [
    {
      id: "addr_admin_1",
      title: "CLOST Headquarter",
      fullName: "CLOST HQ",
      phone: "+90 212 000 00 00",
      city: "İstanbul",
      district: "Şişli",
      addressDetail: "Büyükdere Cad. No: 180 Brutalist Hub",
      isDefault: true,
    },
  ],
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500)); // simulated latency

        const normalizedEmail = email.trim().toLowerCase();

        if (normalizedEmail === "admin@clost.store") {
          set({ user: DEMO_ADMIN, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        if (normalizedEmail === "musteri@clost.store" || password.length >= 4) {
          const userObj: UserProfile = {
            ...DEMO_CUSTOMER,
            email: normalizedEmail,
            name: normalizedEmail === "musteri@clost.store" ? DEMO_CUSTOMER.name : normalizedEmail.split("@")[0].toUpperCase(),
          };
          set({ user: userObj, isAuthenticated: true, isLoading: false });
          return { success: true };
        }

        set({ isLoading: false });
        return { success: false, message: "Geçersiz e-posta veya şifre." };
      },

      register: async (name: string, email: string, password: string, phone?: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 600));

        if (!name || !email || password.length < 4) {
          set({ isLoading: false });
          return { success: false, message: "Lütfen tüm zorunlu alanları doldurun (şifre en az 4 karakter)." };
        }

        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone?.trim() || "",
          role: "customer",
          memberSince: new Date().toISOString().split("T")[0],
          addresses: [],
        };

        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...data } });
      },

      addAddress: (newAddr) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const address: UserAddress = {
          ...newAddr,
          id: `addr_${Date.now()}`,
        };

        const updatedAddresses = newAddr.isDefault
          ? currentUser.addresses.map((a) => ({ ...a, isDefault: false })).concat(address)
          : [...currentUser.addresses, address];

        set({ user: { ...currentUser, addresses: updatedAddresses } });
      },

      deleteAddress: (addressId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            addresses: currentUser.addresses.filter((a) => a.id !== addressId),
          },
        });
      },

      setDefaultAddress: (addressId) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: {
            ...currentUser,
            addresses: currentUser.addresses.map((a) => ({
              ...a,
              isDefault: a.id === addressId,
            })),
          },
        });
      },
    }),
    {
      name: "clost_auth_storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
