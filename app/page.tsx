"use client";

import { Suspense, useState } from "react";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { Hero } from "@/components/layout/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";

function FilterSidebarSkeleton() {
  return <div className="w-full h-96 bg-zinc-900 animate-pulse" />;
}

export default function Home() {
  const products = getAllProducts();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  
  // A lógica de filtragem final virá na próxima etapa
  const displayedProducts = products;

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MobileFilterDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar para telas grandes */}
          <div className="hidden lg:block lg:col-span-1 pt-24">
            <Suspense fallback={<FilterSidebarSkeleton />}>
              <FilterSidebar />
            </Suspense>
          </div>
          
          {/* Área de Produtos */}
          <div className="lg:col-start-2">
            <ProductGrid 
              products={displayedProducts} 
              onOpenFilters={() => setIsMobileDrawerOpen(true)}
            />
          </div>
        </div>
      </main>
    </>
  );
}