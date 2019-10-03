const departmentsSeeder = require('./departments.seed');
const doctorsSeeder = require('./doctors.seed');
const clientsSeeder = require('./clients.seed');

(async function seeder() {
  const option = process.env.SEED_OPTION;

  switch (option) {
    case 'run':
      await run();
      break;
    case 'drop':
      await drop();
      break;
  }
})();

async function run() {
  const seedLimit = 50;

  await departmentsSeeder.seedDepartments();
  await doctorsSeeder.seedDoctors(seedLimit);
  await clientsSeeder.seedClients(seedLimit);

  process.exit(0);
}

async function drop() {
  await departmentsSeeder.dropDepartments();
  await clientsSeeder.dropClients();
  await doctorsSeeder.dropDoctors();

  process.exit(0);
}
