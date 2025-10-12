import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import i18n from './i18n.js';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import bookRoutes from './src/routes/bookRoutes.js';
import borrowingRoutes from './src/routes/borrowingRoutes.js';
import analyticsRoutes from './src/routes/analyticsRoutes.js';
import { requestLogger } from './src/middlewares/requestLogger.js';
// import { errorHandler } from './src/middlewares/errorHandler.js';

import sequelize from './src/models/sequelize/index.js';

const app = express();
app.use(express.json());
app.use(requestLogger);

app.use(i18n.init);
app.use((req, res, next) => {
  const lang = req.query.lang || req.headers['accept-language'];
  if (lang) i18n.setLocale(req, lang);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/borrowing', borrowingRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send("✅ Dockerized app is running!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: req.__('errors.notFound') });
});

// Database connection with retry


// Start the app

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)

  });