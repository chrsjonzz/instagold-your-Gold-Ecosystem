'use client';

import { ReactNode, useMemo } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const instances = useMemo(() => initializeFirebase(), []);

  // This check is important to avoid rendering components that depend on Firebase on the server.
  if (!instances.app) {
    // You can return a loader here, or null, but returning children might cause issues
    // if they implicitly depend on the Firebase context.
    return <>{children}</>;
  }

  return (
    <FirebaseProvider app={instances.app} auth={instances.auth!} firestore={instances.firestore!}>
      {children}
    </FirebaseProvider>
  );
}
