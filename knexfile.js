/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

const databaseConfigs = require("./config/database");

module.exports = (environment) => {
  const env = environment || process.env.NODE_ENV;
  return databaseConfigs[env];
};
