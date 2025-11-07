// This service simulates fetching gold prices.
// In a real application, this would fetch data from a live API.

const cityToCurrency = {
    'bangalore': 'INR',
    'chennai': 'INR',
    'hyderabad': 'INR',
    'coimbatore': 'INR',
    'vijayawada': 'INR',
};

// Base prices per gram for 24K gold in INR.
const basePrices = {
    bangalore: 7150.50,
    chennai: 7185.20,
    hyderabad: 7170.80,
    coimbatore: 7190.00,
    vijayawada: 7165.40,
};

async function fetchLiveGoldPrice(): Promise<number> {
    try {
        const response = await fetch('https://www.goldapi.io/api/XAU/INR', {
            headers: {
                'x-access-token': process.env.GOLD_API_KEY || ''
            }
        });
        if (!response.ok) {
            // If API fails, fallback to base price
            console.warn(`Gold API request failed with status ${response.status}. Falling back to base price.`);
            return basePrices.bangalore;
        }
        const data = await response.json();
        // Use the price_gram_24k field directly for accuracy.
        const pricePerGram = data.price_gram_24k;
        if (!pricePerGram) {
            console.warn("price_gram_24k not found in API response. Falling back to base price.");
            return basePrices.bangalore;
        }
        return pricePerGram;
    } catch (error) {
        console.error("Error fetching live gold price:", error);
        // In case of any error (e.g., network), fallback to base price
        return basePrices.bangalore;
    }
}


function getFluctuatedPrice(base: number): number {
    const fluctuation = (Math.random() - 0.5) * 50; // Fluctuate by +/- 25 INR
    return parseFloat((base + fluctuation).toFixed(2));
}

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const price24k = await fetchLiveGoldPrice();
    const purity = karat / 24;
    return parseFloat((price24k * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const trends: ('up' | 'down')[] = ['up', 'down'];
    const livePrice24k = await fetchLiveGoldPrice();
    
    // Use the live price for Bangalore and simulate for others based on it
    basePrices.bangalore = livePrice24k;

    return Object.entries(basePrices).map(([city, baseRate]) => {
        const rate24k = (city === 'bangalore') ? livePrice24k : getFluctuatedPrice(baseRate);
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
        rate: p.rate24k.toLocaleString('en-IN'),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));
}
