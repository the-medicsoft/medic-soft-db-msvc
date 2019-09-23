const fs = require('fs');
const path = require('path');

const faker = require('faker');

const seedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'seed-data.json'), 'utf-8')
);

exports.fakeClients = async (seedLimit = 1) => {
  const clients = [];

  for (let i = 0; i < seedLimit; i++) {
    let client = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: {
        line1: `${faker.address.streetName()}, ${faker.address.streetAddress()}`,
        city: faker.address.city(),
        zipCode: faker.address.zipCode('#####'),
        state: faker.address.state(),
        country: faker.address.country()
      },
      contacts: {
        phones: [faker.phone.phoneNumber(), faker.phone.phoneNumber()],
        email: faker.internet.email()
      },
      password: seedData.passwordHash,
      gender: faker.random.arrayElement(seedData.genders)
    };

    clients.push(client);
  }

  return clients;
};

exports.fakeDoctors = async (seedLimit = 1) => {
  const doctors = await this.fakeClients(seedLimit);

  for (let doctor of doctors) {
    doctor.DOJ = faker.date.recent();
    doctor.isDoctor = faker.random.arrayElement(seedData.isDoctorOrAdmin);
    doctor.isAdmin = faker.random.arrayElement(seedData.isDoctorOrAdmin);
    doctor.department = faker.random.arrayElement(
      seedData.departments
    ).deptName;
    doctor.designation = faker.random.arrayElement(seedData.designations);
    doctor.specialisations = [
      faker.random.arrayElement(seedData.specialisations),
      faker.random.arrayElement(seedData.specialisations)
    ];
    doctor.visitingTime = [
      { branch: faker.address.city(), timings: new Date().getTime() }
    ];
  }

  return doctors;
};
