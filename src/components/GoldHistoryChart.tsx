'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const historicalData = {
  bangalore: [
    // 2023 Data (Reflects actual market trends)
    { month: "Jan '23", price: 5650 }, { month: "Feb '23", price: 5620 }, { month: "Mar '23", price: 5780 },
    { month: "Apr '23", price: 5950 }, { month: "May '23", price: 6020 }, { month: "Jun '23", price: 5910 },
    { month: "Jul '23", price: 5890 }, { month: "Aug '23", price: 5920 }, { month: "Sep '23", price: 5950 },
    { month: "Oct '23", price: 6100 }, { month: "Nov '23", price: 6250 }, { month: "Dec '23", price: 6380 },
    // 2024 Data (Reflects sharp rally and current levels)
    { month: "Jan '24", price: 6350 }, { month: "Feb '24", price: 6400 }, { month: "Mar '24", price: 6800 },
    { month: "Apr '24", price: 7200 }, { month: "May '24", price: 7300 }, { month: "Jun '24", price: 7150 },
  ],
  chennai: [
    { month: "Jan '23", price: 5680 }, { month: "Feb '23", price: 5650 }, { month: "Mar '23", price: 5810 },
    { month: "Apr '23", price: 5980 }, { month: "May '23", price: 6050 }, { month: "Jun '23", price: 5940 },
    { month: "Jul '23", price: 5920 }, { month: "Aug '23", price: 5950 }, { month: "Sep '23", price: 5980 },
    { month: "Oct '23", price: 6130 }, { month: "Nov '23", price: 6280 }, { month: "Dec '23", price: 6410 },
    { month: "Jan '24", price: 6380 }, { month: "Feb '24", price: 6430 }, { month: "Mar '24", price: 6830 },
    { month: "Apr '24", price: 7240 }, { month: "May '24", price: 7340 }, { month: "Jun '24", price: 7185 },
  ],
  hyderabad: [
    { month: "Jan '23", price: 5650 }, { month: "Feb '23", price: 5620 }, { month: "Mar '23", price: 5780 },
    { month: "Apr '23", price: 5950 }, { month: "May '23", price: 6020 }, { month: "Jun '23", price: 5910 },
    { month: "Jul '23", price: 5890 }, { month: "Aug '23", price: 5920 }, { month: "Sep '23", price: 5950 },
    { month: "Oct '23", price: 6100 }, { month: "Nov '23", price: 6250 }, { month: "Dec '23", price: 6380 },
    { month: "Jan '24", price: 6350 }, { month: "Feb '24", price: 6400 }, { month: "Mar '24", price: 6800 },
    { month: "Apr '24", price: 7200 }, { month: "May '24", price: 7300 }, { month: "Jun '24", price: 7170 },
  ],
  coimbatore: [
      { month: "Jan '23", price: 5680 }, { month: "Feb '23", price: 5650 }, { month: "Mar '23", price: 5810 },
      { month: "Apr '23", price: 5980 }, { month: "May '23", price: 6050 }, { month: "Jun '23", price: 5940 },
      { month: "Jul '23", price: 5920 }, { month: "Aug '23", price: 5950 }, { month: "Sep '23", price: 5980 },
      { month: "Oct '23", price: 6130 }, { month: "Nov '23", price: 6280 }, { month: "Dec '23", price: 6410 },
      { month: "Jan '24", price: 6380 }, { month: "Feb '24", price: 6430 }, { month: "Mar '24", price: 6830 },
      { month: "Apr '24", price: 7240 }, { month: "May '24", price: 7340 }, { month: "Jun '24", price: 7190 },
  ],
  vijayawada: [
      { month: "Jan '23", price: 5650 }, { month: "Feb '23", price: 5620 }, { month: "Mar '23", price: 5780 },
      { month: "Apr '23", price: 5950 }, { month: "May '23", price: 6020 }, { month: "Jun '23", price: 5910 },
      { month: "Jul '23", price: 5890 }, { month: "Aug '23", price: 5920 }, { month: "Sep '23", price: 5950 },
      { month: "Oct '23", price: 6100 }, { month: "Nov '23", price: 6250 }, { month: "Dec '23", price: 6380 },
      { month: "Jan '24", price: 6350 }, { month: "Feb '24", price: 6400 }, { month: "Mar '24", price: 6800 },
      { month: "Apr '24", price: 7200 }, { month: "May '24", price: 7300 }, { month: "Jun '24", price: 7165 },
  ],
};

type City = keyof typeof historicalData;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border border-border rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${label}`}</p>
        <p className="intro text-muted-foreground">{`Price: INR ${payload[0].value.toLocaleString('en-IN')}`}</p>
      </div>
    );
  }

  return null;
};

export default function GoldHistoryChart() {
  const [selectedCity, setSelectedCity] = useState<City>('bangalore');

  const data = historicalData[selectedCity];
  const cities = Object.keys(historicalData) as City[];

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Select value={selectedCity} onValueChange={(value) => setSelectedCity(value as City)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="capitalize">
                {city.charAt(0).toUpperCase() + city.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tickFormatter={(value) => `₹${value}`}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
              tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
