'use client';

import { LayoutProps } from '@/types/layout';
import { Toaster } from '../ui/toaster';

export function RootLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
