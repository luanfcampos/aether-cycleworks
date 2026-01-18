"use client";

import { useMemo } from "react";
import { Product } from "@/types/product";
import { useSearchParams } from "next/navigation";

export function useFilteredProducts(products: Product[]) {
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    const q = searchParams.get("q")?.toLowerCase() || "";
    const brands = searchParams.get("brand")?.split(",") || [];
    const categories = searchParams.get("category")?.split(",") || [];
    const subcategories = searchParams.get("subcategory")?.split(",") || [];
    const sortBy = searchParams.get("sortBy") || "newest";

    let result = [...products];

    // 1. Filtro de Busca (Nome, Marca, Categoria, Descrição)
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // 2. Filtro de Marca (Multi-select)
    if (brands.length > 0 && brands[0] !== "") {
      result = result.filter((p) => brands.includes(p.brand));
    }

    // 3. Filtro de Categoria (Multi-select)
    if (categories.length > 0 && categories[0] !== "") {
      result = result.filter((p) => categories.includes(p.category));
    }

    // 4. Filtro de Subcategoria (Multi-select)
    if (subcategories.length > 0 && subcategories[0] !== "") {
      result = result.filter((p) => subcategories.includes(p.subcategory));
    }

    // 5. Ordenação
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
    }

    return result;
  }, [products, searchParams]);

  return filteredProducts;
}
