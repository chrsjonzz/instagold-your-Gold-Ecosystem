'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';

import { getGoldValuation, proceedToSell } from '@/app/actions';
import { ValuationFormSchema, type ValuationFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2, Gem, ArrowRight, Download, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';


const initialFormState: ValuationFormState = {
    message: '',
};

const initialProceedState = {
    message: '',
};

function ValuationSubmitButton() {
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
                    <Phone className="mr-2 h-4 w-4" />
                    Submit & Get Value
                </>
            )}
        </Button>
    );
}

function ProceedToSellButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-white text-primary hover:bg-yellow-50" disabled={pending} size="lg">
             {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                </>
            ) : (
                <>
                    Proceed to Sell <ArrowRight className="ml-2"/>
                </>
            )}
        </Button>
    );
}

export default function ValuationForm() {
    const [formState, formAction] = useFormState(getGoldValuation, initialFormState);
    const [proceedState, proceedAction] = useFormState(proceedToSell, initialProceedState);

    const valuationFormRef = useRef<HTMLFormElement>(null);
    const phoneFormRef = useRef<HTMLFormElement>(null);
    const proceedFormRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    
    const [karatValue, setKaratValue] = useState(22);
    const [isPhoneDialogOpen, setPhoneDialogOpen] = useState(false);
    
    const placeholderImage = PlaceHolderImages.find(p => p.id === 'valuation-placeholder');

    const form = useForm<z.infer<typeof ValuationFormSchema>>({
        resolver: zodResolver(ValuationFormSchema),
        defaultValues: {
            weight: undefined,
            karat: 22,
            phone: '',
        },
    });
    
    const [currentValuation, setCurrentValuation] = useState<ValuationFormState | null>(null);

    useEffect(() => {
        if (formState.message) {
             if (formState.error) {
                toast({
                    variant: 'destructive',
                    title: 'Valuation Error',
                    description: formState.error,
                });
                setCurrentValuation(null);
            } else if (formState.estimatedValue) {
                toast({
                    title: 'Valuation Complete!',
                    description: `We've estimated the value of your gold item.`,
                });
                setCurrentValuation(formState);
                setPhoneDialogOpen(false); // Close dialog on success
                valuationFormRef.current?.reset();
                form.reset();
            }
        }
    }, [formState, toast, form]);

    useEffect(() => {
        if (proceedState.message) {
            if (proceedState.success) {
                toast({
                    title: 'Request Received!',
                    description: proceedState.message,
                });
                setCurrentValuation(null); // Clear valuation after proceeding
            } else if (proceedState.error) {
                 toast({
                    variant: 'destructive',
                    title: 'An Error Occurred',
                    description: proceedState.error,
                });
            }
        }
    }, [proceedState, toast]);
    
    const handleNewValuation = () => {
        setCurrentValuation(null);
        form.reset();
        if (valuationFormRef.current) valuationFormRef.current.reset();
    };

    const handleGetValuationClick = async () => {
        const isValid = await form.trigger(['weight', 'karat']);
        if (isValid) {
            setPhoneDialogOpen(true);
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg border-2 border-primary/20 bg-card/50">
                <form ref={valuationFormRef} className="space-y-6">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl flex items-center gap-2"><Gem className="text-primary"/> Valuation Details</CardTitle>
                        <CardDescription>All fields are required for an accurate estimation.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Weight */}
                        <div>
                            <Label htmlFor="weight">Weight (in grams)</Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.01"
                                placeholder="e.g., 10.5"
                                {...form.register('weight')}
                                className="mt-1"
                            />
                            {form.formState.errors.weight && <p className="text-sm text-destructive mt-1">{form.formState.errors.weight.message}</p>}
                        </div>

                        {/* Karat */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <Label htmlFor="karat">Purity (Karat)</Label>
                                <span className="font-bold text-primary text-lg">{karatValue}K</span>
                            </div>
                            <Slider
                                id="karat"
                                defaultValue={[22]}
                                min={10}
                                max={24}
                                step={1}
                                onValueChange={(value) => {
                                    setKaratValue(value[0]);
                                    form.setValue('karat', value[0]);
                                }}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                       <Dialog open={isPhoneDialogOpen} onOpenChange={setPhoneDialogOpen}>
                            <Button type="button" onClick={handleGetValuationClick} className="w-full" size="lg">
                                <Sparkles className="mr-2 h-4 w-4" />
                                Get Instant Valuation
                            </Button>
                            <DialogContent className="sm:max-w-[425px]">
                                <form action={formAction} ref={phoneFormRef}>
                                    <DialogHeader>
                                        <DialogTitle>One Last Step</DialogTitle>
                                        <DialogDescription>
                                            Please provide your phone number to receive your gold valuation.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone" className="text-right">
                                                Phone
                                            </Label>
                                            <div className="col-span-3">
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
                                    </div>
                                    <input type="hidden" name="weight" value={form.getValues('weight')} />
                                    <input type="hidden" name="karat" value={form.getValues('karat')} />
                                    <DialogFooter>
                                        <ValuationSubmitButton />
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </form>
            </Card>

            <Card className="sticky top-24 shadow-lg bg-gradient-to-br from-yellow-600 to-amber-500 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2 text-center w-full">
                        <Sparkles /> Estimated Value
                    </CardTitle>
                    <CardDescription className="text-yellow-100 text-center">
                        Your online gold valuation will appear here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center flex flex-col items-center justify-center gap-4">
                    {currentValuation?.estimatedValue ? (
                         <div className="w-full">
                             <div className="p-4 rounded-lg bg-black/10">
                                <p className="text-sm text-yellow-200">Estimated Market Value</p>
                                <p className="text-5xl font-bold font-headline tracking-tight my-2">
                                    INR {currentValuation.estimatedValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                            <p className="text-xs text-yellow-300 mt-4">*This is an estimate. Final value subject to physical verification by our partners.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center min-h-[160px]">
                            {placeholderImage && <Image
                                src={placeholderImage.imageUrl}
                                alt={placeholderImage.description}
                                data-ai-hint={placeholderImage.imageHint}
                                width={150}
                                height={100}
                                className="opacity-20"
                            />}
                            <p className="mt-4 text-yellow-200">Awaiting details...</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col gap-2 px-6 pb-6">
                    {currentValuation?.estimatedValue && (
                        <>
                        <form action={proceedAction} ref={proceedFormRef} className="w-full">
                            <input type="hidden" name="phone" value={currentValuation.phone} />
                            <input type="hidden" name="estimatedValue" value={currentValuation.estimatedValue} />
                            <ProceedToSellButton />
                        </form>
                         <Button variant="link" asChild className="text-white opacity-80 hover:opacity-100">
                                <Link 
                                    href={`/rate-card?weight=${currentValuation.weight}&karat=${currentValuation.karat}&estimatedValue=${currentValuation.estimatedValue}`} 
                                    target="_blank"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Rate Card
                                </Link>
                        </Button>
                        </>
                    )}
                    <Button variant="link" className="text-white" onClick={handleNewValuation}>Start New Valuation</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
