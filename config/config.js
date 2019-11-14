module.exports = {
  minDistance: process.env.minDistance || 1000,
  maxDistance: process.env.maxDistance || 5000,
  BASE_API_ROUTE: process.env.BASE_API_ROUTE || '/api',
  queryStringFilter: process.env.queryStringFilter || '-firstName -lastName -location -contacts.email'
};
