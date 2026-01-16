"use client";

import { getAllProducts } from "@/lib/products";
import { SearchFilter } from "./SearchFilter";
import { SortFilter } from "./SortFilter";
import { CheckboxFilter } from "./CheckboxFilter";
import { Accordion } from "../ui/Accordion";

export function FilterSidebar() {
  const products = getAllProducts();
  const brands = [...new Set(products.map((p) => p.brand))];
  const categories = [...new Set(products.map((p) => p.category))];
  const subcategories = [...new Set(products.map((p) => p.subcategory))];

  return (
    <div className="space-y-8">
      {/* Cabeçalho Desktop */}
      <div className="hidden lg:flex items-center justify-between border-b border-border-subtle pb-4">
        <h2 className="text-lg font-bold uppercase tracking-wider font-display italic">Filtros</h2>
        <button className="text-xs font-semibold text-zinc-500 hover:text-brand transition-colors">Limpar tudo</button>
      </div>
      
      {/* Filtros Primários - SEMPRE EXPOSTOS */}
      <div className="space-y-6">
        <SearchFilter />
        <SortFilter />
      </div>

      {/* Filtros de Categoria - EM ACCORDIONS */}
      <div className="divide-y divide-border-subtle border-t border-border-subtle">
        <Accordion title="Brand" defaultOpen={true}>
          <CheckboxFilter name="brand" options={brands} />
        </Accordion>
        <Accordion title="Category" defaultOpen={true}>
          <CheckboxFilter name="category" options={categories} />
        </Accordion>
        <Accordion title="Subcategory">
          <CheckboxFilter name="subcategory" options={subcategories} />
        </Accordion>
      </div>
      
      <div className="lg:hidden pt-4">
        <button className="w-full py-4 bg-brand text-black font-bold uppercase tracking-widest text-xs hover:bg-brand-dark transition-colors">
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
}