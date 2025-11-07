'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getTickerGoldPrices } from '@/lib/gold-price-service';

type TickerRate = {
  city: string;
  rate: string;
  change: string;
  trend: 'up' | 'down';
};

const TickerItem = ({ city, rate, change, trend }: TickerRate) => (
  <div className="flex items-center space-x-4 mx-6 flex-shrink-0">
    <span className="font-semibold text-foreground/80">{city}:</span>
    <span className="font-bold text-foreground">INR {rate}</span>
    <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
      <span>{change}</span>
    </div>
  </div>
);

export default function GoldRateTicker() {
    const [rates, setRates] = useState<TickerRate[]>([]);

    useEffect(() => {
      const fetchRates = async () => {
        const fetchedRates = await getTickerGoldPrices();
        setRates(fetchedRates);
      };
      fetchRates();
    }, []);

    if (rates.length === 0) {
        return <div className="h-12 bg-primary/10" />;
    }

  const extendedRates = [...rates, ...rates]; // Duplicate for seamless loop

  return (
    <div className="w-full bg-primary/10 overflow-hidden h-12 flex items-center relative">
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
