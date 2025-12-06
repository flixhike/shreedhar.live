module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'sridhar-portfolio-secret-key-change-this',
  nodeEnv: process.env.NODE_ENV || 'development'
};

