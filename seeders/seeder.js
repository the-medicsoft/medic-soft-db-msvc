const departmentsSeeder = require('./departments.seed');
const doctorsSeeder = require('./doctors.seed');
const clientsSeeder = require('./clients.seed');
const appointmentStatusSeeder = require('./appointmentStatus.seed');

(async function seeder() {
  const option = process.env.SEED_OPTION;

  switch (option) {
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

  await departmentsSeeder.seed();
  await doctorsSeeder.seed(seedLimit);
  await clientsSeeder.seed(seedLimit);
  await appointmentStatusSeeder.seed();

  process.exit(0);
}

async function drop() {
  await departmentsSeeder.drop();
  await clientsSeeder.drop();
  await doctorsSeeder.drop();
  await appointmentStatusSeeder.drop();

  process.exit(0);
}
