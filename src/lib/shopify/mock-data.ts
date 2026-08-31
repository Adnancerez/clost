import { Product, Collection } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    handle: "sloid-unicorn-graphic-zip-hoodie",
    title: "Sloid Unicorn Graphic Zip Hoodie",
    sku: "CL-Y2K-01-YLW",
    description:
      "Harajuku & Y2K sokak kültüründen ilham alan özel kesim. Kanarya sarısı zemin üzerinde siyah tek boynuzlu at grafik baskısı, Japonca tipografi ve kolda ikili siyah yarış şeridi.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Y2K", "Harajuku", "Hoodie"],
    modelInfo: "Manken 174 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/sloid-unicorn-zip-hoodie.jpg",
      altText: "Sloid Unicorn Graphic Zip Hoodie - Sarı",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/sloid-unicorn-zip-hoodie.jpg",
        altText: "Sloid Unicorn Graphic Zip Hoodie - Ön Görünüm",
      },
      {
        url: "/products/starlet-baby-tee.jpg",
        altText: "Sloid Unicorn Graphic Zip Hoodie - Model Kombin",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Sarı", "Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_01_s_ylw",
        title: "S / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-YLW-S",
      },
      {
        id: "var_01_m_ylw",
        title: "M / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-YLW-M",
      },
      {
        id: "var_01_l_ylw",
        title: "L / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-YLW-L",
      },
      {
        id: "var_01_xl_ylw",
        title: "XL / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-YLW-XL",
      },
    ],
    accordions: [
      {
        title: "Kumaş & Üretim",
        content: "%100 Ağır Gramaj Pamuklu Kompakt İnterlok (380 GSM). Solmaya karşı dayanıklı yüksek çözünürlüklü serigrafi baskı.",
      },
      {
        title: "Kalıp & Beden Rehberi",
        content: "Oversized Boxy Fit. Omuz dikişleri düşüktür; standart bedeniniz dökümlü durur.",
      },
      {
        title: "Kargo & İade",
        content: "Aynı gün kargo. 1.500 ₺ üzeri ücretsiz teslimat. 14 gün koşulsuz iade ve beden değişimi.",
      },
    ],
  },
  {
    id: "prod_02",
    handle: "jelly-star-striped-longsleeve",
    title: "Jelly Star Çizgili Longsleeve",
    sku: "CL-Y2K-02-TURQ",
    description:
      "Turkuaz ve deniz mavisi yatay blok çizgiler, göğüste kabartmalı 'jellybutswag' tipografisi ve her iki kolda sıralı neon sarı yıldız aplikeleri.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Y2K", "Skater", "Longsleeve"],
    modelInfo: "Manken 178 cm / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1450.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1450.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/jelly-star-longsleeve.jpg",
      altText: "Jelly Star Çizgili Longsleeve - Turkuaz",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/jelly-star-longsleeve.jpg",
        altText: "Jelly Star Çizgili Longsleeve - Ön Görünüm",
      },
      {
        url: "/products/striped-rugby-baggy-denim.jpg",
        altText: "Jelly Star Çizgili Longsleeve - Baggy Kombin",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Turkuaz", "Yeşil"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_02_s",
        title: "S / Turkuaz",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Turkuaz" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-TURQ-S",
      },
      {
        id: "var_02_m",
        title: "M / Turkuaz",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Turkuaz" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-TURQ-M",
      },
      {
        id: "var_02_l",
        title: "L / Turkuaz",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Turkuaz" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-TURQ-L",
      },
      {
        id: "var_02_xl",
        title: "XL / Turkuaz",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Turkuaz" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-TURQ-XL",
      },
    ],
    accordions: [
      {
        title: "Kumaş Özellikleri",
        content: "%100 Taranmış Süprem Pamuk (280 GSM). Özel boyama tekniğiyle solmaz canlı renk blokları.",
      },
      {
        title: "Yıkama & Bakım",
        content: "30 derecede tersten yıkayınız. Ağartıcı kullanmayınız.",
      },
    ],
  },
  {
    id: "prod_03",
    handle: "ultra-baggy-balloon-raw-denim",
    title: "Ultra Baggy Balon Raw Denim Pantolon",
    sku: "CL-Y2K-03-DNM",
    description:
      "Devasa paça genişliği ve kavisli balon silüeti ile ikonik 2000'ler skater formu. Sert ham selvedge denim kumaşı zamanla vücudunuza göre şekil alır.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Denim", "Baggy", "Skater"],
    modelInfo: "Manken 182 cm / 32 beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/striped-rugby-baggy-denim.jpg",
      altText: "Ultra Baggy Balon Raw Denim Pantolon",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/striped-rugby-baggy-denim.jpg",
        altText: "Ultra Baggy Balon Raw Denim Pantolon - Kombin",
      },
      {
        url: "/products/lafam-striped-jorts.jpg",
        altText: "Ultra Baggy Denim - Sokak Çekimi",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Ham Siyah", "Koyu İndigo"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_03_30",
        title: "30 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "30" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-30",
      },
      {
        id: "var_03_32",
        title: "32 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-32",
      },
      {
        id: "var_03_34",
        title: "34 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "34" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-34",
      },
      {
        id: "var_03_36",
        title: "36 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "36" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-36",
      },
    ],
    accordions: [
      {
        title: "Kumaş & Dikiş",
        content: "14.5 oz Ağır Raw Selvedge Denim. Güçlendirilmiş çift hat perçin dikişleri.",
      },
      {
        title: "Kalıp Bilgisi",
        content: "Ultra Geniş Balon Kesim. Ayakkabı üzerine dökümlü yığılma yapar.",
      },
    ],
  },
  {
    id: "prod_04",
    handle: "blue-sailor-oversized-rugby-top",
    title: "Blue Sailor Oversized Rugby Longsleeve",
    sku: "CL-Y2K-04-BLU",
    description:
      "Geniş marin lacivert-beyaz yatay şeritler, göğüste kırmızı kabartmalı 3D nakış logosu ve dökümlü manşet mimarisi.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Rugby", "Streetwear"],
    modelInfo: "Manken 176 cm / M beden",
    priceRange: {
      minVariantPrice: { amount: "1550.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1550.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/striped-rugby-baggy-denim.jpg",
      altText: "Blue Sailor Oversized Rugby Longsleeve",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/striped-rugby-baggy-denim.jpg",
        altText: "Blue Sailor Oversized Rugby Top - Detay",
      },
      {
        url: "/products/jelly-star-longsleeve.jpg",
        altText: "Blue Sailor Rugby - Stüdyo Çekimi",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Mavi", "Beyaz"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_04_s",
        title: "S / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mavi" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1550.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-S",
      },
      {
        id: "var_04_m",
        title: "M / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mavi" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1550.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-M",
      },
      {
        id: "var_04_l",
        title: "L / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mavi" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1550.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-L",
      },
      {
        id: "var_04_xl",
        title: "XL / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mavi" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1550.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-XL",
      },
    ],
  },
  {
    id: "prod_05",
    handle: "la-fam-start-and-end-striped-top",
    title: "La Fam 'Start & End' Çizgili Üst",
    sku: "CL-Y2K-05-PNK",
    description:
      "Amsterdam sokak modasından ilham alan pembe ve bordo ince çizgili oversize kalıp. Göğüste sarı 'WE START AND END WITH THE FAM' manifestosu.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Y2K", "Indie"],
    modelInfo: "Manken 175 cm / M beden",
    priceRange: {
      minVariantPrice: { amount: "1650.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1650.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/lafam-striped-jorts.jpg",
      altText: "La Fam Start & End Çizgili Üst",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/lafam-striped-jorts.jpg",
        altText: "La Fam Çizgili Üst - Model Çekimi",
      },
      {
        url: "/products/kissme-babytee-sweat-jorts.jpg",
        altText: "La Fam Çizgili Üst - Detay",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Bordo", "Pembe"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_05_s",
        title: "S / Bordo",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Bordo" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-S",
      },
      {
        id: "var_05_m",
        title: "M / Bordo",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Bordo" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-M",
      },
      {
        id: "var_05_l",
        title: "L / Bordo",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Bordo" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-L",
      },
      {
        id: "var_05_xl",
        title: "XL / Bordo",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Bordo" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-XL",
      },
    ],
  },
  {
    id: "prod_06",
    handle: "vintage-distressed-denim-jorts",
    title: "Vintage Yırtık Denim Jorts Bermuda",
    sku: "CL-Y2K-06-JRT",
    description:
      "Diz altı uzunluk, asimetrik yırtık detayları ve ham püsküllü paça mimarisi. 90'lar hip-hop ve skate kültürünün vazgeçilmez bermuda şortu.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Jorts", "Denim", "Vintage"],
    modelInfo: "Manken 180 cm / 32 beden",
    priceRange: {
      minVariantPrice: { amount: "1750.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1750.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/lafam-striped-jorts.jpg",
      altText: "Vintage Yırtık Denim Jorts Bermuda",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/lafam-striped-jorts.jpg",
        altText: "Vintage Denim Jorts - Model Üzeri",
      },
      {
        url: "/products/kissme-babytee-sweat-jorts.jpg",
        altText: "Vintage Jorts - Paça Detayı",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Açık Mavi", "Gri"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_06_30",
        title: "30 / Açık Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Açık Mavi" },
          { name: "Beden", value: "30" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-Y2K-06-30",
      },
      {
        id: "var_06_32",
        title: "32 / Açık Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Açık Mavi" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-Y2K-06-32",
      },
      {
        id: "var_06_34",
        title: "34 / Açık Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Açık Mavi" },
          { name: "Beden", value: "34" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-Y2K-06-34",
      },
      {
        id: "var_06_36",
        title: "36 / Açık Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Açık Mavi" },
          { name: "Beden", value: "36" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-Y2K-06-36",
      },
    ],
  },
  {
    id: "prod_07",
    handle: "starlet-retro-pop-baby-tee",
    title: "Starlet Retro Pop Baby Tee",
    sku: "CL-Y2K-07-TEE",
    description:
      "Kanarya sarısı dar crop kalıp, göğüste kırmızı deniz yıldızı illüstrasyonu ve mikro fit kollar. Y2K Acubi akımının ikonik parçası.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Baby Tee", "Crop", "Y2K"],
    modelInfo: "Manken 170 cm / S beden",
    priceRange: {
      minVariantPrice: { amount: "850.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "850.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/starlet-baby-tee.jpg",
      altText: "Starlet Retro Pop Baby Tee - Sarı",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/starlet-baby-tee.jpg",
        altText: "Starlet Baby Tee - Ön Detay",
      },
      {
        url: "/products/sloid-unicorn-zip-hoodie.jpg",
        altText: "Starlet Baby Tee - Stüdyo Çekimi",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Sarı", "Beyaz"] },
      { id: "opt_size", name: "Beden", values: ["XS", "S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_07_xs",
        title: "XS / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "XS" },
        ],
        price: { amount: "850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-07-XS",
      },
      {
        id: "var_07_s",
        title: "S / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-07-S",
      },
      {
        id: "var_07_m",
        title: "M / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-07-M",
      },
      {
        id: "var_07_l",
        title: "L / Sarı",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Sarı" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-07-L",
      },
    ],
  },
  {
    id: "prod_08",
    handle: "kiss-me-pink-baby-tee-raw-sweat-jorts",
    title: "Kiss Me Pastel Pink Baby Tee & Raw Jorts",
    sku: "CL-Y2K-08-SET",
    description:
      "Toz pembe 'KISS ME' grafikli dar kalıp baby tee ile ultra bol dökümlü ham paça kırçıllı gri sweat bermuda şort kombinasyonu.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Baby Tee", "Jorts", "Acubi"],
    modelInfo: "Manken 172 cm / S beden",
    priceRange: {
      minVariantPrice: { amount: "890.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "890.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/kissme-babytee-sweat-jorts.jpg",
      altText: "Kiss Me Pastel Pink Baby Tee",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/kissme-babytee-sweat-jorts.jpg",
        altText: "Kiss Me Baby Tee - Model Üzeri",
      },
      {
        url: "/products/starlet-baby-tee.jpg",
        altText: "Kiss Me Baby Tee - Kombin",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Pembe", "Gri"] },
      { id: "opt_size", name: "Beden", values: ["XS", "S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_08_xs",
        title: "XS / Pembe",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Pembe" },
          { name: "Beden", value: "XS" },
        ],
        price: { amount: "890.00", currencyCode: "TRY" },
        sku: "CL-Y2K-08-XS",
      },
      {
        id: "var_08_s",
        title: "S / Pembe",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Pembe" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "890.00", currencyCode: "TRY" },
        sku: "CL-Y2K-08-S",
      },
      {
        id: "var_08_m",
        title: "M / Pembe",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Pembe" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "890.00", currencyCode: "TRY" },
        sku: "CL-Y2K-08-M",
      },
      {
        id: "var_08_l",
        title: "L / Pembe",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Pembe" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "890.00", currencyCode: "TRY" },
        sku: "CL-Y2K-08-L",
      },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_all",
    handle: "all",
    title: "Tüm Sokak Arşivi",
    description: "Y2K, Acubi, Skater ve Harajuku sokak giyimi parçalarından oluşan eksiksiz katalog.",
    products: MOCK_PRODUCTS,
  },
  {
    id: "col_new",
    handle: "new",
    title: "Son Drop '24",
    description: "En yeni Y2K grafikli zip hoodieler, çizgili longsleeve modelleri ve baggy denimler.",
    products: MOCK_PRODUCTS.filter((p) => p.tags?.includes("Yeni")),
  },
  {
    id: "col_outerwear",
    handle: "outerwear",
    title: "Fermuarlı Hırka & Zip Hoodie",
    description: "Özel seri grafik baskılı fermuarlı hırkalar ve dökümlü sokak katmanları.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Dış Giyim"),
  },
  {
    id: "col_tops",
    handle: "tops",
    title: "Longsleeve, Rugby & Baby Tee",
    description: "Çizgili oversize üstler, 3D nakışlı rugby tişörtler ve popüler Acubi baby teeler.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Üst Giyim"),
  },
  {
    id: "col_bottoms",
    handle: "bottoms",
    title: "Ultra Baggy Denim & Jorts",
    description: "Geniş balon paçalı selvedge denimler, ham paça bermuda jorts ve sweat bermudalar.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Alt Giyim"),
  },
];
