import { Suspense } from "react";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { Hero } from "@/components/layout/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";

function FilterSidebarSkeleton() {
  return <div className="w-full h-96 bg-zinc-900 animate-pulse" />;
}

export default function Home() {
  const products = getAllProducts();
  
  // A lógica de filtragem final virá na próxima etapa
  const displayedProducts = products;

  return (
    <>
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<FilterSidebarSkeleton />}>
              <FilterSidebar />
            </Suspense>
          </div>
          <div className="lg:col-span-3 xl:col-span-4">
            <ProductGrid products={displayedProducts} />
          </div>
        </div>
      </main>
    </>
  );
}
