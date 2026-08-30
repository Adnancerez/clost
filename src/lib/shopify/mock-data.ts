import { Product, Collection } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_01",
    handle: "oversized-technical-parka-v2",
    title: "Oversized Teknik Parka V.2",
    sku: "VA-0924-BLK",
    description:
      "Kullanışlılık için tasarlandı. V.2 Teknik Parka, yapıştırılmış dikişlere ve agresif bir siluet sunan mafsallı kollara sahip ağır gramajlı naylon dış yüzeye sahiptir.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Yeni", "Dış Giyim", "Sonbahar 24"],
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
        sku: "VA-0924-BLK-S",
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
        sku: "VA-0924-BLK-M",
      },
      {
        id: "var_01_l_blk",
        title: "L / Siyah",
        availableForSale: false, // Stokta yok testi
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "4500.00", currencyCode: "TRY" },
        sku: "VA-0924-BLK-L",
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
        sku: "VA-0924-BLK-XL",
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
          "1.500 ₺ üzeri siparişlerde tüm Türkiye'ye ücretsiz kargo. Etiketi çıkarılmamış ve kullanılmamış ürünlerde 30 gün içinde kolay iade.",
      },
    ],
  },
  {
    id: "prod_02",
    handle: "utility-jacket",
    title: "Fonksiyonel Ceket",
    sku: "VA-0812-BLK",
    description:
      "Mimari sertlik ve minimal çevresel etki için tasarlanmış yapısal dış giyim parçası.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Dış Giyim",
    tags: ["Dış Giyim", "Sonbahar 24"],
    priceRange: {
      minVariantPrice: { amount: "2400.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2400.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
      altText: "Fonksiyonel Ceket",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO",
        altText: "Fonksiyonel Ceket",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_02_l_blk",
        title: "L / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "2400.00", currencyCode: "TRY" },
      },
    ],
    accordions: [
      {
        title: "Detaylar & Kalıp",
        content: "Standart boxy kesim. Endüstriyel çift yönlü fermuar.",
      },
    ],
  },
  {
    id: "prod_03",
    handle: "asymmetric-denim",
    title: "Asimetrik Denim Pantolon",
    sku: "VA-0731-RAW",
    description:
      "Ağır dokulu ham denim kumaş, kaydırılmış asimetrik dikişler ve geniş paça kesim.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Alt Giyim", "Ham Denim"],
    priceRange: {
      minVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
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
        altText: "Asimetrik Denim Pantolon",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34"] },
    ],
    variants: [
      {
        id: "var_03_32_blk",
        title: "32 / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
      },
    ],
  },
  {
    id: "prod_04",
    handle: "utility-vest-01",
    title: "Taktik Yelek 01",
    sku: "VA-0610-NV",
    description:
      "Ağır balistik naylondan üretilmiş neo-brutalist yüksek moda taktik yelek.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Yeni", "Üst Giyim", "Yelek"],
    priceRange: {
      minVariantPrice: { amount: "2400.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "2400.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
      altText: "Taktik Yelek 01",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F",
        altText: "Taktik Yelek 01",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_04_s",
        title: "S / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "2400.00", currencyCode: "TRY" },
      },
      {
        id: "var_04_m",
        title: "M / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "2400.00", currencyCode: "TRY" },
      },
      {
        id: "var_04_l",
        title: "L / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "2400.00", currencyCode: "TRY" },
      },
    ],
  },
  {
    id: "prod_05",
    handle: "structure-shirt-x",
    title: "Yapısal Gömlek X",
    sku: "VA-0520-GRY",
    description:
      "Keskin geometrik omuz hatlarına ve gizli ceplere sahip yapısal gri overshirt.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Üst Giyim", "Gömlek"],
    priceRange: {
      minVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1850.00", currencyCode: "TRY" },
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
        altText: "Yapısal Gömlek X",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Gri"] },
      { id: "opt_size", name: "Beden", values: ["S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_05_s",
        title: "S / Gri",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Gri" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
      },
      {
        id: "var_05_m",
        title: "M / Gri",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Gri" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
      },
      {
        id: "var_05_l",
        title: "L / Gri",
        availableForSale: false,
        selectedOptions: [
          { name: "Renk", value: "Gri" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1850.00", currencyCode: "TRY" },
      },
    ],
  },
  {
    id: "prod_06",
    handle: "heavy-hoodie-b",
    title: "Ağır Gramaj Hoodie B",
    sku: "VA-0415-FLC",
    description:
      "Yüksek kontrastlı, ağır gramajlı polar hoodie. Geniş kapüşonlu minimalist tasarım.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Stok Az", "Üst Giyim", "Polar"],
    priceRange: {
      minVariantPrice: { amount: "1500.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1500.00", currencyCode: "TRY" },
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
        altText: "Ağır Gramaj Hoodie B",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah"] },
      { id: "opt_size", name: "Beden", values: ["S", "M"] },
    ],
    variants: [
      {
        id: "var_06_s",
        title: "S / Siyah",
        availableForSale: false,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1500.00", currencyCode: "TRY" },
      },
      {
        id: "var_06_m",
        title: "M / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1500.00", currencyCode: "TRY" },
      },
    ],
  },
  {
    id: "prod_07",
    handle: "tactical-ls-og",
    title: "Taktik Uzun Kollu OG",
    sku: "VA-0309-OLV",
    description:
      "Ağır güçlendirilmiş pamuk karışımlı kumaştan üretilmiş haki renkli taktik uzun kollu tişört.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Üst Giyim",
    tags: ["Üst Giyim", "Haki"],
    priceRange: {
      minVariantPrice: { amount: "1200.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "1200.00", currencyCode: "TRY" },
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
        altText: "Taktik Uzun Kollu OG",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Haki"] },
      { id: "opt_size", name: "Beden", values: ["XS", "S", "M", "L"] },
    ],
    variants: [
      {
        id: "var_07_xs",
        title: "XS / Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Haki" },
          { name: "Beden", value: "XS" },
        ],
        price: { amount: "1200.00", currencyCode: "TRY" },
      },
      {
        id: "var_07_s",
        title: "S / Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Haki" },
          { name: "Beden", value: "S" },
        ],
        price: { amount: "1200.00", currencyCode: "TRY" },
      },
      {
        id: "var_07_m",
        title: "M / Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Haki" },
          { name: "Beden", value: "M" },
        ],
        price: { amount: "1200.00", currencyCode: "TRY" },
      },
      {
        id: "var_07_l",
        title: "L / Haki",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Haki" },
          { name: "Beden", value: "L" },
        ],
        price: { amount: "1200.00", currencyCode: "TRY" },
      },
    ],
  },
  {
    id: "prod_08",
    handle: "structure-cargo",
    title: "Yapısal Kargo Pantolon",
    sku: "VA-0205-RIP",
    description:
      "Mühendislik ürünü modüler ceplere sahip, siyah geniş paça yırtılmaz kargo pantolon.",
    availableForSale: true,
    vendor: "CLOST",
    productType: "Alt Giyim",
    tags: ["Yeni", "Alt Giyim", "Kargo"],
    priceRange: {
      minVariantPrice: { amount: "3100.00", currencyCode: "TRY" },
      maxVariantPrice: { amount: "3100.00", currencyCode: "TRY" },
    },
    featuredImage: {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXeHrhKxIbD5oGAgc4C5AdII9ESW_kIAvY1qDioEQDdq_nGCw0sgpPIhhirUK1rUnQYDn9UsOI4lRodqQYkqHNXwIlYcrCpX_es_MgDaib3en45MkrU8P6Iv3kW45XHRvB6bQ2IeAxAdg_B52jjaUN4qoCarc85hGFFJ4Brci9qP-AqO1ptyOQtmoXC_Hk17mAJZKtsrA43cytloEiC8Xi-RqO0cfiZ5kGLegBqgEDr9kVvZSKRawA",
      altText: "Yapısal Kargo Pantolon",
      width: 1200,
      height: 1500,
    },
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXeHrhKxIbD5oGAgc4C5AdII9ESW_kIAvY1qDioEQDdq_nGCw0sgpPIhhirUK1rUnQYDn9UsOI4lRodqQYkqHNXwIlYcrCpX_es_MgDaib3en45MkrU8P6Iv3kW45XHRvB6bQ2IeAxAdg_B52jjaUN4qoCarc85hGFFJ4Brci9qP-AqO1ptyOQtmoXC_Hk17mAJZKtsrA43cytloEiC8Xi-RqO0cfiZ5kGLegBqgEDr9kVvZSKRawA",
        altText: "Yapısal Kargo Pantolon",
      },
    ],
    options: [
      { id: "opt_color", name: "Renk", values: ["Siyah"] },
      { id: "opt_size", name: "Beden", values: ["30", "32", "34", "36"] },
    ],
    variants: [
      {
        id: "var_08_32",
        title: "32 / Siyah",
        availableForSale: true,
        selectedOptions: [
          { name: "Renk", value: "Siyah" },
          { name: "Beden", value: "32" },
        ],
        price: { amount: "3100.00", currencyCode: "TRY" },
      },
    ],
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "col_all",
    handle: "all",
    title: "Tüm Ürünler",
    description: "Eksiksiz CLOST kataloğu. Kullanışlılık için tasarlandı.",
    products: MOCK_PRODUCTS,
  },
  {
    id: "col_new",
    handle: "new",
    title: "Yeni Gelenler",
    description: "Sonbahar '24 özel serisi. Monokrom netlik.",
    products: MOCK_PRODUCTS.filter((p) => p.tags?.includes("Yeni")),
  },
  {
    id: "col_outerwear",
    handle: "outerwear",
    title: "Dış Giyim",
    description: "Ağır gramajlı, hava şartlarına dayanıklı teknik mont ve parkalar.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Dış Giyim"),
  },
  {
    id: "col_tops",
    handle: "tops",
    title: "Üst Giyim",
    description: "Ağır polar hoodieler, taktik uzun kollular ve yapısal gömlekler.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Üst Giyim"),
  },
  {
    id: "col_bottoms",
    handle: "bottoms",
    title: "Alt Giyim",
    description: "Mimari ham denim ve yırtılmaz kargo pantolonlar.",
    products: MOCK_PRODUCTS.filter((p) => p.productType === "Alt Giyim"),
  },
];
