'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '/', label: 'Página Inicial' },
    { href: '/portfolio', label: 'Portfólio' },
    { href: '/sobre', label: 'Sobre Nós' },
    { href: '/planos', label: 'Nossos Planos' },
    { href: '/contato', label: 'Fale Conosco' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative w-44 h-12">
            <Image
              src="/images/logo.png"
              alt="Vanderoski"
              fill
              className="object-contain brightness-0 invert"
              priority
              sizes="160px"
              quality={90}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm tracking-wide font-medium transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white hover:text-[#D4AF37]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#D4AF37] transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block py-3 text-sm tracking-wide font-medium transition-colors duration-200
                  ${isActive(item.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white/90 hover:text-[#D4AF37]'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
