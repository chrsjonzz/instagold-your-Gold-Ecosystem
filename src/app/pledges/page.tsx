'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PiggyBank, HandCoins, CalendarDays, ReceiptText } from 'lucide-react';

const mockPledges = [
  {
    id: 'PN789012',
    lender: 'ABC Finance',
    amount: 50000,
    emi: 5200,
    totalPayable: 62400,
    dueDate: '2024-08-15',
    status: 'Active',
  },
  {
    id: 'PN567890',
    lender: 'XYZ Bank',
    amount: 120000,
    emi: 11500,
    totalPayable: 138000,
    dueDate: '2024-08-20',
    status: 'Active',
  },
  {
    id: 'PN123456',
    lender: 'GoldTrust Lenders',
    amount: 75000,
    emi: 0,
    totalPayable: 82000,
    dueDate: '2024-07-25',
    status: 'Due',
  },
    {
    id: 'PN345678',
    lender: 'Quick Gold',
    amount: 30000,
    emi: 3000,
    totalPayable: 36000,
    dueDate: '2024-09-01',
    status: 'Closed',
  },
];

const PledgeCard = ({ pledge }: { pledge: typeof mockPledges[0] }) => {
  const statusVariant = pledge.status === 'Active' ? 'default' : pledge.status === 'Due' ? 'destructive' : 'secondary';
  return (
    <Card className="shadow-lg border-primary/20 hover:shadow-primary/30 transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline text-2xl text-primary">Pledge #{pledge.id}</CardTitle>
                <CardDescription>with {pledge.lender}</CardDescription>
            </div>
            <Badge variant={statusVariant} className="whitespace-nowrap">{pledge.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-6 gap-y-4">
        <div className="flex items-center gap-3">
          <PiggyBank className="h-6 w-6 text-primary/80" />
          <div>
            <p className="text-sm text-muted-foreground">Pledged Amount</p>
            <p className="font-bold text-lg">₹{pledge.amount.toLocaleString()}</p>
          </div>
        </div>
         <div className="flex items-center gap-3">
          <HandCoins className="h-6 w-6 text-primary/80" />
          <div>
            <p className="text-sm text-muted-foreground">Total to Pay</p>
            <p className="font-bold text-lg">₹{pledge.totalPayable.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ReceiptText className="h-6 w-6 text-primary/80" />
          <div>
            <p className="text-sm text-muted-foreground">EMI</p>
            <p className="font-bold text-lg">{pledge.emi > 0 ? `₹${pledge.emi.toLocaleString()}` : 'N/A'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="h-6 w-6 text-primary/80" />
          <div>
            <p className="text-sm text-muted-foreground">Next Due Date</p>
            <p className="font-bold text-lg">{new Date(pledge.dueDate).toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={pledge.status !== 'Active' && pledge.status !== 'Due'} className="w-full">
            Pay Now
        </Button>
      </CardFooter>
    </Card>
  );
};


function PledgesPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-full">
    <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-yellow-800 via-amber-600 to-yellow-800 text-transparent bg-clip-text">
            My Pledges
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Here's a summary of your active and past gold pledges. Manage your payments and track your assets all in one place.
            </p>
        </div>

        <div className="space-y-8">
            {mockPledges.map(pledge => (
            <PledgeCard key={pledge.id} pledge={pledge} />
            ))}
        </div>

        </div>
    </div>
    </div>
  );
}

export default PledgesPage;
