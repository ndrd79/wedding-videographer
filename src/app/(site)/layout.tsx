'use client';

import MainNav from '@/components/MainNav';
import Footer from '@/components/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
