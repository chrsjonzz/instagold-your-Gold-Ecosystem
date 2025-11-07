'use client';

import { ReactNode } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const value = initializeFirebase();
  return <FirebaseProvider value={value}>{children}</FirebaseProvider>;
}
