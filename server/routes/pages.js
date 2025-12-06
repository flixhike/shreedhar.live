const express = require('express');
const router = express.Router();
const path = require('path');
const { readJSON, writeJSON, DATA_DIR } = require('../utils');
const { verifyToken } = require('./auth');

const PAGES_FILE = path.join(DATA_DIR, 'pages.json');

// Get all pages (public - only published)
router.get('/', async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE);
    // Filter to only published pages for public view
    const publishedPages = (pages || []).filter(page => page.published !== false);
    res.json(publishedPages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Get all pages including unpublished (admin only)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE);
    res.json(pages || []);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Get single page by slug
router.get('/:slug', async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE);
    const page = (pages || []).find(p => p.slug === req.params.slug && p.published !== false);
    
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    res.json(page);
  } catch (error) {
    console.error('Error fetching page:', error);
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// Add page (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE) || [];
    
    // Generate slug from title
    const slug = req.body.slug || req.body.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Check if slug already exists
    if (pages.find(p => p.slug === slug)) {
      return res.status(400).json({ error: 'A page with this name already exists' });
    }
    
    const newPage = {
      id: Date.now().toString(),
      ...req.body,
      slug,
      published: req.body.published !== undefined ? req.body.published : true,
      createdAt: new Date().toISOString()
    };
    
    pages.push(newPage);
    const success = await writeJSON(PAGES_FILE, pages);
    
    if (success) {
      res.status(201).json({ message: 'Page added', data: newPage });
    } else {
      res.status(500).json({ error: 'Failed to add page' });
    }
  } catch (error) {
    console.error('Error adding page:', error);
    res.status(500).json({ error: 'Failed to add page' });
  }
});

// Update page (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE) || [];
    const index = pages.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    // Generate slug if title changed
    const slug = req.body.slug || req.body.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Check if new slug conflicts with another page
    const conflictPage = pages.find(p => p.slug === slug && p.id !== req.params.id);
    if (conflictPage) {
      return res.status(400).json({ error: 'A page with this name already exists' });
    }
    
    pages[index] = {
      ...pages[index],
      ...req.body,
      slug,
      updatedAt: new Date().toISOString()
    };
    
    const success = await writeJSON(PAGES_FILE, pages);
    
    if (success) {
      res.json({ message: 'Page updated', data: pages[index] });
    } else {
      res.status(500).json({ error: 'Failed to update page' });
    }
  } catch (error) {
    console.error('Error updating page:', error);
    res.status(500).json({ error: 'Failed to update page' });
  }
});

// Delete page (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE) || [];
    const filtered = pages.filter(p => p.id !== req.params.id);
    
    if (filtered.length === pages.length) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    const success = await writeJSON(PAGES_FILE, filtered);
    
    if (success) {
      res.json({ message: 'Page deleted' });
    } else {
      res.status(500).json({ error: 'Failed to delete page' });
    }
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// Toggle publish status (protected)
router.patch('/:id/publish', verifyToken, async (req, res) => {
  try {
    const pages = await readJSON(PAGES_FILE) || [];
    const index = pages.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Page not found' });
    }
    
    pages[index].published = !pages[index].published;
    pages[index].updatedAt = new Date().toISOString();
    
    const success = await writeJSON(PAGES_FILE, pages);
    
    if (success) {
      res.json({ 
        message: pages[index].published ? 'Page published' : 'Page unpublished', 
        data: pages[index] 
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

