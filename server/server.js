const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
const { DATA_DIR } = require('./utils');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Data file paths
const PROFILE_FILE = path.join(DATA_DIR, 'profile.json');
const EXPERIENCE_FILE = path.join(DATA_DIR, 'experience.json');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PAGES_FILE = path.join(DATA_DIR, 'pages.json');

// Ensure data directory exists
const initDataDir = async () => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    // Initialize files if they don't exist
    const files = [
      { path: PROFILE_FILE, data: {} },
      { path: EXPERIENCE_FILE, data: [] },
      { path: PORTFOLIO_FILE, data: [] },
      { path: USERS_FILE, data: [] },
      { path: PAGES_FILE, data: [] }
    ];
    
    for (const file of files) {
      try {
        await fs.access(file.path);
      } catch {
        await fs.writeFile(file.path, JSON.stringify(file.data, null, 2));
      }
    }
  } catch (error) {
    console.error('Error initializing data directory:', error);
  }
};

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const experienceRoutes = require('./routes/experience');
const portfolioRoutes = require('./routes/portfolio');
const uploadRoutes = require('./routes/upload');
const pagesRoutes = require('./routes/pages');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/pages', pagesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CMS API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const startServer = async () => {
  await initDataDir();
  app.listen(PORT, () => {
    console.log(`🚀 CMS Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();

