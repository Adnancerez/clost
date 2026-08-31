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
    slug: "y2k-ve-gen-z-sokak-kulturu-baggy-siluetlerin-donusu",
    title: "Y2K & Gen-Z Sokak Kültürü: Baggy Silüetlerin ve Jorts'un Yükselişi",
    subtitle: "2000'ler skater estetiği, 14.5 oz ham selvedge denimler ve diz altı jorts bermudaların sokak manifestosu.",
    date: "28 Ağustos 2026",
    readTime: "4 Dk Okuma",
    author: "CLOST Editorial // Sokak Kültürü Departmanı",
    category: "Sokak Stili & Trend",
    imageUrl: "/products/ultra-baggy-raw-denim-jorts-1.jpg",
    content: {
      lead:
        "Dar kalıpların ve kısıtlayıcı formların yerini; özgür, cesur ve dökümlü Y2K silüetleri aldı. Ham selvedge denimler ve jorts şortlar modern gardıropların omurgasını oluşturuyor.",
      sections: [
        {
          heading: "01. Ham Selvedge Denim & Jorts Hacmi",
          body:
            "Diz kapağının altına inen ham denim jorts; yüksek kontrastlı neon dikişleri ve heykelsi duruşuyla proporsiyonu yeniden tanımlar.",
        },
        {
          heading: "02. Neon Blok Çizgili Üstlerle Denge",
          body:
            "Elektrik mavisi ve neon yeşil çizgili boxy rugby polo parçalar, alt giyimin geniş yapısını tamamlayarak otantik skater enerjisini zirveye taşır.",
        },
      ],
      pullQuote:
        "Sokak modası kuralları takip etmez; kendi hacmini, tavrını ve enerjisini yaratır.",
    },
    relatedProducts: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[3]],
  },
  {
    slug: "siber-rave-ve-harajuku-estetigi-kanji-grafikleri",
    title: "Siber Rave & Harajuku Estetiği: Sıvı Krom ve Kanji Tipografisi",
    subtitle: "Elektrik moru zeminler, Japonca kanji tipografi ve sıvı krom kabartma serigrafi baskılar.",
    date: "22 Ağustos 2026",
    readTime: "5 Dk Okuma",
    author: "CLOST Tasarım Stüdyosu",
    category: "Tasarım & Sanat",
    imageUrl: "/products/acid-purple-kanji-heavy-tee-1.jpg",
    content: {
      lead:
        "Tokyo Harajuku sokaklarından global Gen-Z akımına yayılan siber estetik; 280 GSM ağır kompakt pamuklu tişörtler üzerinde sıvı krom yansımalarla buluşuyor.",
      sections: [
        {
          heading: "01. Yüksek Kontrastlı Canlı Renk Paleti",
          body:
            "Asit moru ve neon sarı tonları, sokakta fark edilmekten çekinmeyen cesur bir kimlik sunar.",
        },
        {
          heading: "02. Kabartmalı Sıvı Krom Baskı",
          body:
            "Özel serigrafi tekniğiyle kumaşa aktarılan metalik sıvı krom grafikler, yıkamada asla çatlama ve dökülme yapmaz.",
        },
      ],
      pullQuote:
        "Giyim bir kimlik oyunudur; ne kadar cesur ve özgün olursanız, o kadar sizsiniz.",
    },
    relatedProducts: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[1]],
  },
  {
    slug: "teknik-parasut-ve-yazlik-mesh-rüzgarlık-mimarisi",
    title: "Teknik Paraşüt ve Yazlık File Rüzgarlık Kumaş Rehberi",
    subtitle: "Crinkle naylon, nefes alabilen file paneller ve 3D taktik kargo cepleri.",
    date: "15 Ağustos 2026",
    readTime: "6 Dk Okuma",
    author: "Kumaş & Üretim Laboratuvarı",
    category: "Kumaş Bilimi",
    imageUrl: "/products/cyber-orange-parachute-cargo-1.jpg",
    content: {
      lead:
        "Yaz aylarında teknik stilinden ödün vermek istemeyenler için tasarlanan ultra hafif micro-ripstop naylon kumaşlar ve ayarlanabilir bungee stoperler.",
      sections: [
        {
          heading: "01. Ultra Hafif Crinkle Naylon (135 GSM)",
          body:
            "Rüzgara dayanıklı, su itici ve nefes alabilen yapısıyla sıcak günlerde bile maksimum konfor sağlar.",
        },
        {
          heading: "02. Ayarlanabilir Balon Silüet",
          body:
            "Ayak bileklerindeki elastik stoperler ile pantolonun hacmi ve dökümü anında kişiselleştirilebilir.",
        },
      ],
    },
    relatedProducts: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[4]],
  },
];
