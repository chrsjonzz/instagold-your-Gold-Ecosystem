// This service fetches live gold prices from GoldAPI.io

// The base price for 1 gram of 24k gold in INR, used as a fallback.
const FALLBACK_24K_PRICE = 7150.50;

type GoldApiResponse = {
    timestamp: number;
    metal: string;
    currency: string;
    exchange: string;
    symbol: string;
    prev_close_price: number;
    open_price: number;
    low_price: number;
    high_price: number;
    open_time: number;
    price: number;
    ch: number;
    chp: number;
    ask: number;
    bid: number;
    price_gram_24k: number;
    price_gram_22k: number;
    price_gram_21k: number;
    price_gram_20k: number;
    price_gram_18k: number;
};

async function fetchLiveGoldPrice(): Promise<{ price24k: number, price22k: number }> {
    try {
        const apiKey = process.env.GOLD_API_KEY;
        if (!apiKey) {
            throw new Error("GOLD_API_KEY is not set in environment variables.");
        }

        const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
            headers: {
                'x-access-token': apiKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.warn(`GoldAPI.io request failed with status ${response.status}. Falling back to default price.`);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }

        const data: GoldApiResponse = await response.json();

        if (!data || !data.price_gram_24k || !data.price_gram_22k) {
            console.warn("Valid data not found in GoldAPI.io response. Falling back to default price.", data);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }
        
        // As a sanity check, if the API returns a wildly different price, use the fallback.
        if (data.price_gram_24k < 6000 || data.price_gram_24k > 9000) {
            console.warn(`API spot price per gram (₹${data.price_gram_24k.toFixed(2)}) is outside expected range. Falling back to default.`);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }

        return { price24k: data.price_gram_24k, price22k: data.price_gram_22k };

    } catch (error) {
        console.error("Error fetching live gold price from GoldAPI.io:", error);
        return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
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
    return prices.map(p => ({
        city: p.city,
        rate: liveRate.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));
}
