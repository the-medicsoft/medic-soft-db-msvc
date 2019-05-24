const { mongoose } = require("../db/db");
const { userSchema } = require("../db/shared_schemas/");

const doctorSchema = new mongoose.Schema(userSchema);

doctorSchema.add({
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
  department: { type: String, required: true },
  visitingTime: [{ branch: String, timings: Date }]
});

exports.Doctor = mongoose.model("Doctor", doctorSchema);
