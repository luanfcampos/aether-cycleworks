import { Hero } from "@/components/layout/Hero";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();
  const featuredProducts = products.filter(p => p.featured || p.badges.includes("New Arrival")).slice(0, 12);

  return (
    <>
      <Hero />
      <ProductGrid products={featuredProducts} />
    </>
  );
}
