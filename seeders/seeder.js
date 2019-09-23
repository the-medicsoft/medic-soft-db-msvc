const departmentsSeeder = require('./departments.seed');
const doctorsSeeder = require('./doctors.seed');
const clientsSeeder = require('./clients.seed');

(async function seeder() {
  const option = process.argv[2];

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
  const seedLimit = 20;

  await departmentsSeeder();
  await doctorsSeeder.seedDoctors(seedLimit);
  await clientsSeeder.seedClients(seedLimit);

  process.exit(0);
}

async function drop() {
  await clientsSeeder.dropClients();
  await doctorsSeeder.dropDoctors();

  process.exit(0);
}
