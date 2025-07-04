const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming a User model exists or will be created for psychologists
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // Consider adding a unique constraint per psychologist if needed
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    enum: ['masculino', 'femenino', 'otro', 'prefiero_no_decir'],
    required: false,
  },
  contactNumber: {
    type: String,
    trim: true,
    required: false,
  },
  notes: {
    type: String,
    trim: true,
    required: false,
  },
  // Add any other relevant patient fields here
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;