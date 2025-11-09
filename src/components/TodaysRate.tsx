'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useGoldPrices } from '@/hooks/use-gold-prices';

export default function TodaysRate() {
  const { prices, loading } = useGoldPrices();
  const price = prices.find(p => p.city === 'Bangalore') || prices[0];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-background">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Today's Live Gold Rate</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">Live market prices for selling your gold in India.</p>
            </div>
            <Card className="max-w-2xl mx-auto shadow-xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="font-headline text-xl md:text-3xl text-primary">
                        {price ? `Gold Price in ${price.city}` : 'Live Gold Price'}
                    </CardTitle>
                    <CardDescription>
                        As of {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center items-center h-24">
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        </div>
                    ) : price ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="p-4 rounded-lg bg-primary/10 text-center">
                                <p className="font-semibold text-base md:text-lg text-primary">24K Gold</p>
                                <p className="font-mono text-2xl md:text-3xl font-bold text-foreground mt-1">
                                    ₹{price.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-muted-foreground">per gram</p>
                            </div>
                             <div className="p-4 rounded-lg bg-secondary/80 text-center">
                                <p className="font-semibold text-base md:text-lg text-primary">22K Gold</p>
                                <p className="font-mono text-2xl md:text-3xl font-bold text-foreground mt-1">
                                     ₹{price.rate22k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-muted-foreground">per gram</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">Could not load price data.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    </section>
  )
}
