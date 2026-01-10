import productsData from "@/data/products.json";
import { Product } from "@/types/product";

// Usando unknown para permitir o casting seguro de um JSON importado
const products = productsData as unknown as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getFilterMetadata() {
  const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();
  const productTypes = Array.from(new Set(products.map((p) => p.productType))).sort();
  
  const minPrice = Math.floor(Math.min(...products.map((p) => p.price)));
  const maxPrice = Math.ceil(Math.max(...products.map((p) => p.price)));

  return {
    brands,
    categories,
    productTypes,
    priceRange: { min: minPrice, max: maxPrice }
  };
}
