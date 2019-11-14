const { BASE_API_ROUTE } = require('../../config/config');

const registerOpts = { prefix: `${BASE_API_ROUTE}/v1` };

module.exports = function (app) {
  app.register(require('./clientApiRoutes'), registerOpts);
  app.register(require('./doctorApiRoutes'), registerOpts);
  app.register(require('./appointmentApiRoutes'), registerOpts);
  app.register(require('./departmentRoutes'), registerOpts);
};
