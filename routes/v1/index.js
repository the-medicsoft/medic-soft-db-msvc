const { clientApiRoutes } = require('./clientApiRoutes');
const { doctorApiRoutes } = require('./doctorApiRoutes');

module.exports = function(app) {
  let v1Routes = new Array().concat(clientApiRoutes, doctorApiRoutes);

  for (let route of v1Routes) {
    app.route(route);
  }
};
