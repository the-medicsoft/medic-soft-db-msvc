const { Department } = require('./department');

exports.getDepartments = async (req, res) => {
  const departments = await Department.getDepartments();
  res.code(departments.statusCode).send(departments);
};

exports.updateDepartment = async (req, res) => {
  const { deptName } = req.params;
  const updateDept = req.body;
  await Department.updateDepartment(deptName, updateDept);

  res.send({
    status: 200,
    statusText: 'OK',
    message: 'Department Updated!'
  });
};
