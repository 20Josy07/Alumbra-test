// alumbra-backend/app.js
// Main application setup for the Express backend.

const express = require('express');
const cors = require('cors'); // For handling Cross-Origin Resource Sharing
// const helmet = require('helmet'); // For security headers
const morgan = require('morgan'); // HTTP request logger

const envConfig = require('./config/env.config');
const { logger, requestLogger } = require('./utils/logger');
const errorMiddleware = require('./middleware/error.middleware');

// Import route handlers
const authRoutes = require('./routes/auth.routes');
const questionnaireRoutes = require('./routes/questionnaire.routes');
const analysisRoutes = require('./routes/analysis.routes');
const alertRoutes = require('./routes/alert.routes');
const webhookRoutes = require('./routes/webhook.routes');
const patientRoutes = require('./routes/patient.routes'); // Import patient routes
const adminRoutes = require('./routes/admin.routes'); // Import admin routes

const app = express();

// --- Middlewares ---

// Security headers (Helmet is recommended)
// app.use(helmet());

// Enable CORS - configure origins as needed for security
app.use(cors(/* { origin: 'your_frontend_url' } */));

// Body parsing
app.use(express.json({ limit: '1mb' })); // Adjust limit as needed for conversation text
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
if (envConfig.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Concise output colored by response status for development use
} else {
  app.use(requestLogger); // Custom logger for production
}

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Alumbra Backend API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/patients', patientRoutes); // Use patient routes
app.use('/api/admin', adminRoutes); // Use admin routes

// --- Error Handling ---

// Handle 404 for routes not found
app.use((req, res, next) => {
  const error = new Error('Not Found - The requested resource does not exist.');
  error.statusCode = 404;
  next(error);
});

// Global error handler (must be last middleware)
app.use(errorMiddleware);

module.exports = app;
