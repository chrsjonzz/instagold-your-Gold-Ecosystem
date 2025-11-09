'use client';

import { useState, useEffect } from 'react';

const FALLBACK_24K_PRICE = 7150.5;
const FALLBACK_22K_PRICE = FALLBACK_24K_PRICE * (22 / 24);

// Indian market adjustment factor
// GoldAPI.io returns international spot prices, but Indian market prices include
// local premiums, import duties, GST, and market variations (~7% higher)
// This factor adjusts international prices to match Indian market rates
const INDIAN_MARKET_ADJUSTMENT = 1.07;

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

type GoldApiResponse = {
  price?: number;
  price_gram_24k?: number;
  price_gram_22k?: number;
};

async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
    try {
        let apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;

        if (!apiKey) {
          console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY is not set. Using fallback API key.");
          apiKey = 'goldapi-b21ey0smhg3rsq9-io'; // Your working key
        }
        
        if (!apiKey) {
          console.error("❌ API Key is not set. Using default price.");
          return {
            price24k: FALLBACK_24K_PRICE,
            price22k: FALLBACK_22K_PRICE,
          };
        }

        const timestamp = Date.now();
        const url = `https://www.goldapi.io/api/XAU/INR?t=${timestamp}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "x-access-token": apiKey,
            "Content-Type": "application/json",
          },
          cache: 'no-store',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ GoldAPI.io request failed with status ${response.status}: ${errorText}`);
            return {
                price24k: FALLBACK_24K_PRICE,
                price22k: FALLBACK_22K_PRICE,
            };
        }

        const data: GoldApiResponse = await response.json();
        
        if (data.price_gram_24k && data.price_gram_22k) {
            const price_per_gram_24k = data.price_gram_24k * INDIAN_MARKET_ADJUSTMENT;
            const price_per_gram_22k = data.price_gram_22k * INDIAN_MARKET_ADJUSTMENT;
            
            return { 
              price24k: parseFloat(price_per_gram_24k.toFixed(2)), 
              price22k: parseFloat(price_per_gram_22k.toFixed(2)) 
            };
        }
        
        console.error("⚠️ Could not find valid per-gram prices in API response.");
        return {
          price24k: FALLBACK_24K_PRICE,
          price22k: FALLBACK_22K_PRICE,
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

        const cityPrices = cities.map((city, index) => {
            const variation = (index * 5) - 10;
            return {
                city: city,
                rate24k: parseFloat((price24k + variation).toFixed(2)),
                rate22k: parseFloat((price22k + variation * (22/24)).toFixed(2)),
                trend: trends[Math.floor(Math.random() * trends.length)],
            }
        });
        
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
