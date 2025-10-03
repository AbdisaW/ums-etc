// src/middlewares/requestLogger.js
import morgan from 'morgan';
import logger from '../utils/logger.js';

export const requestLogger = morgan('combined', {
  stream: { write: (message) => logger.http(message.trim()) }
});