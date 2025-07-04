const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Assuming auth middleware for protection

// Protect all patient routes (optional, but recommended for psychologist features)
// router.use(authMiddleware.protect); 
// router.use(authMiddleware.restrictTo('psychologist')); // Example: only psychologists can access

// Routes for patient management
router.post('/', patientController.createPatient);
router.get('/:psychologistId', patientController.getPatientsByPsychologist); // Get patients for a specific psychologist
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;