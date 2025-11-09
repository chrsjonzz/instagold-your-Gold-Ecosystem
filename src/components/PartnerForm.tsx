'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { submitPartnerRequest } from '@/app/actions';
import { PartnerFormSchema, type PartnerFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const initialFormState: PartnerFormState = {
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
                    <Send className="mr-2 h-4 w-4" />
                    Submit Application
                </>
            )}
        </Button>
    );
}

export default function PartnerForm() {
    const [formState, formAction] = useFormState(submitPartnerRequest, initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof PartnerFormSchema>>({
        resolver: zodResolver(PartnerFormSchema),
        defaultValues: {
            businessName: '',
            contactName: '',
            email: '',
            phone: '',
            message: '',
        },
    });

    useEffect(() => {
        if (formState.message) {
             if (formState.success) {
                toast({
                    title: 'Application Sent!',
                    description: formState.message,
                });
                form.reset();
                if (formRef.current) formRef.current.reset();
            } else {
                toast({
                    variant: 'destructive',
                    title: 'An Error Occurred',
                    description: formState.error || formState.message,
                });
            }
        }
    }, [formState, toast, form]);

    return (
        <Card className="shadow-lg border-2 border-primary/20 bg-card/50">
            <form ref={formRef} action={formAction} className="space-y-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Partnership Application</CardTitle>
                    <CardDescription>Tell us about your business. We'll get back to you soon.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="businessName">Business Name</Label>
                            <Input
                                id="businessName"
                                placeholder="e.g., Acme Jewelers"
                                {...form.register('businessName')}
                                className="mt-1"
                            />
                            {form.formState.errors.businessName && <p className="text-sm text-destructive mt-1">{form.formState.errors.businessName.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="contactName">Contact Name</Label>
                            <Input
                                id="contactName"
                                placeholder="e.g., John Doe"
                                {...form.register('contactName')}
                                className="mt-1"
                            />
                            {form.formState.errors.contactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.contactName.message}</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="e.g., john.doe@example.com"
                                {...form.register('email')}
                                className="mt-1"
                            />
                            {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="e.g., 9876543210"
                                {...form.register('phone')}
                                className="mt-1"
                            />
                            {form.formState.errors.phone && <p className="text-sm text-destructive mt-1">{form.formState.errors.phone.message}</p>}
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us more about your business, why you want to partner with us, etc."
                            {...form.register('message')}
                            className="mt-1"
                            rows={4}
                        />
                        {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                     <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
}
