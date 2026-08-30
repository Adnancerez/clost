import {
  Product,
  ProductVariant,
  Collection,
  Cart,
  FilterOptions,
} from "./types";
import { MOCK_PRODUCTS, MOCK_COLLECTIONS } from "./mock-data";
import {
  getProductsQuery,
  getProductByHandleQuery,
  getCollectionsQuery,
  createCartMutation,
} from "./queries";

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_GRAPHQL_ENDPOINT = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
  : null;

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
}: ShopifyFetchParams): Promise<T | null> {
  if (!SHOPIFY_GRAPHQL_ENDPOINT || !SHOPIFY_ACCESS_TOKEN) {
    return null;
  }

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`Shopify API error: ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    return json.data as T;
  } catch (error) {
    console.warn("Error fetching from Shopify Storefront API:", error);
    return null;
  }
}

export async function createShopifyCheckoutUrl(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<string | null> {
  if (!SHOPIFY_GRAPHQL_ENDPOINT || !SHOPIFY_ACCESS_TOKEN || lines.length === 0) {
    return null;
  }

  const data = await shopifyFetch<{
    cartCreate: {
      cart: {
        id: string;
        checkoutUrl: string;
      };
    };
  }>({
    query: createCartMutation,
    variables: {
      lines: lines.map((l) => ({
        merchandiseId: l.merchandiseId.startsWith("gid://shopify/")
          ? l.merchandiseId
          : `gid://shopify/ProductVariant/${l.merchandiseId}`,
        quantity: l.quantity,
      })),
    },
  });

  return data?.cartCreate?.cart?.checkoutUrl || null;
}

export async function getProducts(options?: FilterOptions): Promise<Product[]> {
  // If Shopify credentials exist, attempt to fetch live products
  if (SHOPIFY_GRAPHQL_ENDPOINT && SHOPIFY_ACCESS_TOKEN) {
    const data = await shopifyFetch<{
      products: { edges: { node: Product }[] };
    }>({
      query: getProductsQuery,
      variables: {
        first: 24,
      },
    });

    if (data?.products?.edges?.length) {
      return data.products.edges.map((edge) => edge.node);
    }
  }

  // Fallback to local mock catalog
  let products = [...MOCK_PRODUCTS];

  if (options?.category && options.category.length > 0) {
    products = products.filter(
      (p) =>
        p.productType &&
        options.category?.some(
          (c) => c.toLowerCase() === p.productType?.toLowerCase()
        )
    );
  }

  if (options?.color && options.color.length > 0) {
    products = products.filter((p) =>
      p.variants.some((v) =>
        v.selectedOptions.some(
          (opt) =>
            opt.name.toLowerCase() === "color" &&
            options.color?.some((c) => c.toLowerCase() === opt.value.toLowerCase())
        )
      )
    );
  }

  if (options?.sort) {
    if (options.sort === "price-asc") {
      products.sort(
        (a, b) =>
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
      );
    } else if (options.sort === "price-desc") {
      products.sort(
        (a, b) =>
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
      );
    }
  }

  return products;
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (SHOPIFY_GRAPHQL_ENDPOINT && SHOPIFY_ACCESS_TOKEN) {
    const data = await shopifyFetch<{
      product: Product;
    }>({
      query: getProductByHandleQuery,
      variables: { handle },
    });

    if (data?.product) {
      return data.product;
    }
  }

  const found = MOCK_PRODUCTS.find((p) => p.handle === handle);
  return found || null;
}

export async function getCollections(): Promise<Collection[]> {
  if (SHOPIFY_GRAPHQL_ENDPOINT && SHOPIFY_ACCESS_TOKEN) {
    const data = await shopifyFetch<{
      collections: { edges: { node: Collection }[] };
    }>({
      query: getCollectionsQuery,
    });

    if (data?.collections?.edges?.length) {
      return data.collections.edges.map((edge) => edge.node);
    }
  }

  return MOCK_COLLECTIONS;
}

export async function getCollection(handle: string): Promise<Collection | null> {
  const collections = await getCollections();
  const found = collections.find((c) => c.handle === handle);
  return found || null;
}

export type { Product, ProductVariant, Collection, Cart, FilterOptions };
