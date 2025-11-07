import { z } from 'zod';

export const ValuationFormSchema = z.object({
  weight: z.coerce.number().gt(0, { message: "Weight must be greater than 0." }),
  karat: z.coerce.number().min(10).max(24),
});

export type ValuationFormState = {
    message: string;
    estimatedValue?: number;
    error?: string;
};
