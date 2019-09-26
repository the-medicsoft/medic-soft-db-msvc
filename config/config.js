module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'info',
  BASE_ROUTE: '/api',
  MONGO_DB: process.env.MONGO_DB || 'medic-soft-dev',
  MONGO_DB_URL:
    process.env.MONGO_DB_URL ||
    'mongodb+srv://root:$themedicsoft2019@cluster0-medic-soft-dev-8ydey.mongodb.net/medic-soft-dev?retryWrites=true',
  MONGO_USER: process.env.MONGO_USER || 'root',
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || '$themedicsoft2019',
  minDistance: process.env.minDistance || 1000,
  maxDistance: process.env.maxDistance || 5000
};
