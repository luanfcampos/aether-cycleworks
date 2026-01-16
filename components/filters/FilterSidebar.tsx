"use client";

import { getAllProducts } from "@/lib/products";
import { SearchFilter } from "./SearchFilter";
import { SortFilter } from "./SortFilter";
import { CheckboxFilter } from "./CheckboxFilter";

export function FilterSidebar() {
  const products = getAllProducts();
  const brands = [...new Set(products.map((p) => p.brand))];
  const categories = [...new Set(products.map((p) => p.category))];
  const subcategories = [...new Set(products.map((p) => p.subcategory))];

  return (
    <aside className="w-full md:w-64 lg:w-72 xl:w-80 p-6 bg-zinc-950/50 border border-border-subtle">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-wider font-display italic">Filters</h2>
          <button className="text-xs font-semibold text-zinc-500 hover:text-brand transition-colors">Clear all</button>
        </div>
        
        <SearchFilter />
        <SortFilter />
        <CheckboxFilter title="Brand" name="brand" options={brands} />
        <CheckboxFilter title="Category" name="category" options={categories} />
        <CheckboxFilter title="Subcategory" name="subcategory" options={subcategories} />

      </div>
    </aside>
  );
}
