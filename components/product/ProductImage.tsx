"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { Product } from "@/types/product";

interface ProductImageProps {
  product: Product;
  className?: string;
}

// Gera um design geométrico único baseado no ID do produto para variedade visual
function GenerativePlaceholder({ product }: { product: Product }) {
  const hash = useMemo(() => {
    let h = 0;
    const str = product.id;
    for (let i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }, [product.id]);

  const colors = ["#FF4D00", "#00A3FF", "#00FF66", "#FFD600", "#FF00FF"];
  const mainColor = colors[hash % colors.length];
  const rotation = (hash % 4) * 45;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 border border-zinc-800/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: `linear-gradient(${mainColor} 1px, transparent 1px), linear-gradient(90deg, ${mainColor} 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      {/* Geometric Shape */}
      <div 
        className="w-32 h-32 border-2 opacity-20 absolute -right-8 -top-8 rotate-12"
        style={{ borderColor: mainColor, transform: `rotate(${rotation}deg)` }}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke={mainColor}
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 mb-4 opacity-80"
      >
        <path d="M2 12h20M12 2v20" />
        <circle cx="12" cy="12" r="9" />
        {product.productType === 'bike' && <path d="M5.5 17.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5ZM18.5 17.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5ZM15 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 13l3-7h4l3 7M12 13h6" />}
      </svg>
      
      <div className="text-center relative z-10">
        <span className="block text-[8px] font-bold uppercase tracking-[0.4em] mb-1" style={{ color: mainColor }}>
          {product.brand}
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-widest text-zinc-200 max-w-[140px] leading-tight italic font-display">
          {product.name}
        </span>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="w-8 h-px bg-zinc-800" />
          <span className="text-[6px] text-zinc-600 font-mono">ENG_SPEC_{hash.toString(16).toUpperCase()}</span>
          <span className="w-8 h-px bg-zinc-800" />
        </div>
      </div>

      {/* Industrial corners */}
      <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-zinc-700" />
      <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-zinc-700" />
    </div>
  );
}

export function ProductImage({ product, className }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Consideramos erro se a imagem for muito pequena (vazia) ou falhar o load
  const isImageValid = product.images.main && !error;

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
      {!isImageValid ? (
        <GenerativePlaceholder product={product} />
      ) : (
        <>
          {loading && <GenerativePlaceholder product={product} />}
          <Image
            src={product.images.main}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-contain transition-all duration-700 ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            onLoad={(img) => {
              if (img.currentTarget.naturalWidth < 100) setError(true);
              setLoading(false);
            }}
            onError={() => setError(true)}
          />
        </>
      )}
    </div>
  );
}
