const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
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
    enum: ['user', 'psychologist'],
    default: 'user',
  },
  // Add any other user-related fields here
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const User = mongoose.model('User', userSchema);

module.exports = User;