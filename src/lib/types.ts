import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ValuationFormSchema = z.object({
  weight: z.coerce.number().gt(0, { message: "Weight must be greater than 0." }),
  karat: z.coerce.number().min(10).max(24),
  photo: z
    .any()
    .refine((files) => files?.length == 1, "An image of the gold item is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type ValuationFormState = {
    message: string;
    estimatedValue?: number;
    error?: string;
};
