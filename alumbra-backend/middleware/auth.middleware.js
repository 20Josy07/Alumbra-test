// alumbra-backend/middleware/auth.middleware.js
// Middleware for protecting routes that require authentication

const jwt = require('jsonwebtoken');
const admin = require('../config/firebase.config'); // Import Firebase Admin SDK
const User = require('../models/user.model');
const envConfig = require('../config/env.config');

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
      }

      let decodedToken;
      let isFirebaseToken = false;

      try {
        // Try to verify as Firebase ID token
        decodedToken = await admin.auth().verifyIdToken(token);
        isFirebaseToken = true;
      } catch (firebaseError) {
        // If Firebase verification fails, try to verify as our custom JWT
        try {
          decodedToken = jwt.verify(token, envConfig.JWT_SECRET);
        } catch (jwtError) {
          // If both fail, token is invalid
          if (jwtError.name === 'TokenExpiredError' || firebaseError.code === 'auth/id-token-expired') {
            return res.status(401).json({ message: 'Unauthorized: Token expired.' });
          }
          return res.status(401).json({ message: 'Unauthorized: Invalid token.' });
        }
      }

      let user;
      if (isFirebaseToken) {
        // For Firebase authenticated users, find or create in MongoDB
        user = await User.findOneAndUpdate(
          { firebaseUid: decodedToken.uid },
          {
            email: decodedToken.email,
            displayName: decodedToken.name || decodedToken.email,
            photoURL: decodedToken.picture || null,
            type: decodedToken.role || 'user', // Use custom claim 'role' if available, else default
          },
          { new: true, upsert: true, runValidators: true }
        );
      } else {
        // For custom JWT authenticated users
        user = await User.findById(decodedToken.id).select('-password');
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      req.user = user; // Attach user object to request
      next();
    } catch (error) {
      console.error("Authentication middleware error:", error);
      next(error); // Pass other errors to the error handling middleware
    }
  },

  // Middleware to check for specific roles (e.g., 'admin', 'psychologist')
  checkRole: (roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.type)) {
        return res.status(403).json({ message: 'Forbidden: You do not have the necessary role to access this resource.' });
      }
      next();
    };
  },
};

module.exports = authMiddleware;
