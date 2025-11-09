import { z } from 'zod';

export const ValuationFormSchema = z.object({
  weight: z.coerce.number().gt(0, { message: "Weight must be greater than 0." }),
  karat: z.coerce.number().min(10).max(24),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }).max(13, { message: 'Please enter a valid 10-digit phone number.' }),
});

export type ValuationFormState = {
    message: string;
    estimatedValue?: number;
    error?: string;
    phone?: string;
    weight?: number;
    karat?: number;
};

export const ProceedToSellSchema = z.object({
  phone: z.string(),
  estimatedValue: z.coerce.number(),
});


export const SupportFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type SupportFormState = {
    message: string;
    error?: string;
    success?: boolean;
};

export const PartnerFormSchema = z.object({
  businessName: z.string().min(2, { message: "Business name must be at least 2 characters." }),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
  message: z.string().optional(),
});

export type PartnerFormState = {
    message: string;
    error?: string;
    success?: boolean;
};

export const PledgeTakeoverFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  pawnshopName: z.string().min(3, { message: "Please enter the pawnshop name and address." }),
  loanAmount: z.string().min(2, { message: "Please enter the approximate loan amount." }),
  goldDetails: z.string().optional(),
});

export type PledgeTakeoverFormState = {
    message: string;
    error?: string;
    success?: boolean;
};
