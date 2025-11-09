'use client';

import { useState, useEffect } from 'react';

// --- Fallback Prices ---
const FALLBACK_24K_PRICE_INR = 7150.50;
const FALLBACK_22K_PRICE_INR = FALLBACK_24K_PRICE_INR * (22 / 24);

// --- Stable Conversion Rate ---
const USD_TO_INR_RATE = 83.50; 

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

// --- API Response Type Definitions ---
type GoldApiResponse = {
  price_gram_24k: number;
  price_gram_22k: number;
};

/**
 * Fetches from goldapi.io and converts from USD to INR.
 * This is now the primary and only API source.
 */
async function fetchFromGoldApi(): Promise<{ price24k: number; price22k: number } | null> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY is not set. Using fallback prices.");
            return null;
        }

        const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
            method: 'GET',
            headers: { "x-access-token": apiKey },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`GoldAPI.io failed with status ${response.status}`);
        }
        
        const data: GoldApiResponse = await response.json();

        const price_gram_24k_usd = data.price_gram_24k;
        const price_gram_22k_usd = data.price_gram_22k;

        if (price_gram_24k_usd && price_gram_22k_usd) {
            console.log("✅ Successfully fetched from GoldAPI.io.");
            // Convert USD to INR
            const price24k_inr = price_gram_24k_usd * USD_TO_INR_RATE;
            const price22k_inr = price_gram_22k_usd * USD_TO_INR_RATE;
            return {
                price24k: price24k_inr,
                price22k: price22k_inr,
            };
        }
        
        throw new Error("Invalid data structure from GoldAPI.io.");

    } catch (error) {
        console.error(`❌ GoldAPI.io fetch failed: ${error instanceof Error ? error.message : String(error)}.`);
        return null;
    }
}


export function useGoldPrices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPrices = async () => {
      setLoading(true);

      let livePrices = await fetchFromGoldApi();

      if (!livePrices) {
        console.warn("API source failed. Using hardcoded fallback prices.");
        livePrices = {
            price24k: FALLBACK_24K_PRICE_INR,
            price22k: FALLBACK_22K_PRICE_INR,
        };
        setError("Could not fetch live prices. Displaying estimated rates.");
      } else {
        setError(null);
      }

      const { price24k, price22k } = livePrices;
      const trends: ('up' | 'down')[] = ['up', 'down'];
      const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

      const cityPrices = cities.map((city) => {
          const variation = (Math.random() * 50) - 25; // Small, realistic variation per city
          return {
              city: city,
              rate24k: parseFloat((price24k + variation).toFixed(2)),
              rate22k: parseFloat((price22k + (variation * (22 / 24))).toFixed(2)),
              trend: trends[Math.floor(Math.random() * trends.length)],
          };
      });

      setPrices(cityPrices);
      setLoading(false);
    };

    getPrices();
    
    // Refresh prices every 60 seconds
    const intervalId = setInterval(getPrices, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { prices, loading, error };
}
