import SupportForm from "@/components/SupportForm";

export default function SupportPage() {
  return (
    <div className="bg-gradient-to-b from-background via-amber-50 to-background min-h-full">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-amber-600 to-primary text-transparent bg-clip-text">
              Support Center
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Have a question or need help? Fill out the form below, and our team will get back to you as soon as possible.
            </p>
          </div>

          <SupportForm />
          
        </div>
      </div>
    </div>
  );
}
