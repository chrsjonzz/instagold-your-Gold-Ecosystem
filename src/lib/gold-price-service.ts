// This is a mock service to simulate fetching real-time gold prices.
// In a real application, this would be replaced with a live API.

const basePrices = {
    bangalore: 7250.00,
    chennai: 7310.50,
    hyderabad: 7280.00,
    coimbatore: 7295.00,
    vijayawada: 7270.00,
}

// Function to add a small random fluctuation to simulate real-time changes
const fluctuate = (price: number) => price + (Math.random() - 0.5) * 20;

export async function getBangaloreGoldPrice(karat: 24 | 22 | 18 | 14): Promise<number> {
    const basePrice = fluctuate(basePrices.bangalore);
    const purity = karat / 24;
    return parseFloat((basePrice * purity).toFixed(2));
}

export async function getCityGoldPrices() {
    return [
        { city: 'Bangalore', rate24k: fluctuate(basePrices.bangalore), rate22k: fluctuate(basePrices.bangalore * (22/24)), trend: 'up' as const },
        { city: 'Chennai', rate24k: fluctuate(basePrices.chennai), rate22k: fluctuate(basePrices.chennai * (22/24)), trend: 'down' as const },
        { city: 'Hyderabad', rate24k: fluctuate(basePrices.hyderabad), rate22k: fluctuate(basePrices.hyderabad * (22/24)), trend: 'up' as const },
        { city: 'Coimbatore', rate24k: fluctuate(basePrices.coimbatore), rate22k: fluctuate(basePrices.coimbatore * (22/24)), trend: 'up' as const },
        { city: 'Vijayawada', rate24k: fluctuate(basePrices.vijayawada), rate22k: fluctuate(basePrices.vijayawada * (22/24)), trend: 'down' as const },
    ].map(item => ({
        ...item,
        rate24k: parseFloat(item.rate24k.toFixed(2)),
        rate22k: parseFloat(item.rate22k.toFixed(2)),
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
