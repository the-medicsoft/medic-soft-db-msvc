const db = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const doctorSchema = userSchema;

doctorSchema.add({
  isAdmin: {
    type: Boolean,
    default: false
  },
  DOJ: Date,
  isActive: Boolean,
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
  department: { type: String, required: true },
  visitingTime: [{ branch: String, timings: Date }]
});

exports.Doctor = db.mongoose.model("Doctor", doctorSchema);
