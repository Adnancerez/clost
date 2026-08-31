import { create } from "zustand";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PwaState {
  isOnline: boolean;
  isInstallable: boolean;
  isInstalled: boolean;
  isIos: boolean;
  isUpdateAvailable: boolean;
  isInstallModalOpen: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  registration: ServiceWorkerRegistration | null;

  // Actions
  setOnline: (status: boolean) => void;
  setInstallPrompt: (event: BeforeInstallPromptEvent | null) => void;
  setUpdateAvailable: (available: boolean) => void;
  setRegistration: (reg: ServiceWorkerRegistration | null) => void;
  setIsInstalled: (installed: boolean) => void;
  openInstallModal: () => void;
  closeInstallModal: () => void;
  dismissInstallPrompt: () => void;
  promptInstall: () => Promise<boolean>;
  applyUpdate: () => void;
  checkConnectivity: () => Promise<boolean>;
}

const DISMISS_DURATION_DAYS = 3;

export const usePwaStore = create<PwaState>((set, get) => ({
  isOnline: true,
  isInstallable: false,
  isInstalled: false,
  isIos: false,
  isUpdateAvailable: false,
  isInstallModalOpen: false,
  deferredPrompt: null,
  registration: null,

  setOnline: (status: boolean) => {
    set({ isOnline: status });
  },

  setInstallPrompt: (event) => {
    // Check if dismissed recently
    if (typeof window !== "undefined") {
      const dismissedAt = localStorage.getItem("clost_pwa_dismissed");
      if (dismissedAt) {
        const timeDiff = Date.now() - parseInt(dismissedAt, 10);
        if (timeDiff < DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000) {
          set({ deferredPrompt: event, isInstallable: !!event });
          return;
        }
      }
    }
    set({
      deferredPrompt: event,
      isInstallable: !!event,
    });
  },

  setUpdateAvailable: (available) => set({ isUpdateAvailable: available }),
  setRegistration: (registration) => set({ registration }),
  setIsInstalled: (isInstalled) => set({ isInstalled }),
  openInstallModal: () => set({ isInstallModalOpen: true }),
  closeInstallModal: () => set({ isInstallModalOpen: false }),

  dismissInstallPrompt: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("clost_pwa_dismissed", Date.now().toString());
    }
    set({ isInstallModalOpen: false, isInstallable: false });
  },

  promptInstall: async () => {
    const { deferredPrompt } = get();
    if (!deferredPrompt) return false;

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        set({ isInstalled: true, isInstallable: false, deferredPrompt: null, isInstallModalOpen: false });
        return true;
      }
      return false;
    } catch (err) {
      console.warn("[CLOST PWA] Install prompt failed:", err);
      return false;
    }
  },

  applyUpdate: () => {
    const { registration } = get();
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  },

  checkConnectivity: async () => {
    try {
      const res = await fetch("/manifest.webmanifest?_t=" + Date.now(), {
        method: "HEAD",
        cache: "no-store",
      });
      const online = res.ok;
      get().setOnline(online);
      return online;
    } catch {
      get().setOnline(false);
      return false;
    }
  },
}));
