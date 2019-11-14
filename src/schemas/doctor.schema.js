const { Schema } = require('mongoose');
const { userSchema } = require('./shared_schemas');

const DoctorSchema = new Schema(userSchema);

DoctorSchema.add({
  isAdmin: {
    type: Boolean,
    default: false
  },
  DOJ: Date,
  qualifications: [
    {
      type: String
    }
  ],
  specialisations: [
    {
      type: String
    }
  ],
  designation: { type: String, required: true },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  visitingTime: [{ branch: String, timings: Date }]
});

exports.DoctorSchema = DoctorSchema;