import { Hero } from "@/components/layout/Hero";
import { StorefrontContent } from "@/components/layout/StorefrontContent";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const products = getAllProducts();

  return (
    <>
      <Hero />
      <StorefrontContent products={products} />
    </>
  );
}