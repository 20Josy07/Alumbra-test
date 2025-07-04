
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ====================================================================================
// CRITICAL FIREBASE CONFIGURATION FOR AUTHENTICATION:
// ====================================================================================
//
// IF YOU ARE SEEING 'Firebase: Error (auth/unauthorized-domain)',
// THIS IS A FIREBASE CONSOLE CONFIGURATION ISSUE, NOT A CODE BUG I CAN FIX HERE.
//
// YOU MUST ADD YOUR APPLICATION'S DOMAIN TO THE "Authorized domains" LIST
// IN YOUR FIREBASE PROJECT SETTINGS.
//
// STEPS TO FIX 'auth/unauthorized-domain':
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Select your project (e.g., "AlumbraIA" or "alumbra-ai").
// 3. In the left sidebar, go to "Authentication" (under the "Build" section).
// 4. Click on the "Settings" tab.
// 5. Find the "Authorized domains" section.
// 6. Click "Add domain".
// 7. Add the domain your app is running on:
//    - For LOCAL DEVELOPMENT: Add `localhost`
//    - For DEPLOYED APPS (e.g., Netlify): Add your live domain
//      (e.g., `your-app-name.netlify.app` or `yourcustomdomain.com`)
//
// Ensure the firebaseConfig values below *exactly* match your Firebase project's
// web app configuration. You can find these in:
// Firebase Console -> Project Settings (gear icon) -> General tab -> Your apps -> Web app config.
//
// Double-check ALL values below against your Firebase console.
// ====================================================================================
const firebaseConfig = {
  apiKey:"AIzaSyAlbb11yr0wlJ2vZ-ChLjObEwgZUyh0Be0", 
  authDomain : "alumbra-ai.firebaseapp.com" , 
  projectId : "alumbra-ai" , 
  storageBucket:"alumbra-ai.firebasestorage.app", 
  messagingSenderId:"716058988639", 
  appId:"1:716058988639:web:82df1583bc7c9ebe620bea" 
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };
