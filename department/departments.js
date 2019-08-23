const { Department } = require('./department');

exports.getDepartments = async function(req, res) {
  const departments = await Department.getDepartments();
  res.code(departments.statusCode).send(departments);
};
