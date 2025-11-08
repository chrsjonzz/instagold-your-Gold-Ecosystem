'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Logo } from "@/components/Logo";
import { cn } from '@/lib/utils';

const rates = [
  { purity: "24", rate: "12,202.00" },
  { purity: "22", rate: "11,185.00" },
  { purity: "18", rate: "9,151.50" },
  { purity: "14", rate: "7,117.83" },
];

const purityMap: { [key: string]: string } = {
    "24": "24K (99.9%)",
    "22": "22K (91.6%)",
    "18": "18K (75.0%)",
    "14": "14K (58.5%)"
}


function RateCardContent() {
  const searchParams = useSearchParams();
  const weight = searchParams.get('weight');
  const karat = searchParams.get('karat');
  const estimatedValue = searchParams.get('estimatedValue');

  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-screen py-12 print:bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl print:shadow-none">
          <header className="text-center mb-8 border-b-2 border-primary pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Logo />
            </div>
            <h1 className="font-headline text-4xl font-bold text-gray-800">Gold Rate Card</h1>
            <p className="text-gray-500 mt-2">
              As of {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <main>
            {estimatedValue && weight && karat && (
              <Card className="mb-8 border-2 border-primary bg-yellow-50/50">
                  <CardHeader>
                      <CardTitle className="text-primary font-headline">Your Valuation</CardTitle>
                      <CardDescription>Based on the details you provided.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-white/50 p-3 rounded-md">
                          <p className="text-sm font-semibold text-muted-foreground">Weight</p>
                          <p className="text-lg font-bold font-headline text-primary">{weight} gm</p>
                      </div>
                      <div className="bg-white/50 p-3 rounded-md">
                          <p className="text-sm font-semibold text-muted-foreground">Purity</p>
                          <p className="text-lg font-bold font-headline text-primary">{karat}K</p>
                      </div>
                      <div className="col-span-2 bg-white/50 p-4 rounded-md mt-2">
                          <p className="text-md font-semibold text-muted-foreground">Estimated Market Value</p>
                          <p className="text-3xl font-bold font-headline text-primary mt-1">INR {parseFloat(estimatedValue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      </div>
                  </CardContent>
              </Card>
            )}

            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary font-headline">Live Gold Sell Prices</CardTitle>
                <CardDescription>All rates are per gram (gm) in Indian Rupees (INR).</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-lg">Purity (Karat)</TableHead>
                      <TableHead className="text-right font-bold text-lg">Rate (per gram)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rates.map((item) => (
                      <TableRow key={item.purity} className={cn(
                        "text-base",
                        karat === item.purity && "bg-primary/10 font-bold"
                      )}>
                        <TableCell className="font-medium">{purityMap[item.purity]}</TableCell>
                        <TableCell className="text-right font-mono">INR {item.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>

          <footer className="mt-8 text-center text-xs text-gray-500">
            <p>
              <strong>Disclaimer:</strong> These are live market rates for selling gold online. The final price offered by our buyback partners is subject to physical verification of the gold's weight and purity. Rates are subject to change based on market fluctuations.
            </p>
            <p className="mt-2">
              <strong>InstaGold</strong> | +91 96204 33303 | www.instagold.com
            </p>
          </footer>
        </div>
        <div className="text-center mt-8 print:hidden">
            <p className="text-muted-foreground">Use your browser's print function (Ctrl+P or Cmd+P) to save this as a PDF.</p>
        </div>
      </div>
    </div>
  );
}


export default function RateCardPage() {
    return (
        <Suspense fallback={<div>Loading rates...</div>}>
            <RateCardContent />
        </Suspense>
    )
}
