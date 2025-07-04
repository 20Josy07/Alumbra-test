// alumbra-backend/routes/webhook.routes.js
// Defines routes for receiving and processing incoming webhooks from external services (e.g., email service).

const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');
// const sanitizeInput = require('../middleware/sanitize.input'); // Potentially sanitize webhook payload

// Route for handling webhooks from the email service (e.g., status updates: sent, delivered, bounced)
// The path '/email-service' is an example; it should match the URL configured in the email service provider.
router.post('/email-service', /* [sanitizeInput], */ webhookController.handleEmailServiceWebhook);

// Add routes for other webhook providers if needed

module.exports = router;
