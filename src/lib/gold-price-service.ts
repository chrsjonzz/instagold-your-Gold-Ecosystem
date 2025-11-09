// This service fetches live gold prices from GoldPricez.com

const FALLBACK_24K_PRICE = 7150.5;
const FALLBACK_22K_PRICE = FALLBACK_24K_PRICE * (22 / 24);

type GoldApiResponse = {
  gram_24k: number;
  gram_22k: number;
  // ... other fields are available but not used
};

async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
  try {
    const apiKey = process.env.GOLD_API_KEY;
    if (!apiKey) {
      console.warn("GOLD_API_KEY is not set. Falling back to default price.");
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    const url = "https://goldpricez.com/api/rates/currency/inr/measure/all";

    const response = await fetch(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
      // Revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(
        `GoldPricez.com request failed with status ${response.status}: ${errorText}. Falling back to default price.`
      );
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    const data: GoldApiResponse = await response.json();

    const price_gram_24k = data.gram_24k;
    const price_gram_22k = data.gram_22k;

    if (!price_gram_24k || !price_gram_22k) {
      console.warn(
        "Valid data not found in GoldPricez.com response. Falling back to default price.",
        data
      );
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    return { price24k: price_gram_24k, price22k: price_gram_22k };
  } catch (error) {
    console.error("Error fetching live gold price:", error);
    return {
      price24k: FALLBACK_24K_PRICE,
      price22k: FALLBACK_22K_PRICE,
    };
  }
}

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const { price24k } = await fetchLiveGoldPrice();
    const purity = karat / 24;
    return parseFloat((price24k * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const { price24k, price22k } = await fetchLiveGoldPrice();
    const trends: ('up' | 'down')[] = ['up', 'down'];
    
    const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

    return cities.map((city) => ({
        city: city,
        rate24k: parseFloat(price24k.toFixed(2)),
        rate22k: parseFloat(price22k.toFixed(2)),
        trend: trends[Math.floor(Math.random() * trends.length)],
    }));
}

export async function getTickerGoldPrices() {
    const prices = await getCityGoldPrices();
    // Ticker will show the same price for all cities, reflecting the live national rate.
    const liveRate = prices[0]; 
    if (!liveRate) {
        return [];
    }
    return prices.map(p => ({
        city: p.city,
        rate: liveRate.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));
}
