'use client';

import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#1A1A1A] to-black text-white relative z-10">
      <div className="container mx-auto px-4 py-16 relative z-20">
        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna 1: Logo e Descrição */}
          <div className="lg:col-span-4 space-y-6 relative z-30">
            <Link href="/" className="inline-block">
              <img 
                src="/images/logo.png" 
                alt="Vanderoski" 
                className="h-16 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Eternizando momentos especiais através da arte da videografia. 
              Transformamos suas memórias em histórias cinematográficas únicas e emocionantes.
            </p>
            {/* Redes Sociais */}
            <div className="pt-4">
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/a.vanderoscki?igshid=NWh3bTR0ZTJ6MWM3" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={26} />
                </a>
                <a 
                  href="https://www.youtube.com/@a.vanderoscki" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <Youtube size={26} className="fill-current" />
                </a>
                <a
                  href="https://www.facebook.com/share/15Xhh9vPsB/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-[26px] h-[26px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="lg:col-span-3 relative z-30">
            <h3 className="text-lg font-medium mb-6 text-[#D4AF37]">Menu</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-1.5 block w-full cursor-pointer font-light hover:translate-x-1"
              >
                Início
              </Link>
              <Link 
                href="/portfolio" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-1.5 block w-full cursor-pointer font-light hover:translate-x-1"
              >
                Portfólio
              </Link>
              <Link 
                href="/planos" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-1.5 block w-full cursor-pointer font-light hover:translate-x-1"
              >
                Planos
              </Link>
              <Link 
                href="/sobre" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-1.5 block w-full cursor-pointer font-light hover:translate-x-1"
              >
                Sobre Nós
              </Link>
              <Link 
                href="/contato" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-1.5 block w-full cursor-pointer font-light hover:translate-x-1"
              >
                Contato
              </Link>
            </div>
          </div>

          {/* Coluna 3: Horário de Atendimento */}
          <div className="lg:col-span-2 relative z-30">
            <h3 className="text-lg font-medium mb-6 text-[#D4AF37]">Horário</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-light">Segunda - Sexta</span>
                  <span className="text-white">9h às 18h</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-light">Sábado</span>
                  <span className="text-white">9h às 15h</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-light">Domingo</span>
                  <span className="text-white">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4: Contato */}
          <div className="lg:col-span-3 relative z-30">
            <h3 className="text-lg font-medium mb-6 text-[#D4AF37]">Contato</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-gray-400 font-light block">Localização</span>
                <p className="text-white">Curitiba, PR</p>
              </div>
              <div className="space-y-2">
                <span className="text-gray-400 font-light block">Telefone</span>
                <a 
                  href="tel:+5544984058208" 
                  className="text-white hover:text-[#D4AF37] transition-colors block"
                >
                  (44) 98405-8208
                </a>
              </div>
              <div className="space-y-2">
                <span className="text-gray-400 font-light block">Email</span>
                <a 
                  href="mailto:contato@vanderoski.com" 
                  className="text-white hover:text-[#D4AF37] transition-colors block"
                >
                  contato@vanderoski.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Linha Divisória e Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 relative z-30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {currentYear} Vanderoski. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link 
                href="/privacidade" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-2 text-sm hover:translate-x-1"
              >
                Política de Privacidade
              </Link>
              <Link 
                href="/termos" 
                className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 py-2 text-sm hover:translate-x-1"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
