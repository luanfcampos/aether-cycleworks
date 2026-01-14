import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">
              Featured Equipment
            </h2>
            <p className="text-4xl md:text-5xl font-bold tracking-tighter uppercase font-display italic">
              Engineered for <span className="text-zinc-500">Speed</span>
            </p>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            Showing {products.length} Products
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-px gap-y-px bg-border-subtle border-y border-border-subtle overflow-hidden">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
