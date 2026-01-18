"use client";

import { Product } from "@/types/product";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductImage } from "./ProductImage";
import { Breadcrumbs } from "../ui/Breadcrumbs";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [activeImage, setActiveImage] = useState(product.images.main);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const allImages = [product.images.main, ...product.images.gallery];

  return (
    <div className="flex flex-col gap-12">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: "Catalog", href: "/" },
          { label: product.category, href: `/?category=${product.category}` },
          { label: product.name }
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Gallery Section */}
        <div className="flex flex-col gap-6">
          <div className="relative aspect-square bg-white overflow-hidden border border-zinc-800">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {product.badges.map(badge => (
                <span key={badge} className="px-4 py-1.5 bg-brand text-black text-[10px] font-bold uppercase tracking-widest">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square border-2 transition-all ${
                  activeImage === img ? "border-brand" : "border-zinc-800 opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumb ${idx}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <span className="text-sm font-bold text-zinc-500 uppercase tracking-[0.3em] font-display italic mb-2 block">
              {product.brand}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter italic font-display leading-[0.9]">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-brand tracking-tighter">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xl text-zinc-600 line-through tracking-tighter">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="text-zinc-400 text-lg font-light leading-relaxed mb-10 uppercase tracking-wide">
            {product.shortDescription}
          </p>

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[60px] h-12 flex items-center justify-center border transition-all font-bold text-xs uppercase tracking-widest ${
                      selectedSize === size
                        ? "bg-white text-black border-white"
                        : "bg-transparent text-white border-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-4">
            <button className="w-full py-5 bg-brand text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-brand-dark transition-all duration-300 transform active:scale-[0.98]">
              Add to Cart
            </button>
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-4">
              <span>SKU: {product.sku}</span>
              <span>Available: {product.stock} units</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-12 border-t border-zinc-900 pt-16">
        <div>
          <h2 className="text-2xl font-bold uppercase italic font-display mb-8 tracking-tight">The Detail</h2>
          <div className="space-y-6">
            <p className="text-zinc-400 font-light leading-relaxed">
              Elevate your performance with the {product.name}. Engineered for the most demanding riders, this {product.productType} combines innovative materials with precision design to deliver an unparalleled cycling experience.
            </p>
            <ul className="space-y-4">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-brand rounded-full mt-2 shrink-0" />
                  <span className="text-zinc-300 text-sm uppercase tracking-wide font-light">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold uppercase italic font-display mb-8 tracking-tight">Specifications</h2>
          <div className="grid grid-cols-1 gap-y-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-3 border-b border-zinc-900">
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{key}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200">{String(value)}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 border-b border-zinc-900">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Category</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200">{product.category} / {product.subcategory}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
