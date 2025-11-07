'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const mockRates = [
  { city: 'Mumbai', rate: '₹7,150.50', change: '+0.25%', trend: 'up' },
  { city: 'Delhi', rate: '₹7,160.00', change: '+0.28%', trend: 'up' },
  { city: 'Chennai', rate: '₹7,145.75', change: '-0.10%', trend: 'down' },
  { city: 'Kolkata', rate: '₹7,155.20', change: '+0.15%', trend: 'up' },
  { city: 'Bengaluru', rate: '₹7,180.00', change: '+0.45%', trend: 'up' },
  { city: 'Hyderabad', rate: '₹7,175.50', change: '+0.32%', trend: 'down' },
  { city: '24K Gold/gm', rate: '₹7,158.30', change: '+0.21%', trend: 'up' },
  { city: '22K Gold/gm', rate: '₹6,560.10', change: '+0.19%', trend: 'up' },
];

const TickerItem = ({ city, rate, change, trend }: typeof mockRates[0]) => (
  <div className="flex items-center space-x-4 mx-6 flex-shrink-0">
    <span className="font-semibold text-foreground/80">{city}:</span>
    <span className="font-bold text-foreground">{rate}</span>
    <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
      {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
      <span>{change}</span>
    </div>
  </div>
);

export default function GoldRateTicker() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return <div className="h-10 bg-primary/10" />;
    }

  const extendedRates = [...mockRates, ...mockRates]; // Duplicate for seamless loop

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
