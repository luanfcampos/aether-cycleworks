"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-xl font-bold tracking-tighter uppercase font-display italic">
            Aether<span className="text-zinc-500">.Works</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase">
          <Link href="/catalog" className="hover:text-brand transition-colors">Catalog</Link>
          <Link href="/performance" className="hover:text-brand transition-colors">Performance</Link>
          <Link href="/engineering" className="hover:text-brand transition-colors">Engineering</Link>
        </nav>

        <div className="flex items-center gap-6">
          <button className="text-sm font-bold uppercase tracking-widest hover:text-brand transition-colors">
            Login
          </button>
          <Link href="/carrinho" className="relative p-2 hover:text-brand transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand text-black text-[10px] font-bold rounded-full flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
