import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "clost-storefront",
    name: "CLOST — Y2K & Gen-Z Streetwear Storefront",
    short_name: "CLOST",
    description: "Kullanışlılık İçin Tasarlandı. Y2K, Skater & Gen-Z Sokak Modası Arşivi.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f9f9f9",
    theme_color: "#000000",
    categories: ["shopping", "lifestyle", "fashion"],
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: "Lookbook Summer '24",
        short_name: "Lookbook",
        description: "Editoryal Çekimler ve Katalog",
        url: "/lookbook",
        icons: [{ src: "/icons/icon-192.svg", sizes: "192x192" }],
      },
      {
        name: "Koleksiyonlar",
        short_name: "Katalog",
        description: "Tüm Techwear & Giyim Koleksiyonları",
        url: "/collections",
        icons: [{ src: "/icons/icon-192.svg", sizes: "192x192" }],
      },
      {
        name: "Sepet & Ödeme",
        short_name: "Sepet",
        description: "Sepet Detayları ve Hızlı Ödeme",
        url: "/checkout",
        icons: [{ src: "/icons/icon-192.svg", sizes: "192x192" }],
      },
      {
        name: "VIP Kulüp",
        short_name: "VIP",
        description: "Sadakat Seviyeleri ve Erken Erişim",
        url: "/vip-kulup",
        icons: [{ src: "/icons/icon-192.svg", sizes: "192x192" }],
      },
    ],
  };
}
