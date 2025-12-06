const express = require('express');
const router = express.Router();
const path = require('path');
const { readJSON, writeJSON, DATA_DIR } = require('../utils');
const { verifyToken } = require('./auth');

const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');

// Get profile data
router.get('/', async (req, res) => {
  try {
    const profile = await readJSON(PROFILE_FILE);
    res.json(profile || {});
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update profile data (protected)
router.put('/', verifyToken, async (req, res) => {
  try {
    const profileData = req.body;
    const success = await writeJSON(PROFILE_FILE, profileData);
    
    if (success) {
      res.json({ message: 'Profile updated successfully', data: profileData });
    } else {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;

