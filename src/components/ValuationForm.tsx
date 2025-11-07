'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import Image from 'next/image';

import { getGoldValuation } from '@/app/actions';
import { ValuationFormSchema, type ValuationFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Sparkles, Loader2, X, Gem } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const initialFormState: ValuationFormState = {
    message: '',
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full" size="lg">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Estimating...
                </>
            ) : (
                <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Valuation
                </>
            )}
        </Button>
    );
}

export default function ValuationForm() {
    const [formState, formAction] = useFormState(getGoldValuation, initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [karatValue, setKaratValue] = useState(22);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const placeholderImage = PlaceHolderImages.find(p => p.id === 'valuation-placeholder');

    const form = useForm<z.infer<typeof ValuationFormSchema>>({
        resolver: zodResolver(ValuationFormSchema),
        defaultValues: {
            weight: 0,
            karat: 22,
            photo: undefined,
        },
    });

    useEffect(() => {
        if (formState.message && !formState.estimatedValue) {
            toast({
                variant: 'destructive',
                title: 'Valuation Error',
                description: formState.error || formState.message,
            });
        }
         if (formState.message && formState.estimatedValue) {
            toast({
                title: 'Valuation Complete!',
                description: `We've estimated the value of your gold item.`,
            });
            form.reset();
            setImagePreview(null);
            if (formRef.current) formRef.current.reset();
        }

    }, [formState, toast, form]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleClearImage = () => {
        setImagePreview(null);
        form.setValue('photo', undefined);
        const fileInput = document.getElementById('photo-input') as HTMLInputElement;
        if(fileInput) fileInput.value = '';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg border-2 border-primary/20">
                <form ref={formRef} action={formAction} className="space-y-6">
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
                            <input type="hidden" {...form.register('karat')} value={karatValue} />
                        </div>
                        
                        {/* Photo Upload */}
                        <div>
                            <Label htmlFor="photo-input">Upload Photo</Label>
                            <div className="mt-1 relative flex justify-center items-center w-full h-48 border-2 border-dashed border-border rounded-lg group hover:border-primary transition-colors">
                                {imagePreview ? (
                                    <>
                                        <Image src={imagePreview} alt="Gold item preview" fill className="object-contain rounded-lg p-2" />
                                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 z-10 h-8 w-8" onClick={handleClearImage}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <div className="text-center p-4">
                                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, JPEG up to 5MB</p>
                                    </div>
                                )}
                                <Input
                                    id="photo-input"
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    {...form.register('photo', { onChange: handleFileChange })}
                                />
                            </div>
                            {form.formState.errors.photo && <p className="text-sm text-destructive mt-1">{form.formState.errors.photo.message?.toString()}</p>}
                        </div>
                    </CardContent>
                    <CardFooter>
                         <SubmitButton />
                    </CardFooter>
                </form>
            </Card>

            <Card className="sticky top-24 shadow-lg bg-gradient-to-br from-yellow-600 to-amber-500 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <Sparkles /> Estimated Value
                    </CardTitle>
                    <CardDescription className="text-yellow-100">
                        Your AI-powered gold valuation will appear here.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    {formState.estimatedValue ? (
                        <div>
                            <p className="text-sm text-yellow-200">Estimated Market Value</p>
                            <p className="text-5xl font-bold font-headline tracking-tight my-2">
                                ₹{formState.estimatedValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-yellow-300 mt-4">*This is an estimate. Final value subject to physical verification by our partners.</p>
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-48">
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
                <CardFooter className="flex-col gap-2">
                    <Button disabled={!formState.estimatedValue} className="w-full bg-white text-primary hover:bg-yellow-50">Proceed to Sell</Button>
                    <Button variant="link" className="text-white" onClick={() => form.reset()}>Start New Valuation</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
