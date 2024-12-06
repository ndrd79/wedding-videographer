'use client';

import { ReactNode } from 'react';
import MainNav from './MainNav';
import Footer from '@/components/Footer';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
