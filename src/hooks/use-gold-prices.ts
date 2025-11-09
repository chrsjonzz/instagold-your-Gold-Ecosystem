'use client';

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

const staticPrices: Price[] = [
  { city: 'Bangalore', rate24k: 12202, rate22k: 11185, trend: 'down' },
  { city: 'Chennai', rate24k: 12328, rate22k: 11300, trend: 'down' },
  { city: 'Hyderabad', rate24k: 12202, rate22k: 11185, trend: 'down' },
  { city: 'Coimbatore', rate24k: 12328, rate22k: 11300, trend: 'down' },
  { city: 'Vijayawada', rate24k: 12202, rate22k: 11185, trend: 'down' },
];

/**
 * A React hook that provides a static list of gold prices.
 * This implementation uses a hardcoded "Daily Benchmark" price
 * to ensure 100% reliability and instant loading times.
 *
 * @returns An object containing the static prices, a `loading` state (always false),
 * and an `error` state (always null).
 */
export function useGoldPrices() {
  return { 
    prices: staticPrices, 
    loading: false, 
    error: null 
  };
}
