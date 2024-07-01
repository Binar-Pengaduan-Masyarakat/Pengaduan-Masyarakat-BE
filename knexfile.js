/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = require("./config/database");

module.exports = config[process.env.NODE_ENV];
