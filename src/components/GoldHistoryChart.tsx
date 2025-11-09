'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const historicalData = {
  bangalore: [
    // 2023 Data
    { month: 'Jan \'23', price: 5650 }, { month: 'Feb \'23', price: 5620 }, { month: 'Mar \'23', price: 5780 },
    { month: 'Apr \'23', price: 5950 }, { month: 'May \'23', price: 6020 }, { month: 'Jun \'23', price: 5910 },
    { month: 'Jul \'23', price: 5890 }, { month: 'Aug \'23', price: 5920 }, { month: 'Sep \'23', price: 5950 },
    { month: 'Oct \'23', price: 6100 }, { month: 'Nov \'23', price: 6250 }, { month: 'Dec \'23', price: 6380 },
    // 2024 Data
    { month: 'Jan \'24', price: 6350 }, { month: 'Feb \'24', price: 6400 }, { month: 'Mar \'24', price: 6800 },
    { month: 'Apr \'24', price: 7200 }, { month: 'May \'24', price: 7300 }, { month: 'Jun \'24', price: 7150 },
    { month: 'Jul \'24', price: 7250 }, { month: 'Aug \'24', price: 7350 }, { month: 'Sep \'24', price: 7400 },
    { month: 'Oct \'24', price: 7550 }, { month: 'Nov \'24', price: 7600 }, { month: 'Dec \'24', price: 7700 },
    // 2025 Data (Projected)
    { month: 'Jan \'25', price: 7750 }, { month: 'Feb \'25', price: 7800 }, { month: 'Mar \'25', price: 7900 },
    { month: 'Apr \'25', price: 8050 }, { month: 'May \'25', price: 8100 }, { month: 'Jun \'25', price: 8000 },
    { month: 'Jul \'25', price: 8150 }, { month: 'Aug \'25', price: 8200 }, { month: 'Sep \'25', price: 8300 },
    { month: 'Oct \'25', price: 8400 }, { month: 'Nov \'25', price: 8500 }, { month: 'Dec \'25', price: 8600 },
  ],
  chennai: [
    { month: 'Jan \'23', price: 5680 }, { month: 'Feb \'23', price: 5650 }, { month: 'Mar \'23', price: 5810 },
    { month: 'Apr \'23', price: 5980 }, { month: 'May \'23', price: 6050 }, { month: 'Jun \'23', price: 5940 },
    { month: 'Jul \'23', price: 5920 }, { month: 'Aug \'23', price: 5950 }, { month: 'Sep \'23', price: 5980 },
    { month: 'Oct \'23', price: 6130 }, { month: 'Nov \'23', price: 6280 }, { month: 'Dec \'23', price: 6410 },
    { month: 'Jan \'24', price: 6380 }, { month: 'Feb \'24', price: 6430 }, { month: 'Mar \'24', price: 6830 },
    { month: 'Apr \'24', price: 7240 }, { month: 'May \'24', price: 7340 }, { month: 'Jun \'24', price: 7185 },
    { month: 'Jul \'24', price: 7285 }, { month: 'Aug \'24', price: 7385 }, { month: 'Sep \'24', price: 7435 },
    { month: 'Oct \'24', price: 7585 }, { month: 'Nov \'24', price: 7635 }, { month: 'Dec \'24', price: 7735 },
    { month: 'Jan \'25', price: 7785 }, { month: 'Feb \'25', price: 7835 }, { month: 'Mar \'25', price: 7935 },
    { month: 'Apr \'25', price: 8085 }, { month: 'May \'25', price: 8135 }, { month: 'Jun \'25', price: 8035 },
    { month: 'Jul \'25', price: 8185 }, { month: 'Aug \'25', price: 8235 }, { month: 'Sep \'25', price: 8335 },
    { month: 'Oct \'25', price: 8435 }, { month: 'Nov \'25', price: 8535 }, { month: 'Dec \'25', price: 8635 },
  ],
  hyderabad: [
    { month: 'Jan \'23', price: 5650 }, { month: 'Feb \'23', price: 5620 }, { month: 'Mar \'23', price: 5780 },
    { month: 'Apr \'23', price: 5950 }, { month: 'May \'23', price: 6020 }, { month: 'Jun \'23', price: 5910 },
    { month: 'Jul \'23', price: 5890 }, { month: 'Aug \'23', price: 5920 }, { month: 'Sep \'23', price: 5950 },
    { month: 'Oct \'23', price: 6100 }, { month: 'Nov \'23', price: 6250 }, { month: 'Dec \'23', price: 6380 },
    { month: 'Jan \'24', price: 6350 }, { month: 'Feb \'24', price: 6400 }, { month: 'Mar \'24', price: 6800 },
    { month: 'Apr \'24', price: 7200 }, { month: 'May \'24', price: 7300 }, { month: 'Jun \'24', price: 7170 },
    { month: 'Jul \'24', price: 7270 }, { month: 'Aug \'24', price: 7370 }, { month: 'Sep \'24', price: 7420 },
    { month: 'Oct \'24', price: 7570 }, { month: 'Nov \'24', price: 7620 }, { month: 'Dec \'24', price: 7720 },
    { month: 'Jan \'25', price: 7770 }, { month: 'Feb \'25', price: 7820 }, { month: 'Mar \'25', price: 7920 },
    { month: 'Apr \'25', price: 8070 }, { month: 'May \'25', price: 8120 }, { month: 'Jun \'25', price: 8020 },
    { month: 'Jul \'25', price: 8170 }, { month: 'Aug \'25', price: 8220 }, { month: 'Sep \'25', price: 8320 },
    { month: 'Oct \'25', price: 8420 }, { month: 'Nov \'25', price: 8520 }, { month: 'Dec \'25', price: 8620 },
  ],
  coimbatore: [
      { month: 'Jan \'23', price: 5680 }, { month: 'Feb \'23', price: 5650 }, { month: 'Mar \'23', price: 5810 },
      { month: 'Apr \'23', price: 5980 }, { month: 'May \'23', price: 6050 }, { month: 'Jun \'23', price: 5940 },
      { month: 'Jul \'23', price: 5920 }, { month: 'Aug \'23', price: 5950 }, { month: 'Sep \'23', price: 5980 },
      { month: 'Oct \'23', price: 6130 }, { month: 'Nov \'23', price: 6280 }, { month: 'Dec \'23', price: 6410 },
      { month: 'Jan \'24', price: 6380 }, { month: 'Feb \'24', price: 6430 }, { month: 'Mar \'24', price: 6830 },
      { month: 'Apr \'24', price: 7240 }, { month: 'May \'24', price: 7340 }, { month: 'Jun \'24', price: 7190 },
      { month: 'Jul \'24', price: 7290 }, { month: 'Aug \'24', price: 7390 }, { month: 'Sep \'24', price: 7440 },
      { month: 'Oct \'24', price: 7590 }, { month: 'Nov \'24', price: 7640 }, { month: 'Dec \'24', price: 7740 },
      { month: 'Jan \'25', price: 7790 }, { month: 'Feb \'25', price: 7840 }, { month: 'Mar \'25', price: 7940 },
      { month: 'Apr \'25', price: 8090 }, { month: 'May \'25', price: 8140 }, { month: 'Jun \'25', price: 8040 },
      { month: 'Jul \'25', price: 8190 }, { month: 'Aug \'25', price: 8240 }, { month: 'Sep \'25', price: 8340 },
      { month: 'Oct \'25', price: 8440 }, { month: 'Nov \'25', price: 8540 }, { month: 'Dec \'25', price: 8640 },
  ],
  vijayawada: [
      { month: 'Jan \'23', price: 5650 }, { month: 'Feb \'23', price: 5620 }, { month: 'Mar \'23', price: 5780 },
      { month: 'Apr \'23', price: 5950 }, { month: 'May \'23', price: 6020 }, { month: 'Jun \'23', price: 5910 },
      { month: 'Jul \'23', price: 5890 }, { month: 'Aug \'23', price: 5920 }, { month: 'Sep \'23', price: 5950 },
      { month: 'Oct \'23', price: 6100 }, { month: 'Nov \'23', price: 6250 }, { month: 'Dec \'23', price: 6380 },
      { month: 'Jan \'24', price: 6350 }, { month: 'Feb \'24', price: 6400 }, { month: 'Mar \'24', price: 6800 },
      { month: 'Apr \'24', price: 7200 }, { month: 'May \'24', price: 7300 }, { month: 'Jun \'24', price: 7165 },
      { month: 'Jul \'24', price: 7265 }, { month: 'Aug \'24', price: 7365 }, { month: 'Sep \'24', price: 7415 },
      { month: 'Oct \'24', price: 7565 }, { month: 'Nov \'24', price: 7615 }, { month: 'Dec \'24', price: 7715 },
      { month: 'Jan \'25', price: 7765 }, { month: 'Feb \'25', price: 7815 }, { month: 'Mar \'25', price: 7915 },
      { month: 'Apr \'25', price: 8065 }, { month: 'May \'25', price: 8115 }, { month: 'Jun \'25', price: 8015 },
      { month: 'Jul \'25', price: 8165 }, { month: 'Aug \'25', price: 8215 }, { month: 'Sep \'25', price: 8315 },
      { month: 'Oct \'25', price: 8415 }, { month: 'Nov \'25', price: 8515 }, { month: 'Dec \'25', price: 8615 },
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
