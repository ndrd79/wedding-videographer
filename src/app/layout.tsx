import type { Metadata } from 'next';
import { Cormorant_Garamond, Raleway, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { Providers } from './providers';

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
});

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700']
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wedding Films - Videografia de Casamentos',
  description: 'Capturando momentos únicos e emocionantes do seu grande dia com elegância e sofisticação.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${raleway.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
