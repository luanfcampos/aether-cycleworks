"use client";

import { Suspense, useState } from "react";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { MobileFilterDrawer } from "@/components/filters/MobileFilterDrawer";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Product } from "@/types/product";

interface StorefrontContentProps {
  products: Product[];
}

function LoadingSkeleton() {
  return (
    <div className="w-full h-96 bg-zinc-900/50 animate-pulse rounded-none border border-zinc-800" />
  );
}

export function StorefrontContent({ products }: StorefrontContentProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8">
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8">
        {/* Sidebar para telas grandes */}
        <div className="hidden lg:block lg:col-span-1 pt-24">
          <Suspense fallback={<LoadingSkeleton />}>
            <FilterSidebar />
          </Suspense>
        </div>
        
        {/* Área de Produtos */}
        <div className="lg:col-start-2">
          <Suspense fallback={<LoadingSkeleton />}>
            <ProductCatalog 
              products={products} 
              onOpenFilters={() => setIsMobileDrawerOpen(true)}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}