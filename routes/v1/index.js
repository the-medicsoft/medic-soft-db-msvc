const registerOpts = { prefix: '/api/v1' };

module.exports = function(app) {
  app.register(require('./clientApiRoutes'), registerOpts);
  app.register(require('./doctorApiRoutes'), registerOpts);
  app.register(require('./appointmentApiRoutes'), registerOpts);
};
