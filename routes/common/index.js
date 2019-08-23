const registerOpts = { prefix: '/api/common' };

module.exports = function(app) {
  app.register(require('./departmentRoutes'), registerOpts);
};
