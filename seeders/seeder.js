const departmentsSeeder = require('./departments.seed');

(async function run() {
  await departmentsSeeder();

  process.exit(0);
})();
