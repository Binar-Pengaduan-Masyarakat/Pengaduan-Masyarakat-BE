const knex = require("knex")(require("../knexfile")("test"));
const databaseSetup = require("../utils/databaseSetup.util");

beforeAll(async () => {
  await databaseSetup();
  await knex.migrate.latest();
  await knex.seed.run();
});

afterAll(async () => {
  await knex.migrate.rollback((all = true));
  await knex.destroy();
});

require("./components/chart.test");
require("./components/sameReporter.test");
require("./components/user.test");
require("./components/superAdmin.test");
require("./components/reports.test");
require("./components/reportResult.test");
require("./components/reportResponse.test");
require("./components/institution.test");
require("./components/category.test");
