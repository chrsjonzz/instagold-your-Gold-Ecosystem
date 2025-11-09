import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContentCard = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <Card className="overflow-hidden shadow-lg border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="prose prose-lg max-w-none text-muted-foreground">
        {children}
      </CardContent>
    </Card>
  );
};

export default function AboutUsPage() {
  return (
    <div className="bg-gradient-to-b from-background via-amber-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-amber-600 to-primary text-transparent bg-clip-text">
              About InstaGold
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Unifying India's gold ecosystem with trust, transparency, and technology.
            </p>
          </div>

          <ContentCard
            title="Our Mission"
          >
            <p>
              Our mission is to create a unified digital ecosystem for gold in India. We aim to empower every individual by providing a seamless, transparent, and trusted platform to buy, sell, and manage their gold assets. We believe in leveraging technology to bring efficiency and accessibility to a market that has been fragmented for too long.
            </p>
          </ContentCard>

           <ContentCard
            title="Our Values"
          >
            <p>
              <b>Trust:</b> We are committed to building a platform that our users can rely on. Every transaction is secure and every partner is verified.
            </p>
            <p>
              <b>Transparency:</b> We provide clear, real-time information to help you make informed decisions. No hidden fees, no surprises.
            </p>
            <p>
              <b>Innovation:</b> We continuously innovate to provide the best possible experience for our users, from instant online valuations to seamless digital transactions.
            </p>
          </ContentCard>

        </div>
      </div>
    </div>
  );
}
