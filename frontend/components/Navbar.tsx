'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/milan', label: 'Guna Milan', icon: '💑' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cosmic-800/40 bg-cosmic-950/80 backdrop-blur-xl shadow-glow-mystic/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔮</span>
            <span className="text-lg font-bold font-serif bg-gradient-premium bg-clip-text text-transparent">
              Vedic AI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-white bg-cosmic-800/80' 
                      : 'text-cosmic-400 hover:text-white hover:bg-cosmic-800/40'
                    }
                  `}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-premium rounded-full shadow-glow-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium rounded-full bg-gradient-premium hover:from-gold-400 hover:to-mystic-400 text-cosmic-950 transition-all shadow-glow-gold hover:-translate-y-0.5"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
