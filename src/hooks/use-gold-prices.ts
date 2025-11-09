
'use client';

import { useState, useEffect } from 'react';

const FALLBACK_24K_PRICE = 7150.5;
const FALLBACK_22K_PRICE = FALLBACK_24K_PRICE * (22 / 24);

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

type GoldApiResponse = {
  gram_24k: number;
  gram_22k: number;
};

async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        
        if (!apiKey) {
          console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY is not set. Falling back to default price.");
          return {
            price24k: FALLBACK_24K_PRICE,
            price22k: FALLBACK_22K_PRICE,
          };
        }

        const url = `https://goldpricez.com/api/rates/currency/inr/measure/all`;

        const response = await fetch(url, {
          method: 'GET',
          headers: { "X-API-KEY": apiKey },
          cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`❌ GoldPricez.com request failed with status ${response.status}`);
            return {
                price24k: FALLBACK_24K_PRICE,
                price22k: FALLBACK_22K_PRICE,
            };
        }

        const data: GoldApiResponse = await response.json();
        
        const price_gram_24k = data.gram_24k;
        const price_gram_22k = data.gram_22k;

        if (!price_gram_24k || !price_gram_22k) {
            console.warn("⚠️ Invalid data in GoldPricez.com response. Falling back to default price.");
            return {
                price24k: FALLBACK_24K_PRICE,
                price22k: FALLBACK_22K_PRICE,
            };
        }

        return { 
          price24k: price_gram_24k, 
          price22k: price_gram_22k 
        };
    } catch (error) {
        console.error("❌ Error fetching live gold price:", error);
        return {
            price24k: FALLBACK_24K_PRICE,
            price22k: FALLBACK_22K_PRICE,
        };
    }
}

export function useGoldPrices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPrices = async () => {
      try {
        setLoading(true);
        const { price24k, price22k } = await fetchLiveGoldPrice();
        const trends: ('up' | 'down')[] = ['up', 'down'];
        const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

        const cityPrices = cities.map((city) => ({
            city: city,
            rate24k: parseFloat(price24k.toFixed(2)),
            rate22k: parseFloat(price22k.toFixed(2)),
            trend: trends[Math.floor(Math.random() * trends.length)],
        }));
        
        setPrices(cityPrices);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error("Failed to fetch and process city prices:", err);
      } finally {
        setLoading(false);
      }
    };

    getPrices();
  }, []);

  return { prices, loading, error };
}
