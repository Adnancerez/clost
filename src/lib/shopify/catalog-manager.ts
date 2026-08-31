import { Product } from "./types";
import { MOCK_PRODUCTS } from "./mock-data";

const STORAGE_KEY = "clost_custom_products";
const CLEAN_CATALOG_FLAG_KEY = "clost_clean_catalog_mode";

export function isCleanCatalogMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CLEAN_CATALOG_FLAG_KEY) === "true";
}

export function setCleanCatalogMode(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLEAN_CATALOG_FLAG_KEY, enabled ? "true" : "false");
}

export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addCustomProduct(product: Product): void {
  const existing = getCustomProducts();
  const filtered = existing.filter((p) => p.id !== product.id && p.handle !== product.handle);
  saveCustomProducts([product, ...filtered]);
}

export function removeCustomProduct(idOrHandle: string): void {
  const existing = getCustomProducts();
  const updated = existing.filter((p) => p.id !== idOrHandle && p.handle !== idOrHandle);
  saveCustomProducts(updated);
}

export function getEffectiveLocalProducts(): Product[] {
  if (typeof window === "undefined") {
    return MOCK_PRODUCTS;
  }

  const cleanMode = isCleanCatalogMode();
  const custom = getCustomProducts();

  if (cleanMode) {
    return custom; // In clean mode, only custom added products or empty array
  }

  // Combine custom with mock products, custom taking precedence
  const customHandles = new Set(custom.map((p) => p.handle));
  const remainingMocks = MOCK_PRODUCTS.filter((p) => !customHandles.has(p.handle));

  return [...custom, ...remainingMocks];
}

export function resetToDefaultCatalog(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CLEAN_CATALOG_FLAG_KEY);
  localStorage.removeItem(STORAGE_KEY);
}

export function wipeAllProducts(): void {
  if (typeof window === "undefined") return;
  setCleanCatalogMode(true);
  saveCustomProducts([]);
}
