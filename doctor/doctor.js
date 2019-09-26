const { db, ResourceController } = require('../db');
const { userSchema } = require('../db/shared_schemas/');
const { minDistance, maxDistance } = require('../config/config');

const { mongoose } = db;

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  },
  visitingTime: [{ branch: String, timings: Date }]
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

exports.Doctor = class Doctor extends ResourceController {
  constructor() {
    super(doctorModel);
  }

  async getDoctors() {
    try {
      let doctors = await super.read();

      await this.Model.populate(doctors, {
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
      } else {
        throw new Error();
      }
    } catch (err) {
      return {
        success: false,
        statusCode: 404,
        statusText: 'Not Found',
        message: err.message
      };
    }
  }

  async getDoctorByQuery(query) {
    try {
      let doctors = undefined;

      if (!('location' in query)) {
        doctors = await super.readByQuery(query);
      } else {
        const coordinates = query.location.split(',');

        const geoQuery = {
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates
              },
              $minDistance: minDistance,
              $maxDistance: maxDistance
            }
          }
        };

        doctors = await super.readByQuery(geoQuery);
      }

      await this.Model.populate(doctors, {
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
        message: err.message
      };
    }
  }

  async createDoctor(newDoctor) {
    try {
      // if doctor exists then do not insert and, prompt user with message
      let { email } = newDoctor.contacts;

      let doctorExists = await this.Model.findOne({ 'contacts.email': email });

      if (doctorExists && doctorExists.contacts.email === email) {
        return {
          success: false,
          statusCode: 409,
          statusText: 'Conflict',
          message: `doctor with email ${email} already exists!`
        };
      }

      let doctor = await super.create(newDoctor);

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
  }

  async updateDoctorByEmail(email, updateDoctorWith) {
    try {
      let doctor = await this.Model.findOne({ 'contacts.email': email });

      let result = await super.update(doctor._id, updateDoctorWith);

      if (result) {
        return {
          success: true,
          statusCode: 200,
          statusText: 'OK',
          message: `doctor updated`,
          data: result
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
  }

  async deleteDoctorByEmail(email) {
    try {
      const setActiveToFalse = { isActive: false };

      let doctor = await this.Model.findOne({ 'contacts.email': email });

      let result = await super.delete(doctor._id, setActiveToFalse);

      if (result && result.isActive === false) {
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
  }
};
