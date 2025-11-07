'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import GoldRateTicker from '../GoldRateTicker';
import { Logo } from '../Logo';

const navLinks = [
  { href: '/live-price', label: 'Live Prices' },
  { href: '/about-gold', label: 'About Gold' },
  { href: '/purity', label: 'Gold Purity' },
  { href: '/sell', label: 'Sell Gold' },
  { href: '/pledges', label: 'My Pledges' },
  { href: '/pledge-takeover', label: 'Pledge Takeover' },
];


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <Logo />
            <span className="sr-only">InstaGold Home</span>
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
          <div className="md:hidden">
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
                     <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        <Logo />
                        <span className="sr-only">InstaGold Home</span>
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="block">
        <GoldRateTicker />
      </div>
    </header>
  );
}
