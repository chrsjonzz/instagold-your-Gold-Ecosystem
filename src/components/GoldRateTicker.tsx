'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type TickerRate = {
  city: string;
  rate: string;
  change: string;
  trend: 'up' | 'down';
};

type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
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
          
          // Transform prices to ticker format
          const liveRate = prices[0];
          if (!liveRate) {
            setRates([]);
            return;
          }
          
          const tickerPrices: TickerRate[] = prices.map(p => ({
            city: p.city,
            rate: liveRate.rate24k.toLocaleString('en-IN', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            }),
            change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
            trend: p.trend,
          }));
          
          setRates(tickerPrices);
        } catch (error) {
          console.error("Failed to fetch ticker rates:", error);
        }
      };
      
      // Fetch immediately
      fetchRates();
      
      // Set up polling every 30 seconds for real-time updates
      const intervalId = setInterval(fetchRates, 30000);
      
      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
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
