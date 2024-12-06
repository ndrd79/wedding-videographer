'use client';

import MainNav from './components/MainNav';
import Footer from '@/components/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = window.location.pathname;
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

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
