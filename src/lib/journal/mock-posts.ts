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
    subtitle: "2000'ler skater estetiği, balon paça raw denimler ve diz altı jorts bermudaların sokak manifestosu.",
    date: "28 Ağustos 2026",
    readTime: "4 Dk Okuma",
    author: "CLOST Editorial // Sokak Kültürü Departmanı",
    category: "Sokak Stili & Trend",
    imageUrl: "/products/striped-rugby-baggy-denim.jpg",
    content: {
      lead:
        "Dar kalıpların ve kısıtlayıcı formların yerini; özgür, cesur ve dökümlü Y2K silüetleri aldı. Ham selvedge denimler ve jorts şortlar modern gardıropların omurgasını oluşturuyor.",
      sections: [
        {
          heading: "01. Balon Paça & Yığılma (Stacking) Mimarisi",
          body:
            "Ultra bol kesimli ham denimler, ayakkabı bileğinde dökümlü ve hacimli bir duruş sergileyerek proporsiyonu yeniden tanımlar. 14.5 oz sert denim yapısı formunu kaybetmez.",
        },
        {
          heading: "02. Jorts & Bermuda Şortların Geri Dönüşü",
          body:
            "Diz altı ham paçalı kot şortlar; kalın tabanlı botlar, fütüristik terlikler veya retro sneaker'larla kusursuz bir tezat oluşturur.",
        },
        {
          heading: "03. Çizgili Oversize Üstlerle Denge",
          body:
            "Kalın blok çizgili rugby tişörtler ve yatay desenli longsleeve parçalar, alt giyimin hacimli yapısını tamamlayarak 90'lar ve 2000'ler skate ruhunu günümüze taşır.",
        },
      ],
      pullQuote:
        "Sokak modası kuralları takip etmez; kendi hacmini, tavrını ve enerjisini yaratır.",
    },
    relatedProducts: [MOCK_PRODUCTS[2], MOCK_PRODUCTS[3]],
  },
  {
    slug: "acubi-ve-harajuku-estetigi-baby-tee-rehberi",
    title: "Acubi & Harajuku Estetiği: Baby Tee ve Grafik Baskıların Anatomisi",
    subtitle: "Kanarya sarısı zeminler, Japonca tipografi, yıldız motifleri ve crop kalıpların yükselişi.",
    date: "19 Ağustos 2026",
    readTime: "5 Dk Okuma",
    author: "CLOST Tasarım Stüdyosu",
    category: "Tasarım & Sanat",
    imageUrl: "/products/sloid-unicorn-zip-hoodie.jpg",
    content: {
      lead:
        "Tokyo Harajuku sokaklarından global Gen-Z akımına yayılan Acubi stili; mikro kesim baby tee'ler ile devasa alt giyim parçalarını tezat halinde birleştirir.",
      sections: [
        {
          heading: "01. Renk Blokları ve Canlı Kontrastlar",
          body:
            "Pastel pembeler, kanarya sarıları ve turkuaz tonları; siyah ve ham koyu renklerle birleştiğinde dikkat çekici bir estetik sunar.",
        },
        {
          heading: "02. Nostaljik Grafik İllüstrasyonları",
          body:
            "Yıldız motifleri, tek boynuzlu at illüstrasyonları ve Japonca tipografiler, dijital çağın sokak mizahını ve nostaljisini kumaşa işler.",
        },
      ],
      pullQuote:
        "Giyim bir kimlik oyunudur; ne kadar cesur ve özgün olursanız, o kadar sizsiniz.",
    },
    relatedProducts: [MOCK_PRODUCTS[0], MOCK_PRODUCTS[6]],
  },
  {
    slug: "selvedge-raw-denim-ve-agir-gramaj-interlok-dokuma",
    title: "14.5 oz Raw Denim ve 380 GSM Kompakt Kumaş Rehberi",
    subtitle: "Solmayan serigrafi baskılar, dayanıklı dikiş hatları ve doğal kumaş gramajları.",
    date: "08 Ağustos 2026",
    readTime: "6 Dk Okuma",
    author: "Kumaş & Üretim Laboratuvarı",
    category: "Kumaş Bilimi",
    imageUrl: "/products/lafam-striped-jorts.jpg",
    content: {
      lead:
        "Bir giysinin kalitesi ağırlığından ve dokusundan anlaşılır. CLOST sokak koleksiyonu, hafif hazır giyim yerine yıllarca giyilebilecek ağır gramajlı kumaşlar kullanır.",
      sections: [
        {
          heading: "01. 380 GSM Ağır İnterlok Pamuk",
          body:
            "Geleneksel tişört ve hırkaların iki katı yoğunluktadır. Yıkama sonrasında sarkma ve çekme yapmaz.",
        },
        {
          heading: "02. 14.5 oz Ham Selvedge Denim",
          body:
            "Kimyasal taşlama veya suni eskitme yapılmamıştır. Siz giydikçe sizin hareketlerinize göre doğal olarak iz kazanır.",
        },
      ],
    },
    relatedProducts: [MOCK_PRODUCTS[1], MOCK_PRODUCTS[5]],
  },
];
