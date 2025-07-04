// alumbra-backend/middleware/error.middleware.js
// Global error handling middleware

const errorMiddleware = (err, req, res, next) => {
  console.error('Global error handler:', err.message || err);
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal server error occurred.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    // Optionally include stack trace in development
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorMiddleware;
