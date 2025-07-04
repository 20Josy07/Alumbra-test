// alumbra-backend/routes/questionnaire.routes.js
// Defines routes for managing questionnaires.

const express = require('express');
const router = express.Router();
const questionnaireController = require('../controllers/questionnaire.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Assuming questionnaires are user-specific
// const validateInput = require('../middleware/validate.input');

// Example schema for questionnaire submission (conceptual)
// const questionnaireSchema = { validate: (data) => { /* ... */ return { value: data }; } };

// Route to submit a questionnaire (protected by auth middleware)
// router.post('/', authMiddleware, validateInput(questionnaireSchema), questionnaireController.submitQuestionnaire);
router.post('/', authMiddleware, questionnaireController.submitQuestionnaire);

// Route to get a user's questionnaire (protected by auth middleware)
// Assumes userId might be part of the path or derived from authenticated user
router.get('/:userId', authMiddleware, questionnaireController.getQuestionnaire); // Or /me if userId from token

module.exports = router;
