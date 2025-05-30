import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

const app = getApps().length === 0 ? admin.initializeApp(firebaseAdminConfig) : getApps()[0];
const auth = admin.auth(app);

export { app, auth }; 