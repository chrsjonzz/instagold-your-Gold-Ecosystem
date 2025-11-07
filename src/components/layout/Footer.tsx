import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Phone } from 'lucide-react';
import { Logo } from '../Logo';

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: '#' },
  { icon: <Twitter className="h-5 w-5" />, href: '#' },
  { icon: <Linkedin className="h-5 w-5" />, href: '#' },
  { icon: <Instagram className="h-5 w-5" />, href: '#' },
];

const footerLinks = {
  'Company': [
    { label: 'About Us', href: '/about-us' },
    { label: 'Partner With Us', href: '/partner' },
    { label: 'Reviews', href: '/reviews' },
  ],
  'Services': [
    { label: 'Sell Gold', href: '/sell' },
    { label: 'My Pledges', href: '/pledges' },
    { label: 'Pledge Takeover', href: '/pledge-takeover' },
  ],
  'Learn': [
    { label: 'About Gold', href: '/about-gold'},
    { label: 'Gold Purity', href: '/purity'},
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  'Support': [
    { label: 'Contact Us', href: '/support' },
    { label: 'Support Center', href: '/support' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-yellow-50 to-background border-t border-yellow-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 inline-block">
                <Logo />
                <span className="sr-only">InstaGold Home</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The complete gold ecosystem to unify India’s gold market. We help you sell your gold with confidence.
            </p>
             <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 96204 33303</span>
            </div>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link, index) => (
                <Link key={index} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                  {link.icon}
                  <span className="sr-only">{`Social link ${index + 1}`}</span>
                </Link>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-headline font-bold text-lg mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InstaGold. All Rights Reserved.</p>
           <p className="mt-2 text-xs">
            Disclaimer: InstaGold is a digital facilitator. All financial transactions are executed by our network of verified partners.
          </p>
        </div>
      </div>
    </footer>
  );
}
