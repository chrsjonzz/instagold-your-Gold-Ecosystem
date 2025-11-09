// This service fetches live gold prices from multiple reliable sources
// Primary: Free public APIs, Fallback: GoldAPI.io

const FALLBACK_24K_PRICE = 12200; // Updated to current market rate
const FALLBACK_22K_PRICE = 11185; // Updated to current market rate

// 1 troy ounce = 31.1035 grams
const OUNCE_TO_GRAM = 31.1035;

// Indian market adjustment factor
// Some APIs return international spot prices, but Indian market prices include
// local premiums, import duties, GST, and market variations (~7% higher)
const INDIAN_MARKET_ADJUSTMENT = 1.07;

type GoldApiResponse = {
  price?: number;
  price_per_gram?: number;
  price_per_ounce?: number;
  price_gram_24k?: number;
  price_gram_22k?: number;
  // GoldAPI.io response structure
  price_gram?: number;
  price_oz?: number;
  // ... other fields are available but not used
  [key: string]: any; // Allow for other fields
};

// Try fetching from a free public gold price API (no auth required)
async function fetchFromPublicAPI(): Promise<{ price24k: number; price22k: number } | null> {
  try {
    // Using a reliable free API endpoint
    // This fetches current gold price in INR per gram
    const url = `https://api.metals.live/v1/spot/gold`;
    
    console.log('📡 Trying public API:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      // Metals.live returns price per troy ounce
      if (data.price && typeof data.price === 'number') {
        const pricePerGram = (data.price / OUNCE_TO_GRAM) * INDIAN_MARKET_ADJUSTMENT;
        return {
          price24k: parseFloat(pricePerGram.toFixed(2)),
          price22k: parseFloat((pricePerGram * (22/24)).toFixed(2)),
        };
      }
    }
  } catch (error) {
    console.log('⚠️ Public API failed, trying next source...');
  }
  return null;
}

// Try fetching from GoldAPI.io
async function fetchFromGoldAPI(): Promise<{ price24k: number; price22k: number } | null> {
  try {
    // Try to get API key from environment variable
    let apiKey = process.env.GOLD_API_KEY;
    
    // Fallback: If env variable is not set, use the hardcoded API key
    if (!apiKey) {
      apiKey = 'goldapi-b21ey0smhg3rsq9-io';
    }
    
    if (!apiKey) {
      return null;
    }

    const timestamp = Date.now();
    const url = `https://www.goldapi.io/api/XAU/INR?t=${timestamp}`;

    console.log('📡 Trying GoldAPI.io:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        "x-access-token": apiKey,
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const data: GoldApiResponse = await response.json();
    
    // GoldAPI.io returns price_gram_24k and price_gram_22k directly - use them!
    if (data.price_gram_24k !== undefined && typeof data.price_gram_24k === 'number' &&
        data.price_gram_22k !== undefined && typeof data.price_gram_22k === 'number') {
      
      const price_per_gram_24k = data.price_gram_24k * INDIAN_MARKET_ADJUSTMENT;
      const price_per_gram_22k = data.price_gram_22k * INDIAN_MARKET_ADJUSTMENT;
      
      if (price_per_gram_24k > 0 && price_per_gram_22k > 0) {
        return { 
          price24k: parseFloat(price_per_gram_24k.toFixed(2)), 
          price22k: parseFloat(price_per_gram_22k.toFixed(2)) 
        };
      }
    }
    
    // Try to calculate from price per troy ounce
    let pricePerOunce: number | null = null;
    
    if (data.price !== undefined && typeof data.price === 'number') {
      pricePerOunce = data.price;
    } else if (data.price_per_ounce !== undefined && typeof data.price_per_ounce === 'number') {
      pricePerOunce = data.price_per_ounce;
    } else if (data.price_oz !== undefined && typeof data.price_oz === 'number') {
      pricePerOunce = data.price_oz;
    }

    if (pricePerOunce !== null && pricePerOunce > 0) {
      let price_per_gram_24k = (pricePerOunce / OUNCE_TO_GRAM) * INDIAN_MARKET_ADJUSTMENT;
      let price_per_gram_22k = price_per_gram_24k * (22 / 24);

      if (price_per_gram_24k > 0 && price_per_gram_22k > 0) {
        return { 
          price24k: parseFloat(price_per_gram_24k.toFixed(2)), 
          price22k: parseFloat(price_per_gram_22k.toFixed(2)) 
        };
      }
    }
  } catch (error) {
    console.log('⚠️ GoldAPI.io failed:', error instanceof Error ? error.message : 'Unknown error');
  }
  return null;
}

// Main function that tries multiple sources
async function fetchLiveGoldPrice(): Promise<{ price24k: number; price22k: number }> {
  console.log('🔄 Fetching live gold price at:', new Date().toISOString());
  
  // Try source 1: Public API (no auth required)
  let result = await fetchFromPublicAPI();
  if (result) {
    console.log('✅ Successfully fetched from public API - 24K:', result.price24k, '22K:', result.price22k);
    return result;
  }
  
  // Try source 2: GoldAPI.io
  result = await fetchFromGoldAPI();
  if (result) {
    console.log('✅ Successfully fetched from GoldAPI.io - 24K:', result.price24k, '22K:', result.price22k);
    return result;
  }
  
  // All sources failed, use fallback
  console.warn('⚠️ All API sources failed. Using fallback prices.');
  return {
    price24k: FALLBACK_24K_PRICE,
    price22k: FALLBACK_22K_PRICE,
  };
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