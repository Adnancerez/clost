export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Tüm Ürünler", href: "/collections/all" },
  { label: "Koleksiyonlar", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Dergi", href: "/dergi" },
];

export const MOBILE_NAV_LINKS: NavLink[] = [
  { label: "Tüm Ürünler", href: "/collections/all" },
  { label: "Yeni Gelenler", href: "/collections/new" },
  { label: "Lookbook Sonbahar '24", href: "/lookbook" },
  { label: "Dergi & Makaleler", href: "/dergi" },
  { label: "Beden & Silüet Rehberi", href: "/beden-rehberi" },
  { label: "İade & Değişim Portalı", href: "/iade-talebi" },
  { label: "VIP Arşiv Kulübü", href: "/vip-kulup" },
  { label: "Dış Giyim", href: "/collections/outerwear" },
  { label: "Üst Giyim", href: "/collections/tops" },
  { label: "Alt Giyim", href: "/collections/bottoms" },
  { label: "Favorilerim", href: "/wishlist" },
  { label: "Ürün Karşılaştırma", href: "/karsilastir" },
  { label: "Dijital Hediye Kartı", href: "/hediye-karti" },
  { label: "Kampanyalar & Kuponlar", href: "/kampanyalar" },
  { label: "Kargo Takibi", href: "/kargo-takip" },
  { label: "Sıkça Sorulan Sorular", href: "/sss" },
  { label: "Showroom & İletişim", href: "/iletisim" },
  { label: "Manifesto & İlkeler", href: "/about" },
  { label: "Müşteri Portalı", href: "/account" },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Koleksiyonlar",
    links: [
      { label: "Tüm Ürünler", href: "/collections/all" },
      { label: "Dış Giyim", href: "/collections/outerwear" },
      { label: "Üst Giyim", href: "/collections/tops" },
      { label: "Alt Giyim", href: "/collections/bottoms" },
      { label: "Yeni Gelenler", href: "/collections/new" },
      { label: "Lookbook '24", href: "/lookbook" },
    ],
  },
  {
    title: "Müşteri Deneyimi",
    links: [
      { label: "Müşteri Hesabı", href: "/account" },
      { label: "Kargo Takibi", href: "/kargo-takip" },
      { label: "İade & Değişim", href: "/iade-talebi" },
      { label: "Beden Tablosu", href: "/beden-rehberi" },
      { label: "VIP Kulüp", href: "/vip-kulup" },
      { label: "Hediye Kartı", href: "/hediye-karti" },
      { label: "Sıkça Sorulan Sorular", href: "/sss" },
    ],
  },
  {
    title: "Kurumsal & İrtibat",
    links: [
      { label: "Manifesto", href: "/about" },
      { label: "Dergi & Kumaş Lab", href: "/dergi" },
      { label: "Showroom & İletişim", href: "/iletisim" },
      { label: "Gizlilik & Şartlar", href: "/about" },
    ],
  },
];
