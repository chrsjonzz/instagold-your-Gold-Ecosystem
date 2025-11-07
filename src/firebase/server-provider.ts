import { initializeApp, getApps, getApp, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from './config';

// IMPORTANT: DO NOT MODIFY THIS FILE
function getFirebaseAdminApp(): App {
  if (getApps().length > 0) {
    return getApp();
  }

  // Otherwise, initialize a new app
  return initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

export function getFirebase() {
  const app = getFirebaseAdminApp();
  return {
    firestore: getFirestore(app),
    auth: getAuth(app),
  };
}
