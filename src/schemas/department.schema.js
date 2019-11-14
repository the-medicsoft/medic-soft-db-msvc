const { Schema } = require('mongoose');

exports.DepartmentSchema = new Schema({
  deptName: { type: String, lowercase: true, required: true },
  description: { type: String },
  deptNo: { type: Number, required: true }
});