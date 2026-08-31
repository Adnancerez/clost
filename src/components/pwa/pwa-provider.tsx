"use client";

import { useEffect } from "react";
import { usePwaStore, BeforeInstallPromptEvent } from "@/lib/pwa/usePwa";
import { OfflineIndicator } from "./offline-indicator";
import { PwaInstallPrompt } from "./pwa-install-prompt";
import { PwaUpdateBanner } from "./pwa-update-banner";

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const setOnline = usePwaStore((state) => state.setOnline);
  const setInstallPrompt = usePwaStore((state) => state.setInstallPrompt);
  const setRegistration = usePwaStore((state) => state.setRegistration);
  const setUpdateAvailable = usePwaStore((state) => state.setUpdateAvailable);
  const setIsInstalled = usePwaStore((state) => state.setIsInstalled);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Initial online status & event listeners
    setOnline(navigator.onLine);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Standalone & iOS detection
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    usePwaStore.setState({ isIos: isIosDevice });

    // 3. BeforeInstallPrompt listener (Chrome/Android/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // 4. Service Worker Registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          setRegistration(registration);

          // Check if there is already a waiting worker
          if (registration.waiting) {
            setUpdateAvailable(true);
          }

          // Listen for new service worker installation
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.warn("[CLOST PWA] SW registration failed:", error);
        });

      // Handle controller change (when SKIP_WAITING is invoked)
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [setOnline, setInstallPrompt, setRegistration, setUpdateAvailable, setIsInstalled]);

  return (
    <>
      <OfflineIndicator />
      <PwaUpdateBanner />
      {children}
      <PwaInstallPrompt />
    </>
  );
}
