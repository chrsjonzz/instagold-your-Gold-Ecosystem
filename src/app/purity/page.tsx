import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContentCard = ({ title, children, imageId, imageHint, imageDescription, reverse = false }: { title: string, children: React.ReactNode, imageId: string, imageHint: string, imageDescription: string, reverse?: boolean }) => {
  const image = PlaceHolderImages.find(p => p.id === imageId);
  return (
    <Card className="overflow-hidden shadow-lg border-primary/20">
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

export default function GoldPurityPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              Understanding Gold Purity
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Learn what makes gold valuable and how its purity is measured and certified.
            </p>
          </div>

          <ContentCard
            title="Why LBMA is Important"
            imageId="lbma-phone"
            imageHint="finance app"
            imageDescription="Phone showing LBMA information"
          >
            <p>
              The London Bullion Market Association (LBMA) sets the international standard for precious metals. LBMA accreditation is a globally recognized benchmark for quality and purity. When you buy or sell LBMA-certified gold, you are assured of its authenticity and weight, which provides trust and transparency in the market. The LBMA’s Good Delivery List is the de-facto standard for the quality of gold and silver bars worldwide, ensuring they meet stringent criteria for responsible sourcing and production.
            </p>
          </ContentCard>

          <ContentCard
            title="Evaluating Gold Purity"
            imageId="gold-purity-evaluation"
            imageHint="gold inspection"
            imageDescription="A gloved hand holding small gold bars"
            reverse={true}
          >
            <p>
              The purity of gold is measured in karats (K). 24-karat gold is pure gold, but it's often too soft for jewelry. To increase durability, gold is mixed with other metals to form an alloy. For example, 22K gold contains 22 parts gold and 2 parts other metals. Hallmarking is a crucial indicator of purity, providing a certified guarantee of the gold content in an item. When evaluating gold, always look for these official marks.
            </p>
          </ContentCard>

          <ContentCard
            title="What Do Markings on Gold Tell You?"
            imageId="gold-markings"
            imageHint="gold ring"
            imageDescription="A close-up of a gold ring"
          >
            <p>
              Markings, or hallmarks, stamped on gold items provide vital information. The most important marking is the karat, like '22K' or '18K', which tells you the gold purity. In India, the Bureau of Indian Standards (BIS) hallmark is a mark of trust. It includes the BIS logo, the karat and fineness (e.g., 22K916 for 91.6% purity), and a 6-digit alphanumeric Hallmark Unique Identification (HUID) code. These markings ensure that you are buying genuine, accurately described gold.
            </p>
          </ContentCard>

        </div>
      </div>
    </div>
  );
}
