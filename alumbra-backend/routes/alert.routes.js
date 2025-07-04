// alumbra-backend/routes/alert.routes.js
// Defines routes for managing alerts. These routes are primarily for internal/auditing purposes
// and should not expose sensitive data like emergency contact details.

const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');
// const authMiddleware = require('../middleware/auth.middleware'); // If needed for admin access

// This route might be called internally by the system after an analysis meets certain criteria.
// Or, if it's manually triggered by an admin, it would need appropriate authentication.
router.post('/trigger', /* [authMiddleware], */ alertController.triggerAlert);

// Route to get the status of a specific alert (e.g., for auditing or internal tracking)
// This should be protected if it's not for public consumption.
router.get('/:alertId/status', /* [authMiddleware], */ alertController.getAlertStatus);

// Note: Routes here should not handle or expose emergency contact information.
// The alert.service should handle the logic of preparing data for the email.service,
// which then uses the configured webhook to send the email without this backend storing the contact.

module.exports = router;
