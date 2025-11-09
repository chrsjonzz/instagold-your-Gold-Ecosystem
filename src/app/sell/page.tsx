import ValuationForm from "@/components/ValuationForm";
import { ShieldCheck, GitCompareArrows, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SellPage() {
    const features = [
        {
            icon: <GitCompareArrows className="w-8 h-8 text-primary" />,
            title: "Compare Top Offers",
            description: "Get the best buy prices from multiple jewelers and refiners, updated in real-time."
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: "XRF Karat Analysis",
            description: "We use state-of-the-art XRF machines for precise purity testing, ensuring you get the most accurate value."
        },
        {
            icon: <FileText className="w-8 h-8 text-primary" />,
            title: "Instant Digital Receipt",
            description: "Generate a digital sale receipt and transfer summary immediately after your transaction."
        }
    ]
  return (
    <div className="bg-gradient-to-b from-background via-amber-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-amber-600 to-primary text-transparent bg-clip-text">
              Instant Gold Sell &amp; Online Valuation
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Enter your gold&apos;s details to receive an instant online valuation and compare the best offers on the market.
            </p>
          </div>

          <ValuationForm />

          <div className="mt-16 md:mt-24">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Secure and Advantageous</h2>
                <p className="mt-2 text-muted-foreground max-w-xl mx-auto">Sell your gold with features designed to maximize your returns.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <Card key={feature.title} className="text-center bg-card/50 border-none shadow-md hover:shadow-xl transition-shadow duration-300">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-3">
                                {feature.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
