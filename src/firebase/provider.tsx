'use client';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  app: FirebaseApp;
  firestore: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

export function FirebaseProvider({
  children,
  ...value
}: {
  children: ReactNode;
  app: FirebaseApp;
  firestore: Firestore;
}) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseApp() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
      throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }
  return context.app;
}

export function useAuth() {
  return null;
}

export function useFirestore() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
      throw new Error('useFirestore must be used within a FirebaseProvider');
  }
  return context.firestore;
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useMemoFirebase<T>(
  factory: () => T,
  deps: React.DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
