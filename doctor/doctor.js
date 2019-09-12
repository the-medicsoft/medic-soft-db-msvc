const { mongoose } = require('../db/db');
const { userSchema } = require('../db/shared_schemas/');

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
  department: {
    type: mongoose.Schema.Types.String,
    ref: 'Department'
  },
  visitingTime: [{ branch: String, timings: Date }]
});

doctorSchema.statics.getDoctors = async function() {
  try {
    // remove _id, _v and password properties from resultset
    const doctorResultFilter = '-_id -__v -password';

    let doctors = await this.find({}, doctorResultFilter).populate({
      path: 'department'
    });

    if (doctors.length) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        total: doctors.length,
        data: doctors
      };
    } else throw new Error();
  } catch (err) {
    return {
      success: false,
      statusCode: 404,
      statusText: 'Not Found',
      message: 'Not Found'
    };
  }
};

doctorSchema.statics.getDoctorByQuery = async function(query) {
  try {
    // remove _id and _v properties from resultset
    const doctorResultFilter = '-_id -__v';

    let doctors = await this.find(query, doctorResultFilter);

    if (doctors.length) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        total: doctors.length,
        data: doctors
      };
    } else throw new Error();
  } catch (err) {
    return {
      success: false,
      statusCode: 404,
      statusText: 'Not Found',
      message: 'Not Found'
    };
  }
};

doctorSchema.statics.createDoctor = async function(newDoctor) {
  try {
    // if doctor exists then do not insert and, prompt user with message
    let { email } = newDoctor.contacts;

    let doctorExists = await this.findOne({ 'contacts.email': email });

    if (doctorExists && doctorExists.contacts.email === email) {
      return {
        success: false,
        statusCode: 409,
        statusText: 'Conflict',
        message: `doctor with email ${email} already exists!`
      };
    }

    let doctor = await this.create(newDoctor);

    if (doctor && doctor.contacts.email === email) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        message: `doctor inserted`,
        data: doctor
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: err.message
    };
  }
};

doctorSchema.statics.updateDoctorByEmail = async function(
  email,
  updateDoctorWith
) {
  try {
    let doctor = await this.findOneAndUpdate(
      { 'contacts.email': email },
      updateDoctorWith,
      { useFindAndModify: true }
    );

    if (doctor) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        message: `doctor updated`,
        data: doctor
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: err.message
    };
  }
};

doctorSchema.statics.deleteDoctorByEmail = async function(email) {
  try {
    let doctor = await this.findOneAndUpdate(
      { 'contacts.email': email },
      { isActive: false },
      { useFindAndModify: true }
    );

    if (doctor && doctor.isActive === false) {
      return {
        success: true,
        statusCode: 200,
        statusText: 'OK',
        message: 'doctor deleted'
      };
    } else {
      throw new Error();
    }
  } catch (err) {
    return {
      success: false,
      statusCode: 500,
      statusText: 'Internal Server Error',
      message: err.message
    };
  }
};

exports.Doctor = mongoose.model('Doctor', doctorSchema);
