const { mongoose } = require('../db/db');

const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true },
  description: { type: String },
  deptNo: { type: Number, required: true }
});

DepartmentSchema.statics = {
  getDepartments: async function() {
    const filter = '-_id -__v';
    const departments = await this.find({}, filter);

    return {
      success: true,
      statusCode: 200,
      statusText: 'OK',
      total: departments.length,
      data: { departments }
    };
  },

  // todo: Complete Dept Update Implementation
  updateDepartment: async function(deptName, department) {
    await this.findOneAndUpdate({ deptName }, department);
  },

  createDepartment: async function(departments) {
    const result = await this.create(departments);
    return result;
  }
};

exports.Department = mongoose.model('Department', DepartmentSchema);
