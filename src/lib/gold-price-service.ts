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
    // Fallback price for 1 gram of 24k gold (spot price) in INR, in case the API fails.
    const fallbackSpotPricePerGram = 6650.00;

    try {
        const response = await fetch('https://data-asg.goldprice.org/dbXRates/INR');

        if (!response.ok) {
            console.warn(`Goldprice.org API request failed with status ${response.status}. Falling back to default spot price.`);
            return fallbackSpotPricePerGram;
        }

        const data = await response.json();
        
        if (!data || !data.items || !data.items.length || !data.items[0].xauPrice) {
            console.warn("Valid data not found in Goldprice.org API response. Falling back to default spot price.", data);
            return fallbackSpotPricePerGram;
        }

        // The API returns the value of 1 troy ounce of gold in INR.
        // 1 troy ounce = 31.1035 grams
        const pricePerOunce = data.items[0].xauPrice;
        const pricePerGram = pricePerOunce / 31.1035;

        // As a sanity check, if the API returns a wildly different price, use the fallback.
        if (pricePerGram < 6000 || pricePerGram > 8000) {
            console.warn(`API spot price per gram (₹${pricePerGram.toFixed(2)}) is outside expected range. Falling back to default.`);
            return fallbackSpotPricePerGram;
        }

        return pricePerGram;
    } catch (error) {
        console.error("Error fetching live gold price from Goldprice.org:", error);
        return fallbackSpotPricePerGram; // In case of any error (e.g., network), fallback to default price
    }
}

function calculateRetailPrice(spotPrice: number): number {
    // This function calculates an estimated final retail price from the spot price.
    // In India, this includes import duties, GST, and jeweler margins.
    // These percentages are estimates and can vary.
    
    const importDuty = 0.15; // Approx. 15%
    const gst = 0.03; // 3% GST on gold
    const margin = 0.03; // Approx. 3-5% margin for jeweler

    const priceAfterDuty = spotPrice * (1 + importDuty);
    const priceAfterGST = priceAfterDuty * (1 + gst);
    const finalPrice = priceAfterGST * (1 + margin);
    
    return finalPrice;
}


export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const spotPrice24k = await fetchLiveGoldPrice();
    const retailPrice24k = calculateRetailPrice(spotPrice24k);

    if (karat === 24) {
        return parseFloat(retailPrice24k.toFixed(2));
    }
    
    const purity = karat / 24;
    return parseFloat((retailPrice24k * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    const trends: ('up' | 'down')[] = ['up', 'down'];
    
    const spotPrice24k_Base = await fetchLiveGoldPrice();
    const retailPrice24k_Base = calculateRetailPrice(spotPrice24k_Base);
    const retailPrice22k_Base = retailPrice24k_Base * (22 / 24);
    
    // For now, we are showing the same live national price for all cities
    // as the API provides a single rate for INR.
    return Object.keys(cityToCurrency).map((city) => {
        return {
            city: city.charAt(0).toUpperCase() + city.slice(1),
            rate24k: parseFloat(retailPrice24k_Base.toFixed(2)),
            rate22k: parseFloat(retailPrice22k_Base.toFixed(2)),
            trend: trends[Math.floor(Math.random() * trends.length)] as 'up' | 'down',
        }
    });
}

export async function getTickerGoldPrices() {
    const prices = await getCityGoldPrices();
    // Ticker will show the same price for all cities, reflecting the live national rate.
    const liveRate = prices[0]; // All cities have the same rate now
    return prices.map(p => ({
        city: p.city,
        rate: liveRate.rate24k.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        change: `${p.trend === 'up' ? '+' : '-'}${(Math.random() * 0.5).toFixed(2)}%`,
        trend: p.trend,
    }));
}
