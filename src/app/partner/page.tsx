import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import PartnerForm from '@/components/PartnerForm';
import { CheckCircle } from 'lucide-react';

const benefits = [
    {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Expand Your Reach",
        description: "Tap into a vast, digitally-savvy customer base actively looking to sell gold."
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Streamline Operations",
        description: "Utilize our platform for efficient customer management and transparent transaction processing."
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Build Trust",
        description: "Align your brand with InstaGold's commitment to transparency, accuracy, and security."
    },
    {
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        title: "Increase Revenue",
        description: "Benefit from a steady stream of qualified leads and increase your gold procurement volume."
    }
]

export default function PartnerPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'partner-background');
    const benefitsImage = PlaceHolderImages.find(p => p.id === 'partner-benefits');

  return (
    <div className="bg-gradient-to-b from-background via-amber-50 to-background min-h-full">
      
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 md:pt-48 md:pb-28">
         {heroImage && (
            <div className="absolute inset-0 opacity-15">
                <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
                priority
                />
            </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="container mx-auto px-4 text-center relative">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-primary via-amber-600 to-primary text-transparent bg-clip-text">
            Partner With InstaGold
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-xl text-muted-foreground">
            Join our trusted network of jewelers and refiners to help unify India's gold ecosystem and grow your business.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Why Partner With Us?</h2>
                    {benefits.map(benefit => (
                        <div key={benefit.title} className="flex gap-4">
                            <div>
                                {benefit.icon}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold mb-1">{benefit.title}</h3>
                                <p className="text-muted-foreground text-sm md:text-base">{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="relative h-80 md:h-full rounded-lg overflow-hidden shadow-xl border-4 border-primary/20">
                     {benefitsImage && (
                        <Image
                        src={benefitsImage.imageUrl}
                        alt={benefitsImage.description}
                        data-ai-hint={benefitsImage.imageHint}
                        fill
                        className="object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
      </section>


      {/* Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Become a Partner Today</h2>
              <p className="mt-2 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">Fill out the form below to start your journey with InstaGold.</p>
            </div>
            <PartnerForm />
          </div>
        </div>
      </section>

    </div>
  );
}
