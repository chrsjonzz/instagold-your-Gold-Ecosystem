'use client';
import { onSnapshot, type DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useDoc<T>(ref: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.data() as T;
      setData({
        ...data,
        id: snapshot.id,
      });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
