const { Departments } = require('../../src/controllers');

module.exports = function(fastify, opts, next) {
  const departments = new Departments();

  fastify.get('/departments', departments.getDepartments);

  next();
};
