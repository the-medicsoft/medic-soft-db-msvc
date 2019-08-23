const departments = require('../../department/departments');

module.exports = function(fastify, opts, next) {
  fastify.get('/departments', departments.getDepartments);

  next();
};
