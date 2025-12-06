const express = require('express');
const router = express.Router();
const path = require('path');
const { readJSON, writeJSON, DATA_DIR } = require('../utils');
const { verifyToken } = require('./auth');

const EXPERIENCE_FILE = path.join(DATA_DIR, 'experience.json');

// Get all experience entries (public - only published)
router.get('/', async (req, res) => {
  try {
    const experience = await readJSON(EXPERIENCE_FILE);
    // Filter to only published items for public view
    const publishedExperience = (experience || []).filter(exp => exp.published !== false);
    res.json(publishedExperience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// Get all experience entries including unpublished (admin only)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const experience = await readJSON(EXPERIENCE_FILE);
    res.json(experience || []);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// Add experience entry (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const experiences = await readJSON(EXPERIENCE_FILE) || [];
    const newExperience = {
      id: Date.now().toString(),
      ...req.body,
      published: req.body.published !== undefined ? req.body.published : true,
      createdAt: new Date().toISOString()
    };
    
    experiences.push(newExperience);
    const success = await writeJSON(EXPERIENCE_FILE, experiences);
    
    if (success) {
      res.status(201).json({ message: 'Experience added', data: newExperience });
    } else {
      res.status(500).json({ error: 'Failed to add experience' });
    }
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ error: 'Failed to add experience' });
  }
});

// Update experience entry (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const experiences = await readJSON(EXPERIENCE_FILE) || [];
    const index = experiences.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    experiences[index] = {
      ...experiences[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    
    const success = await writeJSON(EXPERIENCE_FILE, experiences);
    
    if (success) {
      res.json({ message: 'Experience updated', data: experiences[index] });
    } else {
      res.status(500).json({ error: 'Failed to update experience' });
    }
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

// Delete experience entry (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const experiences = await readJSON(EXPERIENCE_FILE) || [];
    const filtered = experiences.filter(e => e.id !== req.params.id);
    
    if (filtered.length === experiences.length) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    const success = await writeJSON(EXPERIENCE_FILE, filtered);
    
    if (success) {
      res.json({ message: 'Experience deleted' });
    } else {
      res.status(500).json({ error: 'Failed to delete experience' });
    }
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// Toggle publish status (protected)
router.patch('/:id/publish', verifyToken, async (req, res) => {
  try {
    const experiences = await readJSON(EXPERIENCE_FILE) || [];
    const index = experiences.findIndex(e => e.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    experiences[index].published = !experiences[index].published;
    experiences[index].updatedAt = new Date().toISOString();
    
    const success = await writeJSON(EXPERIENCE_FILE, experiences);
    
    if (success) {
      res.json({ 
        message: experiences[index].published ? 'Experience published' : 'Experience unpublished', 
        data: experiences[index] 
      });
    } else {
      res.status(500).json({ error: 'Failed to update publish status' });
    }
  } catch (error) {
    console.error('Error updating publish status:', error);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
});

module.exports = router;

