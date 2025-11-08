'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const historicalData = {
  bangalore: [
    { month: 'Jan', price: 5200 }, { month: 'Feb', price: 5350 }, { month: 'Mar', price: 5300 },
    { month: 'Apr', price: 5500 }, { month: 'May', price: 5700 }, { month: 'Jun', price: 5650 },
    { month: 'Jul', price: 5800 }, { month: 'Aug', price: 6000 }, { month: 'Sep', price: 5900 },
    { month: 'Oct', price: 6200 }, { month: 'Nov', price: 6500 }, { month: 'Dec', price: 7150 },
  ],
  chennai: [
    { month: 'Jan', price: 5230 }, { month: 'Feb', price: 5380 }, { month: 'Mar', price: 5320 },
    { month: 'Apr', price: 5540 }, { month: 'May', price: 5720 }, { month: 'Jun', price: 5690 },
    { month: 'Jul', price: 5850 }, { month: 'Aug', price: 6030 }, { month: 'Sep', price: 5940 },
    { month: 'Oct', price: 6250 }, { month: 'Nov', price: 6550 }, { month: 'Dec', price: 7185 },
  ],
  hyderabad: [
    { month: 'Jan', price: 5210 }, { month: 'Feb', price: 5360 }, { month: 'Mar', price: 5310 },
    { month: 'Apr', price: 5520 }, { month: 'May', price: 5710 }, { month: 'Jun', price: 5670 },
    { month: 'Jul', price: 5820 }, { month: 'Aug', price: 6010 }, { month: 'Sep', price: 5920 },
    { month: 'Oct', price: 6220 }, { month: 'Nov', price: 6520 }, { month: 'Dec', price: 7170 },
  ],
  coimbatore: [
      { month: 'Jan', price: 5240 }, { month: 'Feb', price: 5390 }, { month: 'Mar', price: 5340 },
      { month: 'Apr', price: 5560 }, { month: 'May', price: 5740 }, { month: 'Jun', price: 5700 },
      { month: 'Jul', price: 5870 }, { month: 'Aug', price: 6050 }, { month: 'Sep', price: 5960 },
      { month: 'Oct', price: 6270 }, { month: 'Nov', price: 6570 }, { month: 'Dec', price: 7190 },
  ],
  vijayawada: [
      { month: 'Jan', price: 5205 }, { month: 'Feb', price: 5355 }, { month: 'Mar', price: 5305 },
      { month: 'Apr', price: 5515 }, { month: 'May', price: 5705 }, { month: 'Jun', price: 5655 },
      { month: 'Jul', price: 5805 }, { month: 'Aug', price: 6005 }, { month: 'Sep', price: 5905 },
      { month: 'Oct', price: 6205 }, { month: 'Nov', price: 6505 }, { month: 'Dec', price: 7165 },
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