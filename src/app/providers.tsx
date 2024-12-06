'use client';

import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <SessionProvider 
      refetchInterval={0} 
      refetchOnWindowFocus={isAdminRoute}
      refetchWhenOffline={false}
      session={isAdminRoute ? undefined : null}
    >
      {children}
    </SessionProvider>
  );
}
