// src/middlewares/errorHandler.js
import logger from '../utils/logger.js';

export function errorHandler(err, req, res, next) {
  logger.error('Unhandled error: %o', err); // logs stack with errors format
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
}
