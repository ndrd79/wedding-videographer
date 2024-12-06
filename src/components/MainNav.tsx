'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Serviços', href: '/servicos' },
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700/50 focus:ring-gray-600"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Abrir menu principal</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div 
          className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} 
          id="navbar-menu"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-black/80 md:bg-transparent border-gray-700 rounded-lg">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-2 pl-3 pr-4 rounded md:p-0 text-white hover:text-[#D4AF37] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
