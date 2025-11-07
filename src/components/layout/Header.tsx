'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Gem, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import GoldRateTicker from '../GoldRateTicker';

const navLinks = [
  { href: '/live-price', label: 'Live Prices' },
  { href: '/about-gold', label: 'About Gold' },
  { href: '/purity', label: 'Gold Purity' },
  { href: '/sell', label: 'Sell Gold' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
            <Gem className="h-7 w-7 text-glow" />
            InstaGold
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden ml-auto">
             <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background">
                <div className="flex flex-col h-full p-4">
                  <div className="flex items-center justify-between mb-8">
                     <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
                        <Gem className="h-7 w-7 text-glow" />
                        InstaGold
                      </Link>
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                  </div>
                  <nav className="flex flex-col gap-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto flex flex-col gap-4">
                     {/* Login and Sign up buttons removed */}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:flex items-center">
            {/* Placeholder for potential buttons */}
          </div>
        </div>
      </div>
      <div className="block">
        <GoldRateTicker />
      </div>
    </header>
  );
}
