import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Download } from 'lucide-react';

const prices = [
  {
    title: 'Digital Gold Buy Rate',
    price: '12825.87',
    trend: 'up',
    action: 'Buy Now',
  },
  {
    title: 'Digital Gold Sell Rate',
    price: '11993.59',
    trend: 'up',
    action: 'Sell Now',
  },
];

const buybackPrice = {
  title: 'Gold Buyback Rate',
  price: '11597.00',
  trend: 'down',
  action: 'Contact Us',
};

export default function LivePricePage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              Today's Gold Prices
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Real-time prices for buying, selling, and buybacks.
            </p>
          </div>

          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {prices.map((item, index) => (
                  <div key={item.title} className={`relative p-6 rounded-lg ${index === 0 ? 'md:border-r border-border' : ''}`}>
                    <h3 className="text-lg font-semibold text-muted-foreground">{item.title}</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="text-4xl font-bold font-headline text-primary">
                        INR {item.price}
                      </p>
                       <span className="text-sm text-muted-foreground">/gm</span>
                       {item.trend === 'up' ? <TrendingUp className="h-5 w-5 text-green-600" /> : <TrendingDown className="h-5 w-5 text-red-600" />}
                    </div>
                     <Button className="mt-4 w-full sm:w-auto">{item.action}</Button>
                  </div>
                ))}
              </div>
              <div className="border-t border-border my-6"></div>
               <div className="relative p-6 rounded-lg text-center">
                    <h3 className="text-lg font-semibold text-muted-foreground">{buybackPrice.title}</h3>
                    <div className="flex items-baseline justify-center gap-2 mt-2">
                      <p className="text-4xl font-bold font-headline text-primary">
                        INR {buybackPrice.price}
                      </p>
                       <span className="text-sm text-muted-foreground">/gm</span>
                       {buybackPrice.trend === 'up' ? <TrendingUp className="h-5 w-5 text-green-600" /> : <TrendingDown className="h-5 w-5 text-red-600" />}
                    </div>
                     <Button variant="secondary" className="mt-4 w-full sm:w-auto">{buybackPrice.action}</Button>
                </div>
            </CardContent>
          </Card>
          
           <div className="text-center mt-8">
              <Button variant="link">
                <Download className="mr-2 h-4 w-4" />
                Download Product Pricelist
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
