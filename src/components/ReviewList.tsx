'use client';
import { useMemo } from 'react';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type Review = {
    id: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
};

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
        ))}
    </div>
);

export default function ReviewList() {
    const firestore = useFirestore();

    const reviewsQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'reviews'), orderBy('createdAt', 'desc'));
    }, [firestore]);
    
    const { data: reviews, isLoading, error } = useCollection<Review>(reviewsQuery);

    if (isLoading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-destructive">Error loading reviews: {error.message}</p>;
    }

    if (!reviews || reviews.length === 0) {
        return <p>No reviews yet. Be the first to leave one!</p>;
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <Card key={review.id} className="shadow-md border-primary/10">
                    <CardHeader className="flex flex-row justify-between items-center pb-2">
                        <CardTitle className="text-lg font-semibold">{review.name}</CardTitle>
                        <StarRating rating={review.rating} />
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground pt-4">
                       {review.createdAt && (
                         <p>{formatDistanceToNow(new Date(review.createdAt.seconds * 1000))} ago</p>
                       )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
