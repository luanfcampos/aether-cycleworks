"use client";

import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { ProductGrid } from "./ProductGrid";
import { Product } from "@/types/product";

interface ProductCatalogProps {
  products: Product[];
  onOpenFilters: () => void;
}

export function ProductCatalog({ products, onOpenFilters }: ProductCatalogProps) {
  const displayedProducts = useFilteredProducts(products);

  return (
    <ProductGrid 
      products={displayedProducts} 
      onOpenFilters={onOpenFilters}
    />
  );
}