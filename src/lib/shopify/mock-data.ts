import { Product, Collection } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    handle: "oversized-technical-parka-v2",
    title: "Oversized Teknik Parka V.2",
    sku: "CL-0924-BLK",
    description:
      "Kullanışlılık için tasarlandı. V.2 Teknik Parka, yapıştırılmış dikişlere ve agresif bir siluet sunan mafsallı kollara sahip ağır gramajlı naylon dış yüzeye sahiptir.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Sonbahar 24", "Su Geçirmez"],
    modelInfo: "Manken 185 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "4500.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "4500.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
      altText: "Oversized Teknik Parka V.2 Ön Görünüm",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ",
        altText: "Oversized Teknik Parka V.2 - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDimJMjLGHYKAZWnqsojQoK4pq-bhQuXX5-7ILNrpQQDC6z5h7EgE3dwh9bwhbc9qyKKlTSu-X67tvY9uB1b9oDvMwrv-QIU0UGTWUT54wnSK3dyxsKulLiqDZZTzLawjcoeBfpI9ZK74sDcblcqbg6amcXLW1H349vezqS-5LkYLIGf9i2LbAkWP0C45-3rAywtKBMI6gqNA4F3qePTKt2lPPqtwdC63VC759KQmRuz9VWibinua4r",
        altText: "Oversized Teknik Parka V.2 - Kumaş Dokusu",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYX9t7-gm",
        altText: "Oversized Teknik Parka V.2 - Boydan Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5",
        altText: "Oversized Teknik Parka V.2 - Arka Panel Silüeti",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah", "Beyaz", "Gri"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_01_s_blk",
        title: "S / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "4500.00", currencyCode: "TRY" },
        sku: "CL-0924-BLK-S",
      },
      {
        id: "var_01_m_blk",
        title: "M / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "4500.00", currencyCode: "TRY" },
        sku: "CL-0924-BLK-M",
      },
      {
        id: "var_01_l_blk",
        title: "L / Siyah",
        availableForSale: false,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "4500.00", currencyCode: "TRY" },
        sku: "CL-0924-BLK-L",
      },
      {
        id: "var_01_xl_blk",
        title: "XL / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "4500.00", currencyCode: "TRY" },
        sku: "CL-0924-BLK-XL",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content:
          "Oversized kutu kesim. Düşük omuzlu yapı ve dirsek dikişleri. Rüzgar koruyucu iç kapak ve çift ayar kordonlu fırtına kapüşonu.",
      },
      {
        title: "Kumaş & Bakım",
        content:
          "%100 3L Su Geçirmez Naylon Ripstop. 20.000 mm su sütunu direnci. Tersten soğuk suda yıkayınız. Kurutma makinesine atmayınız.",
      },
      {
        title: "Kargo & İade",
        content:
          "1.500 ₺ üzeri siparişlerde tüm Türkiye'ye ücretsiz sigortalı kargo. 14 gün koşulsuz ücretsiz iade ve değişim.",
      },
    ],
  },
  {
    id: "prod_02",
    handle: "utility-jacket",
    title: "Fonksiyonel Ceket V.1",
    sku: "CL-0812-JKT",
    description:
      "Mimari sertlik ve minimal çevresel etki için tasarlanmış yapısal dış giyim parçası. Göğüs hizasında modüler fermuarlı cepler ve su itici membran kaplama.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Sonbahar 24"],
    modelInfo: "Manken 185 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "3200.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "3200.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
      altText: "Fonksiyonel Ceket V.1",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
        altText: "Fonksiyonel Ceket V.1 - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDimJMjLGHYKAZWnqsojQoK4pq-bhQuXX5-7ILNrpQQDC6z5h7EgE3dwh9bwhbc9qyKKlTSu-X67tvY9uB1b9oDvMwrv-QIU0UGTWUT54wnSK3dyxsKulLiqDZZTzLawjcoeBfpI9ZK74sDcblcqbg6amcXLW1H349vezqS-5LkYLIGf9i2LbAkWP0C45-3rAywtKBMI6gqNA4F3qePTKt2lPPqtwdC63VC759KQmRuz9VWibinua4r",
        altText: "Fonksiyonel Ceket V.1 - Fermuar & Seam Detayı",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5",
        altText: "Fonksiyonel Ceket V.1 - Arka Silüet",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah", "Antrasit"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_02_s_blk",
        title: "S / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "3200.00", currencyCode: "TRY" },
        sku: "CL-0812-BLK-S",
      },
      {
        id: "var_02_m_blk",
        title: "M / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "3200.00", currencyCode: "TRY" },
        sku: "CL-0812-BLK-M",
      },
      {
        id: "var_02_l_blk",
        title: "L / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "3200.00", currencyCode: "TRY" },
        sku: "CL-0812-BLK-L",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Standart boxy kesim. Endüstriyel çift yönlü YKK mat siyah fermuar ve ergonomik kollar.",
      },
      {
        title: "Kumaş & Bakım",
        content: "Ağır balistik naylon kompozit. DWR su itici kaplama.",
      },
      {
        title: "Kargo & İade",
        content: "Aynı gün kargo ve 14 gün ücretsiz kolay değişim.",
      },
    ],
  },
  {
    id: "prod_03",
    handle: "asymmetric-denim",
    title: "Asimetrik Ham Denim Pantolon",
    sku: "CL-0731-DNM",
    description:
      "Ağır dokulu 14.5 oz Japon ham denim kumaş, kaydırılmış asimetrik dikişler ve modern geniş paça kesim.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Alt Giyim", "Ham Denim", "Klasik"],
    modelInfo: "Manken 185 cm boyunda / 32 beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2150.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2150.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1FQ7iwNeM3ACvTQSVdRxuK6DgTqqaxR0fIVr44t1OgQFpjH5zEVhDKYYhute1MkIeNssckFos4F9SRem5303jo75LYF-5r2xvYqV9snaEWOJgfJq1EKWAs1WpDqZU4WvLOfBBnQP4MJIub8sGoWHX7hzbSgXj384EEYcVWAbCRctAxVzAlvCGAR9C4gazSu3ojMX2M49khOhxtUphxtkL2eXGrOSnYJ_i8w9T2U42gNYl9Wq5B4R",
      altText: "Asimetrik Denim Pantolon",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1FQ7iwNeM3ACvTQSVdRxuK6DgTqqaxR0fIVr44t1OgQFpjH5zEVhDKYYhute1MkIeNssckFos4F9SRem5303jo75LYF-5r2xvYqV9snaEWOJgfJq1EKWAs1WpDqZU4WvLOfBBnQP4MJIub8sGoWHX7hzbSgXj384EEYcVWAbCRctAxVzAlvCGAR9C4gazSu3ojMX2M49khOhxtUphxtkL2eXGrOSnYJ_i8w9T2U42gNYl9Wq5B4R",
        altText: "Asimetrik Ham Denim - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYX9t7-gm",
        altText: "Asimetrik Ham Denim - Tam Boy Kombin",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Ham Siyah"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_03_30_blk",
        title: "30 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "30" },
        ],
        price: { amount: "2150.00", currencyCode: "TRY" },
        sku: "CL-0731-DNM-30",
      },
      {
        id: "var_03_32_blk",
        title: "32 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "2150.00", currencyCode: "TRY" },
        sku: "CL-0731-DNM-32",
      },
      {
        id: "var_03_34_blk",
        title: "34 / Ham Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Ham Siyah" },
          { name: "Beden", value: "34" },
        ],
        price: { amount: "2150.00", currencyCode: "TRY" },
        sku: "CL-0731-DNM-34",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Geniş paça (wide-leg) mimari kesim. Bükülmüş asimetrik dikiş hatları ve gizli perçinler.",
      },
      {
        title: "Kumaş & Bakım",
        content: "%100 Ham Selvedge Pamuk Denim. Kuru temizleme önerilir veya tersten soğuk suda yıkayınız.",
      },
      {
        title: "Kargo & İade",
        content: "Tüm Türkiye'ye ücretsiz kargo. 14 gün kolay iade.",
      },
    ],
  },
  {
    id: "prod_04",
    handle: "utility-vest-01",
    title: "Balistik Taktik Yelek 01",
    sku: "CL-0610-VST",
    description:
      "Ağır balistik naylondan üretilmiş neo-brutalist yüksek moda taktik yelek. Modüler tokalı göğüs panelleri ve çift yönlü hava kanallı file astar.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Yelek"],
    modelInfo: "Manken 185 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2600.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2600.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
      altText: "Balistik Taktik Yelek 01",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
        altText: "Balistik Taktik Yelek 01 - Ön Panel",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5",
        altText: "Balistik Taktik Yelek 01 - Arka Panel",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah", "Haki"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_04_s_blk",
        title: "S / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "2600.00", currencyCode: "TRY" },
        sku: "CL-0610-BLK-S",
      },
      {
        id: "var_04_m_blk",
        title: "M / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "2600.00", currencyCode: "TRY" },
        sku: "CL-0610-BLK-M",
      },
      {
        id: "var_04_l_blk",
        title: "L / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "2600.00", currencyCode: "TRY" },
        sku: "CL-0610-BLK-L",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Ayarlanabilir yan askı kemerleri, hızlı açılır endüstriyel kobra tokalar.",
      },
      {
        title: "Kumaş & Bakım",
        content: "1000D Cordura Naylon. Ağır aşınma direnci.",
      },
      {
        title: "Kargo & İade",
        content: "Ücretsiz kargo ve 14 gün ücretsiz değişim.",
      },
    ],
  },
  {
    id: "prod_05",
    handle: "structure-shirt-x",
    title: "Yapısal Overshirt Gömlek X",
    sku: "CL-0520-SHT",
    description:
      "Keskin geometrik omuz hatlarına ve gizli manyetik ceplere sahip yapısal gri overshirt.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Üst Giyim", "Gömlek", "Yeni"],
    modelInfo: "Manken 185 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1950.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1950.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh",
      altText: "Yapısal Gömlek X",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh",
        altText: "Yapısal Gömlek X - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDimJMjLGHYKAZWnqsojQoK4pq-bhQuXX5-7ILNrpQQDC6z5h7EgE3dwh9bwhbc9qyKKlTSu-X67tvY9uB1b9oDvMwrv-QIU0UGTWUT54wnSK3dyxsKulLiqDZZTzLawjcoeBfpI9ZK74sDcblcqbg6amcXLW1H349vezqS-5LkYLIGf9i2LbAkWP0C45-3rAywtKBMI6gqNA4F3qePTKt2lPPqtwdC63VC759KQmRuz9VWibinua4r",
        altText: "Yapısal Gömlek X - Kumaş Dokusu",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Beton Grisi", "Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_05_s_gry",
        title: "S / Beton Grisi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Beton Grisi" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1950.00", currencyCode: "TRY" },
        sku: "CL-0520-GRY-S",
      },
      {
        id: "var_05_m_gry",
        title: "M / Beton Grisi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Beton Grisi" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1950.00", currencyCode: "TRY" },
        sku: "CL-0520-GRY-M",
      },
      {
        id: "var_05_l_gry",
        title: "L / Beton Grisi",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Beton Grisi" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1950.00", currencyCode: "TRY" },
        sku: "CL-0520-GRY-L",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Geniş kutu omuz yapısı, gizli ön pat ve çıtçıtlı manşetler.",
      },
      {
        title: "Kumaş & Bakım",
        content: "%65 Ağır Pamuk, %35 Teknik Naylon Dimi Kumaş.",
      },
      {
        title: "Kargo & İade",
        content: "Ücretsiz sigortalı kargo.",
      },
    ],
  },
  {
    id: "prod_06",
    handle: "heavy-hoodie-b",
    title: "Ağır Gramaj Kapüşonlu Hoodie B",
    sku: "CL-0415-HOD",
    description:
      "500 GSM organik ağır pamuk polar. Çift katmanlı dik duran geniş kapüşon ve dikişsiz yan cepler.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Polar", "Ağır Gramaj"],
    modelInfo: "Manken 185 cm boyunda / L beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1750.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1750.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eRp120VVMFs7wy4V7OqHuNb7tRBPM7_lKSc7QMzQp6I35uQ_0FItLJG8chhV2960JJf0s9NCv90b5y9LpjgQIH0-dVPZHLmAMmFQh5XlbRyJGLhqqH87E2EJtsFITYp7bvbejU_2RnwbzM3JkY6GlWsvvlXA_ZFkKTLONuHP1xBLEB1o1wON-WFM5eBXrshzKlsJwltXWdAhdS7YEUwBpCtPcbrqbl7gSB64RZuHEOZ4PlDhsKEa",
      altText: "Ağır Gramaj Hoodie B",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8eRp120VVMFs7wy4V7OqHuNb7tRBPM7_lKSc7QMzQp6I35uQ_0FItLJG8chhV2960JJf0s9NCv90b5y9LpjgQIH0-dVPZHLmAMmFQh5XlbRyJGLhqqH87E2EJtsFITYp7bvbejU_2RnwbzM3JkY6GlWsvvlXA_ZFkKTLONuHP1xBLEB1o1wON-WFM5eBXrshzKlsJwltXWdAhdS7YEUwBpCtPcbrqbl7gSB64RZuHEOZ4PlDhsKEa",
        altText: "Ağır Gramaj Hoodie B - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDimJMjLGHYKAZWnqsojQoK4pq-bhQuXX5-7ILNrpQQDC6z5h7EgE3dwh9bwhbc9qyKKlTSu-X67tvY9uB1b9oDvMwrv-QIU0UGTWUT54wnSK3dyxsKulLiqDZZTzLawjcoeBfpI9ZK74sDcblcqbg6amcXLW1H349vezqS-5LkYLIGf9i2LbAkWP0C45-3rAywtKBMI6gqNA4F3qePTKt2lPPqtwdC63VC759KQmRuz9VWibinua4r",
        altText: "Ağır Gramaj Hoodie B - Kumaş Dokusu",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Mat Siyah", "Taş Beyazı"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_06_s_blk",
        title: "S / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-0415-BLK-S",
      },
      {
        id: "var_06_m_blk",
        title: "M / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-0415-BLK-M",
      },
      {
        id: "var_06_l_blk",
        title: "L / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-0415-BLK-L",
      },
      {
        id: "var_06_xl_blk",
        title: "XL / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "XL" },
        ],
        price: { amount: "1750.00", currencyCode: "TRY" },
        sku: "CL-0415-BLK-XL",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Geniş oversized kalıp. Düşük omuz dikişleri ve sıkı ribana manşetler.",
      },
      {
        title: "Kumaş & Bakım",
        content: "%100 500 GSM Ağır Fransız Havlu Pamuk Polar. Önceden çektirilmiştir.",
      },
      {
        title: "Kargo & İade",
        content: "Ücretsiz kargo ve 14 gün kolay iade.",
      },
    ],
  },
  {
    id: "prod_07",
    handle: "tactical-ls-og",
    title: "Taktik Ribbed Uzun Kollu OG",
    sku: "CL-0309-TLS",
    description:
      "Ağır güçlendirilmiş pamuk karışımlı kumaştan üretilmiş haki renkli taktik uzun kollu tişört. Dirsek takviyeleri ve başparmak delikli manşetler.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Üst Giyim", "Haki", "Temel"],
    modelInfo: "Manken 185 cm boyunda / M beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "1350.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1350.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8VHleIFRaj3VKXoGw3TBmZjuskBsSro921FCZSEQE3Pcbvz1qNWkKQswbVN9o_h9uQOXBy4rN8aSZqHRsRJfJ6ErKDgnkbeeKFVmACONFKjz3T2g2lRtgHiR99bRJEIGcLZVlZOw3OEELuoSiRdFdJzaXj4BwupXUpcsRk4Iwlgrb9dyc4u59caM_4aL24EoxbHKQhL01A274Q6GV6NMZhGqiSGwDotHW26bnRBDf0YhVVph3fUJj",
      altText: "Taktik Uzun Kollu OG",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8VHleIFRaj3VKXoGw3TBmZjuskBsSro921FCZSEQE3Pcbvz1qNWkKQswbVN9o_h9uQOXBy4rN8aSZqHRsRJfJ6ErKDgnkbeeKFVmACONFKjz3T2g2lRtgHiR99bRJEIGcLZVlZOw3OEELuoSiRdFdJzaXj4BwupXUpcsRk4Iwlgrb9dyc4u59caM_4aL24EoxbHKQhL01A274Q6GV6NMZhGqiSGwDotHW26bnRBDf0YhVVph3fUJj",
        altText: "Taktik Uzun Kollu OG - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYX9t7-gm",
        altText: "Taktik Uzun Kollu OG - Boydan Görünüm",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Askeri Haki", "Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L", "XL"] },
    ],
    variants: [
      {
        id: "var_07_s_olv",
        title: "S / Askeri Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Askeri Haki" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1350.00", currencyCode: "TRY" },
        sku: "CL-0309-OLV-S",
      },
      {
        id: "var_07_m_olv",
        title: "M / Askeri Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Askeri Haki" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1350.00", currencyCode: "TRY" },
        sku: "CL-0309-OLV-M",
      },
      {
        id: "var_07_l_olv",
        title: "L / Askeri Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Askeri Haki" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1350.00", currencyCode: "TRY" },
        sku: "CL-0309-OLV-L",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Rahat atletik kesim, mafsallı kollar ve çift dikişli bisiklet yaka.",
      },
      {
        title: "Kumaş & Bakım",
        content: "280 GSM Ağır Penye Pamuk %95, Likra %5.",
      },
      {
        title: "Kargo & İade",
        content: "Hızlı kargo ve 14 gün ücretsiz iade.",
      },
    ],
  },
  {
    id: "prod_08",
    handle: "wide-cargo-pants",
    title: "Modüler Yırtılmaz Kargo Pantolon",
    sku: "CL-0218-CRG",
    description:
      "Mühendislik ürünü 8 modüler cebe sahip, siyah geniş paça yırtılmaz (ripstop) kargo pantolon. Paçalarda ayarlanabilir stoper kordonlar.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Kargo", "Ripstop"],
    modelInfo: "Manken 185 cm boyunda / 32 beden giyiyor",
    priceRange: {
      minVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2450.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXeHrhKxIbD5oGAgc4C5AdII9ESW_kIAvY1qDioEQDdq_nGCw0sgpPIhhirUK1rUnQYDn9UsOI4lRodqQYkqHNXwIlYcrCpX_es_MgDaib3en45MkrU8P6Iv3kW45XHRvB6bQ2IeAxAdg_B52jjaUN4qoCarc85hGFFJ4Brci9qP-AqO1ptyOQtmoXC_Hk17mAJZKtsrA43cytloEiC8Xi-RqO0cfiZ5kGLegBqgEDr9kVvZSKRawA",
      altText: "Modüler Kargo Pantolon",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXeHrhKxIbD5oGAgc4C5AdII9ESW_kIAvY1qDioEQDdq_nGCw0sgpPIhhirUK1rUnQYDn9UsOI4lRodqQYkqHNXwIlYcrCpX_es_MgDaib3en45MkrU8P6Iv3kW45XHRvB6bQ2IeAxAdg_B52jjaUN4qoCarc85hGFFJ4Brci9qP-AqO1ptyOQtmoXC_Hk17mAJZKtsrA43cytloEiC8Xi-RqO0cfiZ5kGLegBqgEDr9kVvZSKRawA",
        altText: "Modüler Kargo Pantolon - Ön Görünüm",
      },
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBo1FQ7iwNeM3ACvTQSVdRxuK6DgTqqaxR0fIVr44t1OgQFpjH5zEVhDKYYhute1MkIeNssckFos4F9SRem5303jo75LYF-5r2xvYqV9snaEWOJgfJq1EKWAs1WpDqZU4WvLOfBBnQP4MJIub8sGoWHX7hzbSgXj384EEYcVWAbCRctAxVzAlvCGAR9C4gazSu3ojMX2M49khOhxtUphxtkL2eXGrOSnYJ_i8w9T2U42gNYl9Wq5B4R",
        altText: "Modüler Kargo Pantolon - Cep & Kumaş Detayı",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Mat Siyah", "Antrasit"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_08_30_blk",
        title: "30 / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "30" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-0218-BLK-30",
      },
      {
        id: "var_08_32_blk",
        title: "32 / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-0218-BLK-32",
      },
      {
        id: "var_08_34_blk",
        title: "34 / Mat Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Mat Siyah" },
          { name: "Beden", value: "34" },
        ],
        price: { amount: "2450.00", currencyCode: "TRY" },
        sku: "CL-0218-BLK-34",
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Geniş paça (wide-leg), elastik bel bandı ve fermuarlı taktik bacak cepleri.",
      },
      {
        title: "Kumaş & Bakım",
        content: "%100 Naylon Ripstop Kumaş. Su itici ve yırtılmaz kaplama.",
      },
      {
        title: "Kargo & İade",
        content: "Ücretsiz teslimat ve 14 gün ücretsiz iade.",
      },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_all",
    handle: "all",
    title: "Tüm Ürünler",
    description: "Eksiksiz CLOST kataloğu. Kullanışlılık ve kalıcılık için tasarlandı.",
    products: MOCK_PRODUCTS,
  },
  {
    id: "col_new",
    handle: "new",
    title: "Yeni Gelenler",
    description: "Sonbahar / Kış '24 serisi. Monokrom netlik ve gelişmiş kumaş mühendisliği.",
    products: MOCK_PRODUCTS.filter((p) => p.tags?.includes("Yeni")),
  },
  {
    id: "col_outerwear",
    handle: "outerwear",
    title: "Dış Giyim",
    description: "Ağır gramajlı, 3L hava şartlarına dayanıklı teknik mont, parka ve taktik yelekler.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Dış Giyim"),
  },
  {
    id: "col_tops",
    handle: "tops",
    title: "Üst Giyim",
    description: "500 GSM ağır polar hoodieler, taktik uzun kollular ve yapısal overshirt gömlekler.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Üst Giyim"),
  },
  {
    id: "col_bottoms",
    handle: "bottoms",
    title: "Alt Giyim",
    description: "Mimari Japon ham selvedge denim ve 8 cepli yırtılmaz taktik kargo pantolonlar.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Alt Giyim"),
  },
];
