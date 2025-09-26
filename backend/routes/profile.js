const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Update user profile
router.put(
  '/update',
  auth,
  [
    body('fullName').optional().trim().isLength({ min: 1 }),
    body('phone').optional().trim(),
    body('dateOfBirth').optional().trim(),
    body('nationality').optional().trim(),
    body('travelInterests').optional().isArray(),
    body('dietaryRestrictions').optional().isArray(),
    body('accommodationPreference').optional().trim(),
    body('budgetRange').optional().trim(),
    body('visaStatus').optional().trim(),
    body('emergencyContact').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Validation failed', errors: errors.array() });
      }

      const {
        fullName,
        phone,
        dateOfBirth,
        nationality,
        travelInterests,
        dietaryRestrictions,
        accommodationPreference,
        budgetRange,
        visaStatus,
        emergencyContact
      } = req.body;

      // Update user profile
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update profile fields
      if (fullName !== undefined) user.profile.fullName = fullName;
      if (phone !== undefined) user.profile.phone = phone;
      if (dateOfBirth !== undefined) user.profile.dateOfBirth = dateOfBirth;
      if (nationality !== undefined) user.profile.nationality = nationality;
      if (travelInterests !== undefined)
        user.profile.travelInterests = travelInterests;
      if (dietaryRestrictions !== undefined)
        user.profile.dietaryRestrictions = dietaryRestrictions;
      if (accommodationPreference !== undefined)
        user.profile.accommodationPreference = accommodationPreference;
      if (budgetRange !== undefined) user.profile.budgetRange = budgetRange;
      if (visaStatus !== undefined) user.profile.visaStatus = visaStatus;
      if (emergencyContact !== undefined)
        user.profile.emergencyContact = emergencyContact;

      // Check if profile is completed
      const requiredFields = [
        'fullName',
        'phone',
        'dateOfBirth',
        'nationality',
        'visaStatus',
        'emergencyContact'
      ];

      const isCompleted = Boolean(
        requiredFields.every(
          field =>
            user.profile[field] &&
            user.profile[field].toString().trim() !== ''
        ) &&
          user.profile.travelInterests.length > 0 &&
          !!user.profile.accommodationPreference &&
          !!user.profile.budgetRange
      );

      user.profile.profileCompleted = isCompleted;

      await user.save();

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: user._id,
          email: user.email,
          profile: user.profile
        }
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: 'Server error during profile update' });
    }
  }
);

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      profile: user.profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
