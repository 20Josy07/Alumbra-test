// alumbra-backend/routes/auth.routes.js
// Defines routes related to user authentication.

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// const validateInput = require('../middleware/validate.input'); // If you have validation schemas

// Example: Define schemas for validation (conceptual)
// const registerSchema = { validate: (data) => { /* ... */ return { value: data }; } };
// const loginSchema = { validate: (data) => { /* ... */ return { value: data }; } };

// Route for user registration
// router.post('/register', validateInput(registerSchema), authController.register);
router.post('/register', authController.register);

// Route for user login
// router.post('/login', validateInput(loginSchema), authController.login);
router.post('/login', authController.login);

// Add other authentication-related routes here (e.g., logout, password reset)

module.exports = router;
