const Patient = require('../models/patient.model');
const User = require('../models/user.model'); // Assuming a User model for psychologists

// Create a new patient
exports.createPatient = async (req, res, next) => {
  try {
    const { psychologistId, name, lastName, email, dateOfBirth, gender, contactNumber, notes } = req.body;

    // Basic validation
    if (!psychologistId || !name || !lastName) {
      return res.status(400).json({ message: 'Psychologist ID, name, and last name are required.' });
    }

    // Verify if the psychologist exists (optional, but good practice)
    const psychologist = await User.findById(psychologistId);
    if (!psychologist || psychologist.type !== 'psychologist') {
      return res.status(404).json({ message: 'Psychologist not found or is not a valid psychologist user.' });
    }

    const newPatient = new Patient({
      psychologistId,
      name,
      lastName,
      email,
      dateOfBirth,
      gender,
      contactNumber,
      notes,
    });

    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    next(error);
  }
};

// Get all patients for a specific psychologist
exports.getPatientsByPsychologist = async (req, res, next) => {
  try {
    const { psychologistId } = req.params;
    const patients = await Patient.find({ psychologistId }).sort({ lastName: 1, name: 1 });
    res.status(200).json(patients);
  } catch (error) {
    next(error);
  }
};

// Get a single patient by ID
exports.getPatientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Update a patient by ID
exports.updatePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPatient = await Patient.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    next(error);
  }
};

// Delete a patient by ID
exports.deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);
    if (!deletedPatient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }
    res.status(200).json({ message: 'Patient deleted successfully.' });
  } catch (error) {
    next(error);
  }
};