const { mongoose } = require('../db/db');

const DepartmentSchema = new mongoose.Schema({
  dept_name: { type: String, required: true },
  deptNo: { type: Number, required: true }
});

DepartmentSchema.statics = {
  getDepartments: async function() {
    // const departments = ['Chest', 'Cardio', 'General', 'ENT'];
    const departments = await this.find({});

    return {
      success: true,
      statusCode: 200,
      statusText: 'OK',
      total: departments.length,
      data: { departments }
    };
  }
};

exports.Department = mongoose.model('Department', DepartmentSchema);
