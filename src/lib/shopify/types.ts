export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  compareAtPrice?: Money | null;
  sku?: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductAccordionItem {
  title: string;
  content: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  featuredImage?: Image;
  images: Image[];
  options: ProductOption[];
  variants: ProductVariant[];
  tags?: string[];
  vendor?: string;
  productType?: string;
  sku?: string;
  modelInfo?: string;
  accordions?: ProductAccordionItem[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  image?: Image;
  products?: Product[];
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: Image;
    };
    selectedOptions: {
      name: string;
      value: string;
    }[];
    price: Money;
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;
  };
  lines: CartLine[];
}

export interface FilterOptions {
  category?: string[];
  size?: string[];
  color?: string[];
  priceRange?: string;
  sort?: "newest" | "price-asc" | "price-desc";
}
