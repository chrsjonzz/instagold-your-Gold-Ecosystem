'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

export default function TodaysRate() {
  const [price, setPrice] = useState<Price | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Add cache-busting timestamp to ensure fresh data
        const timestamp = Date.now();
        const response = await fetch(`/api/gold-rate?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch prices');
        }
        const prices: Price[] = await response.json();
        // Display Bangalore's price as the feature price
        const bangalorePrice = prices.find(p => p.city === 'Bangalore');
        setPrice(bangalorePrice || prices[0]);
      } catch (error) {
        console.error("Failed to fetch today's rate:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Fetch immediately
    fetchPrice();
    
    // Set up polling every 30 seconds for real-time updates
    const intervalId = setInterval(fetchPrice, 30000);
    
    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-yellow-50 to-background">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Today's Live Gold Rate</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Live market prices for selling your gold in India.</p>
            </div>
            <Card className="max-w-2xl mx-auto shadow-xl border-2 border-primary/20 bg-gradient-to-br from-card to-background">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-4 rounded-lg bg-primary/10 text-center">
                                <p className="font-semibold text-lg text-primary">24K Gold</p>
                                <p className="font-mono text-3xl font-bold text-foreground mt-1">
                                    ₹{price.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <p className="text-sm text-muted-foreground">per gram</p>
                            </div>
                             <div className="p-4 rounded-lg bg-secondary/50 text-center">
                                <p className="font-semibold text-lg text-primary">22K Gold</p>
                                <p className="font-mono text-3xl font-bold text-foreground mt-1">
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
