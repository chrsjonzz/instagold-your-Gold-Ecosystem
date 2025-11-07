import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BarChart, Gem, GitCompareArrows, Search, ShieldCheck, Sparkles, University, Workflow } from 'lucide-react';
import GoldRateTicker from '@/components/GoldRateTicker';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <Gem className="w-8 h-8 text-primary" />,
    title: 'AI-Powered Valuation',
    description: 'Upload a photo of your gold to get an instant, AI-driven value estimate. Accurate, fast, and secure.',
    link: '/sell',
    image: PlaceHolderImages.find(p => p.id === 'sell-feature'),
  },
  {
    icon: <GitCompareArrows className="w-8 h-8 text-primary" />,
    title: 'Pledge Takeover Comparison',
    description: 'Compare interest rates and find the best offers to take over your pledged gold loans, saving you money.',
    link: '#',
    image: PlaceHolderImages.find(p => p.id === 'pledge-feature'),
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Verified Buyback Network',
    description: 'Connect with a network of trusted jewelers and refiners offering guaranteed buyback at competitive rates.',
    link: '#',
    image: PlaceHolderImages.find(p => p.id === 'buyback-partner'),
  },
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: 'Price Intelligence',
    description: 'Access real-time price charts, market heatmaps, and set up custom alerts to track gold prices.',
    link: '#',
    image: PlaceHolderImages.find(p => p.id === 'track-feature'),
  },
];

const howItWorks = [
  {
    icon: <Search className="w-10 h-10 text-primary" />,
    title: "Discover & Compare",
    description: "Input your gold details or loan to find the best market prices and offers."
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    title: "Instant AI Valuation",
    description: "Upload a photo for a quick, AI-powered estimate of your gold's worth."
  },
  {
    icon: <Workflow className="w-10 h-10 text-primary" />,
    title: "Seamless Transaction",
    description: "Choose an offer and complete your sale or loan takeover with just a few clicks."
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-background via-yellow-50 to-background">
        <div className="absolute inset-0 opacity-10">
          {heroImage && <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />}
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
            Everything Gold. One Platform.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Unify India’s gold ecosystem — Buy, Sell, Pledge, Compare, and Track — on one trusted, intelligent platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
              <Link href="/sell">Sell Instantly <ArrowRight className="ml-2" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="#">Manage Pledge</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="#">Track Prices</Link>
            </Button>
          </div>
        </div>
        <div className="relative mt-12 md:mt-20">
          <GoldRateTicker />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Simple, Fast, and Secure</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Three easy steps to unlock the full potential of your gold assets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={index} className="text-center bg-card border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-yellow-50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">A Complete Gold Ecosystem</h2>
            <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Explore our full suite of services designed for every gold owner.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="md:flex">
                  <div className="md:w-1/2 relative">
                    {feature.image && (
                      <Image
                        src={feature.image.imageUrl}
                        alt={feature.image.description}
                        data-ai-hint={feature.image.imageHint}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48 md:h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="md:w-1/2">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                         {feature.icon}
                        <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={feature.link}>Learn More <ArrowRight className="ml-2 w-4 h-4" /></Link>
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-yellow-600 to-amber-500 rounded-lg shadow-xl p-8 md:p-12 text-center text-white">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-yellow-100">
              Join thousands of satisfied customers and take control of your gold assets today.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-yellow-50 shadow-lg">
                <Link href="/sell">Create Your Account <ArrowRight className="ml-2"/></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
