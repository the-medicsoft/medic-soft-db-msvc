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
      return super.success(doctors.length, doctors, undefined);
    } else {
      super.fail();
    }
  }

  async getDoctorByQuery(query) {
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
      return super.success(doctors.length, doctors, undefined);
    } else {
      super.notFound();
    }
  }

  async createDoctor(newDoctor) {
    // if doctor exists then do not insert and, prompt user with message
    let { email } = newDoctor.contacts;

    let doctorExists = await this.Model.findOne({ 'contacts.email': email });

    if (doctorExists && doctorExists.contacts.email === email) {
      super.conflict(`Doctor with email ${email} already exists!`);
    }

    let doctor = await super.create(newDoctor);

    if (doctor && doctor.contacts.email === email) {
      return super.success(undefined, doctor, `Doctor Inserted`);
    } else {
      super.fail();
    }
  }

  async updateDoctorByEmail(email, updateDoctorWith) {
    let doctor = await this.Model.findOne({ 'contacts.email': email });

    if (doctor && doctor.contacts.email === email) {
      let result = await super.update(doctor._id, updateDoctorWith);

      if (result) {
        return super.success(undefined, result, 'Doctor Updated');
      } else {
        super.fail('Doctor not updated!');
      }
    } else {
      super.notFound(`Doctor with email ${email} not found!`);
    }
  }

  async deleteDoctorByEmail(email) {
    const setActiveToFalse = { isActive: false };

    let doctor = await this.Model.findOne({ 'contacts.email': email });

    if (doctor && doctor.contacts.email === email) {
      let result = await super.delete(doctor._id, setActiveToFalse);

      if (result && result.isActive === false) {
        return super.success(undefined, undefined, 'Doctor Deleted');
      } else {
        super.fail('Doctor not deleted!');
      }
    } else {
      super.notFound(`Doctor with email ${email} not found!`);
    }
  }
}

exports.Doctor = Doctor;
