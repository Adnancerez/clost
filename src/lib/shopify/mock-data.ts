import { Product, Collection } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  // 1. Cyber Neon Rugby Boxy Polo
  {
    id: "prod_01",
    handle: "cyber-neon-rugby-boxy-polo",
    title: "Cyber Neon Rugby Boxy Polo",
    sku: "CL-Y2K-01-NEON",
    description:
      "Y2K skater & rave kültürünün ikonik silüeti. Şımarık elektrik kobalt mavisi ve neon asit yeşili geniş yatay çizgili gövde, sert kar beyazı kontrast polo yaka ve sol göğüste minimalist krom logo rozeti.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Y2K", "Polo", "Skater", "Best Seller"],
    modelInfo: "Manken 183 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/cyber-neon-rugby-polo-1.jpg",
      altText: "Cyber Neon Rugby Boxy Polo - Ön Boydan Duruş",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/cyber-neon-rugby-polo-1.jpg",
        altText: "Cyber Neon Rugby Boxy Polo - Boydan Görünüm",
      },
      {
        url: "/products/cyber-neon-rugby-polo-2.jpg",
        altText: "Cyber Neon Rugby Boxy Polo - Kumaş & Yaka Doku Detayı",
      },
      {
        url: "/products/cyber-neon-rugby-polo-3.jpg",
        altText: "Cyber Neon Rugby Boxy Polo - 3/4 Açı & Dökümlü Silüet",
      },
    ],
    options: [
      { id: "opt_color_01", name: "Renk", values: ["Neon Yeşil / Mavi"] },
      { id: "opt_size_01", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_01_s",
        title: "S / Neon Yeşil / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Neon Yeşil / Mavi" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-NEON-S",
      },
      {
        id: "var_01_m",
        title: "M / Neon Yeşil / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Neon Yeşil / Mavi" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-NEON-M",
      },
      {
        id: "var_01_l",
        title: "L / Neon Yeşil / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Neon Yeşil / Mavi" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-NEON-L",
      },
      {
        id: "var_01_xl",
        title: "XL / Neon Yeşil / Mavi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Neon Yeşil / Mavi" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
        sku: "CL-Y2K-01-NEON-XL",
      },
    ],
    accordions: [
      {
        title: "Kumaş & Detaylar",
        content: "%100 Ağır Gramaj Pique Pamuk (320 GSM). Özel boyanmış solmaz iplikler, güçlendirilmiş çift dikiş ve gizli mat siyah düğmeler.",
      },
      {
        title: "Kalıp & Silüet Rehberi",
        content: "Boxy Relaxed Fit. Omuzlar düşük, kol boyu dirseğe kadar uzanır. Kendi bedeniniz bol ve dökümlü duracaktır.",
      },
      {
        title: "Lojistik & İade",
        content: "16:00'a kadar verilen siparişlerde aynı gün kargo. 1.500 ₺ üzeri ücretsiz sigortalı teslimat. 14 gün koşulsuz değişim ve iade.",
      },
    ],
  },

  // 2. Volt Yellow Mesh Summer Track Jacket
  {
    id: "prod_02",
    handle: "volt-yellow-mesh-summer-track-jacket",
    title: "Volt Yellow Mesh Summer Track Jacket",
    sku: "CL-Y2K-02-VOLT",
    description:
      "Yüksek kontrastlı siber rave estetiği. Şımarık parlak volt neon sarısı mikroripstop naylon gövde, mat siyah nefes alabilen yan file paneller, dik yaka ve sıvı gümüş reflektif fermuar detayları.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Y2K", "Tracksuit", "Rave", "Trending"],
    modelInfo: "Manken 183 cm boyunda / L beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/volt-yellow-mesh-track-jacket-1.jpg",
      altText: "Volt Yellow Mesh Summer Track Jacket - Boydan Duruş",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/volt-yellow-mesh-track-jacket-1.jpg",
        altText: "Volt Yellow Mesh Summer Track Jacket - Ön Boydan Duruş",
      },
      {
        url: "/products/volt-yellow-mesh-track-jacket-2.jpg",
        altText: "Volt Yellow Mesh Summer Track Jacket - Fermuar & Kumaş Dokusu",
      },
      {
        url: "/products/volt-yellow-mesh-track-jacket-3.jpg",
        altText: "Volt Yellow Mesh Summer Track Jacket - Sırt File Havalandırma & 3/4 Açı",
      },
    ],
    options: [
      { id: "opt_color_02", name: "Renk", values: ["Volt Sarı / Siyah"] },
      { id: "opt_size_02", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_02_s",
        title: "S / Volt Sarı / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Volt Sarı / Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-VOLT-S",
      },
      {
        id: "var_02_m",
        title: "M / Volt Sarı / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Volt Sarı / Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-VOLT-M",
      },
      {
        id: "var_02_l",
        title: "L / Volt Sarı / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Volt Sarı / Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-VOLT-L",
      },
      {
        id: "var_02_xl",
        title: "XL / Volt Sarı / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Volt Sarı / Siyah" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-02-VOLT-XL",
      },
    ],
    accordions: [
      {
        title: "Kumaş & Membran",
        content: "Su itici ultra hafif Crinkle Naylon (120 GSM) ve nefes alabilen Diamond File astar. İki yönlü gümüş metal fermuar ve reflektif kordon stoperleri.",
      },
      {
        title: "Kalıp & Kullanım",
        content: "Y2K Cyberpunk Raglan Kesim. Etek ucundaki stoperler ile bel genişliği ayarlanabilir, balon veya düz kullanılabilir.",
      },
      {
        title: "Lojistik & İade",
        content: "16:00'a kadar verilen siparişlerde aynı gün kargo. 1.500 ₺ üzeri ücretsiz sigortalı teslimat. 14 gün koşulsuz değişim ve iade.",
      },
    ],
  },

  // 3. Acid Purple Cyber-Kanji Heavyweight Tee
  {
    id: "prod_03",
    handle: "acid-purple-cyber-kanji-heavyweight-tee",
    title: "Acid Purple Cyber-Kanji Heavyweight Tee",
    sku: "CL-Y2K-03-PURP",
    description:
      "Harajuku siber estetiğini sokakla buluşturan başyapıt. Doygun elektrik asit moru gövde üzerine yüksek yoğunluklu parlak sıvı krom gümüş ve neon yeşil Japonca kanji tipografi serigrafi baskı.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Y2K", "Harajuku", "T-Shirt", "Baskılı"],
    modelInfo: "Manken 184 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1450.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1450.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/acid-purple-kanji-heavy-tee-1.jpg",
      altText: "Acid Purple Cyber-Kanji Heavyweight Tee - Ön Görünüm",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/acid-purple-kanji-heavy-tee-1.jpg",
        altText: "Acid Purple Cyber-Kanji Heavyweight Tee - Boydan Duruş",
      },
      {
        url: "/products/acid-purple-kanji-heavy-tee-2.jpg",
        altText: "Acid Purple Cyber-Kanji Heavyweight Tee - Krom Baskı & Ribana Detayı",
      },
      {
        url: "/products/acid-purple-kanji-heavy-tee-3.jpg",
        altText: "Acid Purple Cyber-Kanji Heavyweight Tee - Sırt Tipografisi & Duruş",
      },
    ],
    options: [
      { id: "opt_color_03", name: "Renk", values: ["Elektrik Mor"] },
      { id: "opt_size_03", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_03_s",
        title: "S / Elektrik Mor",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Elektrik Mor" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-PURP-S",
      },
      {
        id: "var_03_m",
        title: "M / Elektrik Mor",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Elektrik Mor" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-PURP-M",
      },
      {
        id: "var_03_l",
        title: "L / Elektrik Mor",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Elektrik Mor" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-PURP-L",
      },
      {
        id: "var_03_xl",
        title: "XL / Elektrik Mor",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Elektrik Mor" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1450.00", currencyCode: "TRY" },
        sku: "CL-Y2K-03-PURP-XL",
      },
    ],
    accordions: [
      {
        title: "Kumaş & Baskı Teknolojisi",
        content: "%100 Taranmış Kompakt Pamuk (280 GSM). Kabartmalı sıvı krom gümüş ve UV reaktif serigrafi baskı. Asla çatlama ve dökülme yapmaz.",
      },
      {
        title: "Kalıp & Detay",
        content: "Oversized Boxy Fit. 3 cm kalın ribana yakalı, geniş omuz ve kol kesimi.",
      },
      {
        title: "Lojistik & İade",
        content: "16:00'a kadar verilen siparişlerde aynı gün kargo. 1.500 ₺ üzeri ücretsiz sigortalı teslimat. 14 gün koşulsuz değişim ve iade.",
      },
    ],
  },

  // 4. Ultra Baggy Raw Denim Skater Jorts
  {
    id: "prod_04",
    handle: "ultra-baggy-raw-denim-skater-jorts",
    title: "Ultra Baggy Raw Denim Skater Jorts",
    sku: "CL-Y2K-04-JORT",
    description:
      "2000'lerin sokak skate tavrı. Derin ham lacivert 14.5 oz ham selvedge denim, yüksek kontrastlı neon turuncu kalın çift punteriz dikişler ve diz altına inen heykelsi ekstra geniş paça.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Y2K", "Denim", "Jorts", "Skater", "Best Seller"],
    modelInfo: "Manken 184 cm boyunda / 32 beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2250.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2250.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/ultra-baggy-raw-denim-jorts-1.jpg",
      altText: "Ultra Baggy Raw Denim Skater Jorts - Boydan Duruş",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/ultra-baggy-raw-denim-jorts-1.jpg",
        altText: "Ultra Baggy Raw Denim Skater Jorts - Ön Boydan Duruş",
      },
      {
        url: "/products/ultra-baggy-raw-denim-jorts-2.jpg",
        altText: "Ultra Baggy Raw Denim Skater Jorts - Ham Denim Dokusu & Neon Dikiş",
      },
      {
        url: "/products/ultra-baggy-raw-denim-jorts-3.jpg",
        altText: "Ultra Baggy Raw Denim Skater Jorts - Arka Cep & Paça Genişliği",
      },
    ],
    options: [
      { id: "opt_color_04", name: "Renk", values: ["Ham Lacivert (Raw Indigo)"] },
      { id: "opt_size_04", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_04_30",
        title: "30 / Ham Lacivert",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Lacivert (Raw Indigo)" },
          { name: "Beden", value: "30" },
        ],
        price: { amount: "2250.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-JORT-30",
      },
      {
        id: "var_04_32",
        title: "32 / Ham Lacivert",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Lacivert (Raw Indigo)" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "2250.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-JORT-32",
      },
      {
        id: "var_04_34",
        title: "34 / Ham Lacivert",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Lacivert (Raw Indigo)" },
          { name: "Beden", value: "34" },
        ],
        price: { amount: "2250.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-JORT-34",
      },
      {
        id: "var_04_36",
        title: "36 / Ham Lacivert",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Lacivert (Raw Indigo)" },
          { name: "Beden", value: "36" },
        ],
        price: { amount: "2250.00", currencyCode: "TRY" },
        sku: "CL-Y2K-04-JORT-36",
      },
    ],
    accordions: [
      {
        title: "Denim Kalitesi & Kumaş",
        content: "14.5 oz %100 Pamuk Ağır Ham Selvedge Denim. Yıkandıkça ve giyildikçe vücudunuza göre kişisel izler (fade) kazanan otantik ham doku.",
      },
      {
        title: "Kalıp & Boyutlandırma",
        content: "Ultra-Baggy Skater Kesim. Paça diz kapağının yaklaşık 8-10 cm altına iner.",
      },
      {
        title: "Lojistik & İade",
        content: "16:00'a kadar verilen siparişlerde aynı gün kargo. 1.500 ₺ üzeri ücretsiz sigortalı teslimat. 14 gün koşulsuz değişim ve iade.",
      },
    ],
  },

  // 5. Cyber Orange Lightweight Parachute Cargo Pants
  {
    id: "prod_05",
    handle: "cyber-orange-lightweight-parachute-cargo-pants",
    title: "Cyber Orange Lightweight Parachute Cargo Pants",
    sku: "CL-Y2K-05-ORNG",
    description:
      "Fütüristik sokak fonksiyonelliği. Şımarık canlı siber neon turuncu hafif mikroripstop naylon gövde, mat siyah 3D kargo cepler, gümüş metal D-halkalar ve bilekten kilitli büzgülü balon paça.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Y2K", "Parachute", "Cargo", "Neon"],
    modelInfo: "Manken 184 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2650.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2650.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "/products/cyber-orange-parachute-cargo-1.jpg",
      altText: "Cyber Orange Lightweight Parachute Cargo Pants - Boydan Duruş",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "/products/cyber-orange-parachute-cargo-1.jpg",
        altText: "Cyber Orange Lightweight Parachute Cargo Pants - Ön Boydan Duruş",
      },
      {
        url: "/products/cyber-orange-parachute-cargo-2.jpg",
        altText: "Cyber Orange Lightweight Parachute Cargo Pants - Taktik Cep & D-Halka Detayı",
      },
      {
        url: "/products/cyber-orange-parachute-cargo-3.jpg",
        altText: "Cyber Orange Lightweight Parachute Cargo Pants - Balon Silüet & Arka Duruş",
      },
    ],
    options: [
      { id: "opt_color_05", name: "Renk", values: ["Siber Neon Turuncu"] },
      { id: "opt_size_05", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_05_s",
        title: "S / Siber Neon Turuncu",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siber Neon Turuncu" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "2650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-ORNG-S",
      },
      {
        id: "var_05_m",
        title: "M / Siber Neon Turuncu",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siber Neon Turuncu" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "2650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-ORNG-M",
      },
      {
        id: "var_05_l",
        title: "L / Siber Neon Turuncu",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siber Neon Turuncu" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "2650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-ORNG-L",
      },
      {
        id: "var_05_xl",
        title: "XL / Siber Neon Turuncu",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siber Neon Turuncu" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "2650.00", currencyCode: "TRY" },
        sku: "CL-Y2K-05-ORNG-XL",
      },
    ],
    accordions: [
      {
        title: "Teknik Kumaş & Donanım",
        content: "Ultra hafif Micro-Ripstop Crinkle Naylon (135 GSM). Mat siyah cırtlı taktik kargo cepler, lazer işlemeli gümüş D-halkalar ve dizde ergonomik hareket körükleri.",
      },
      {
        title: "Kalıp & Bungee Paça",
        content: "Geniş Balon Paraşüt Kalıp. Ayak bileğindeki elastik stoperler sıkılarak istenen yükseklik ve hacimde ayarlanabilir.",
      },
      {
        title: "Lojistik & İade",
        content: "16:00'a kadar verilen siparişlerde aynı gün kargo. 1.500 ₺ üzeri ücretsiz sigortalı teslimat. 14 gün koşulsuz değişim ve iade.",
      },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_all",
    handle: "all",
    title: "Tüm Koleksiyon",
    description: "CLOST Summer Drop '24 — Y2K & Gen-Z sokak modası arşivi.",
    image: {
      url: "/products/cyber-neon-rugby-polo-1.jpg",
      altText: "Tüm Koleksiyon",
    },
    products: MOCK_PRODUCTS,
  },
  {
    id: "col_new",
    handle: "new",
    title: "Yeni Gelenler",
    description: "Yaz '24 sezonunun en yeni ve en çok beklenen parçaları.",
    image: {
      url: "/products/volt-yellow-mesh-track-jacket-1.jpg",
      altText: "Yeni Gelenler",
    },
    products: MOCK_PRODUCTS,
  },
  {
    id: "col_outerwear",
    handle: "outerwear",
    title: "Dış Giyim",
    description: "Hafif yazlık teknik naylon rüzgarlıklar ve fermuarlı ceketler.",
    image: {
      url: "/products/volt-yellow-mesh-track-jacket-1.jpg",
      altText: "Dış Giyim Koleksiyonu",
    },
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Dış Giyim"),
  },
  {
    id: "col_tops",
    handle: "tops",
    title: "Üst Giyim",
    description: "Boxy rugby pololar, 280 GSM ağır pamuk grafik tişörtler.",
    image: {
      url: "/products/acid-purple-kanji-heavy-tee-1.jpg",
      altText: "Üst Giyim Koleksiyonu",
    },
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Üst Giyim"),
  },
  {
    id: "col_bottoms",
    handle: "bottoms",
    title: "Alt Giyim",
    description: "14.5 oz ham denim skater jorts ve siber paraşüt pantolonlar.",
    image: {
      url: "/products/ultra-baggy-raw-denim-jorts-1.jpg",
      altText: "Alt Giyim Koleksiyonu",
    },
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Alt Giyim"),
  },
];
