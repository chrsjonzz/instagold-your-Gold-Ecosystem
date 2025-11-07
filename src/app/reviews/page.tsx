import ReviewForm from '@/components/ReviewForm';
import ReviewList from '@/components/ReviewList';

export default function ReviewsPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              Customer Reviews
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              See what our customers have to say about their InstaGold experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="md:col-span-1">
              <ReviewForm />
            </div>
            <div className="md:col-span-1">
                <h2 className="font-headline text-3xl text-primary mb-6">Testimonials</h2>
                <ReviewList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
