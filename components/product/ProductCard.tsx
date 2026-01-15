"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { motion } from "framer-motion";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col bg-surface border border-border-subtle overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.badges.map((badge) => (
          <span
            key={badge}
            className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-brand text-black"
          >
            {badge}
          </span>
        ))}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest bg-red-600 text-white">
            Low Stock
          </span>
        )}
      </div>

      {/* Image Container */}
      <Link
        href={`/produto/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-white"
      >
        <ProductImage 
          product={product} 
          className="transition-transform duration-700 group-hover:scale-110 " 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            View Details
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 italic font-display">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-brand"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-[10px] font-bold text-zinc-400">{product.rating}</span>
          </div>
        </div>

        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-lg font-bold tracking-tight uppercase font-display italic leading-tight group-hover:text-brand transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-xs text-zinc-500 line-clamp-2 uppercase tracking-wide font-light">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-6 flex items-end justify-between">
          <div className="flex flex-col">
            {product.compareAtPrice && (
              <span className="text-[10px] text-zinc-600 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xl font-bold tracking-tighter text-brand">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <button className="w-10 h-10 bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-black transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
