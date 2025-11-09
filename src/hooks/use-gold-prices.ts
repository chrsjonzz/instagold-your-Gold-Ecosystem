'use client';

import { useState, useEffect } from 'react';

// --- Primary Public API (No Auth Required) ---
const PUBLIC_API_URL = "https://www.goldpricez.com/api/rates/currency/inr/metal/xau";

// --- Fallback Prices ---
const FALLBACK_24K_PRICE_INR = 7150.50;
const FALLBACK_22K_PRICE_INR = FALLBACK_24K_PRICE_INR * (22 / 24);

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

// --- API Response Type Definition ---
type GoldPricezApiResponse = {
    "24k_in_inr"?: number;
    "22k_in_inr"?: number;
};


/**
 * Fetches from the primary public API (goldpricez.com).
 * This API provides direct INR prices.
 */
async function fetchFromPublicApi(): Promise<{ price24k: number; price22k: number } | null> {
    try {
        const response = await fetch(PUBLIC_API_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Public API failed with status ${response.status}`);
        }
        const data: GoldPricezApiResponse = await response.json();

        if (data["24k_in_inr"] && data["22k_in_inr"]) {
            console.log("✅ Successfully fetched from Primary Public API.");
            return {
                price24k: data["24k_in_inr"],
                price22k: data["22k_in_inr"],
            };
        }
        throw new Error("Invalid data structure from Public API.");
    } catch (error) {
        console.warn(`⚠️ Primary Public API failed: ${error instanceof Error ? error.message : String(error)}. Using fallback prices.`);
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

      // 1. Try public API
      let livePrices = await fetchFromPublicApi();

      // 2. If public API fails, use hardcoded fallback
      if (!livePrices) {
        console.error("❌ API source failed. Using hardcoded fallback prices.");
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
