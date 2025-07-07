const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: false, // Make firebaseUid optional for admin-created users
    unique: true,
    sparse: true, // Allows multiple documents to have null/undefined firebaseUid
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: false, // Password can be optional if using Firebase for primary auth
  },
  displayName: {
    type: String,
    required: false,
    trim: true,
  },
  photoURL: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['user', 'psychologist', 'admin'], // Add 'admin' role
    default: 'user',
  },
  // Add any other user-related fields here
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const User = mongoose.model('User', userSchema);

module.exports = User;