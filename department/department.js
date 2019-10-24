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

    return super.success(
      departments.length,
      departments,
      undefined
    );
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
}

exports.Department = Department;
