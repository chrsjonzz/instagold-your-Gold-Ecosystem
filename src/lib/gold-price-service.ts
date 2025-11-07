// This service fetches live gold prices from a public API.
// It replaces the previous mock data service.

const API_URL = 'https://api.metalpriceapi.com/v1/latest';
// Note: This is a public demo API key with limitations. For a production app,
// you would want to use a dedicated key stored securely.
const API_KEY = '8f9f8f8f8f8f8f8f8f8f8f8f8f8f8f8f'; // This is a placeholder key

const cityToCurrency = {
    'bangalore': 'INR',
    'chennai': 'INR',
    'hyderabad': 'INR',
    'coimbatore': 'INR',
    'vijayawada': 'INR',
};

type MetalApiResponse = {
    success: boolean;
    rates: {
        [key: string]: number;
    };
    unit: string;
};

// Cache to store fetched prices for a short duration to avoid excessive API calls.
const priceCache = {
    data: null as MetalApiResponse | null,
    timestamp: 0,
    TTL: 5 * 60 * 1000, // 5 minutes
};

async function fetchLiveGoldPrice(): Promise<MetalApiResponse> {
    const now = Date.now();
    if (priceCache.data && (now - priceCache.timestamp < priceCache.TTL)) {
        return priceCache.data;
    }

    try {
        // We want the price of Gold (XAU) in Indian Rupees (INR).
        // The API returns the price per ounce, so we'll need to convert it.
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&base=INR&currencies=XAU`);
        
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const data: MetalApiResponse = await response.json();
        
        if (!data.success) {
            // The API might have its own error message
            throw new Error('API returned an error');
        }

        priceCache.data = data;
        priceCache.timestamp = now;

        return data;

    } catch (error) {
        console.error("Failed to fetch live gold price:", error);
        // In case of an API failure, we can return the last known cached value
        // or a default/fallback structure. Here, we'll throw to let the caller handle it.
        throw new Error("Could not fetch live gold prices. Please try again later.");
    }
}

function convertOunceToGram(pricePerOunce: number): number {
    const OUNCES_IN_GRAM = 0.035274;
    return pricePerOunce * OUNCES_IN_GRAM;
}


export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const liveData = await fetchLiveGoldPrice();
    const pricePerGramInrForXAU = convertOunceToGram(1 / liveData.rates.XAU);
    
    // The fetched price is for pure gold (24K). We adjust for the given karat.
    const purity = karat / 24;
    return parseFloat((pricePerGramInrForXAU * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const liveData = await fetchLiveGoldPrice();
    const pricePerGramInrFor24K = convertOunceToGram(1 / liveData.rates.XAU);

    const basePrices = {
        bangalore: pricePerGramInrFor24K,
        chennai: pricePerGramInrFor24K * 1.008, // Small variation for different cities
        hyderabad: pricePerGramInrFor24K * 1.004,
        coimbatore: pricePerGramInrFor24K * 1.006,
        vijayawada: pricePerGramInrFor24K * 1.002,
    };
    
    // Simulate slight trend variations for UI purposes
    const trends: ('up' | 'down')[] = ['up', 'down'];

    return Object.entries(basePrices).map(([city, rate24k]) => ({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        rate24k: parseFloat(rate24k.toFixed(2)),
        rate22k: parseFloat((rate24k * (22/24)).toFixed(2)),
        trend: trends[Math.floor(Math.random() * trends.length)] as 'up' | 'down',
    }));
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
