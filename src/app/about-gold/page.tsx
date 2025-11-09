import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContentCard = ({ title, children, imageId, imageHint, imageDescription, reverse = false }: { title: string, children: React.ReactNode, imageId: string, imageHint: string, imageDescription: string, reverse?: boolean }) => {
  const image = PlaceHolderImages.find(p => p.id === imageId);
  return (
    <Card className="overflow-hidden shadow-lg border-primary/20 bg-card/50">
      <div className={`md:flex ${reverse ? 'flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-primary">{title}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none text-muted-foreground">
            {children}
          </CardContent>
        </div>
        <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
          {image && (
            <Image
              src={image.imageUrl}
              alt={imageDescription}
              data-ai-hint={imageHint}
              fill
              className="object-cover"
            />
          )}
        </div>
      </div>
    </Card>
  );
};


export default function AboutGoldPage() {
  return (
    <div className="bg-gradient-to-b from-background via-amber-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-amber-600 to-primary text-transparent bg-clip-text">
              The Story of Gold
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Discover the rich history and cultural significance of this precious metal.
            </p>
          </div>

          <ContentCard
            title="History of Gold"
            imageId="history-of-gold"
            imageHint="molten gold"
            imageDescription="Molten gold being poured"
          >
            <p>
              Gold’s history is intertwined with cultures for thousands of years. It has been a symbol of wealth, power, and beauty since ancient civilizations like the Egyptians, who used it extensively in jewelry and burial artifacts. Unlike paper currency, another precious metal that has seen its value fluctuate over time, gold has provided a tangible store of wealth for centuries. Its rarity, durability, and unique physical properties make it a reliable asset.
            </p>
            <p>
              The allure of gold has driven exploration, conquests, and technological advancements. Throughout history, gold has played a pivotal role in global economics, serving as a standard for currency and a safe-haven asset during times of political and economic uncertainty. Its timeless appeal continues to make it a cornerstone of investment portfolios and a cherished possession.
            </p>
          </ContentCard>

           <ContentCard
            title="Evolution in Weight of Gold since Tola"
            imageId="gold-tola-evolution"
            imageHint="gold coins"
            imageDescription="Gold coins with Indian flag"
            reverse={true}
          >
            <p>
              Historically, the weight of gold in many parts of the world, particularly South Asia, was measured in 'tolas'. The tola was an ancient unit of mass, traditionally equivalent to the weight of 100 ratti seeds. While the metric system (grams) is now the global standard, the tola remains culturally significant, especially in the jewelry trade. One tola is now standardized as approximately 11.66 grams.
            </p>
             <p>
              This evolution from traditional to metric units reflects the globalization of the gold market. Whether you're dealing with heirlooms measured in tolas or modern investments in grams, understanding these conversions is key to accurately assessing the value of your assets in today's interconnected world.
            </p>
          </ContentCard>

        </div>
      </div>
    </div>
  );
}
