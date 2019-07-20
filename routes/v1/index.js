module.exports = function(app) {
  const v1Routes = [
    require('./clientApiRoutes').clientApiRoutes,
    require('./doctorApiRoutes').doctorApiRoutes
  ].flat(2);

  for (let route of v1Routes) {
    app.route(route);
  }
};
