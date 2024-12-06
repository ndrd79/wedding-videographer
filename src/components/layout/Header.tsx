'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide"
            >
              Início
            </Link>
            <Link 
              href="/portfolio" 
              className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide"
            >
              Portfólio
            </Link>
            <Link 
              href="/agenda" 
              className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide"
            >
              Agenda
            </Link>
            <Link 
              href="/planos" 
              className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide"
            >
              Planos
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-800"
            aria-label="Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-8 h-8"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden bg-white/95 backdrop-blur-sm py-4 absolute top-full left-0 w-full shadow-lg transition-all duration-300 ease-in-out"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/portfolio" 
                className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfólio
              </Link>
              <Link 
                href="/agenda" 
                className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Agenda
              </Link>
              <Link 
                href="/planos" 
                className="text-gray-800 hover:text-[#D4AF37] transition-colors text-lg font-body tracking-wide px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Planos
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
