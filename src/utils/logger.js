// src/utils/logger.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const { combine, timestamp, printf, colorize, errors, json, splat } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  splat(),
  printf(({ level, message, timestamp, stack }) => {
    if (stack) return `${timestamp} ${level}: ${message} - ${stack}`;
    return `${timestamp} ${level}: ${message}`;
  })
);

const fileFormat = combine(timestamp(), errors({ stack: true }), splat(), json());

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: fileFormat,
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
    new winston.transports.File({ filename: path.join(logDir, 'http.log'), level: 'http' })

  ],
//   new winston.transports.File({ 
//   filename: path.join(logDir, 'http.log'), 
//   level: 'http', 
//   format: winston.format((info) => info.level === 'http' ? info : false)() 
// })


});



// Provide a stream for morgan
logger.stream = {
  write: (message) => logger.info(message.trim())
};

export default logger;
