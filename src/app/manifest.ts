import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CLOST — Techwear E-Ticaret",
    short_name: "CLOST",
    description: "Kullanışlılık İçin Tasarlandı. Brutalist Techwear & Ağır Gramaj Giyim.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f9f9",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
