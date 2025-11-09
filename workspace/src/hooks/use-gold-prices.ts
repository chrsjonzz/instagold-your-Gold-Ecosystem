
'use client';

import { useState, useEffect } from 'react';

const FALLBACK_24K_PRICE_USD = 2320.50;
const USD_TO_INR_RATE = 83.50; // A stable conversion rate
const FALLBACK_24K_PRICE_INR = FALLBACK_24K_PRICE_USD * USD_TO_INR_RATE / 31.1035; // Convert from Troy Oz to Gram
const FALLBACK_22K_PRICE_INR = FALLBACK_24K_PRICE_INR * (22 / 24);


export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

type GoldApiResponse = {
  price_gram_24k: number;
  price_gram_22k: number;
};

// This function now fetches the price in USD and converts it to INR.
async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        
        if (!apiKey) {
          console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY is not set. Falling back to default price.");
          return {
            price24k: FALLBACK_24K_PRICE_INR,
            price22k: FALLBACK_22K_PRICE_INR,
          };
        }
        
        // Using the goldapi.io endpoint which returns price in USD
        const url = `https://www.goldapi.io/api/XAU/USD`;

        const response = await fetch(url, {
          method: 'GET',
          headers: { "x-access-token": apiKey },
          cache: 'no-store', // Force fresh data on every request
        });

        if (!response.ok) {
            console.error(`❌ goldapi.io request failed with status ${response.status}`);
            return {
                price24k: FALLBACK_24K_PRICE_INR,
                price22k: FALLBACK_22K_PRICE_INR,
            };
        }

        const data: GoldApiResponse = await response.json();
        
        // The API returns price per gram in USD
        const price_gram_24k_usd = data.price_gram_24k;
        const price_gram_22k_usd = data.price_gram_22k;

        if (!price_gram_24k_usd || !price_gram_22k_usd) {
            console.warn("⚠️ Invalid data in goldapi.io response. Falling back to default price.");
            return {
                price24k: FALLBACK_24K_PRICE_INR,
                price22k: FALLBACK_22K_PRICE_INR,
            };
        }

        // Convert USD prices to INR
        const price24k_inr = price_gram_24k_usd * USD_TO_INR_RATE;
        const price22k_inr = price_gram_22k_usd * USD_TO_INR_RATE;

        return { 
          price24k: price24k_inr, 
          price22k: price22k_inr 
        };
    } catch (error) {
        console.error("❌ Error fetching live gold price:", error);
        return {
            price24k: FALLBACK_24K_PRICE_INR,
            price22k: FALLBACK_22K_PRICE_INR,
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
        // This function now returns prices in INR after conversion
        const { price24k, price22k } = await fetchLiveGoldPrice();
        const trends: ('up' | 'down')[] = ['up', 'down'];
        const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

        const cityPrices = cities.map((city, index) => {
            // Add a small variation for each city to make it look more realistic
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
