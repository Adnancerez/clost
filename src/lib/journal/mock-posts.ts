import { Product } from "@/lib/shopify/types";
import { MOCK_PRODUCTS } from "@/lib/shopify/mock-data";

export interface JournalPost {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  imageUrl: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      body: string;
    }[];
    pullQuote?: string;
  };
  relatedProducts: Product[];
}

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "3l-naylon-membranlar-ve-su-gecirmezlik-bilimi",
    title: "3L Naylon Membranlar ve Su Geçirmezlik Bilimi",
    subtitle: "20.000 mm su sütunu direnci ve mikro-gözenekli hava geçirgenliğinin mühendisliği.",
    date: "26 Ağustos 2026",
    readTime: "5 Dk Okuma",
    author: "Clost Material Lab // Kumaş Araştırma Ekibi",
    category: "Malzeme Mühendisliği",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
    content: {
      lead:
        "Modern teknik dış giyimde su geçirmezlik, kumaşın sadece suyu engellemesi değil; aynı zamanda yüksek tempolu fiziksel aktivitede vücut ısısını tahliye edebilmesidir.",
      sections: [
        {
          heading: "01. Üç Katmanlı (3-Layer) Laminasyon Yapısı",
          body:
            "3L yapımız; en dışta yüksek mukavemetli yırtılmaz naylon yüzey, ortada hidrofilik mikro-gözenekli membran ve en içte sürtünmeyi önleyen lamine astarın ısıl yapıştırma yöntemiyle birleştirilmesiyle elde edilir.",
        },
        {
          heading: "02. 20.000 mm Su Direnci Ne Anlama Geliyor?",
          body:
            "Kumaş üzerine yerleştirilen 20 metrelik bir su sütununun tabana uyguladığı hidrostatik basınca dahi su sızdırmazlık direnci göstermesidir. Şiddetli fırtına ve metropol koşullarında mutlak koruma sağlar.",
        },
        {
          heading: "03. Isıl Yapıştırmalı Dikiş Şeritleri (Seam Taping)",
          body:
            "Kumaş ne kadar su geçirmez olursa olsun, dikiş iğnesinin açtığı mikro delikler su sızıntısına yol açabilir. CLOST tüm dikiş hatlarını 18 mm termoplastik şeritlerle presleyerek %100 sızdırmaz hale getirir.",
        },
      ],
      pullQuote:
        "Dekorasyon bir zaafiyettir; kumaşın yapısı formunu ve fonksiyonunu tayin eder.",
    },
    relatedProducts: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]],
  },
  {
    slug: "brutalist-mimari-ve-sokak-giyimi",
    title: "Brutalist Mimari ve Sokak Giyimi: Form ve Fonksiyon",
    subtitle: "Ham betonun dürüstlüğü ve giyilebilir monolitik siluetler.",
    date: "14 Ağustos 2026",
    readTime: "4 Dk Okuma",
    author: "Arşiv Tasarım Direktörlüğü",
    category: "Tasarım Felsefesi",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsnAGILp2S-cLEM0DzPAduoEeAkpSoeItOpjNIYXMuiEqWz3KXB2H3vgRklx_-pAF1WsB4kcPAl5D8ALH1_3eKkumhYmRh9nZ2B4pjYLzYZLv0FyIxKMXdLYXEgGXiLWNR2BIt5QJExHO5CoMJouW7aCapeGbWvcU8SZgrvcHpGdQLOO6Uld0MoU1FzJYABEGpyVJiBd4eGU_bMNpQJjdgn-voNIHMYuhrUczRrnAJwPqkHJpC_yJO",
    content: {
      lead:
        "20. yüzyıl ortası brutalist mimarinin ham beton (béton brut) anlayışı, süslemesiz dürüst malzemeleri ve katı geometrisiyle bugünün fonksiyonel giyimine rehberlik ediyor.",
      sections: [
        {
          heading: "01. Malzemenin Kendisini Göstermesi",
          body:
            "Brutalizmde duvar sıvanmaz, betonun dokusu olduğu gibi bırakılır. Biz de kumaşlarımızın teknik dokusunu, yapıştırma bantlarını ve endüstriyel fermuarlarını saklamak yerine tasarımın ana karakteri haline getiriyoruz.",
        },
        {
          heading: "02. Kutu Kesim ve Mimari Hatlar",
          body:
            "Düşük omuzlar, geniş sırt panelleri ve dik açılı cepler; vücudu saran dar kalıplar yerine bağımsız ve heykelimsi bir alan oluşturur.",
        },
      ],
      pullQuote:
        "Giysi bir barınaktır; bedenin şehir mimarisiyle kurduğu ilk fiziksel temas yüzeyidir.",
    },
    relatedProducts: [MOCK_PRODUCTS[4], MOCK_PRODUCTS[7]],
  },
  {
    slug: "sonbahar-24-kumas-analizi-ve-agir-gramaj-uretim",
    title: "Sonbahar '24 Kumaş Analizi ve Ağır Gramaj Üretim",
    subtitle: "450 GSM kompakt pamuk polar ve balistik naylonun dayanıklılık testi.",
    date: "02 Ağustos 2026",
    readTime: "6 Dk Okuma",
    author: "Tekstil Üretim Birimi",
    category: "Üretim Raporu",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5",
    content: {
      lead:
        "Sonbahar '24 koleksiyonunda kullandığımız kumaşlar, sıradan hazır giyimin iki katı gramaja sahip olup yıllar süren yoğun kullanıma dayanacak şekilde dokunmuştur.",
      sections: [
        {
          heading: "01. Kompakt Doku Teknolojisi",
          body:
            "Eğrilmiş liflerin yüksek gerilim altında sıkılaştırılmasıyla kumaşın yıkama sonrası formunu kaybetmesi ve tüylenmesi tamamen engellenir.",
        },
        {
          heading: "02. Metal Aksam ve YKK Endüstriyel Fermuarlar",
          body:
            "Aşınmaya karşı mat siyah fırın boyalı çinko alaşım donanımlar, en zorlu kış şartlarında dahi takılmadan çalışır.",
        },
      ],
    },
    relatedProducts: [MOCK_PRODUCTS[5], MOCK_PRODUCTS[3]],
  },
];
