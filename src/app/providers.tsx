'use client';

import { FirebaseClientProvider } from '@/firebase/client-provider';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
      <FirebaseClientProvider>
        {children}
      </FirebaseClientProvider>
  );
}
