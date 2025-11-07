'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { submitReview } from '@/app/actions';
import { ReviewFormSchema, type ReviewFormState } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const initialFormState: ReviewFormState = {
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
                    Submit Review
                </>
            )}
        </Button>
    );
}

export default function ReviewForm() {
    const [formState, formAction] = useFormState(submitReview, initialFormState);
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const form = useForm<z.infer<typeof ReviewFormSchema>>({
        resolver: zodResolver(ReviewFormSchema),
        defaultValues: {
            name: '',
            rating: 0,
            comment: '',
        },
    });

    useEffect(() => {
        if (formState.message) {
            if (formState.success) {
                toast({
                    title: 'Review Submitted!',
                    description: formState.message,
                });
                form.reset();
                setRating(0);
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
                    <CardTitle className="font-headline text-2xl">Leave a Review</CardTitle>
                    <CardDescription>Your feedback helps us improve.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g., John D."
                            {...form.register('name')}
                            className="mt-1"
                        />
                        {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
                    </div>

                    <div>
                         <Label>Rating</Label>
                        <div className="flex items-center gap-1 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={cn(
                                        "h-8 w-8 cursor-pointer transition-colors",
                                        (hoverRating >= star || rating >= star) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    )}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => {
                                        setRating(star);
                                        form.setValue('rating', star);
                                    }}
                                />
                            ))}
                        </div>
                         <input type="hidden" {...form.register('rating')} value={rating} />
                         {form.formState.errors.rating && <p className="text-sm text-destructive mt-1">{form.formState.errors.rating.message}</p>}
                    </div>

                    <div>
                        <Label htmlFor="comment">Comment</Label>
                        <Textarea
                            id="comment"
                            placeholder="Tell us about your experience..."
                            {...form.register('comment')}
                            className="mt-1"
                            rows={4}
                        />
                        {form.formState.errors.comment && <p className="text-sm text-destructive mt-1">{form.formState.errors.comment.message}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>
        </Card>
    );
}
