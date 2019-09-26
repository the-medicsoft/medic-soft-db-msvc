const { Department } = require('./department');

const department = new Department();

exports.getDepartments = async (req, res) => {
  const departments = await department.getDepartments();
  res.code(departments.statusCode).send(departments);
};

exports.updateDepartment = async (req, res) => {
  const { deptName } = req.params;
  const updateDept = req.body;
  await department.updateDepartment(deptName, updateDept);

  res.send({
    status: 200,
    statusText: 'OK',
    message: 'Department Updated!'
  });
};
