'use server';

import { z } from 'zod';
import { goldValuation } from '@/ai/flows/gold-valuation';
import { ValuationFormSchema, type ValuationFormState, SupportFormSchema, type SupportFormState, ProceedToSellSchema, PartnerFormSchema, type PartnerFormState, PledgeTakeoverFormSchema, type PledgeTakeoverFormState } from '@/lib/types';
// Note: getBangaloreGoldPrice is no longer available server-side.
// The valuation flow might need to be adjusted if it depends on a live price.
// For now, we will use a fallback price for server-side valuation.
const FALLBACK_24K_PRICE = 7150.5;


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
        phone: formData.get('phone'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid form data.",
            error: validatedFields.error.flatten().fieldErrors.weight?.[0] || 
                   validatedFields.error.flatten().fieldErrors.karat?.[0] ||
                   validatedFields.error.flatten().fieldErrors.phone?.[0] ||
                   "Please check your inputs.",
        };
    }

    const { weight, karat, phone } = validatedFields.data;

    try {
        // Since fetching is client-side, we use a fallback for the server-side AI valuation.
        // A more advanced implementation might involve passing the client-fetched price to the action.
        const currentMarketPrice = FALLBACK_24K_PRICE;

        const result = await goldValuation({
            weight,
            karat,
            currentMarketPrice,
        });

        if (result && result.estimatedValue) {
            console.log("Valuation Inquiry:", { 
                phone, 
                estimatedValue: `INR ${result.estimatedValue}`
            });

            return {
                message: "Valuation successful!",
                estimatedValue: result.estimatedValue,
                phone: phone, // Pass phone number in state
                weight: weight,
                karat: karat,
            };
        } else {
            return {
                message: "Valuation failed.",
                error: "Could not retrieve an estimated value."
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

export async function proceedToSell(
    prevState: { message: string, error?: string },
    formData: FormData
): Promise<{ message: string, error?: string, success?: boolean }> {
    const validatedFields = ProceedToSellSchema.safeParse({
        phone: formData.get('phone'),
        estimatedValue: formData.get('estimatedValue'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid data for proceeding to sell.",
            error: validatedFields.error.flatten().fieldErrors.phone?.[0] ||
                   validatedFields.error.flatten().fieldErrors.estimatedValue?.[0]
        };
    }
    
    const { phone, estimatedValue } = validatedFields.data;

    // In a real application, this would trigger an SMS to +91 96204 33303.
    // For now, we'll just log it to the console.
    console.log("Proceed to Sell inquiry:", { 
        phone, 
        estimatedValue: `INR ${estimatedValue}`
    });

    return {
        message: "Thank you! Our team will call you shortly to assist with the next steps.",
        success: true,
    };
}

export async function submitSupportRequest(
    prevState: SupportFormState,
    formData: FormData
): Promise<SupportFormState> {
    const validatedFields = SupportFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid form data. Please check your inputs.",
            error: validatedFields.error.flatten().fieldErrors.name?.[0] ||
                     validatedFields.error.flatten().fieldErrors.email?.[0] ||
                     validatedFields.error.flatten().fieldErrors.message?.[0]
        };
    }
    
    // In a real application, you would handle this data, e.g., send an email, save to a database.
    // For now, we'll just log it and return a success message.
    console.log("Support Request Received:", validatedFields.data);

    return {
        message: "Thank you for your message! We will get back to you shortly.",
        success: true,
    };
}

export async function submitPartnerRequest(
    prevState: PartnerFormState,
    formData: FormData
): Promise<PartnerFormState> {
    const validatedFields = PartnerFormSchema.safeParse({
        businessName: formData.get('businessName'),
        contactName: formData.get('contactName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            message: "Invalid form data. Please check your inputs.",
            error: validatedFields.error.flatten().fieldErrors.businessName?.[0] ||
                     validatedFields.error.flatten().fieldErrors.contactName?.[0] ||
                     validatedFields.error.flatten().fieldErrors.email?.[0] ||
                     validatedFields.error.flatten().fieldErrors.phone?.[0]
        };
    }
    
    // In a real application, this would be sent to a business development email or CRM.
    // For now, we'll just log it and return a success message.
    console.log("Partnership Request Received:", validatedFields.data);

    return {
        message: "Thank you for your interest! Our partnership team will review your application and be in touch soon.",
        success: true,
    };
}


export async function submitPledgeTakeoverRequest(
    prevState: PledgeTakeoverFormState,
    formData: FormData
): Promise<PledgeTakeoverFormState> {

    // A check to reset the form state when the dialog is closed.
    if (!formData.get('name')) {
        return { message: '' };
    }

    const validatedFields = PledgeTakeoverFormSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        pawnshopName: formData.get('pawnshopName'),
        loanAmount: formData.get('loanAmount'),
        goldDetails: formData.get('goldDetails'),
    });

    if (!validatedFields.success) {
        // This won't be shown to the user with the current form setup,
        // as client-side validation is used. But it's good practice.
        return {
            message: "Invalid form data.",
            error: "Please check your inputs."
        };
    }

    const { name, phone, pawnshopName, loanAmount, goldDetails } = validatedFields.data;

    // In a real application, this would trigger a WhatsApp message or SMS.
    // For now, we'll just log it to the console to simulate the notification.
    const notificationMessage = `
    New Pledge Takeover Request:
    -------------------------------
    Customer Name: ${name}
    Phone: ${phone}
    Pawnshop: ${pawnshopName}
    Loan Amount: ${loanAmount}
    Gold Details: ${goldDetails || 'N/A'}
    -------------------------------
    `;
    console.log("--- WHATSAPP NOTIFICATION SIMULATION ---");
    console.log(notificationMessage);
    console.log("----------------------------------------");


    return {
        message: "Thank you for your request! Our pledge takeover specialists will contact you shortly to discuss the next steps.",
        success: true,
    };
}
