// This service simulates fetching gold prices.
// In a real application, this would fetch data from a live API.

const cityToCurrency = {
    'bangalore': 'INR',
    'chennai': 'INR',
    'hyderabad': 'INR',
    'coimbatore': 'INR',
    'vijayawada': 'INR',
};

async function fetchLiveGoldPrice(): Promise<number> {
    // Fallback price for 1 gram of 24k gold in INR, in case the API fails.
    const fallbackPricePerGram = 7150.50;

    try {
        // Fetch data from goldprice.org API for INR
        const response = await fetch('https://data-asg.goldprice.org/dbXRates/INR', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            console.warn(`Goldprice.org API request failed with status ${response.status}. Falling back to default price.`);
            return fallbackPricePerGram;
        }

        const data = await response.json();
        
        if (!data || !data.items || !data.items.length || !data.items[0].xauPrice) {
            console.warn("Valid data not found in Goldprice.org API response. Falling back to default price.", data);
            return fallbackPricePerGram;
        }

        // The API returns the value of 1 troy ounce of gold in INR.
        // We need to convert it to the price per gram.
        // 1 troy ounce = 31.1035 grams
        const pricePerOunce = data.items[0].xauPrice;
        const pricePerGram = pricePerOunce / 31.1035;

        // As a sanity check, if the API returns a wildly different price, use the fallback.
        if (pricePerGram < 6500 || pricePerGram > 8500) {
            console.warn(`API price per gram (₹${pricePerGram.toFixed(2)}) is outside expected range. Falling back to default.`);
            return fallbackPricePerGram;
        }

        return pricePerGram;
    } catch (error) {
        console.error("Error fetching live gold price from Goldprice.org:", error);
        // In case of any error (e.g., network), fallback to default price
        return fallbackPricePerGram;
    }
}

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const price24k = await fetchLiveGoldPrice();
    // Use the accurate 24k price as the base for all calculations.
    if (karat === 24) {
        return parseFloat(price24k.toFixed(2));
    }
    // For other karats, calculate from the 24k price.
    const purity = karat / 24;
    return parseFloat((price24k * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const trends: ('up' | 'down')[] = ['up', 'down'];
    const livePrice24k_Base = await fetchLiveGoldPrice();
    const livePrice22k_Base = livePrice24k_Base * (22/24);
    
    // For now, we are showing the same live national price for all cities
    // as the API provides a single rate for INR.
    return Object.keys(cityToCurrency).map((city) => {
        return {
            city: city.charAt(0).toUpperCase() + city.slice(1),
            rate24k: parseFloat(livePrice24k_Base.toFixed(2)),
            rate22k: parseFloat(livePrice22k_Base.toFixed(2)),
            trend: trends[Math.floor(Math.random() * trends.length)] as 'up' | 'down',
        }
    });
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
