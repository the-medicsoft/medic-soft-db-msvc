const fs = require('fs'),
  path = require('path');

const { AppointmentStatus } = require('../appointment');

const appointmentStatus = new AppointmentStatus();

exports.seed = async () => {
  try {
    const count = await appointmentStatus.Model.countDocuments();

    if (count === 0) {
      const { appointmentsStatus } = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf-8')
      );

      await appointmentStatus.Model.create(appointmentsStatus);
      
      console.log('AppointmentStatus Seed Complete!');
    } else {
      throw new Error('Collection AppointmentStatus: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.drop = async () => {
  try {
    const count = await appointmentStatus.Model.countDocuments();

    await appointmentStatus.Model.deleteMany();

    console.log(`Collection AppointmentStatus: Total ${count} Removed!`);
  } catch (e) {
    throw e;
  }
};
