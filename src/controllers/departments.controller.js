const { BaseController } = require('@the-medicsoft/webapi-framework');
const { Department } = require('../models');

const department = new Department();

class Departments extends BaseController {
  async getDepartments(req, res) {
    try {
      const departments = await department.getDepartments();
      super.sendResponse({ req, res, response: departments });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateDepartment(req, res) {
    try {
      const { deptName } = req.params;
      const updateDept = req.body;

      await department.updateDepartment({
        deptName,
        body: updateDept
      });

      const response = {
        status: 200,
        statusText: 'OK',
        message: 'Department Updated!'
      };

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

exports.Departments = Departments;
