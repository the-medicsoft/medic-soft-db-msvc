const { db, BaseModel } = require('../db');
const { HttpCode } = require('../utils');

const { mongoose } = db;

const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, lowercase: true, required: true },
  description: { type: String },
  deptNo: { type: Number, required: true }
});

class Department extends BaseModel {
  constructor() {
    super(mongoose.model('Department', DepartmentSchema));
  }

  async getDepartments() {
    const departments = await super.read();

    return super.success({
      total: departments.length,
      data: departments
    });
  }

  // todo: Complete Dept Update Implementation
  async updateDepartment({ deptName, body }) {
    const departmentDoc = await this.Model.findOne({ deptName });
    await super.update({ id: departmentDoc._id, body: body });
  }

  async createDepartment({ body }) {
    const result = await super.create({ body });
    return result;
  }
}

exports.Department = Department;
