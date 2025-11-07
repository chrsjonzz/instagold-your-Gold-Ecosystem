'use client';
import { useEffect, useState, useMemo } from 'react';
import type { User } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // Auth is not initialized yet, so we wait.
      return;
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const value = useMemo(
    () => ({ user, loading, auth }),
    [user, loading, auth]
  );
  return value;
}
