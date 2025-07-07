const User = require('../models/user.model');
const admin = require('../config/firebase.config'); // Import Firebase Admin SDK

const adminController = {
  getAllUsers: async (req, res, next) => {
    try {
      // Fetch users from Firebase Authentication
      const listUsersResult = await admin.auth().listUsers();
      const firebaseUsers = listUsersResult.users.map(userRecord => ({
        firebaseUid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        // Custom claims might contain the role, but we'll rely on MongoDB for the primary role
        firebaseCustomClaims: userRecord.customClaims || {},
      }));

      // Fetch roles from MongoDB
      const mongoUsers = await User.find({}, 'email displayName type firebaseUid');

      // Merge Firebase users with MongoDB roles
      const mergedUsers = firebaseUsers.map(fUser => {
        const mUser = mongoUsers.find(mu => mu.firebaseUid === fUser.firebaseUid || mu.email === fUser.email);
        return {
          _id: mUser ? mUser._id : null, // MongoDB ID if exists
          firebaseUid: fUser.firebaseUid,
          email: fUser.email,
          displayName: fUser.displayName || (mUser ? mUser.displayName : null),
          photoURL: fUser.photoURL || (mUser ? mUser.photoURL : null),
          type: mUser ? mUser.type : 'user', // Default to 'user' if not found in MongoDB
        };
      });

      // Add any MongoDB users that are not in Firebase (e.g., admin-created users without firebaseUid)
      mongoUsers.forEach(mUser => {
        if (!mergedUsers.some(fUser => fUser.firebaseUid === mUser.firebaseUid || fUser.email === mUser.email)) {
          mergedUsers.push({
            _id: mUser._id,
            firebaseUid: mUser.firebaseUid,
            email: mUser.email,
            displayName: mUser.displayName,
            photoURL: mUser.photoURL,
            type: mUser.type,
          });
        }
      });

      res.status(200).json(mergedUsers);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      next(error);
    }
  },

  assignRole: async (req, res, next) => {
    try {
      const { email, role } = req.body;

      if (!email || !role) {
        return res.status(400).json({ message: 'Email and role are required.' });
      }

      if (!['user', 'psychologist', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified. Must be "user", "psychologist", or "admin".' });
      }

      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(email);
      } catch (firebaseError) {
        // If user not found in Firebase, it might be a new user to be created in MongoDB
        // Or an existing MongoDB user without a Firebase UID
        console.warn(`User with email ${email} not found in Firebase Auth. Proceeding with MongoDB update/creation.`);
      }

      // Update/Create user in MongoDB
      const user = await User.findOneAndUpdate(
        { email: email },
        { type: role, firebaseUid: userRecord ? userRecord.uid : null }, // Link to Firebase UID if found
        { new: true, upsert: true, runValidators: true }
      );

      if (!user) {
        return res.status(500).json({ message: 'Failed to update or create user in database.' });
      }

      // Set custom claims in Firebase if user exists in Firebase Auth
      if (userRecord) {
        await admin.auth().setCustomUserClaims(userRecord.uid, { role: role });
        console.log(`Firebase custom claim 'role' set to '${role}' for user ${email}`);
      } else {
        console.log(`User ${email} not found in Firebase Auth, custom claims not set.`);
      }

      res.status(200).json({ message: `Role for ${email} updated to ${role} successfully.`, user });
    } catch (error) {
      console.error("Error in assignRole:", error);
      next(error);
    }
  },
};

module.exports = adminController;