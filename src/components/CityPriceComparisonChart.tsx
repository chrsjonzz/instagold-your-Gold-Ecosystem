'use client';

import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getCityGoldPrices } from '@/lib/gold-price-service';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

type PriceData = {
  city: string;
  '24K Rate': number;
  '22K Rate': number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border border-border rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{label}</p>
        <p className="text-sm text-muted-foreground">{`24K Rate: ₹${payload[0].value.toLocaleString('en-IN')}`}</p>
        <p className="text-sm text-muted-foreground">{`22K Rate: ₹${payload[1].value.toLocaleString('en-IN')}`}</p>
      </div>
    );
  }
  return null;
};

export default function CityPriceComparisonChart() {
  const [data, setData] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const prices = await getCityGoldPrices();
        const chartData = prices.map(p => ({
          city: p.city,
          '24K Rate': p.rate24k,
          '22K Rate': p.rate22k,
        }));
        setData(chartData);
      } catch (error) {
        console.error("Failed to fetch city prices for chart:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
  }, []);

  if (loading) {
      return (
          <Card className="shadow-lg border-2 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-3xl md:text-4xl font-bold">City Price Comparison</CardTitle>
                <CardDescription>Comparing 24K and 22K rates per gram across key cities.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
                    <p>Loading chart data...</p>
                </div>
            </CardContent>
          </Card>
      )
  }

  return (
    <Card className="shadow-lg border-2 border-primary/20">
        <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl font-bold">City Price Comparison</CardTitle>
            <CardDescription>Comparing 24K and 22K rates per gram across key cities.</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6">
            <div className="w-full h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                    <XAxis
                    dataKey="city"
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis
                    tickFormatter={(value) => `₹${value}`}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                    domain={['dataMin - 200', 'dataMax + 100']}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} />
                    <Legend wrapperStyle={{fontSize: "14px"}} />
                    <Bar dataKey="24K Rate" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="22K Rate" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </div>
      </CardContent>
    </Card>
  );
}