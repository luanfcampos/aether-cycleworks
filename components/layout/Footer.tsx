import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="w-6 h-6 bg-brand rounded-sm rotate-45 group-hover:rotate-90 transition-transform" />
              <span className="text-xl font-bold tracking-tighter uppercase font-display italic">
                Aether<span className="text-zinc-500">.Works</span>
              </span>
            </Link>
            <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
              We engineer cycling equipment for those who refuse to compromise on speed, aesthetics, or precision.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'Strava'].map((social) => (
                <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-zinc-300">Catalog</h4>
            <ul className="space-y-4 text-sm text-zinc-500 uppercase tracking-widest font-medium">
              <li><Link href="/catalog?category=bike" className="hover:text-white transition-colors">Bicycles</Link></li>
              <li><Link href="/catalog?category=component" className="hover:text-white transition-colors">Components</Link></li>
              <li><Link href="/catalog?category=apparel" className="hover:text-white transition-colors">Apparel</Link></li>
              <li><Link href="/catalog?category=accessory" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-zinc-300">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-500 uppercase tracking-widest font-medium">
              <li><Link href="/about" className="hover:text-white transition-colors">Engineering</Link></li>
              <li><Link href="/manifesto" className="hover:text-white transition-colors">Manifesto</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/stores" className="hover:text-white transition-colors">Experience Centers</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border-subtle pt-12 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600">
          <p>© 2026 Aether Cycleworks. All Rights Reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
