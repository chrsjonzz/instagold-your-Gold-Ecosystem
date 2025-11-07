'use client';

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Area, AreaChart } from 'recharts';

const data = [
  { month: 'Jan', price: 5200 },
  { month: 'Feb', price: 5350 },
  { month: 'Mar', price: 5300 },
  { month: 'Apr', price: 5500 },
  { month: 'May', price: 5700 },
  { month: 'Jun', price: 5650 },
  { month: 'Jul', price: 5800 },
  { month: 'Aug', price: 6000 },
  { month: 'Sep', price: 5900 },
  { month: 'Oct', price: 6200 },
  { month: 'Nov', price: 6500 },
  { month: 'Dec', price: 7150 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-background border border-border rounded-lg shadow-lg">
        <p className="label font-bold text-primary">{`${label}`}</p>
        <p className="intro text-muted-foreground">{`Price: INR ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


export default function GoldHistoryChart() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
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
  );
}
