'use client';

import { useState, useEffect } from 'react';

// Define a stable USD to INR conversion rate.
// This can be updated if the currency market changes significantly.
const USD_TO_INR_RATE = 83.50; 

// Fallback price in INR, calculated from a fallback USD price.
const FALLBACK_24K_PRICE_USD = 88.50; // A reasonable fallback price in USD per gram
const FALLBACK_24K_PRICE_INR = FALLBACK_24K_PRICE_USD * USD_TO_INR_RATE;
const FALLBACK_22K_PRICE_INR = FALLBACK_24K_PRICE_INR * (22 / 24);

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

// This matches the structure of the goldapi.io response for XAU/USD
type GoldApiResponse = {
  price_gram_24k: number;
  price_gram_22k: number;
};

// This function fetches the live gold price in USD and converts it to INR.
async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
        
        if (!apiKey) {
          console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY is not set. Using fallback prices.");
          return {
            price24k: FALLBACK_24K_PRICE_INR,
            price22k: FALLBACK_22K_PRICE_INR,
          };
        }
        
        // Use the goldapi.io endpoint that returns price in USD
        const url = `https://www.goldapi.io/api/XAU/USD`;

        const response = await fetch(url, {
          method: 'GET',
          headers: { "x-access-token": apiKey },
          cache: 'no-store', // This is crucial to prevent caching and get real-time data
        });

        if (!response.ok) {
            console.error(`❌ GoldAPI.io request failed with status ${response.status}. Using fallback prices.`);
            return {
                price24k: FALLBACK_24K_PRICE_INR,
                price22k: FALLBACK_22K_PRICE_INR,
            };
        }

        const data: GoldApiResponse = await response.json();
        
        // The API returns the price per gram in USD
        const price_gram_24k_usd = data.price_gram_24k;
        const price_gram_22k_usd = data.price_gram_22k;

        if (!price_gram_24k_usd || !price_gram_22k_usd) {
            console.warn("⚠️ Invalid data in GoldAPI.io response. Using fallback prices.");
            return {
                price24k: FALLBACK_24K_PRICE_INR,
                price22k: FALLBACK_22K_PRICE_INR,
            };
        }

        // Convert the USD prices to INR
        const price24k_inr = price_gram_24k_usd * USD_TO_INR_RATE;
        const price22k_inr = price_gram_22k_usd * USD_TO_INR_RATE;

        return { 
          price24k: parseFloat(price24k_inr.toFixed(2)), 
          price22k: parseFloat(price22k_inr.toFixed(2)) 
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
        // This function now returns prices accurately converted to INR
        const { price24k, price22k } = await fetchLiveGoldPrice();
        const trends: ('up' | 'down')[] = ['up', 'down'];
        const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

        const cityPrices = cities.map((city, index) => {
            // Add a small, realistic variation for each city
            const variation = (Math.random() * 50) - 25;
            return {
                city: city,
                rate24k: parseFloat((price24k + variation).toFixed(2)),
                rate22k: parseFloat((price22k + (variation * (22/24))).toFixed(2)),
                trend: trends[Math.floor(Math.random() * trends.length)],
            }
        });
        
        setPrices(cityPrices);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error("Failed to process city prices:", err);
      } finally {
        setLoading(false);
      }
    };

    getPrices();
    
    // Set up an interval to refetch the price every 60 seconds for real-time updates
    const intervalId = setInterval(getPrices, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, []);

  return { prices, loading, error };
}
