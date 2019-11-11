const { db, BaseModel } = require('../db');
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

class Doctor extends BaseModel {
  constructor() {
    super(mongoose.model('Doctor', doctorSchema));
  }

  async getDoctors() {
    let doctors = await super.read();

    await this.Model.populate(doctors, {
      path: 'department'
    });

    if (doctors.length) {
      return super.success({ total: doctors.length, data: doctors });
    } else {
      super.fail();
    }
  }

  async getDoctorByQuery({ query }) {
    let doctors = undefined;

    if (!('location' in query)) {
      doctors = await super.readByQuery({ query });
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

      doctors = await super.readByQuery({ query: geoQuery });
    }

    await this.Model.populate(doctors, {
      path: 'department'
    });

    if (doctors.length) {
      return super.success({ total: doctors.length, data: doctors });
    } else {
      super.notFound();
    }
  }

  async createDoctor({ newDoctor }) {
    // if doctor exists then do not insert and, prompt user with message
    let { email } = newDoctor.contacts;

    let doctorExists = await this.Model.findOne({ 'contacts.email': email });

    if (doctorExists && doctorExists.contacts.email === email) {
      super.conflict({ message: `Doctor with email ${email} already exists!` });
    }

    let doctor = await super.create({ body: newDoctor });

    if (doctor && doctor.contacts.email === email) {
      return super.success({ data: doctor, message: 'Doctor Inserted' });
    } else {
      super.fail();
    }
  }

  async updateDoctorByEmail({ email, body }) {
    let doctor = await this.Model.findOne({ 'contacts.email': email });

    if (doctor && doctor.contacts.email === email) {
      let result = await super.update({ id: doctor._id, body });

      if (result) {
        return super.success({ data: result, message: 'Doctor Updated' });
      } else {
        super.fail({ message: 'Doctor not updated!' });
      }
    } else {
      super.notFound({ message: `Doctor with email ${email} not found!` });
    }
  }

  async deleteDoctorByEmail({ email }) {
    const setActiveToFalse = { isActive: false };

    let doctor = await this.Model.findOne({ 'contacts.email': email });

    if (doctor && doctor.contacts.email === email) {
      let result = await super.delete({
        id: doctor._id,
        deleteDoc: setActiveToFalse
      });

      if (result && result.isActive === false) {
        return super.success({ message: 'Doctor Deleted' });
      } else {
        super.fail({ message: 'Doctor not deleted!' });
      }
    } else {
      super.notFound({ message: `Doctor with email ${email} not found!` });
    }
  }
}

exports.Doctor = Doctor;
