'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown, Download, Phone, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCityGoldPrices } from '@/lib/gold-price-service';

type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

export default function LivePricePage() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const fetchedPrices = await getCityGoldPrices();
        setPrices(fetchedPrices);
      } catch (error) {
        console.error("Failed to fetch city prices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              Today's Gold Sell Prices
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real-time prices for selling your gold online or via our buyback partners in South India.
            </p>
          </div>

          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
                <CardTitle>Live Online Sell Rates (per gram)</CardTitle>
                <CardDescription>All rates are for selling gold online.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">City</TableHead>
                      <TableHead className="text-right font-bold">24K Rate (INR)</TableHead>
                      <TableHead className="text-right font-bold">22K Rate (INR)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prices.map((item) => (
                      <TableRow key={item.city}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {item.city}
                          {item.trend === 'up' ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
                        </TableCell>
                        <TableCell className="text-right font-mono">₹{item.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right font-mono">₹{item.rate22k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4 pt-6">
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/sell">Sell Gold Now</Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                    For jewellery buyback rates, please contact our partners.
                </p>
            </CardFooter>
          </Card>
          
           <div className="text-center mt-8">
              <Button variant="link" asChild>
                <Link href="/rate-card" target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Rate Card
                </Link>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
