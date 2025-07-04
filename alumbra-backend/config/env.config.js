// alumbra-backend/config/env.config.js
// Centralized environment variable management

// Load .env file
require('dotenv').config();

const envConfig = {
  geminiApiKey: process.env.GEMINI_API_KEY,
  webhookUrl: process.env.WEBHOOK_URL,
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  // Add other environment variables as needed
};

module.exports = envConfig;
