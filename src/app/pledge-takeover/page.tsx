'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PledgeTakeoverForm from '@/components/PledgeTakeoverForm';
import { Banknote, ShieldCheck, Zap } from 'lucide-react';

const benefits = [
    {
        icon: <Banknote className="w-8 h-8 text-primary" />,
        title: "Unlock Better Prices",
        description: "Your local pawnshop may not offer the best rate. We connect you to a network that offers competitive market prices."
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Seamless & Fast",
        description: "We handle the logistics of retrieving your gold and facilitating the sale, making the process hassle-free for you."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-primary" />,
        title: "Transparent & Secure",
        description: "Our process is fully transparent, with no hidden fees. Your assets are handled securely by verified partners."
    }
]

function PledgeTakeoverPage() {
  return (
     
        <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
        <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
                Gold Pledge Takeover
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                Release your pledged gold from local pawnshops and sell it at the best market price with InstaGold.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Left Column: Benefits */}
                <div className="space-y-12">
                    {benefits.map((feature) => (
                        <div key={feature.title} className="flex gap-6 items-start">
                            <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-headline text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>


                {/* Right Column: Form */}
                 <Card className="shadow-lg border-2 border-primary/20 sticky top-24">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Start Your Pledge Takeover</CardTitle>
                        <CardDescription>Provide the details below, and our team will get in touch to guide you through the next steps.</CardDescription>
                    </CardHeader>
                    <PledgeTakeoverForm />
                </Card>
            </div>
            </div>
        </div>
        </div>
  );
}


export default PledgeTakeoverPage;
