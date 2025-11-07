import type { FirebaseOptions } from 'firebase/app';

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

let parsedConfig: FirebaseOptions = {};

try {
  if (firebaseConfigString) {
    parsedConfig = JSON.parse(firebaseConfigString);
  }
} catch (error) {
  console.error("Failed to parse NEXT_PUBLIC_FIREBASE_CONFIG:", error);
}

export const firebaseConfig: FirebaseOptions = parsedConfig;
