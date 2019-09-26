const fs = require('fs'),
  path = require('path');

const { Department } = require('../department');

const department = new Department();

const { departments } = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf-8')
);

exports.seedDepartments = async function() {
  try {
    const count = await department.Model.countDocuments();

    if (count === 0) {
      await department.Model.create(departments);
      console.log('Departments Seed Complete!');
    } else {
      throw new Error('Collection Departments: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};

exports.dropDepartments = async () => {
  try {
    const count = await department.Model.countDocuments();

    await department.Model.deleteMany();

    console.log(`Collection Doctors: Total ${count} Removed!`);
  } catch (e) {
    throw e;
  }
};
