const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Assuming you have an auth middleware

// Route to get all users (requires authentication and possibly admin role)
router.get('/users', authMiddleware.verifyToken, authMiddleware.checkRole(['admin']), adminController.getAllUsers);

// Route to assign a role to a user (requires authentication and possibly admin role)
router.post('/assign-role', authMiddleware.verifyToken, authMiddleware.checkRole(['admin']), adminController.assignRole);

module.exports = router;