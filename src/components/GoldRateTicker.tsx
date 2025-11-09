'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { useGoldPrices } from '@/hooks/use-gold-prices';

type TickerRate = {
  city: string;
  rate: string;
  change: string;
  trend: 'up' | 'down';
};

const TickerItem = ({ city, rate, change, trend }: TickerRate) => (
  <div className="flex items-center space-x-4 mx-6 flex-shrink-0">
    <span className="font-semibold text-foreground/80">{city}:</span>
    <span className="font-bold text-primary">INR {rate}</span>
    <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
      <span>{change}</span>
    </div>
  </div>
);

export default function GoldRateTicker() {
    const { prices, loading } = useGoldPrices();

    if (loading || prices.length === 0) {
        return <div className="h-12 bg-card/50" />;
    }

    const tickerPrices = prices.map(p => ({
        city: p.city,
        rate: p.rate24k.toLocaleString('en-IN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));

    const extendedRates = [...tickerPrices, ...tickerPrices]; // Duplicate for seamless loop

  return (
    <div className="w-full bg-card/50 overflow-hidden h-12 flex items-center relative border-b">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {extendedRates.map((item, index) => (
          <TickerItem key={index} {...item} />
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}
