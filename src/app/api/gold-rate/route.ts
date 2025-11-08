import { getCityGoldPrices } from '@/lib/gold-price-service';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure the route is always dynamic

export async function GET() {
  try {
    const prices = await getCityGoldPrices();
    return NextResponse.json(prices);
  } catch (error) {
    console.error('Error fetching gold prices for API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gold prices.' },
      { status: 500 }
    );
  }
}
