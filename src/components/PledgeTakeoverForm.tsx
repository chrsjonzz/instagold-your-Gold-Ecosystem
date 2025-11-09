'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { submitPledgeTakeoverRequest } from '@/app/actions';
import { PledgeTakeoverFormSchema, type PledgeTakeoverFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const initialFormState: PledgeTakeoverFormState = {
    message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full" size="lg">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                <>
                    Request Takeover <ArrowRight className="ml-2" />
                </>
            )}
        </Button>
    );
}

export default function PledgeTakeoverForm() {
    const [formState, formAction] = useActionState(submitPledgeTakeoverRequest, initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    
    const form = useForm<z.infer<typeof PledgeTakeoverFormSchema>>({
        resolver: zodResolver(PledgeTakeoverFormSchema),
        defaultValues: {
            pawnshopName: '',
            loanAmount: '',
            goldDetails: '',
            name: '',
            phone: '',
        },
    });

    useEffect(() => {
        if (formState.message && formState.success) {
            form.reset();
            if (formRef.current) formRef.current.reset();
        }
    }, [formState, form]);

    return (
        <>
        <form ref={formRef} action={formAction} className="space-y-6">
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="e.g., Anjali Sharma" className="mt-1" {...form.register('name')} />
                     {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="phone">Your Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="e.g., 9876543210" className="mt-1" {...form.register('phone')} />
                     {form.formState.errors.phone && <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>}
                </div>
                <div>
                    <Label htmlFor="pawnshopName">Pawnshop Name & Address</Label>
                    <Input id="pawnshopName" placeholder="e.g., ABC Pawnbrokers, MG Road, Bangalore" className="mt-1" {...form.register('pawnshopName')} />
                     {form.formState.errors.pawnshopName && <p className="text-sm text-destructive mt-1">{form.formState.errors.pawnshopName.message}</p>}
                </div>
                <div>
                    <Label htmlFor="loanAmount">Outstanding Loan Amount (Approx.)</Label>
                    <Input id="loanAmount" placeholder="e.g., 50000" className="mt-1" {...form.register('loanAmount')} />
                     {form.formState.errors.loanAmount && <p className="text-sm text-destructive mt-1">{form.formState.errors.loanAmount.message}</p>}
                </div>
                <div>
                    <Label htmlFor="goldDetails">Pledged Gold Details (Optional)</Label>
                    <Textarea id="goldDetails" placeholder="e.g., 2 bangles, 1 necklace, approx 20-25 grams" className="mt-1" {...form.register('goldDetails')} />
                </div>
            </CardContent>
            <CardFooter>
                <SubmitButton />
            </CardFooter>
        </form>

        <AlertDialog open={formState.success}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Request Received!</AlertDialogTitle>
                <AlertDialogDescription>
                    {formState.message}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* This is a bit of a hack to "close" the dialog by resetting the form state */}
                    <form action={() => {
                        formAction(new FormData());
                        if (formRef.current) formRef.current.reset();
                        form.reset();
                    }}>
                        <AlertDialogAction type="submit">Okay</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    );
}
