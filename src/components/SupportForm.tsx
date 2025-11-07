'use client';

import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { submitSupportRequest } from '@/app/actions';
import { SupportFormSchema, type SupportFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const initialFormState: SupportFormState = {
    message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full" size="lg">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                </>
            )}
        </Button>
    );
}

export default function SupportForm() {
    const [formState, formAction] = useActionState(submitSupportRequest, initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof SupportFormSchema>>({
        resolver: zodResolver(SupportFormSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    useEffect(() => {
        if (formState.message) {
             if (formState.success) {
                toast({
                    title: 'Message Sent!',
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
        <Card className="shadow-lg border-2 border-primary/20">
            <form ref={formRef} action={formAction} className="space-y-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Contact Us</CardTitle>
                    <CardDescription>Please provide your details below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., John Doe"
                            {...form.register('name')}
                            className="mt-1"
                        />
                        {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
                    </div>
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
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Please describe your issue or question here..."
                            {...form.register('message')}
                            className="mt-1"
                            rows={5}
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
