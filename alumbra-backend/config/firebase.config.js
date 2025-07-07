const admin = require('firebase-admin');
const envConfig = require('./env.config');

// Initialize Firebase Admin SDK
if (envConfig.firebaseServiceAccount) {
  try {
    const serviceAccount = JSON.parse(envConfig.firebaseServiceAccount);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
    console.error('Please ensure FIREBASE_SERVICE_ACCOUNT_KEY is a valid JSON string.');
  }
} else {
  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not found in environment variables. Firebase Admin SDK not initialized.');
}

module.exports = admin;