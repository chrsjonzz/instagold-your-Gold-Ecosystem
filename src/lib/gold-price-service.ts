// This service simulates fetching gold prices.
// In a real application, this would fetch data from a live API.

const cityToCurrency = {
    'bangalore': 'INR',
    'chennai': 'INR',
    'hyderabad': 'INR',
    'coimbatore': 'INR',
    'vijayawada': 'INR',
};

// Base price differences from Bangalore. These are illustrative.
const cityPriceOffsets = {
    bangalore: 0,
    chennai: 35.70,
    hyderabad: 20.30,
    coimbatore: 40.50,
    vijayawada: 15.90,
};

async function fetchLiveGoldPrice(): Promise<number> {
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
            headers: {
                'x-access-token': process.env.GOLD_API_KEY || ''
            }
        });
        if (!response.ok) {
            // If API fails, fallback to a default base price
            console.warn(`Gold API request failed with status ${response.status}. Falling back to default price.`);
            return 7150.50; // A reasonable default
        }
        const data = await response.json();
        // Use the price_gram_24k field directly for accuracy.
        const pricePerGram = data.price_gram_24k;
        if (!pricePerGram) {
            console.warn("price_gram_24k not found in API response. Falling back to default price.");
            return 7150.50;
        }
        return pricePerGram;
    } catch (error) {
        console.error("Error fetching live gold price:", error);
        // In case of any error (e.g., network), fallback to default price
        return 7150.50;
    }
}

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const price24k = await fetchLiveGoldPrice();
    const purity = karat / 24;
    return parseFloat((price24k * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const trends: ('up' | 'down')[] = ['up', 'down'];
    const livePrice24k_Bangalore = await fetchLiveGoldPrice();
    
    return Object.entries(cityPriceOffsets).map(([city, offset]) => {
        const rate24k = livePrice24k_Bangalore + offset;
        return {
            city: city.charAt(0).toUpperCase() + city.slice(1),
            rate24k: parseFloat(rate24k.toFixed(2)),
            rate22k: parseFloat((rate24k * (22/24)).toFixed(2)),
            trend: trends[Math.floor(Math.random() * trends.length)] as 'up' | 'down',
        }
    });
}


export async function getTickerGoldPrices() {
    const prices = await getCityGoldPrices();
    return prices.map(p => ({
        city: p.city,
        rate: p.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));
}
