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
    
    console.log('🔄 Fetching live gold price at:', new Date().toISOString());
    
    if (!apiKey) {
      console.warn("⚠️ GOLD_API_KEY is not set. Falling back to default price.");
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    // Add cache-busting timestamp to URL
    const timestamp = Date.now();
    const url = `https://goldpricez.com/api/rates/currency/inr/measure/all?t=${timestamp}`;

    console.log('📡 Fetching from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "X-API-KEY": apiKey,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      // Force no caching
      cache: 'no-store',
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `❌ GoldPricez.com request failed with status ${response.status}: ${errorText}`
      );
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    const data: GoldApiResponse = await response.json();
    
    const price_gram_24k = data.gram_24k;
    const price_gram_22k = data.gram_22k;

    if (!price_gram_24k || !price_gram_22k || 
        typeof price_gram_24k !== 'number' || 
        typeof price_gram_22k !== 'number') {
      console.warn(
        "⚠️ Invalid data in GoldPricez.com response. Falling back to default price.",
        data
      );
      return {
        price24k: FALLBACK_24K_PRICE,
        price22k: FALLBACK_22K_PRICE,
      };
    }

    console.log('✅ Successfully fetched prices - 24K:', price_gram_24k, '22K:', price_gram_22k);

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

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    console.log(`🏙️ Getting Bangalore gold price for ${karat}K`);
    const { price24k } = await fetchLiveGoldPrice();
    const purity = karat / 24;
    const finalPrice = parseFloat((price24k * purity).toFixed(2));
    console.log(`💎 ${karat}K price: ₹${finalPrice}`);
    return finalPrice;
}

export async function getCityGoldPrices() {
    console.log('🌆 Getting city gold prices');
    const { price24k, price22k } = await fetchLiveGoldPrice();
    const trends: ('up' | 'down')[] = ['up', 'down'];
    
    const cities = ['Bangalore', 'Chennai', 'Hyderabad', 'Coimbatore', 'Vijayawada'];

    const cityPrices = cities.map((city) => ({
        city: city,
        rate24k: parseFloat(price24k.toFixed(2)),
        rate22k: parseFloat(price22k.toFixed(2)),
        trend: trends[Math.floor(Math.random() * trends.length)],
    }));

    console.log('📊 City prices generated:', cityPrices[0]);
    return cityPrices;
}

export async function getTickerGoldPrices() {
    console.log('📈 Getting ticker gold prices');
    const prices = await getCityGoldPrices();
    
    const liveRate = prices[0]; 
    if (!liveRate) {
        console.warn('⚠️ No live rate available for ticker');
        return [];
    }
    
    const tickerPrices = prices.map(p => ({
        city: p.city,
        rate: liveRate.rate24k.toLocaleString('en-IN', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));

    console.log('🎫 Ticker prices:', tickerPrices[0]);
    return tickerPrices;
}
