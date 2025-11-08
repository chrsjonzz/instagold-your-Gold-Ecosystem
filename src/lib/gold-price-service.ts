
// This service fetches live gold prices from GoldPricez.com

const FALLBACK_24K_PRICE = 7150.50;

type GoldApiResponse = {
    gram_24k: number;
    gram_22k: number;
    gram_21k: number;
    gram_20k: number;
    gram_18k: number;
};

async function fetchLiveGoldPrice(): Promise<{ price24k: number, price22k: number }> {
    try {
        const apiKey = process.env.GOLD_API_KEY;
        if (!apiKey) {
            console.warn("GOLD_API_KEY is not set. Falling back to default price.");
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }
        
        const url = `https://goldpricez.com/api/rates/currency/inr/measure/all`;

        const response = await fetch(url, {
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            // Revalidate every hour
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            console.warn(`GoldPricez.com request failed with status ${response.status}. Falling back to default price.`);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }

        const data: GoldApiResponse = await response.json();
        
        const price_gram_24k = data.gram_24k;
        const price_gram_22k = data.gram_22k;

        if (!price_gram_24k || !price_gram_22k) {
            console.warn("Valid data not found in GoldPricez.com response. Falling back to default price.", data);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }
        
        // As a sanity check, if the API returns a wildly different price, use the fallback.
        if (price_gram_24k < 6000 || price_gram_24k > 9000) {
            console.warn(`API spot price per gram (₹${price_gram_24k.toFixed(2)}) is outside expected range. Falling back to default.`);
            return { price24k: FALLBACK_24K_PRICE, price22k: FALLBACK_24K_PRICE * (22/24) };
        }

        return { price24k: price_gram_24k, price22k: price_gram_22k };

    } catch (error) {
        console.error("Error fetching live gold price from GoldPricez.com:", error);
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
