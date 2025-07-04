// alumbra-backend/utils/logger.js
// Utility for logging activities and errors.
// Could be a simple wrapper around console or integrate with a logging library like Winston or Pino.

const getTimestamp = () => new Date().toISOString();

const logger = {
  info: (message, ...args) => {
    console.info(`[${getTimestamp()}] [INFO] ${message}`, ...args);
    // In a real app, you might send this to a logging service or file.
  },
  warn: (message, ...args) => {
    console.warn(`[${getTimestamp()}] [WARN] ${message}`, ...args);
  },
  error: (message, error, ...args) => {
    console.error(`[${getTimestamp()}] [ERROR] ${message}`, error, ...args);
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  },
  debug: (message, ...args) => {
    // Only log debug messages if a specific environment variable is set, for example
    if (process.env.LOG_LEVEL === 'debug') {
      console.debug(`[${getTimestamp()}] [DEBUG] ${message}`, ...args);
    }
  },
};

// Example: Middleware for request logging (if using Express)
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      `${req.method} ${req.originalUrl} - ${res.statusCode} [${duration}ms] - ${req.headers['user-agent'] || ''}`
    );
  });
  next();
};

module.exports = {
  logger,
  requestLogger, // Export middleware if defined here
};
