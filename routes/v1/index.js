module.exports = function(app) {
  let v1Routes = new Array().concat(
    require('./clientApiRoutes').clientApiRoutes,
    require('./doctorApiRoutes').doctorApiRoutes
  );

  for (let route of v1Routes) {
    app.route(route);
  }
};
