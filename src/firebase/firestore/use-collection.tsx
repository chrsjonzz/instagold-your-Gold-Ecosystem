'use client';
import {
  onSnapshot,
  query,
  collection,
  where,
  type Firestore,
  type CollectionReference,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useEffect, useState, useMemo } from 'react';

interface UseCollectionOptions<T> {
  where?: [string, '==', any];
}

export function useCollection<T>(ref: CollectionReference<T> | Query<T> | null) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
