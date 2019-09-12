const { Department } = require('../department');

const data = [
  {
    deptName: 'ent',
    description: 'Ear, Nose and Throat (ENT)',
    deptNo: 1
  },
  {
    deptName: 'cardiology',
    deptNo: 2
  },
  {
    deptName: 'chest',
    deptNo: 3
  },
  {
    deptName: 'dermatology',
    deptNo: 4
  },
  {
    deptName: 'Genral Physician',
    deptNo: 5
  }
];

module.exports = async function() {
  try {
    const count = await Department.countDocuments();

    if (count === 0) {
      await Department.createDepartment(data);
      console.log('Departments Seed Complete...Exiting!');
    } else {
      throw new Error('Collection Departments: Documents already exists!');
    }
  } catch (err) {
    console.error(err.message);
  }
};
