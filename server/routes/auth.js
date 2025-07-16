import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Sync user from Clerk
router.post('/sync', async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, role = 'user' } = req.body;

    if (!clerkId || !email || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if user already exists
    let user = await User.findOne({ clerkId });

    if (user) {
      // Update existing user
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user
      user = new User({
        clerkId,
        email,
        firstName,
        lastName,
        role,
        lastLogin: new Date()
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, clerkId: user.clerkId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'User synced successfully',
      data: {
        user: {
          id: user._id,
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error syncing user',
      error: error.message
    });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

export default router;