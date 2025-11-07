'use server';

/**
 * @fileOverview Gold valuation flow.
 *
 * This flow estimates the value of gold items.
 * - goldValuation - A function that handles the gold valuation process.
 * - GoldValuationInput - The input type for the goldValuation function.
 * - GoldValuationOutput - The return type for the goldValuation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GoldValuationInputSchema = z.object({
  karat: z.number().describe('The karat of the gold item.'),
  weight: z.number().describe('The weight of the gold item in grams.'),
  currentMarketPrice: z.number().describe('The current market price of gold per gram.'),
});
export type GoldValuationInput = z.infer<typeof GoldValuationInputSchema>;

const GoldValuationOutputSchema = z.object({
  estimatedValue: z.number().describe('The estimated value of the gold item.'),
});
export type GoldValuationOutput = z.infer<typeof GoldValuationOutputSchema>;

export async function goldValuation(input: GoldValuationInput): Promise<GoldValuationOutput> {
  return goldValuationFlow(input);
}

const goldValuationFlow = ai.defineFlow(
  {
    name: 'goldValuationFlow',
    inputSchema: GoldValuationInputSchema,
    outputSchema: GoldValuationOutputSchema,
  },
  async input => {
    // Pure gold is 24k. The value is a ratio of the item's karat to 24k.
    const purity = input.karat / 24;
    const estimatedValue = input.weight * input.currentMarketPrice * purity;
    
    return {
      estimatedValue: parseFloat(estimatedValue.toFixed(2)),
    };
  }
);
