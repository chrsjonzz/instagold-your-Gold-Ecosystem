import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/app/providers';
import CursorPhoenix from "@/components/CursorPhoenix";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import './globals.css';

export const metadata: Metadata = {
  title: 'InstaGold: Your Complete Gold Ecosystem',
  description: 'Everything Gold. One Platform. Buy, Sell, Pledge, Compare, and Track gold seamlessly with InstaGold.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <CursorPhoenix />
          <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                  {children}
              </main>
              <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
