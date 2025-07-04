// alumbra-backend/routes/analysis.routes.js
// Defines routes for submitting conversations for analysis.

const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis.controller');
// const authMiddleware = require('../middleware/auth.middleware'); // If analysis requires auth
// const validateInput = require('../middleware/validate.input');

// Example schema for analysis input (conceptual)
// const analysisInputSchema = { validate: (data) => { /* ... */ return { value: data }; } };

// Route to submit conversation text for analysis
// Optionally, protect with authMiddleware if analyses are user-specific and tracked
// router.post('/', [authMiddleware], validateInput(analysisInputSchema), analysisController.analyzeConversation);
router.post('/', analysisController.analyzeConversation);

// Add other analysis-related routes if needed (e.g., get past analyses for a user)

module.exports = router;
