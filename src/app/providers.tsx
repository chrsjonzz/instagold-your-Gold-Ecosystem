'use client';

import { FirebaseClientProvider } from "@/firebase/client-provider";
import CursorPhoenix from "@/components/CursorPhoenix";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <FirebaseClientProvider>
            <CursorPhoenix />
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </div>
        </FirebaseClientProvider>
    );
}
