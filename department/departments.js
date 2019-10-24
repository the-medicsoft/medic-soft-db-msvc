const { BaseController } = require('../controllers/BaseController');
const { Department } = require('./department');

const department = new Department();
class Departments extends BaseController {
  async getDepartments(req, res) {
    try {
      const departments = await department.getDepartments();
      super.sendResponse(req, res, departments);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }

  async updateDepartment(req, res) {
    try {
      const { deptName } = req.params;
      const updateDept = req.body;
      await department.updateDepartment(deptName, updateDept);

      const response = {
        status: 200,
        statusText: 'OK',
        message: 'Department Updated!'
      };

      super.sendResponse(req, res, response);
    } catch (err) {
      super.sendErrorResponse(req, res, err);
    }
  }
}

exports.Departments = Departments;
