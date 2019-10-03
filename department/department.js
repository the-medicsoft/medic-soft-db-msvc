const { db, ResourceController } = require('../db');

const { mongoose } = db;

const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, lowercase: true, required: true },
  description: { type: String },
  deptNo: { type: Number, required: true }
});

const departmentModel = mongoose.model('Department', DepartmentSchema);

exports.Department = class Department extends ResourceController {
  constructor() {
    super(departmentModel);
  }

  async getDepartments() {
    const departments = await super.read();

    return {
      success: true,
      statusCode: 200,
      statusText: 'OK',
      total: departments.length,
      data: { departments }
    };
  }

  // todo: Complete Dept Update Implementation
  async updateDepartment(deptName, updateDepartment) {
    const departmentDoc = await this.Model.findOne({ deptName });
    await super.update(departmentDoc._id, updateDepartment);
  }

  async createDepartment(departments) {
    const result = await super.create(departments);
    return result;
  }
};
