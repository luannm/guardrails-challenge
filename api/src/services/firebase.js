import admin from 'firebase-admin';
import serviceAccount from '../config/guardrails-firebase.json';

// Initialize firebase app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Export firestore DB
export const db = admin.firestore();
