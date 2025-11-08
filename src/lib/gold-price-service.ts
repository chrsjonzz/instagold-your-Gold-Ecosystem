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
        const response = await fetch('https://www.metals-api.com/api/latest?access_key=' + (process.env.METALS_API_KEY || '') + '&base=XAU&symbols=INR', {});
        if (!response.ok) {
            // If API fails, fallback to a default base price
            console.warn(`Metals API request failed with status ${response.status}. Falling back to default price.`);
            return 7150.50; // A reasonable default
        }
        const data = await response.json();
        
        if (!data.success || !data.rates || !data.rates.INR) {
            console.warn("Valid data not found in Metals API response. Falling back to default price.", data);
            return 7150.50;
        }

        // The API returns the value of 1 ounce of gold in INR.
        // We need to convert it to the price per gram.
        // 1 troy ounce = 31.1035 grams
        const pricePerOunce = data.rates.INR;
        const pricePerGram = pricePerOunce / 31.1035;

        return pricePerGram;
    } catch (error) {
        console.error("Error fetching live gold price from Metals-API:", error);
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
    const livePrice24k_Base = await fetchLiveGoldPrice();
    
    return Object.entries(cityPriceOffsets).map(([city, offset]) => {
        const rate24k = livePrice24k_Base + offset;
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
