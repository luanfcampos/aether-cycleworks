import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onOpenFilters?: () => void;
}

export function ProductGrid({ products, onOpenFilters }: ProductGridProps) {
  return (
    <section className="py-24 bg-black">
      <div className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
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

        {/* Botão de Filtros EMBAIXO do bloco de título em mobile */}
        {onOpenFilters && (
          <div className="lg:hidden">
            <button
              onClick={onOpenFilters}
              className="w-full sm:w-auto px-8 py-3 border border-zinc-800 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-colors"
            >
              Filtros
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-px gap-y-px bg-border-subtle border-y border-border-subtle overflow-hidden">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}