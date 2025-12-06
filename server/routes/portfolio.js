const express = require('express');
const router = express.Router();
const path = require('path');
const { readJSON, writeJSON, DATA_DIR } = require('../utils');
const { verifyToken } = require('./auth');

const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');

// Get all portfolio items (public - only published)
router.get('/', async (req, res) => {
  try {
    const portfolio = await readJSON(PORTFOLIO_FILE);
    // Filter to only published items for public view
    const publishedPortfolio = (portfolio || []).filter(item => item.published !== false);
    res.json(publishedPortfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Get all portfolio items including unpublished (admin only)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const portfolio = await readJSON(PORTFOLIO_FILE);
    res.json(portfolio || []);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Add portfolio item (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];

    // Calculate order: find max order in the same category + 1
    const category = req.body.category || 'Uncategorized';
    const categoryItems = portfolioItems.filter(item => item.category === category);
    const maxOrder = categoryItems.length > 0
      ? Math.max(...categoryItems.map(item => item.order || 0))
      : -1;

    const newItem = {
      id: Date.now().toString(),
      ...req.body,
      order: maxOrder + 1,
      published: req.body.published !== undefined ? req.body.published : true,
      createdAt: new Date().toISOString()
    };

    portfolioItems.push(newItem);
    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      res.status(201).json({ message: 'Portfolio item added', data: newItem });
    } else {
      res.status(500).json({ error: 'Failed to add portfolio item' });
    }
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    res.status(500).json({ error: 'Failed to add portfolio item' });
  }
});

// Update portfolio item (protected)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];
    const index = portfolioItems.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    portfolioItems[index] = {
      ...portfolioItems[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      res.json({ message: 'Portfolio item updated', data: portfolioItems[index] });
    } else {
      res.status(500).json({ error: 'Failed to update portfolio item' });
    }
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    res.status(500).json({ error: 'Failed to update portfolio item' });
  }
});

// Delete portfolio item (protected)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];
    const filtered = portfolioItems.filter(item => item.id !== req.params.id);

    if (filtered.length === portfolioItems.length) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    const success = await writeJSON(PORTFOLIO_FILE, filtered);

    if (success) {
      res.json({ message: 'Portfolio item deleted' });
    } else {
      res.status(500).json({ error: 'Failed to delete portfolio item' });
    }
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

// Toggle publish status (protected)
router.patch('/:id/publish', verifyToken, async (req, res) => {
  try {
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];
    const index = portfolioItems.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    portfolioItems[index].published = !portfolioItems[index].published;
    portfolioItems[index].updatedAt = new Date().toISOString();

    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      res.json({
        message: portfolioItems[index].published ? 'Portfolio item published' : 'Portfolio item unpublished',
        data: portfolioItems[index]
      });
    } else {
      res.status(500).json({ error: 'Failed to update publish status' });
    }
  } catch (error) {
    console.error('Error updating publish status:', error);
    res.status(500).json({ error: 'Failed to update publish status' });
  }
});

// Update item order (protected)
router.patch('/:id/order', verifyToken, async (req, res) => {
  try {
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];
    const index = portfolioItems.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    console.log(`Updating order for item ${req.params.id} to ${req.body.order}`);

    portfolioItems[index].order = req.body.order;
    portfolioItems[index].updatedAt = new Date().toISOString();

    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      console.log(`Order updated successfully for ${portfolioItems[index].title}`);
      res.json({
        message: 'Portfolio item order updated',
        data: portfolioItems[index]
      });
    } else {
      res.status(500).json({ error: 'Failed to update order' });
    }
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Swap order of two items (protected)
router.post('/swap-order', verifyToken, async (req, res) => {
  try {
    const { id1, id2 } = req.body;

    if (!id1 || !id2) {
      return res.status(400).json({ error: 'Both item IDs are required' });
    }

    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];
    const index1 = portfolioItems.findIndex(item => item.id === id1);
    const index2 = portfolioItems.findIndex(item => item.id === id2);

    if (index1 === -1 || index2 === -1) {
      return res.status(404).json({ error: 'One or both portfolio items not found' });
    }

    // Ensure orders are numbers before swapping
    if (portfolioItems[index1].order === undefined || portfolioItems[index1].order === null) {
      portfolioItems[index1].order = index1;
    }
    if (portfolioItems[index2].order === undefined || portfolioItems[index2].order === null) {
      portfolioItems[index2].order = index2;
    }

    // Swap orders
    const tempOrder = portfolioItems[index1].order;
    portfolioItems[index1].order = portfolioItems[index2].order;
    portfolioItems[index2].order = tempOrder;

    // Update timestamps
    const now = new Date().toISOString();
    portfolioItems[index1].updatedAt = now;
    portfolioItems[index2].updatedAt = now;

    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      res.json({
        message: 'Portfolio items order swapped',
        data: [portfolioItems[index1], portfolioItems[index2]]
      });
    } else {
      res.status(500).json({ error: 'Failed to swap order' });
    }
  } catch (error) {
    console.error('Error swapping order:', error);
    res.status(500).json({ error: 'Failed to swap order' });
  }
});

// Initialize/Fix all order values (protected) - Utility endpoint
router.post('/fix-orders', verifyToken, async (req, res) => {
  try {
    console.log('Fixing order values for all items...');
    const portfolioItems = await readJSON(PORTFOLIO_FILE) || [];

    // Group by category
    const categoryGroups = {};
    portfolioItems.forEach(item => {
      const cat = item.category || 'Uncategorized';
      if (!categoryGroups[cat]) categoryGroups[cat] = [];
      categoryGroups[cat].push(item);
    });

    // Assign sequential order values within each category
    for (const category in categoryGroups) {
      categoryGroups[category]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .forEach((item, index) => {
          item.order = index;
        });
    }

    const success = await writeJSON(PORTFOLIO_FILE, portfolioItems);

    if (success) {
      console.log('Order values fixed successfully');
      res.json({
        message: 'Order values fixed successfully',
        data: portfolioItems
      });
    } else {
      res.status(500).json({ error: 'Failed to fix order values' });
    }
  } catch (error) {
    console.error('Error fixing order values:', error);
    res.status(500).json({ error: 'Failed to fix order values' });
  }
});

module.exports = router;

