// import to connect to DB
const DbConnection = require('webapi-framework/config/database');

const departmentsSeeder = require('./departments.seed');
const doctorsSeeder = require('./doctors.seed');
const clientsSeeder = require('./clients.seed');
const appointmentStatusSeeder = require('./appointmentStatus.seed');

(async function seeder() {
  switch (process.env.SEED_OPTION) {
    case 'run':
      await run();
      break;
    case 'drop':
      await drop();
      break;
    default:
      console.error('Exiting No Option Provided!');
      process.exit(1);
  }
})();

async function run() {
  const seedLimit = 50;

  await new DbConnection().connect();

  await appointmentStatusSeeder.seed();
  await departmentsSeeder.seed();
  await doctorsSeeder.seed(seedLimit);
  await clientsSeeder.seed(seedLimit);

  process.exit(0);
}

async function drop() {
  await new DbConnection().connect();
  
  await appointmentStatusSeeder.drop();
  await departmentsSeeder.drop();
  await clientsSeeder.drop();
  await doctorsSeeder.drop();

  process.exit(0);
}
