import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Logo } from "@/components/Logo";

const rates = [
  { purity: "24K (99.9%)", rate: "7,150.50" },
  { purity: "22K (91.6%)", rate: "6,560.10" },
  { purity: "18K (75.0%)", rate: "5,362.88" },
  { purity: "14K (58.5%)", rate: "4,182.04" },
];

export default function RateCardPage() {
  return (
    <div className="bg-gradient-to-b from-background via-yellow-50 to-background min-h-screen py-12 print:bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-2xl print:shadow-none">
          <header className="text-center mb-8 border-b-2 border-primary pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Logo />
            </div>
            <h1 className="font-headline text-4xl font-bold text-gray-800">Gold Rate Card</h1>
            <p className="text-gray-500 mt-2">
              As of {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <main>
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-primary font-headline">Live Gold Sell Prices</CardTitle>
                <CardDescription>All rates are per gram (gm) in Indian Rupees (INR).</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-lg">Purity (Karat)</TableHead>
                      <TableHead className="text-right font-bold text-lg">Rate (per gram)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rates.map((item) => (
                      <TableRow key={item.purity} className="text-base">
                        <TableCell className="font-medium">{item.purity}</TableCell>
                        <TableCell className="text-right font-mono">INR {item.rate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>

          <footer className="mt-8 text-center text-xs text-gray-500">
            <p>
              <strong>Disclaimer:</strong> These are live market rates for selling gold online. The final price offered by our buyback partners is subject to physical verification of the gold's weight and purity. Rates are subject to change based on market fluctuations.
            </p>
            <p className="mt-2">
              <strong>InstaGold</strong> | +91 96204 33303 | www.instagold.com
            </p>
          </footer>
        </div>
        <div className="text-center mt-8 print:hidden">
            <p className="text-muted-foreground">Use your browser's print function (Ctrl+P or Cmd+P) to save this as a PDF.</p>
        </div>
      </div>
    </div>
  );
}
