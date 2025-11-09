'use client';

import { useState, useEffect } from 'react';

// Define a stable USD to INR conversion rate for the second fallback API.
const USD_TO_INR_RATE = 83.50; 

// --- Primary Public API (No Auth Required) ---
const PUBLIC_API_URL = "https://www.goldpricez.com/api/rates/currency/inr/metal/xau";

// --- Fallback Authenticated API ---
const GOLDAPI_URL = "https://www.goldapi.io/api/XAU/USD";

// --- Final Fallback Prices ---
const FALLBACK_24K_PRICE_INR = 7150.50;
const FALLBACK_22K_PRICE_INR = FALLBACK_24K_PRICE_INR * (22 / 24);

export type Price = {
  city: string;
  rate24k: number;
  rate22k: number;
  trend: 'up' | 'down';
};

// --- API Response Type Definitions ---
type GoldPricezApiResponse = {
    "24k_in_inr"?: number;
    "22k_in_inr"?: number;
};

type GoldApiResponse = {
  price_gram_24k?: number;
  price_gram_22k?: number;
};


// --- Fetching Logic ---

/**
 * 1. Fetches from the primary public API (goldpricez.com).
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
        console.warn(`⚠️ Primary Public API failed: ${error instanceof Error ? error.message : String(error)}. Trying fallback...`);
        return null;
    }
}

/**
 * 2. Fetches from the authenticated fallback API (goldapi.io).
 * This API provides USD prices which need conversion.
 */
async function fetchFromGoldApi(): Promise<{ price24k: number; price22k: number } | null> {
    const apiKey = process.env.NEXT_PUBLIC_GOLD_API_KEY;
    if (!apiKey) {
        console.warn("⚠️ NEXT_PUBLIC_GOLD_API_KEY not set. Skipping GoldAPI.io fallback.");
        return null;
    }

    try {
        const response = await fetch(GOLDAPI_URL, {
            headers: { "x-access-token": apiKey },
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error(`GoldAPI.io failed with status ${response.status}`);
        }
        const data: GoldApiResponse = await response.json();

        if (data.price_gram_24k && data.price_gram_22k) {
            console.log("✅ Successfully fetched from Fallback GoldAPI.io.");
            // Convert USD prices to INR
            const price24k_inr = data.price_gram_24k * USD_TO_INR_RATE;
            const price22k_inr = data.price_gram_22k * USD_TO_INR_RATE;
            return {
                price24k: parseFloat(price24k_inr.toFixed(2)),
                price22k: parseFloat(price22k_inr.toFixed(2)),
            };
        }
        throw new Error("Invalid data structure from GoldAPI.io.");
    } catch (error) {
        console.error(`❌ Fallback GoldAPI.io failed: ${error instanceof Error ? error.message : String(error)}.`);
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

      // 2. If public fails, try authenticated API
      if (!livePrices) {
        livePrices = await fetchFromGoldApi();
      }

      // 3. If all APIs fail, use hardcoded fallback
      if (!livePrices) {
        console.error("❌ All API sources failed. Using hardcoded fallback prices.");
        livePrices = {
            price24k: FALLBACK_24K_PRICE_INR,
            price22k: FALLBACK_22K_PRICE_INR,
        };
        setError("Could not fetch live prices. Displaying fallback data.");
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
