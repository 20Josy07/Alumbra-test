// alumbra-backend/config/env.config.js
// Centralized environment variable management

// Load .env file
require('dotenv').config();

const envConfig = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  webhookUrl: process.env.WEBHOOK_URL,
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey', // Add JWT secret
  // Add other environment variables as needed
  firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT_KEY, // Path to or content of Firebase service account key
};

module.exports = envConfig;
