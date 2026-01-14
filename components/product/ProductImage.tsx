"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/product";

interface ProductImageProps {
  product: Product;
  className?: string;
}

export function ProductImage({ product, className }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Se o caminho da imagem começar com http ou /, tentamos carregar
  // Caso contrário, ou se houver erro, mostramos o placeholder técnico
  const hasRealImage = product.images.main && !error;

  return (
    <div className={`relative w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden ${className}`}>
      {/* Placeholder Técnico (sempre presente como fundo ou fallback) */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="relative z-0 flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-700 mb-2"
        >
          {product.productType === 'bike' && <path d="M5.5 17.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5ZM18.5 17.5c2.485 0 4.5-2.015 4.5-4.5s-2.015-4.5-4.5-4.5-4.5 2.015-4.5 4.5 2.015 4.5 4.5 4.5ZM15 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 13l3-7h4l3 7M12 13h6" />}
          {product.productType === 'helmet' && <path d="M2 12a10 10 0 1 1 20 0v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2ZM12 2v10M2 12h20" />}
          {(product.productType !== 'bike' && product.productType !== 'helmet') && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />}
        </svg>
      </div>

      {/* Imagem Real (Sobreposta ao placeholder) */}
      {product.images.main && !error && (
        <Image
          src={product.images.main}
          alt={product.name}
          fill
          className={`object-cover transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoadingComplete={() => setLoading(false)}
          onError={() => setError(true)}
        />
      )}

      {/* Overlay de Marca (Apenas visível se não houver imagem ou se estiver carregando) */}
      {(!hasRealImage || loading) && (
        <div className="absolute bottom-4 right-4 opacity-10">
          <div className="w-12 h-12 bg-white rounded-sm rotate-45" />
        </div>
      )}
    </div>
  );
}
