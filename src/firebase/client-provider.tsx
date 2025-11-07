'use client';

import { ReactNode, useMemo } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const instances = useMemo(() => initializeFirebase(), []);
  
  if (!instances.app || !instances.auth || !instances.firestore) {
    // This can happen in server-side rendering, return children directly.
    return <>{children}</>;
  }

  return (
    <FirebaseProvider value={{ app: instances.app, auth: instances.auth, firestore: instances.firestore }}>
      {children}
    </FirebaseProvider>
  );
}
