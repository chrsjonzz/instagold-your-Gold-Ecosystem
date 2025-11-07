import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is InstaGold?",
    answer: "InstaGold is a comprehensive digital platform that unifies India's gold ecosystem. We provide services to help you buy, sell, pledge, compare, and track gold seamlessly and with confidence."
  },
  {
    question: "How does the AI gold valuation work?",
    answer: "Our AI-powered valuation tool uses the information you provide—such as weight and purity (karat)—to estimate the current market value of your gold item. It references real-time market data to give you an accurate and instant estimate."
  },
  {
    question: "Is the AI valuation accurate?",
    answer: "The AI valuation provides a highly accurate estimate based on the data you provide and current market prices. However, the final price is subject to a physical inspection and verification by our certified partners."
  },
  {
    question: "What is the difference between 24K, 22K, and 18K gold?",
    answer: "Gold purity is measured in karats. 24K gold is 99.9% pure gold and is very soft. 22K gold (91.6% pure) and 18K gold (75% pure) are mixed with other metals like copper, silver, or zinc to increase their durability, making them more suitable for jewelry."
  },
  {
    question: "How do I sell my gold through InstaGold?",
    answer: "Simply navigate to our 'Sell Gold' page, enter your gold's details into the valuation form to get an instant estimate. If you're happy with the price, you can proceed to connect with our network of verified buyers to complete the transaction securely."
  },
   {
    question: "What is a 'pledge takeover'?",
    answer: "A pledge takeover is when a new lender pays off your existing gold loan with another lender and takes possession of your pledged gold. Our platform helps you compare interest rates from different lenders to find a better deal, potentially lowering your interest payments."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have questions? We’re here to help. Find answers to common queries below.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-headline text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
