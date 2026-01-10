export type ProductType =
  | "bike"
  | "helmet"
  | "component"
  | "apparel"
  | "shoe"
  | "accessory"
  | "maintenance";

export type Product = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  brand: string;
  productType: ProductType;
  category: string;
  subcategory: string;
  price: number;
  compareAtPrice: number | null;
  currency: "BRL";
  shortDescription: string;
  description: string;
  features: string[];
  sizes: string[];
  colors: string[];
  specs: Record<string, string | number | boolean>;
  images: {
    main: string;
    gallery: string[];
  };
  tags: string[];
  badges: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
  releaseDate: string;
};

export type ProductFilters = {
  q?: string;
  brand?: string[];
  category?: string[];
  subcategory?: string[];
  size?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "newest";
};
