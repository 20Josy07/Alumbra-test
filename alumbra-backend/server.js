// alumbra-backend/server.js
// Initializes and starts the Express server.

const app = require('./app');
const envConfig = require('./config/env.config');
const { logger } = require('./utils/logger');
// const db = require('./config/db.config'); // If you have a database connection to establish

const PORT = envConfig.port || 3001;

const startServer = async () => {
  try {
    // Connect to database (if applicable)
    // Example: await db.connect();
    // logger.info('Database connected successfully.');

    app.listen(PORT, () => {
      logger.info(`Alumbra Backend server is running on http://localhost:${PORT}`);
      logger.info(`Current environment: ${envConfig.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start the server or connect to the database:', error);
    process.exit(1); // Exit with failure code
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Application specific logging, cleanup, and exit
  process.exit(1);
});

startServer();
