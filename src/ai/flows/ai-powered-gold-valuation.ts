'use server';

/**
 * @fileOverview AI-powered gold valuation flow.
 *
 * This flow estimates the value of gold items based on an image upload.
 * - aiPoweredGoldValuation - A function that handles the gold valuation process.
 * - AIPoweredGoldValuationInput - The input type for the aiPoweredGoldValuation function.
 * - AIPoweredGoldValuationOutput - The return type for the aiPoweredGoldValuation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredGoldValuationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of gold items, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  karat: z.number().describe('The karat of the gold item.'),
  weight: z.number().describe('The weight of the gold item in grams.'),
  currentMarketPrice: z.number().describe('The current market price of gold per gram.'),
});
export type AIPoweredGoldValuationInput = z.infer<typeof AIPoweredGoldValuationInputSchema>;

const AIPoweredGoldValuationOutputSchema = z.object({
  estimatedValue: z.number().describe('The estimated value of the gold item.'),
});
export type AIPoweredGoldValuationOutput = z.infer<typeof AIPoweredGoldValuationOutputSchema>;

export async function aiPoweredGoldValuation(input: AIPoweredGoldValuationInput): Promise<AIPoweredGoldValuationOutput> {
  return aiPoweredGoldValuationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredGoldValuationPrompt',
  input: {schema: AIPoweredGoldValuationInputSchema},
  output: {schema: AIPoweredGoldValuationOutputSchema},
  prompt: `You are an AI expert in gold valuation.

You will use the following information to estimate the value of the gold item.

Karat: {{{karat}}}
Weight (grams): {{{weight}}}
Current Market Price (per gram): {{{currentMarketPrice}}}
Photo: {{media url=photoDataUri}}

Calculate the estimated value of the gold item based on the provided information. Consider the karat, weight, current market price, and visual information from the photo.

Estimated Value:`, // Provide instructions for the output format
});

const aiPoweredGoldValuationFlow = ai.defineFlow(
  {
    name: 'aiPoweredGoldValuationFlow',
    inputSchema: AIPoweredGoldValuationInputSchema,
    outputSchema: AIPoweredGoldValuationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      estimatedValue: parseFloat(output!.estimatedValue.toString()),
    };
  }
);
