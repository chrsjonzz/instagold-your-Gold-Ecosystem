import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: "The Role of Gold in a Modern Investment Portfolio",
    slug: "/blog/gold-investment-portfolio",
    imageId: "blog-investment",
    imageHint: "gold coins chart",
    imageDescription: "Gold coins stacked in front of a financial chart.",
    excerpt: "In an era of volatile markets and digital currencies, gold remains a bedrock of stable investment. Discover why this ancient asset is more relevant than ever for diversifying your portfolio and hedging against economic uncertainty."
  },
  {
    title: "Beyond Jewelry: The Surprising Industrial Uses of Gold",
    slug: "/blog/industrial-gold-uses",
    imageId: "blog-industrial",
    imageHint: "gold electronics",
    imageDescription: "A close-up of gold components inside a computer circuit board.",
    excerpt: "Gold is not just for adornment. Its unique properties of conductivity and corrosion resistance make it an irreplaceable component in electronics, aerospace, medicine, and more. Explore the hidden world of industrial gold."
  },
  {
    title: "How to Spot Fake Gold: A Guide for Buyers and Sellers",
    slug: "/blog/spotting-fake-gold",
    imageId: "blog-fake-gold",
    imageHint: "magnifying glass gold",
    imageDescription: "A jeweler inspecting a gold ring with a magnifying glass.",
    excerpt: "The market is rife with counterfeits. Arm yourself with knowledge. This guide covers the essential tests—from simple home methods to professional analysis—to ensure your gold is genuine."
  },
  {
    title: "Gold vs. Real Estate: Which is the Better Investment in India?",
    slug: "/blog/gold-vs-real-estate",
    imageId: "blog-gold-estate",
    imageHint: "gold house",
    imageDescription: "A conceptual image showing a house and gold bars on a weighing scale.",
    excerpt: "For generations, Indians have trusted two assets above all: gold and property. We break down the pros and cons of each, considering liquidity, appreciation potential, and cultural significance in today's economic landscape."
  }
];

export default function BlogPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              InstaGold Insights
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Your source for news, tips, and stories from the world of gold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {blogPosts.map((post) => {
              const image = PlaceHolderImages.find(p => p.id === post.imageId);
              return (
                <Card key={post.slug} className="overflow-hidden shadow-lg border-primary/20 flex flex-col group">
                  {image && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={post.imageDescription}
                        data-ai-hint={post.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary leading-tight">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="link" className="p-0 h-auto font-bold">
                       <Link href="#">Read More <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
