const { departments } = require('../../department');

module.exports = function(fastify, opts, next) {
  fastify.get('/departments', departments.getDepartments);

  next();
};
