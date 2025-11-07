'use server';

import { z } from 'zod';
import { aiPoweredGoldValuation } from '@/ai/flows/ai-powered-gold-valuation';
import { ValuationFormSchema, type ValuationFormState } from '@/lib/types';

const GoldValuationActionSchema = ValuationFormSchema.extend({
    // Server-side will have no location for now, but we add it to the schema
});

export async function getGoldValuation(
    prevState: ValuationFormState,
    formData: FormData
): Promise<ValuationFormState> {
    const validatedFields = GoldValuationActionSchema.safeParse({
        weight: formData.get('weight'),
        karat: formData.get('karat'),
        photo: formData.getAll('photo'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid form data.",
            error: validatedFields.error.flatten().fieldErrors.photo?.[0] || 
                   validatedFields.error.flatten().fieldErrors.weight?.[0] || 
                   validatedFields.error.flatten().fieldErrors.karat?.[0] || 
                   "Please check your inputs.",
        };
    }

    const { weight, karat, photo } = validatedFields.data;
    const file = photo[0] as File;

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const photoDataUri = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Mock current market price - in a real app, this would be fetched from an API
        const currentMarketPrice = 7150 / 1; // Mock price per gram for 24K gold

        const result = await aiPoweredGoldValuation({
            weight,
            karat,
            photoDataUri,
            currentMarketPrice,
        });

        if (result && result.estimatedValue) {
            return {
                message: "Valuation successful!",
                estimatedValue: result.estimatedValue,
            };
        } else {
            return {
                message: "Valuation failed.",
                error: "Could not retrieve an estimated value from the AI model."
            };
        }
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        return {
            message: "An unexpected error occurred.",
            error: `Server error: ${errorMessage}`
        };
    }
}
