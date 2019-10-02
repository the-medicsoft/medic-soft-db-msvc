const { cmdLineParser } = require('../utils/utils');

const isNodeEnvLower = process.env.NODE_ENV !== 'production';

if (isNodeEnvLower) {
  require('dotenv').config();
}

const configObj = cmdLineParser(process.argv);

module.exports = {
  HOST: process.env.HOST || configObj.HOST || '0.0.0.0',
  PORT: process.env.PORT || configObj.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || configObj.NODE_ENV || 'development',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || configObj.LOGGER_LEVEL || 'info',
  BASE_API_ROUTE: process.env.BASE_API_ROUTE || configObj.BASE_API_ROUTE || '/api',
  MONGO_DB: process.env.MONGO_DB || configObj.MONGO_DB,
  MONGO_DB_URL: process.env.MONGO_DB_URL || configObj.MONGO_DB_URL,
  MONGO_USER: process.env.MONGO_USER || configObj.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || configObj.MONGO_PASSWORD,
  minDistance: process.env.minDistance || configObj.minDistance || 1000,
  maxDistance: process.env.maxDistance || configObj.maxDistance || 5000,
  isNodeEnvLower
};
