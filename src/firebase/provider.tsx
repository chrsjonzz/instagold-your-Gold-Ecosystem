'use client';
import {
  createContext,
  useContext,
  type ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
});

export function FirebaseProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: FirebaseContextValue;
}) {
  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebaseApp() {
  const { app } = useContext(FirebaseContext);
  if (!app) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }
  return app;
}

export function useAuth() {
  const { auth } = useContext(FirebaseContext);
  if (!auth) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return auth;
}

export function useFirestore() {
  const { firestore } = useContext(FirebaseContext);
  if (!firestore) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }
  return firestore;
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context.app || !context.auth || !context.firestore) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context as Required<FirebaseContextValue>;
}

export function useMemoFirebase<T>(
  factory: () => T,
  deps: React.DependencyList
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps);
}
