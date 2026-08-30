You are the Lead Engineer building a modern fashion e-commerce storefront called "clost" on Next.js 15 (App Router).

EXECUTE THE FOLLOWING AUTOMATED ARCHITECTURE & CODE INTEGRATION:

1. DIRECTORY STRUCTURE SETUP:
   - Create directories under src/:
     - src/lib/shopify (Shopify Storefront API client & GraphQL queries)
     - src/lib/store (Zustand state for cart/drawers)
     - src/components/layout (Header, Footer, CartDrawer, MobileNav)
     - src/components/product (ProductCard, ProductGallery, VariantSelector, StickyMobileCTA)
     - src/components/ui (Button, Modal, Sheet, Accordion)

2. CORE STATE & API LAYER:
   - File: `src/lib/store/useCartStore.ts` -> Setup Zustand store managing { isOpen: boolean, cartId: string | null, openCart: () => void, closeCart: () => void, toggleCart: () => void }.
   - File: `src/lib/shopify/index.ts` -> Write typed GraphQL helpers for Shopify Storefront API (fetching products, collections, and cartLinesAdd mutations).

3. INTEGRATE STITCH DESIGN CODE:
   - Parse and transform the provided Stitch UI snippet below into production-ready Next.js (TypeScript) components.
   - Separate strictly:
     - SERVER COMPONENTS: Product static descriptions, server-rendered SEO grids, collection listings.
     - CLIENT COMPONENTS ('use client'): Interactive VariantSelector, StickyMobileCTA, and Slide-over CartDrawer connected to useCartStore.
   - Replace any <img> with next/image.
   - Ensure clean Tailwind styling, mobile-first responsiveness, and zero layout shift.

STITCH SOURCE CODE:
<!-- Heavyweight Hoodie — VOID ARCHIVE -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>VOID ARCHIVE - Product Detail</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#e2e2e2",
                      "tertiary-fixed": "#e6e1df",
                      "background": "#f9f9f9",
                      "inverse-primary": "#c8c6c5",
                      "on-tertiary": "#ffffff",
                      "surface-bright": "#f9f9f9",
                      "outline-variant": "#c4c7c7",
                      "on-error-container": "#93000a",
                      "inverse-surface": "#2f3131",
                      "on-surface": "#1a1c1c",
                      "secondary-container": "#dfe0e0",
                      "surface-container-low": "#f4f3f3",
                      "on-secondary-fixed-variant": "#454747",
                      "surface-tint": "#5f5e5e",
                      "primary-fixed-dim": "#c8c6c5",
                      "on-primary": "#ffffff",
                      "secondary": "#5d5f5f",
                      "primary-container": "#1c1b1b",
                      "secondary-fixed": "#e2e2e2",
                      "tertiary": "#000000",
                      "on-error": "#ffffff",
                      "on-background": "#1a1c1c",
                      "on-primary-container": "#858383",
                      "error": "#ba1a1a",
                      "on-secondary-container": "#616363",
                      "surface-container-highest": "#e2e2e2",
                      "tertiary-container": "#1d1b1a",
                      "outline": "#747878",
                      "surface-container-lowest": "#ffffff",
                      "primary": "#000000",
                      "secondary-fixed-dim": "#c6c6c7",
                      "on-primary-fixed": "#1c1b1b",
                      "inverse-on-surface": "#f1f1f1",
                      "primary-fixed": "#e5e2e1",
                      "on-primary-fixed-variant": "#474646",
                      "on-tertiary-fixed-variant": "#484645",
                      "on-tertiary-fixed": "#1d1b1a",
                      "on-surface-variant": "#444748",
                      "surface-dim": "#dadada",
                      "surface-container-high": "#e8e8e8",
                      "error-container": "#ffdad6",
                      "tertiary-fixed-dim": "#cac6c3",
                      "on-secondary-fixed": "#1a1c1c",
                      "surface-container": "#eeeeee",
                      "surface": "#f9f9f9",
                      "on-secondary": "#ffffff",
                      "on-tertiary-container": "#868381"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "xl": "80px",
                      "gutter": "16px",
                      "sm": "16px",
                      "margin-desktop": "40px",
                      "md": "24px",
                      "base": "8px",
                      "margin-mobile": "16px",
                      "xs": "4px",
                      "lg": "48px"
              },
              "fontFamily": {
                      "price-lg": ["JetBrains Mono"],
                      "body-md": ["Inter"],
                      "display-lg-mobile": ["Inter"],
                      "label-mono": ["JetBrains Mono"],
                      "headline-md": ["Inter"],
                      "display-lg": ["Inter"],
                      "body-lg": ["Inter"],
                      "headline-sm": ["Inter"]
              },
              "fontSize": {
                      "price-lg": ["20px", {"lineHeight": "24px", "fontWeight": "600"}],
                      "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                      "display-lg-mobile": ["40px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                      "label-mono": ["14px", {"lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500"}],
                      "headline-md": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                      "display-lg": ["72px", {"lineHeight": "72px", "letterSpacing": "-0.04em", "fontWeight": "700"}],
                      "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                      "headline-sm": ["24px", {"lineHeight": "32px", "fontWeight": "600"}]
              }
            }
          }
        }
    </script>
<style>
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        .strike-through {
            position: relative;
        }
        .strike-through::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top right, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%);
            pointer-events: none;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md text-body-md antialiased min-h-screen flex flex-col">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface border-b border-primary">
<div class="flex gap-md hidden md:flex font-label-mono text-label-mono">
<a class="text-primary border-b border-primary pb-1" href="#">Shop All</a>
<a class="text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">New</a>
<a class="text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">Collections</a>
<a class="text-on-surface-variant hover:text-primary transition-opacity duration-200" href="#">About</a>
</div>
<div class="md:hidden flex items-center">
<button class="text-primary p-2">
<span class="material-symbols-outlined" data-icon="menu">menu</span>
</button>
</div>
<a class="font-headline-sm text-headline-sm font-bold tracking-tighter text-primary uppercase absolute left-1/2 -translate-x-1/2" href="#">
            VOID ARCHIVE
        </a>
<div class="flex gap-sm text-primary items-center">
<button class="p-2 hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined" data-icon="search">search</span>
</button>
<button class="p-2 hover:opacity-70 transition-opacity duration-200 hidden md:block">
<span class="material-symbols-outlined" data-icon="person">person</span>
</button>
<button class="p-2 hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
</button>
</div>
</nav>
<!-- Main Content Grid -->
<main class="flex-grow pt-[65px] flex flex-col md:flex-row w-full max-w-[1920px] mx-auto">
<!-- Left: Image Gallery (Scrollable on desktop, slider on mobile) -->
<div class="w-full md:w-[60%] lg:w-[65%] border-r border-primary flex flex-col no-scrollbar md:h-[calc(100vh-65px)] md:overflow-y-auto bg-surface-variant">
<div class="flex flex-row overflow-x-auto snap-x snap-mandatory md:flex-col md:overflow-visible">
<div class="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative">
<img class="w-full h-full object-cover absolute inset-0" data-alt="High fashion streetwear photography. A model wearing an oversized, structured black technical jacket with raw hems. Shot against a stark, brutalist concrete wall. High contrast, sharp focus, moody lighting emphasizing the fabric texture and garment architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0WDpvXYEs1ZQedwFf4RAbPlY8PaclgrCjPTRek-lPQR-vgNqLk5CZy3NSqp76kZG_DFr9Vk8ZUXPCpjB2GKWGN5JPuTyYgEDI-XaLjgICApVOD4vjf-p-DdB67Lb9rr2rgShNuAKZhQdbb0utIOMTG5TyN-V4WCOmgitGOfVdASEtmtWyh5BVkWT4jfngsTB8rHCtb1yMuw01StDzcYFN_3MsA5uUF8BjsmRAvR1TOpnqmw3rMviQ"/>
</div>
<div class="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative">
<img class="w-full h-full object-cover absolute inset-0" data-alt="Detail shot of high-end streetwear fabric. Close up of a matte black technical nylon material with engineered seam taping and a heavy gauge metal zipper. The lighting is harsh and angular, highlighting the engineered, utilitarian nature of the garment. Neo-brutalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDimJMjLGHYKAZWnqsojQoK4pq-bhQuXX5-7ILNrpQQDC6z5h7EgE3dwh9bwhbc9qyKKlTSu-X67tvY9uB1b9oDvMwrv-QIU0UGTWUT54wnSK3dyxsKulLiqDZZTzLawjcoeBfpI9ZK74sDcblcqbg6amcXLW1H349vezqS-5LkYLIGf9i2LbAkWP0C45-3rAywtKBMI6gqNA4F3qePTKt2lPPqtwdC63VC759KQmRuz9VWibinua4r"/>
</div>
<div class="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative">
<img class="w-full h-full object-cover absolute inset-0" data-alt="Full body shot of a model wearing high fashion streetwear. An oversized technical coat over wide leg trousers. The setting is a minimalist white studio space with strong directional shadows. The styling is stark, intentional, and strictly monochromatic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWE313CKKbVMGOlCdkOyRCH75aYprCxXv7nopqIAChruldZcdSQmngzKs6XC9RYsOPMxH3XxAGji2t-CApdVa_UOc8gKBtYtccQdvQ3GwvWU-7oceRDuO-jubQhJHJ8qrZYHi72SHKuCjPA69qCCI81zIpd4rvZov-S81qM6Dzf_wJln5h3-H4HTcfxqWV8yyrdeosOYJDCJjGcMDTKGBKWKvPogVzju3zYy-8BtNJqOlYpX9t7-gm"/>
</div>
<div class="min-w-full md:min-w-0 snap-start border-b border-primary aspect-[4/5] relative">
<img class="w-full h-full object-cover absolute inset-0" data-alt="High contrast editorial streetwear shot from behind. Showing the structured back paneling and subtle tonal branding of a heavy black technical parka. The background is pure white void, focusing entirely on the severe lines and aggressive silhouette of the clothing." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMt4XmPAa-NLHGZAZn-UUdIdUosMYNjBrq9nzGMX3r9-hoscdSUc--V8FTgjhq3q6epSbSbQfA8LW01mkBGJLgEs7aMgTmHMagAq_aVNdn2exYA2X7qPPAuT_4mqJwNQnPfhXs8T8CHmXVUoiDY34EtqbSqnZygJIpGdkJLgYLfJY_igN7n8oWFFUhDjAWD3ikoMTFgsqPH8xYFxdli7mZKrIfItVWTdb6qW1C2UbqknhkShA7d4s5"/>
</div>
</div>
</div>
<!-- Right: Sticky Product Details -->
<div class="w-full md:w-[40%] lg:w-[35%] bg-surface flex flex-col">
<div class="md:sticky md:top-[65px] md:h-[calc(100vh-65px)] md:overflow-y-auto no-scrollbar">
<!-- Header Info -->
<div class="p-margin-mobile md:p-margin-desktop border-b border-primary">
<div class="flex justify-between items-start mb-sm">
<h1 class="font-headline-md text-headline-md text-primary uppercase tracking-tighter w-2/3">Oversized Technical Parka V.2</h1>
<span class="font-price-lg text-price-lg text-primary">$450</span>
</div>
<p class="font-label-mono text-label-mono text-on-surface-variant">SKU: VA-0924-BLK</p>
</div>
<!-- Color Selection -->
<div class="p-margin-mobile md:p-margin-desktop border-b border-primary">
<div class="font-label-mono text-label-mono text-primary mb-sm">COLOR: BLACK</div>
<div class="flex gap-sm">
<button aria-label="Black" class="w-10 h-10 border border-primary bg-primary"></button>
<button aria-label="White" class="w-10 h-10 border border-primary bg-white"></button>
<button aria-label="Gray" class="w-10 h-10 border border-primary bg-surface-variant"></button>
</div>
</div>
<!-- Size Selection -->
<div class="p-margin-mobile md:p-margin-desktop border-b border-primary">
<div class="flex justify-between items-center mb-sm font-label-mono text-label-mono">
<span class="text-primary">SIZE</span>
<a class="text-on-surface-variant hover:text-primary underline decoration-1 underline-offset-4" href="#">SIZE GUIDE</a>
</div>
<div class="grid grid-cols-4 gap-[1px] bg-primary border border-primary mb-sm">
<button class="bg-surface hover:bg-surface-variant text-primary h-12 flex items-center justify-center font-label-mono text-label-mono transition-colors">S</button>
<button class="bg-primary text-white h-12 flex items-center justify-center font-label-mono text-label-mono">M</button>
<button class="bg-surface text-on-surface-variant h-12 flex items-center justify-center font-label-mono text-label-mono strike-through cursor-not-allowed">L</button>
<button class="bg-surface hover:bg-surface-variant text-primary h-12 flex items-center justify-center font-label-mono text-label-mono transition-colors">XL</button>
</div>
<p class="font-label-mono text-label-mono text-on-surface-variant text-xs uppercase tracking-widest mt-xs">Model is 185cm / wears size M</p>
</div>
<!-- Add to Cart Action -->
<div class="p-margin-mobile md:p-margin-desktop border-b border-primary">
<button class="w-full bg-primary text-white font-label-mono text-label-mono h-14 flex items-center justify-center hover:bg-surface-variant hover:text-primary border border-primary transition-colors duration-200 uppercase tracking-widest">
                        Add to Cart
                    </button>
</div>
<!-- Details Accordion -->
<div class="p-margin-mobile md:p-margin-desktop border-b border-primary">
<p class="font-body-md text-body-md text-primary mb-md">Engineered for utility. The V.2 Technical Parka features a heavyweight nylon shell with bonded seams and articulated sleeves for an aggressive silhouette.</p>
<!-- Accordion Item 1 -->
<div class="border-t border-primary">
<button class="w-full py-sm flex justify-between items-center font-label-mono text-label-mono text-primary uppercase text-left group">
<span>Details &amp; Fit</span>
<span class="material-symbols-outlined transition-transform duration-200 group-hover:rotate-180" data-icon="add">add</span>
</button>
</div>
<!-- Accordion Item 2 -->
<div class="border-t border-primary">
<button class="w-full py-sm flex justify-between items-center font-label-mono text-label-mono text-primary uppercase text-left group">
<span>Fabric &amp; Care</span>
<span class="material-symbols-outlined transition-transform duration-200 group-hover:rotate-180" data-icon="add">add</span>
</button>
</div>
<!-- Accordion Item 3 -->
<div class="border-t border-primary">
<button class="w-full py-sm flex justify-between items-center font-label-mono text-label-mono text-primary uppercase text-left group">
<span>Shipping &amp; Returns</span>
<span class="material-symbols-outlined transition-transform duration-200 group-hover:rotate-180" data-icon="add">add</span>
</button>
</div>
</div>
</div>
</div>
</main>
<!-- Footer -->
<footer class="w-full py-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-md bg-surface border-t border-primary mt-auto">
<div class="col-span-1 md:col-span-2">
<div class="font-headline-sm text-headline-sm font-bold text-primary mb-sm">VOID ARCHIVE</div>
<div class="font-label-mono text-label-mono text-on-surface-variant">© 2024 VOID ARCHIVE. ENGINEERED FOR UTILITY.</div>
</div>
<div class="col-span-1 flex flex-col gap-base font-label-mono text-label-mono">
<a class="text-on-surface-variant hover:text-primary underline transition-colors duration-200" href="#">Terms</a>
<a class="text-on-surface-variant hover:text-primary underline transition-colors duration-200" href="#">Privacy</a>
</div>
<div class="col-span-1 flex flex-col gap-base font-label-mono text-label-mono">
<a class="text-on-surface-variant hover:text-primary underline transition-colors duration-200" href="#">Shipping</a>
<a class="text-on-surface-variant hover:text-primary underline transition-colors duration-200" href="#">Returns</a>
<a class="text-on-surface-variant hover:text-primary underline transition-colors duration-200" href="#">Contact</a>
</div>
</footer>
</body></html>

<!-- Shopping Bag — VOID ARCHIVE -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>AJAX Cart Drawer</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "surface-variant": "#e2e2e2",
                    "tertiary-fixed": "#e6e1df",
                    "background": "#f9f9f9",
                    "inverse-primary": "#c8c6c5",
                    "on-tertiary": "#ffffff",
                    "surface-bright": "#f9f9f9",
                    "outline-variant": "#c4c7c7",
                    "on-error-container": "#93000a",
                    "inverse-surface": "#2f3131",
                    "on-surface": "#1a1c1c",
                    "secondary-container": "#dfe0e0",
                    "surface-container-low": "#f4f3f3",
                    "on-secondary-fixed-variant": "#454747",
                    "surface-tint": "#5f5e5e",
                    "primary-fixed-dim": "#c8c6c5",
                    "on-primary": "#ffffff",
                    "secondary": "#5d5f5f",
                    "primary-container": "#1c1b1b",
                    "secondary-fixed": "#e2e2e2",
                    "tertiary": "#000000",
                    "on-error": "#ffffff",
                    "on-background": "#1a1c1c",
                    "on-primary-container": "#858383",
                    "error": "#ba1a1a",
                    "on-secondary-container": "#616363",
                    "surface-container-highest": "#e2e2e2",
                    "tertiary-container": "#1d1b1a",
                    "outline": "#747878",
                    "surface-container-lowest": "#ffffff",
                    "primary": "#000000",
                    "secondary-fixed-dim": "#c6c6c7",
                    "on-primary-fixed": "#1c1b1b",
                    "inverse-on-surface": "#f1f1f1",
                    "primary-fixed": "#e5e2e1",
                    "on-primary-fixed-variant": "#474646",
                    "on-tertiary-fixed-variant": "#484645",
                    "on-tertiary-fixed": "#1d1b1a",
                    "on-surface-variant": "#444748",
                    "surface-dim": "#dadada",
                    "surface-container-high": "#e8e8e8",
                    "error-container": "#ffdad6",
                    "tertiary-fixed-dim": "#cac6c3",
                    "on-secondary-fixed": "#1a1c1c",
                    "surface-container": "#eeeeee",
                    "surface": "#f9f9f9",
                    "on-secondary": "#ffffff",
                    "on-tertiary-container": "#868381"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "full": "9999px"
            },
            "spacing": {
                    "xl": "80px",
                    "gutter": "16px",
                    "sm": "16px",
                    "margin-desktop": "40px",
                    "md": "24px",
                    "base": "8px",
                    "margin-mobile": "16px",
                    "xs": "4px",
                    "lg": "48px"
            },
            "fontFamily": {
                    "price-lg": [
                            "JetBrains Mono"
                    ],
                    "body-md": [
                            "Inter"
                    ],
                    "display-lg-mobile": [
                            "Inter"
                    ],
                    "label-mono": [
                            "JetBrains Mono"
                    ],
                    "headline-md": [
                            "Inter"
                    ],
                    "display-lg": [
                            "Inter"
                    ],
                    "body-lg": [
                            "Inter"
                    ],
                    "headline-sm": [
                            "Inter"
                    ]
            },
            "fontSize": {
                    "price-lg": [
                            "20px",
                            {
                                    "lineHeight": "24px",
                                    "fontWeight": "600"
                            }
                    ],
                    "body-md": [
                            "16px",
                            {
                                    "lineHeight": "24px",
                                    "fontWeight": "400"
                            }
                    ],
                    "display-lg-mobile": [
                            "40px",
                            {
                                    "lineHeight": "40px",
                                    "letterSpacing": "-0.02em",
                                    "fontWeight": "700"
                            }
                    ],
                    "label-mono": [
                            "14px",
                            {
                                    "lineHeight": "20px",
                                    "letterSpacing": "0.05em",
                                    "fontWeight": "500"
                            }
                    ],
                    "headline-md": [
                            "32px",
                            {
                                    "lineHeight": "40px",
                                    "letterSpacing": "-0.02em",
                                    "fontWeight": "600"
                            }
                    ],
                    "display-lg": [
                            "72px",
                            {
                                    "lineHeight": "72px",
                                    "letterSpacing": "-0.04em",
                                    "fontWeight": "700"
                            }
                    ],
                    "body-lg": [
                            "18px",
                            {
                                    "lineHeight": "28px",
                                    "fontWeight": "400"
                            }
                    ],
                    "headline-sm": [
                            "24px",
                            {
                                    "lineHeight": "32px",
                                    "fontWeight": "600"
                            }
                    ]
            }
    },
        },
      }
    </script>
<style>
        .drawer-overlay {
            background-color: rgba(0, 0, 0, 0.6);
        }
        
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    </style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen relative overflow-hidden">
<!-- Fake Background Content to show overlay effect -->
<div class="p-margin-desktop opacity-30 pointer-events-none filter blur-sm">
<h1 class="font-display-lg text-display-lg mb-lg">BRUTALIST COMMERCE</h1>
<div class="grid grid-cols-4 gap-gutter">
<div class="h-64 bg-surface-variant border border-outline-variant"></div>
<div class="h-64 bg-surface-variant border border-outline-variant"></div>
<div class="h-64 bg-surface-variant border border-outline-variant"></div>
<div class="h-64 bg-surface-variant border border-outline-variant"></div>
</div>
</div>
<!-- Top Navigation Placeholder (Hidden for this specific task scope, but contextually present) -->
<!-- Cart Drawer Overlay -->
<div class="fixed inset-0 z-50 drawer-overlay flex justify-end">
<!-- Drawer Container -->
<div class="w-full max-w-md h-full bg-surface-container-lowest border-l border-primary flex flex-col transform transition-transform duration-300 translate-x-0 shadow-none">
<!-- Header -->
<div class="flex justify-between items-center p-sm border-b border-primary">
<h2 class="font-headline-sm text-headline-sm uppercase tracking-tighter">Cart (2)</h2>
<button aria-label="Close cart" class="p-xs hover:bg-surface-variant transition-colors">
<span class="material-symbols-outlined" data-icon="close">close</span>
</button>
</div>
<!-- Free Shipping Bar -->
<div class="bg-surface-variant border-b border-primary p-sm text-center">
<p class="font-label-mono text-label-mono text-on-surface-variant">
                    Add <span class="font-bold text-on-surface">$25.00</span> more to unlock free shipping
                </p>
<div class="w-full h-1 bg-surface-container-highest mt-base">
<div class="h-full bg-primary" style="width: 75%;"></div>
</div>
</div>
<!-- Line Items -->
<div class="flex-1 overflow-y-auto no-scrollbar p-sm flex flex-col gap-sm">
<!-- Item 1 -->
<div class="flex gap-sm border border-outline-variant p-xs">
<div class="w-24 h-32 flex-shrink-0 bg-surface-variant border-r border-outline-variant relative">
<img class="w-full h-full object-cover grayscale" data-alt="A high-fashion studio shot of a stark black utilitarian jacket with sharp architectural cuts, displayed on a minimalist concrete background under harsh white light. Neo-brutalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcgbETzrQr3DMidnsbKEf8qbXM3goTtnUnNEuHrcqEGHZaLy9v2lVnwiRIXLXcF-rBbp_S1tuwGxzQkJzAwht8P8jakPrIhGDkieohzs_69yyNSNoK6a40_h96-VV-m5tJfauM0M47lz4UQRB8kul5fQe-kdSLMLCFgNXsJLX1tF-gvDYEcwRuO0dS8Y4DDgUX6Hp2GSe4vvGQT4pu6qISXlgK2YI1xaOHKoPW-vOHlNfaw0s946WO"/>
</div>
<div class="flex-1 flex flex-col justify-between py-xs pr-xs">
<div>
<div class="flex justify-between items-start">
<h3 class="font-body-md text-body-md font-bold uppercase">Utility Jacket</h3>
<button aria-label="Remove item" class="text-outline hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Size: L / Black</p>
</div>
<div class="flex justify-between items-end">
<p class="font-price-lg text-price-lg">$240</p>
<!-- Stepper -->
<div class="flex items-center border border-primary h-8">
<button class="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors">-</button>
<span class="font-label-mono text-label-mono w-8 text-center border-l border-r border-primary">1</span>
<button class="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors">+</button>
</div>
</div>
</div>
</div>
<!-- Item 2 -->
<div class="flex gap-sm border border-outline-variant p-xs">
<div class="w-24 h-32 flex-shrink-0 bg-surface-variant border-r border-outline-variant relative">
<img class="w-full h-full object-cover grayscale" data-alt="A close-up studio shot of heavily textured, distressed black denim trousers with asymmetric seams, set against a stark white backdrop. High contrast, minimalist neo-brutalist style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo1FQ7iwNeM3ACvTQSVdRxuK6DgTqqaxR0fIVr44t1OgQFpjH5zEVhDKYYhute1MkIeNssckFos4F9SRem5303jo75LYF-5r2xvYqV9snaEWOJgfJq1EKWAs1WpDqZU4WvLOfBBnQP4MJIub8sGoWHX7hzbSgXj384EEYcVWAbCRctAxVzAlvCGAR9C4gazSu3ojMX2M49khOhxtUphxtkL2eXGrOSnYJ_i8w9T2U42gNYl9Wq5B4R"/>
</div>
<div class="flex-1 flex flex-col justify-between py-xs pr-xs">
<div>
<div class="flex justify-between items-start">
<h3 class="font-body-md text-body-md font-bold uppercase">Asymmetric Denim</h3>
<button aria-label="Remove item" class="text-outline hover:text-primary transition-colors">
<span class="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
</button>
</div>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Size: 32 / Black</p>
</div>
<div class="flex justify-between items-end">
<p class="font-price-lg text-price-lg">$185</p>
<!-- Stepper -->
<div class="flex items-center border border-primary h-8">
<button class="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors">-</button>
<span class="font-label-mono text-label-mono w-8 text-center border-l border-r border-primary">1</span>
<button class="w-8 h-full flex items-center justify-center hover:bg-surface-variant transition-colors">+</button>
</div>
</div>
</div>
</div>
</div>
<!-- Footer / Checkout -->
<div class="border-t border-primary p-sm bg-surface-container-lowest">
<div class="flex justify-between items-center mb-md">
<span class="font-body-lg text-body-lg uppercase font-bold">Subtotal</span>
<span class="font-price-lg text-price-lg">$425.00</span>
</div>
<p class="font-label-mono text-label-mono text-on-surface-variant mb-md text-sm">Shipping &amp; taxes calculated at checkout.</p>
<button class="w-full bg-primary text-on-primary h-14 flex items-center justify-center font-label-mono text-label-mono uppercase tracking-widest hover:bg-surface-tint transition-colors">
                    Checkout <span class="material-symbols-outlined ml-xs" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
</body></html>

<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>VOID ARCHIVE - Collections</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "surface-variant": "#e2e2e2",
                        "tertiary-fixed": "#e6e1df",
                        "background": "#f9f9f9",
                        "inverse-primary": "#c8c6c5",
                        "on-tertiary": "#ffffff",
                        "surface-bright": "#f9f9f9",
                        "outline-variant": "#c4c7c7",
                        "on-error-container": "#93000a",
                        "inverse-surface": "#2f3131",
                        "on-surface": "#1a1c1c",
                        "secondary-container": "#dfe0e0",
                        "surface-container-low": "#f4f3f3",
                        "on-secondary-fixed-variant": "#454747",
                        "surface-tint": "#5f5e5e",
                        "primary-fixed-dim": "#c8c6c5",
                        "on-primary": "#ffffff",
                        "secondary": "#5d5f5f",
                        "primary-container": "#1c1b1b",
                        "secondary-fixed": "#e2e2e2",
                        "tertiary": "#000000",
                        "on-error": "#ffffff",
                        "on-background": "#1a1c1c",
                        "on-primary-container": "#858383",
                        "error": "#ba1a1a",
                        "on-secondary-container": "#616363",
                        "surface-container-highest": "#e2e2e2",
                        "tertiary-container": "#1d1b1a",
                        "outline": "#747878",
                        "surface-container-lowest": "#ffffff",
                        "primary": "#000000",
                        "secondary-fixed-dim": "#c6c6c7",
                        "on-primary-fixed": "#1c1b1b",
                        "inverse-on-surface": "#f1f1f1",
                        "primary-fixed": "#e5e2e1",
                        "on-primary-fixed-variant": "#474646",
                        "on-tertiary-fixed-variant": "#484645",
                        "on-tertiary-fixed": "#1d1b1a",
                        "on-surface-variant": "#444748",
                        "surface-dim": "#dadada",
                        "surface-container-high": "#e8e8e8",
                        "error-container": "#ffdad6",
                        "tertiary-fixed-dim": "#cac6c3",
                        "on-secondary-fixed": "#1a1c1c",
                        "surface-container": "#eeeeee",
                        "surface": "#f9f9f9",
                        "on-secondary": "#ffffff",
                        "on-tertiary-container": "#868381"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "xl": "80px",
                        "gutter": "16px",
                        "sm": "16px",
                        "margin-desktop": "40px",
                        "md": "24px",
                        "base": "8px",
                        "margin-mobile": "16px",
                        "xs": "4px",
                        "lg": "48px"
                    },
                    "fontFamily": {
                        "price-lg": ["JetBrains Mono"],
                        "body-md": ["Inter"],
                        "display-lg-mobile": ["Inter"],
                        "label-mono": ["JetBrains Mono"],
                        "headline-md": ["Inter"],
                        "display-lg": ["Inter"],
                        "body-lg": ["Inter"],
                        "headline-sm": ["Inter"]
                    },
                    "fontSize": {
                        "price-lg": ["20px", { "lineHeight": "24px", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "display-lg-mobile": ["40px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "label-mono": ["14px", { "lineHeight": "20px", "letterSpacing": "0.05em", "fontWeight": "500" }],
                        "headline-md": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
                        "display-lg": ["72px", { "lineHeight": "72px", "letterSpacing": "-0.04em", "fontWeight": "700" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
                        "headline-sm": ["24px", { "lineHeight": "32px", "fontWeight": "600" }]
                    }
                }
            }
        }
    </script>
<style>
        .aspect-4-5 { aspect-ratio: 4 / 5; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md antialiased selection:bg-primary selection:text-on-primary flex flex-col min-h-screen">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface dark:bg-surface border-b border-primary dark:border-outline-variant flat no shadows">
<div class="flex items-center gap-md">
<a class="font-headline-sm text-headline-sm font-bold tracking-tighter text-primary dark:text-on-surface uppercase" href="#">VOID ARCHIVE</a>
<div class="hidden md:flex gap-md font-label-mono text-label-mono">
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">Shop All</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">New</a>
<a class="text-primary dark:text-on-surface border-b border-primary dark:border-on-surface pb-1 hover:opacity-70 transition-opacity duration-200" href="#">Collections</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">About</a>
</div>
</div>
<div class="flex items-center gap-sm">
<button class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">search</span>
</button>
<button class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">person</span>
</button>
<button class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">shopping_bag</span>
</button>
</div>
</nav>
<!-- Main Content -->
<main class="flex-grow pt-16 flex flex-col md:flex-row w-full max-w-[1920px] mx-auto">
<!-- Mobile Filter Toggle -->
<div class="md:hidden sticky top-16 z-40 bg-surface border-b border-primary p-margin-mobile flex justify-between items-center w-full">
<span class="font-label-mono text-label-mono uppercase">Filter &amp; Sort</span>
<button class="flex items-center justify-center w-8 h-8 border border-primary" id="mobileFilterBtn">
<span class="material-symbols-outlined">tune</span>
</button>
</div>
<!-- Sidebar Filters -->
<aside class="hidden md:block w-full md:w-[320px] flex-shrink-0 border-r border-primary bg-surface z-40 md:z-0 fixed md:sticky top-[121px] md:top-16 h-[calc(100vh-121px)] md:h-[calc(100vh-64px)] overflow-y-auto no-scrollbar left-0" id="sidebar">
<div class="p-margin-mobile md:p-margin-desktop flex flex-col gap-xl">
<!-- Category Filter -->
<div class="flex flex-col gap-md">
<h3 class="font-label-mono text-label-mono uppercase border-b border-primary pb-base">Category</h3>
<div class="flex flex-col gap-sm">
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-checkbox h-4 w-4 text-primary border-primary rounded-none focus:ring-0" type="checkbox"/>
<span class="font-body-md text-body-md uppercase">Outerwear</span>
</label>
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input checked="" class="form-checkbox h-4 w-4 text-primary border-primary rounded-none focus:ring-0" type="checkbox"/>
<span class="font-body-md text-body-md uppercase">Tops</span>
</label>
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-checkbox h-4 w-4 text-primary border-primary rounded-none focus:ring-0" type="checkbox"/>
<span class="font-body-md text-body-md uppercase">Bottoms</span>
</label>
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-checkbox h-4 w-4 text-primary border-primary rounded-none focus:ring-0" type="checkbox"/>
<span class="font-body-md text-body-md uppercase">Accessories</span>
</label>
</div>
</div>
<!-- Size Filter -->
<div class="flex flex-col gap-md">
<h3 class="font-label-mono text-label-mono uppercase border-b border-primary pb-base">Size</h3>
<div class="grid grid-cols-4 gap-xs">
<button class="border border-primary p-sm flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">XS</button>
<button class="border border-primary bg-primary text-on-primary p-sm flex items-center justify-center font-label-mono text-label-mono">S</button>
<button class="border border-primary p-sm flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">M</button>
<button class="border border-primary p-sm flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">L</button>
<button class="border border-primary p-sm flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">XL</button>
<button class="border border-outline-variant text-outline-variant p-sm flex items-center justify-center font-label-mono text-label-mono relative overflow-hidden" disabled="">
<span class="relative z-10">XXL</span>
<div class="absolute inset-0 w-full h-full bg-transparent border-t border-outline-variant transform rotate-45 origin-top-left -ml-[1px]"></div>
</button>
</div>
</div>
<!-- Color Filter -->
<div class="flex flex-col gap-md">
<h3 class="font-label-mono text-label-mono uppercase border-b border-primary pb-base">Color</h3>
<div class="flex flex-wrap gap-sm">
<button aria-label="Black" class="w-8 h-8 border border-primary bg-black flex items-center justify-center">
<span class="material-symbols-outlined text-white text-[16px]">check</span>
</button>
<button aria-label="White" class="w-8 h-8 border border-primary bg-white hover:border-2"></button>
<button aria-label="Grey" class="w-8 h-8 border border-primary bg-[#4A4A4A] hover:border-2"></button>
<button aria-label="Olive" class="w-8 h-8 border border-primary bg-[#5d5f5f] hover:border-2"></button>
</div>
</div>
<!-- Price Filter -->
<div class="flex flex-col gap-md">
<h3 class="font-label-mono text-label-mono uppercase border-b border-primary pb-base">Price</h3>
<div class="flex flex-col gap-sm">
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-radio h-4 w-4 text-primary border-primary focus:ring-0" name="price" type="radio"/>
<span class="font-label-mono text-label-mono uppercase">Under $100</span>
</label>
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-radio h-4 w-4 text-primary border-primary focus:ring-0" name="price" type="radio"/>
<span class="font-label-mono text-label-mono uppercase">$100 - $300</span>
</label>
<label class="flex items-center gap-sm cursor-pointer hover:opacity-70">
<input class="form-radio h-4 w-4 text-primary border-primary focus:ring-0" name="price" type="radio"/>
<span class="font-label-mono text-label-mono uppercase">Over $300</span>
</label>
</div>
</div>
<div class="mt-auto pt-xl">
<button class="w-full bg-primary text-on-primary font-label-mono text-label-mono h-14 uppercase hover:bg-surface-tint transition-colors">Apply Filters</button>
<button class="w-full bg-transparent text-primary font-label-mono text-label-mono h-14 uppercase mt-sm border border-primary hover:bg-surface-variant transition-colors">Clear All</button>
</div>
</div>
</aside>
<!-- Product Grid -->
<section class="flex-grow p-margin-mobile md:p-margin-desktop">
<header class="mb-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-md border-b border-primary pb-md">
<div>
<h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg uppercase tracking-tighter">Tops</h1>
<p class="font-body-md text-body-md text-on-surface-variant mt-sm">24 ITEMS / FALL '24</p>
</div>
<div class="hidden md:flex items-center gap-sm">
<span class="font-label-mono text-label-mono uppercase text-on-surface-variant">Sort By</span>
<select class="border-b border-primary bg-transparent font-label-mono text-label-mono uppercase py-xs pr-lg focus:ring-0 cursor-pointer appearance-none rounded-none">
<option>Newest</option>
<option>Price: High to Low</option>
<option>Price: Low to High</option>
</select>
</div>
</header>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-xl">
<!-- Product Card 1 -->
<article class="group flex flex-col gap-sm relative">
<div class="relative w-full aspect-4-5 border border-primary overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A neo-brutalist high fashion editorial shot of a black utilitarian vest. Sharp lighting, plain stark white background. High contrast, raw aesthetic. Monochromatic palette." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfvuvkqrVS7yfktHNmCqB1cQ4ac5jLpWdLd9ta6oB_0_2FHoFq_b1dKxGKUFTcJAbL5G8eKHIpJcAyu2q3E7Y3jstNFkPOZYYK7b8OGewdT95CCojuaMxtpuzqiuCr9qWkhNLh3LgvSseNd3MUV-kCvN6QvuqclAR-vq02hGnQZxRB0MN5JzEP36-QWH4VidF8gacNqETXDjlQr7-ijUYN_uUAwsLcho9N0FnLK8WIKzdOrCN4sO3F"/>
<div class="absolute top-sm left-sm border border-primary bg-surface px-sm py-xs font-label-mono text-label-mono text-[10px] uppercase">New</div>
<!-- Hover Size Grid Overlay -->
<div class="absolute inset-0 bg-surface/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<span class="font-label-mono text-label-mono uppercase mb-md">Quick Add</span>
<div class="grid grid-cols-3 gap-xs p-md">
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">S</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">M</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">L</button>
</div>
</div>
</div>
<div class="flex justify-between items-start pt-xs">
<div class="flex flex-col">
<h2 class="font-body-lg text-body-lg uppercase font-bold tracking-tight">Utility Vest_01</h2>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Black / Nylon</p>
</div>
<span class="font-price-lg text-price-lg">$240</span>
</div>
</article>
<!-- Product Card 2 -->
<article class="group flex flex-col gap-sm relative">
<div class="relative w-full aspect-4-5 border border-primary overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A minimalist fashion photography shot of a structured grey overshirt. The model is standing straight against a raw concrete wall. Harsh shadows, architectural feel. High fashion streetwear." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdxcHT2JhGKFYhsnqXg_qqHbtxxYQCmToLiL1_2e1ihHnzouJ1ZuBy1690y6qJ-iBvU3lxzXTS2gqIR2VzSAGAidhnBMcJXGetFZnPeMGOzB5dnLnGsrHZQPIpCUonLIb1FQp8jju7_5XhsvfZqROlri_qwhJchhTUQt_3zQHGNh8Fz4HFlF5qCS8J501T-n6ac4jJT1-ZpNS_LV5cvpnT2Hv42bw9rkihkHvKPm8wgQub2mnx13Mh"/>
<!-- Hover Size Grid Overlay -->
<div class="absolute inset-0 bg-surface/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<span class="font-label-mono text-label-mono uppercase mb-md">Quick Add</span>
<div class="grid grid-cols-3 gap-xs p-md">
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">S</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">M</button>
<button class="w-10 h-10 border border-outline-variant text-outline-variant flex items-center justify-center font-label-mono text-label-mono relative overflow-hidden" disabled="">
<span class="relative z-10">L</span>
<div class="absolute inset-0 w-full h-full bg-transparent border-t border-outline-variant transform rotate-45 origin-top-left -ml-[1px]"></div>
</button>
</div>
</div>
</div>
<div class="flex justify-between items-start pt-xs">
<div class="flex flex-col">
<h2 class="font-body-lg text-body-lg uppercase font-bold tracking-tight">Structure Shirt_X</h2>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Grey / Cotton</p>
</div>
<span class="font-price-lg text-price-lg">$185</span>
</div>
</article>
<!-- Product Card 3 (Low Stock) -->
<article class="group flex flex-col gap-sm relative">
<div class="relative w-full aspect-4-5 border border-primary overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="A stark, high-contrast flat lay of a black heavyweight hoodie on a stark white surface. Extreme minimalist styling, deep shadows, geometric composition. Neo-brutalist aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8eRp120VVMFs7wy4V7OqHuNb7tRBPM7_lKSc7QMzQp6I35uQ_0FItLJG8chhV2960JJf0s9NCv90b5y9LpjgQIH0-dVPZHLmAMmFQh5XlbRyJGLhqqH87E2EJtsFITYp7bvbejU_2RnwbzM3JkY6GlWsvvlXA_ZFkKTLONuHP1xBLEB1o1wON-WFM5eBXrshzKlsJwltXWdAhdS7YEUwBpCtPcbrqbl7gSB64RZuHEOZ4PlDhsKEa"/>
<div class="absolute top-sm left-sm border border-primary bg-primary text-on-primary px-sm py-xs font-label-mono text-label-mono text-[10px] uppercase">Low Stock</div>
<!-- Hover Size Grid Overlay -->
<div class="absolute inset-0 bg-surface/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<span class="font-label-mono text-label-mono uppercase mb-md">Quick Add</span>
<div class="grid grid-cols-2 gap-xs p-md">
<button class="w-10 h-10 border border-outline-variant text-outline-variant flex items-center justify-center font-label-mono text-label-mono relative overflow-hidden" disabled="">
<span class="relative z-10">S</span>
<div class="absolute inset-0 w-full h-full bg-transparent border-t border-outline-variant transform rotate-45 origin-top-left -ml-[1px]"></div>
</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">M</button>
</div>
</div>
</div>
<div class="flex justify-between items-start pt-xs">
<div class="flex flex-col">
<h2 class="font-body-lg text-body-lg uppercase font-bold tracking-tight">Heavy Hoodie_B</h2>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Black / Fleece</p>
</div>
<span class="font-price-lg text-price-lg">$150</span>
</div>
</article>
<!-- Product Card 4 -->
<article class="group flex flex-col gap-sm relative">
<div class="relative w-full aspect-4-5 border border-primary overflow-hidden bg-surface-variant">
<img class="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="Close up shot of a tactical long sleeve shirt in olive green. Textured fabric visible. Sharp lighting, raw industrial background. Minimalist fashion approach." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8VHleIFRaj3VKXoGw3TBmZjuskBsSro921FCZSEQE3Pcbvz1qNWkKQswbVN9o_h9uQOXBy4rN8aSZqHRsRJfJ6ErKDgnkbeeKFVmACONFKjz3T2g2lRtgHiR99bRJEIGcLZVlZOw3OEELuoSiRdFdJzaXj4BwupXUpcsRk4Iwlgrb9dyc4u59caM_4aL24EoxbHKQhL01A274Q6GV6NMZhGqiSGwDotHW26bnRBDf0YhVVph3fUJj"/>
<!-- Hover Size Grid Overlay -->
<div class="absolute inset-0 bg-surface/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
<span class="font-label-mono text-label-mono uppercase mb-md">Quick Add</span>
<div class="grid grid-cols-4 gap-xs p-md">
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">XS</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">S</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">M</button>
<button class="w-10 h-10 border border-primary flex items-center justify-center font-label-mono text-label-mono hover:bg-primary hover:text-on-primary transition-colors">L</button>
</div>
</div>
</div>
<div class="flex justify-between items-start pt-xs">
<div class="flex flex-col">
<h2 class="font-body-lg text-body-lg uppercase font-bold tracking-tight">Tactical LS_OG</h2>
<p class="font-label-mono text-label-mono text-on-surface-variant mt-xs">Olive / Blend</p>
</div>
<span class="font-price-lg text-price-lg">$120</span>
</div>
</article>
</div>
<!-- Load More -->
<div class="mt-xl flex justify-center border-t border-primary pt-lg">
<button class="border border-primary px-xl py-sm font-label-mono text-label-mono uppercase hover:bg-primary hover:text-on-primary transition-colors">Load More Items</button>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full py-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-md bg-surface dark:bg-surface border-t border-primary dark:border-outline-variant flat no shadows mt-auto">
<div class="font-headline-sm text-headline-sm font-bold text-primary dark:text-on-surface uppercase">
            VOID ARCHIVE
        </div>
<div class="font-body-md text-body-md text-on-surface-variant dark:text-outline md:col-span-2">
            © 2024 VOID ARCHIVE. ENGINEERED FOR UTILITY.
        </div>
<div class="flex flex-wrap gap-sm font-label-mono text-label-mono justify-start md:justify-end">
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Terms</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Privacy</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Shipping</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Returns</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Contact</a>
</div>
</footer>
<script>
        document.getElementById('mobileFilterBtn').addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('hidden');
            if(!sidebar.classList.contains('hidden')) {
                sidebar.classList.add('fixed', 'inset-0', 'top-[121px]', 'bg-surface', 'z-50');
            } else {
                sidebar.classList.remove('fixed', 'inset-0', 'top-[121px]', 'bg-surface', 'z-50');
            }
        });
    </script>
</body></html>

<!-- Collections — VOID ARCHIVE -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>VOID ARCHIVE - Core Collection</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&amp;family=JetBrains+Mono:wght@500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "surface-variant": "#e2e2e2",
                      "tertiary-fixed": "#e6e1df",
                      "background": "#f9f9f9",
                      "inverse-primary": "#c8c6c5",
                      "on-tertiary": "#ffffff",
                      "surface-bright": "#f9f9f9",
                      "outline-variant": "#c4c7c7",
                      "on-error-container": "#93000a",
                      "inverse-surface": "#2f3131",
                      "on-surface": "#1a1c1c",
                      "secondary-container": "#dfe0e0",
                      "surface-container-low": "#f4f3f3",
                      "on-secondary-fixed-variant": "#454747",
                      "surface-tint": "#5f5e5e",
                      "primary-fixed-dim": "#c8c6c5",
                      "on-primary": "#ffffff",
                      "secondary": "#5d5f5f",
                      "primary-container": "#1c1b1b",
                      "secondary-fixed": "#e2e2e2",
                      "tertiary": "#000000",
                      "on-error": "#ffffff",
                      "on-background": "#1a1c1c",
                      "on-primary-container": "#858383",
                      "error": "#ba1a1a",
                      "on-secondary-container": "#616363",
                      "surface-container-highest": "#e2e2e2",
                      "tertiary-container": "#1d1b1a",
                      "outline": "#747878",
                      "surface-container-lowest": "#ffffff",
                      "primary": "#000000",
                      "secondary-fixed-dim": "#c6c6c7",
                      "on-primary-fixed": "#1c1b1b",
                      "inverse-on-surface": "#f1f1f1",
                      "primary-fixed": "#e5e2e1",
                      "on-primary-fixed-variant": "#474646",
                      "on-tertiary-fixed-variant": "#484645",
                      "on-tertiary-fixed": "#1d1b1a",
                      "on-surface-variant": "#444748",
                      "surface-dim": "#dadada",
                      "surface-container-high": "#e8e8e8",
                      "error-container": "#ffdad6",
                      "tertiary-fixed-dim": "#cac6c3",
                      "on-secondary-fixed": "#1a1c1c",
                      "surface-container": "#eeeeee",
                      "surface": "#f9f9f9",
                      "on-secondary": "#ffffff",
                      "on-tertiary-container": "#868381"
              },
              "borderRadius": {
                      "DEFAULT": "0.25rem",
                      "lg": "0.5rem",
                      "xl": "0.75rem",
                      "full": "9999px"
              },
              "spacing": {
                      "xl": "80px",
                      "gutter": "16px",
                      "sm": "16px",
                      "margin-desktop": "40px",
                      "md": "24px",
                      "base": "8px",
                      "margin-mobile": "16px",
                      "xs": "4px",
                      "lg": "48px"
              },
              "fontFamily": {
                      "price-lg": [
                              "JetBrains Mono"
                      ],
                      "body-md": [
                              "Inter"
                      ],
                      "display-lg-mobile": [
                              "Inter"
                      ],
                      "label-mono": [
                              "JetBrains Mono"
                      ],
                      "headline-md": [
                              "Inter"
                      ],
                      "display-lg": [
                              "Inter"
                      ],
                      "body-lg": [
                              "Inter"
                      ],
                      "headline-sm": [
                              "Inter"
                      ]
              },
              "fontSize": {
                      "price-lg": [
                              "20px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "600"
                              }
                      ],
                      "body-md": [
                              "16px",
                              {
                                      "lineHeight": "24px",
                                      "fontWeight": "400"
                              }
                      ],
                      "display-lg-mobile": [
                              "40px",
                              {
                                      "lineHeight": "40px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "700"
                              }
                      ],
                      "label-mono": [
                              "14px",
                              {
                                      "lineHeight": "20px",
                                      "letterSpacing": "0.05em",
                                      "fontWeight": "500"
                              }
                      ],
                      "headline-md": [
                              "32px",
                              {
                                      "lineHeight": "40px",
                                      "letterSpacing": "-0.02em",
                                      "fontWeight": "600"
                              }
                      ],
                      "display-lg": [
                              "72px",
                              {
                                      "lineHeight": "72px",
                                      "letterSpacing": "-0.04em",
                                      "fontWeight": "700"
                              }
                      ],
                      "body-lg": [
                              "18px",
                              {
                                      "lineHeight": "28px",
                                      "fontWeight": "400"
                              }
                      ],
                      "headline-sm": [
                              "24px",
                              {
                                      "lineHeight": "32px",
                                      "fontWeight": "600"
                              }
                      ]
              }
      },
          },
        }
      </script>
<style>
        .ticker-wrap {
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
            white-space: nowrap;
        }
        .ticker {
            display: inline-block;
            animation: ticker 20s linear infinite;
        }
        @keyframes ticker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
        }
        
        /* Brutalist reset */
        * {
            border-radius: 0 !important;
        }
    </style>
</head>
<body class="bg-surface text-on-surface font-body-md min-h-screen flex flex-col pt-16">
<!-- TopNavBar -->
<nav class="fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-16 bg-surface dark:bg-surface border-b border-primary dark:border-outline-variant transition-all duration-200" id="topNav">
<div class="flex gap-md hidden md:flex font-label-mono text-label-mono text-on-surface-variant dark:text-outline">
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">Shop All</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">New</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">Collections</a>
<a class="text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface hover:opacity-70 transition-opacity duration-200" href="#">About</a>
</div>
<div class="flex-1 md:flex-none flex justify-center md:justify-start">
<a class="font-headline-sm text-headline-sm font-bold tracking-tighter text-primary dark:text-on-surface uppercase" href="/">VOID ARCHIVE</a>
</div>
<div class="flex gap-sm md:gap-md items-center">
<button aria-label="search" class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">search</span>
</button>
<button aria-label="person" class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">person</span>
</button>
<button aria-label="shopping_bag" class="hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">shopping_bag</span>
</button>
<!-- Mobile Menu Toggle -->
<button aria-label="menu" class="md:hidden hover:opacity-70 transition-opacity duration-200">
<span class="material-symbols-outlined text-primary">menu</span>
</button>
</div>
</nav>
<!-- Main Content -->
<main class="flex-grow">
<!-- USP Ticker -->
<div class="border-b border-outline-variant bg-surface py-xs text-on-surface-variant">
<div class="ticker-wrap font-label-mono text-label-mono text-[10px] md:text-label-mono uppercase tracking-widest">
<div class="ticker">
<span>Worldwide Shipping • Premium Materials • Engineered for Utility • Void Archive Core Collection • Worldwide Shipping • Premium Materials • Engineered for Utility • Void Archive Core Collection •</span>
<span>Worldwide Shipping • Premium Materials • Engineered for Utility • Void Archive Core Collection • Worldwide Shipping • Premium Materials • Engineered for Utility • Void Archive Core Collection •</span>
</div>
</div>
</div>
<!-- Hero Section -->
<section class="relative w-full h-[870px] border-b border-primary overflow-hidden group">
<img class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" data-alt="A striking avant-garde fashion editorial photography shot in black and white. A lone model wearing structural, neo-brutalist techwear stands in a vast, empty concrete industrial space. Strong directional light casts dramatic shadows. High contrast, sharp focus, minimal composition, raw materiality, architectural precision." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhVRpzb1ylxKworpFGnS9n9NPThs_A1JBQXmpHb0KPA0mK4ZFNf8Su2ZP6HZNpsMvuXCCaQ4gWtBhuuOyiA4uOB3qoKFfWvfK5Cv9RBuj50xdABVdQFLirtgan3BkAITJH7l1pDerfU1WeL8k3K7HM48Wu3t0EN3vM5l_vjmfzTpZIy1E5JOB4ZuMFRVh8Gs0bBlyINEHlHzlj-Hv8RuBHgcaPs61TwwMblhXxHSTD1s5HAN_TBcVb"/>
<div class="absolute inset-0 bg-black/20"></div>
<div class="absolute inset-0 flex flex-col justify-end p-margin-mobile md:p-margin-desktop pb-xl md:pb-xl z-10 pointer-events-none">
<h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-primary mb-md uppercase mix-blend-difference pointer-events-auto">Core Collection</h1>
<div class="pointer-events-auto">
<a class="inline-block bg-primary text-on-primary font-label-mono text-label-mono px-xl py-md hover:bg-surface hover:text-primary border border-transparent hover:border-primary transition-colors duration-300 uppercase" href="#featured">
                        Discover
                    </a>
</div>
</div>
</section>
<!-- Featured Grid -->
<section class="py-xl border-b border-primary" id="featured">
<div class="px-margin-mobile md:px-margin-desktop mb-lg flex justify-between items-end">
<h2 class="font-headline-md text-headline-md uppercase text-primary tracking-tighter">New Arrivals</h2>
<a class="font-label-mono text-label-mono hover:opacity-70 uppercase border-b border-primary pb-xs" href="#">View All</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-b border-outline-variant">
<!-- Product 1 -->
<a class="group block border-r border-b lg:border-b-0 border-outline-variant last:border-r-0 relative" href="#">
<div class="aspect-[4/5] overflow-hidden bg-surface-variant relative">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Product photography of a black heavy cotton hooded sweatshirt with technical utilitarian pockets. Shot flat against a stark white background. High contrast, sharp details, brutalist minimalist presentation." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Ft1VgW44qJt40I20sGqNhDVaW6FMFa3S3r3e7IUi5tObv7mytXW0jBewDpVfazERgcnCLWH8ItPbeYPgqazpvngWL0j9YaAeBMFeDnR05_xsfOhc8cliadRLI2jGPLQHK02DHt7DANozjZ3QOcSwfvNKEjrf9YYUJr-hwrKduE6Vs3QlIr2hbh0S6CXHTFjQ9rP3qbn_-nmnGrItJ9xPBSUIadFgcTqQYER-qVZvzODwWnK11lAs"/>
<div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
</div>
<div class="p-sm flex justify-between items-start bg-surface">
<div>
<h3 class="font-label-mono text-label-mono uppercase mb-xs">Utility Hoodie</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Heavyweight Cotton</p>
</div>
<span class="font-price-lg text-price-lg">$240</span>
</div>
</a>
<!-- Product 2 -->
<a class="group block border-r border-b lg:border-b-0 border-outline-variant last:border-r-0 relative" href="#">
<div class="aspect-[4/5] overflow-hidden bg-surface-variant relative">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Product photography of wide-leg structural cargo trousers in stark black. Complex pocket engineering. Shot flat against a pure white studio background. Minimalist, high-end streetwear aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXeHrhKxIbD5oGAgc4C5AdII9ESW_kIAvY1qDioEQDdq_nGCw0sgpPIhhirUK1rUnQYDn9UsOI4lRodqQYkqHNXwIlYcrCpX_es_MgDaib3en45MkrU8P6Iv3kW45XHRvB6bQ2IeAxAdg_B52jjaUN4qoCarc85hGFFJ4Brci9qP-AqO1ptyOQtmoXC_Hk17mAJZKtsrA43cytloEiC8Xi-RqO0cfiZ5kGLegBqgEDr9kVvZSKRawA"/>
<div class="absolute top-sm left-sm bg-primary text-on-primary font-label-mono text-[10px] px-2 py-1 uppercase border border-primary">New</div>
</div>
<div class="p-sm flex justify-between items-start bg-surface">
<div>
<h3 class="font-label-mono text-label-mono uppercase mb-xs">Structure Cargo</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Nylon Ripstop</p>
</div>
<span class="font-price-lg text-price-lg">$310</span>
</div>
</a>
<!-- Product 3 -->
<a class="group block border-r border-b md:border-b-0 border-outline-variant last:border-r-0 relative" href="#">
<div class="aspect-[4/5] overflow-hidden bg-surface-variant relative">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Product photography of a minimalist white oversized t-shirt with subtle structural seams. Shot flat against a light grey background to show contrast. Clean, sharp, unembellished." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcluj-SlpUDzRDnkBgb_Cyrrgkq2OgZyxDb9ubPOE7P3LIBBIKMmBi7g9VENoztaZSVvKTXHXkbdhGP5vmIZu80oMQvajRkX-g8kQZ0_A-0hUuj5Hde7dgVuq2xy1_-W5IT3NLTJTgDVUvb1JVSf87_WBP3XvDk0PKbgmkDTM3x0DcAt_bAOSrMF7qx6fEletor5NVi38VwqHi3Mdrgzle73J8y7VlT9COhq8E_S1Ot8tudbF510no"/>
</div>
<div class="p-sm flex justify-between items-start bg-surface">
<div>
<h3 class="font-label-mono text-label-mono uppercase mb-xs">Oversized Tee</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Organic Cotton</p>
</div>
<span class="font-price-lg text-price-lg">$120</span>
</div>
</a>
<!-- Product 4 -->
<a class="group block border-r-0 border-outline-variant relative" href="#">
<div class="aspect-[4/5] overflow-hidden bg-surface-variant relative">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Product photography of a black tactical vest with multiple industrial zippers and raw edge finishing. Shot flat against a stark white background. High contrast, aggressive simplicity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqsekZYZXSLJVyeLh07MNjUxKXfFTbGjHEJs2RjGWmFdhcgxILoYwAB662rbmnIJItTiyT1wl6F6aaoP-4570BiLieXCST6jgHpSnN3O8N8TwMSvfR5Jm57WkFvpR99ZyWRL3E8EPIAJ8Sa6yuSJCkGZWzeZIinfqoscz24ucuQnuVaw9YSAV5TeGlPd-Gso4VWSBiX5CdyzlFDeo2_Tn-7_mkIVq7Hoy3GH7XZtvPJT458CR0L8dZ"/>
</div>
<div class="p-sm flex justify-between items-start bg-surface">
<div>
<h3 class="font-label-mono text-label-mono uppercase mb-xs">Tactical Vest</h3>
<p class="font-body-md text-body-md text-on-surface-variant text-sm">Cordura</p>
</div>
<span class="font-price-lg text-price-lg">$450</span>
</div>
</a>
</div>
</section>
<!-- Editorial Section -->
<section class="border-b border-primary bg-surface-bright">
<div class="grid grid-cols-1 lg:grid-cols-12 min-h-[716px]">
<!-- Large Image (Left, spanning 7 cols) -->
<div class="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-outline-variant relative h-[512px] lg:h-auto overflow-hidden group">
<img class="absolute inset-0 w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-105" data-alt="Abstract fashion editorial shot. Extreme close up of heavy black fabric textures, industrial zippers, and rigid seams against a harsh white background. A study in raw materiality and engineered construction. Brutalist high-contrast aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsnAGILp2S-cLEM0DzPAduoEeAkpSoeItOpjNIYXMuiEqWz3KXB2H3vgRklx_-pAF1WsB4kcPAl5D8ALH1_3eKkumhYmRh9nZ2B4pjYLzYZLv0FyIxKMXdLYXEgGXiLWNR2BIt5QJExHO5CoMJouW7aCapeGbWvcU8SZgrvcHpGdQLOO6Uld0MoU1FzJYABEGpyVJiBd4eGU_bMNpQJjdgn-voNIHMYuhrUczRrnAJwPqkHJpC_yJO"/>
</div>
<!-- Narrative Text Block (Right, spanning 4 cols, offset by 1) -->
<div class="lg:col-span-4 lg:col-start-9 flex flex-col justify-center p-margin-mobile md:p-margin-desktop py-xl">
<span class="font-label-mono text-label-mono uppercase text-on-surface-variant mb-md border-b border-outline-variant pb-xs inline-block w-max">Editorial 001</span>
<h2 class="font-headline-md text-headline-md uppercase text-primary mb-md tracking-tighter leading-none">Engineered<br/>For Utility</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant mb-xl">
                        A strict adherence to structural integrity. The Core Collection rejects superfluous ornamentation in favor of absolute function. Heavyweight materials engineered for the modern brutalist landscape.
                    </p>
<a class="inline-block border border-primary text-primary font-label-mono text-label-mono px-xl py-md text-center hover:bg-primary hover:text-on-primary transition-colors duration-300 uppercase w-full sm:w-auto" href="#">
                        Read Manifesto
                    </a>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full py-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-md bg-surface dark:bg-surface border-t border-primary dark:border-outline-variant">
<div class="md:col-span-1 mb-md md:mb-0">
<div class="font-headline-sm text-headline-sm font-bold text-primary dark:text-on-surface mb-xs uppercase tracking-tighter">VOID ARCHIVE</div>
<p class="font-body-md text-body-md text-on-surface-variant dark:text-outline text-xs mt-sm max-w-[200px]">
                © 2024 VOID ARCHIVE. ENGINEERED FOR UTILITY.
             </p>
</div>
<div class="md:col-span-3 flex flex-col sm:flex-row gap-xl justify-end">
<div class="flex flex-col gap-sm">
<span class="font-label-mono text-label-mono uppercase text-primary dark:text-on-surface mb-xs">Legal</span>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Terms</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Privacy</a>
</div>
<div class="flex flex-col gap-sm">
<span class="font-label-mono text-label-mono uppercase text-primary dark:text-on-surface mb-xs">Support</span>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Shipping</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Returns</a>
<a class="font-body-md text-body-md text-on-surface-variant dark:text-outline hover:text-primary dark:hover:text-on-surface underline transition-colors duration-200" href="#">Contact</a>
</div>
<div class="flex flex-col gap-sm w-full sm:w-auto mt-md sm:mt-0">
<span class="font-label-mono text-label-mono uppercase text-primary dark:text-on-surface mb-xs">Newsletter</span>
<div class="flex border-b border-primary dark:border-outline-variant focus-within:border-primary transition-colors">
<input class="bg-transparent border-none focus:ring-0 font-label-mono text-label-mono px-0 py-sm w-full text-primary placeholder-on-surface-variant uppercase text-xs" placeholder="ENTER EMAIL" type="email"/>
<button class="font-label-mono text-label-mono text-primary hover:opacity-70 px-sm uppercase">Submit</button>
</div>
</div>
</div>
</footer>
</body></html>