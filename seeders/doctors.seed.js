const fakerAPI = require('./fakerAPI');
const { Doctor } = require('../doctor/doctor');

exports.seedDoctors = async (seedLimit = 1) => {
  try {
    const count = await Doctor.countDocuments();

    if (count === 0) {
      const data = await fakerAPI.fakeDoctors(seedLimit);

      await Doctor.create(data);

      console.log('Doctors Seed Complete!');
    } else {
      throw new Error('Collection Doctors: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.dropDoctors = async () => {
  try {
    const count = await Doctor.countDocuments();

    await Doctor.deleteMany();

    console.log(`Collection Doctors: Total ${count} Removed!`);
  } catch (e) {
    throw e;
  }
};
