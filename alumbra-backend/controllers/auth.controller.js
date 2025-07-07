const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const envConfig = require('../config/env.config');

const authController = {
  register: async (req, res, next) => {
    try {
      const { email, password, displayName, photoURL, type } = req.body;

      // Basic validation
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({ message: 'User with that email already exists.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
        email,
        password: hashedPassword, // Store hashed password
        displayName,
        photoURL,
        type: type || 'user', // Default to 'user' if not provided
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id, type: user.type }, envConfig.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({
        message: 'User registered successfully.',
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          type: user.type,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ id: user._id, type: user.type }, envConfig.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
        message: 'Logged in successfully.',
        user: {
          id: user._id,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          type: user.type,
        },
        token,
      });
    } catch (error) {
      next(error);
    }
  },
  // Add other authentication-related methods as needed
};

module.exports = authController;
