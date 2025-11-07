import type { FirebaseOptions } from 'firebase/app';

const firebaseConfigString = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

let parsedConfig: FirebaseOptions = {};

try {
  if (firebaseConfigString) {
    // Replace single quotes with double quotes for valid JSON
    const validJsonString = firebaseConfigString.replace(/'/g, '"');
    parsedConfig = JSON.parse(validJsonString);
  } else {
    console.warn("NEXT_PUBLIC_FIREBASE_CONFIG is not set. Using empty config.");
  }
} catch (error) {
  console.error("Failed to parse NEXT_PUBLIC_FIREBASE_CONFIG:", error);
  // Fallback to an empty object in case of parsing error
  parsedConfig = {};
}

export const firebaseConfig: FirebaseOptions = parsedConfig;
