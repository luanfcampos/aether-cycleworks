"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(#2A2A2A 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Carbon Texture Overlay (Simulated) */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-brand text-black">
            2026 Collection
          </span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase font-display italic leading-[0.9]">
            Precision<br />
            <span className="text-brand">Engineering</span>
          </h1>
          
          <p className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light tracking-wide uppercase">
            High-performance cycling artifacts built for the intersection of speed and human capability.
          </p>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="px-12 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-brand hover:text-black transition-colors duration-300">
              Explore Catalog
            </button>
            <button className="px-12 py-4 border border-zinc-800 text-white font-bold uppercase tracking-widest text-sm hover:bg-zinc-900 transition-colors duration-300">
              Technical Specs
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Velocity Lines */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-50" />
    </section>
  );
}
