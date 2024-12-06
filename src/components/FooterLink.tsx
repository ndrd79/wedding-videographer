'use client';

import { usePathname } from 'next/navigation';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function FooterLink({ href, children }: FooterLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm cursor-pointer ${
        isActive ? 'text-[#D4AF37]' : ''
      }`}
    >
      {children}
    </a>
  );
}
