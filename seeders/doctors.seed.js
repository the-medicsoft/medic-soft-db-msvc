const fakerAPI = require('./fakerAPI');
const { Doctor } = require('../doctor/doctor');
const { Department } = require('../department');

const doctor = new Doctor();
const department = new Department();

exports.seed = async (seedLimit = 1) => {
  try {
    const count = await doctor.Model.countDocuments();
    const departments = await department.Model.find();

    if (count === 0) {
      const fakeDoctors = await fakerAPI.fakeDoctors(seedLimit);

      // assign department._id inplace of deptName
      // otherwise Department will not populate as an object
      for (let doctor of fakeDoctors) {
        for (let department of departments) {
          if (doctor.department === department.deptName) {
            doctor.department = department._id;
          }
        }
      }

      await doctor.Model.create(fakeDoctors);

      console.log('Doctors Seed Complete!');
    } else {
      throw new Error('Collection Doctors: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.drop = async () => {
  try {
    const count = await doctor.Model.countDocuments();

    await doctor.Model.deleteMany();

    console.log(`Collection Doctors: Total ${count} Removed!`);
  } catch (e) {
    throw e;
  }
};
