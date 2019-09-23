const fs = require('fs'),
  path = require('path');

const { Department } = require('../department');

const departments = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf-8')
);

module.exports = async function() {
  try {
    const count = await Department.countDocuments();

    if (count === 0) {
      await Department.createDepartment(departments);
      console.log('Departments Seed Complete!');
    } else {
      throw new Error('Collection Departments: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};
