/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
module.exports = require("./config/database")[process.env.NODE_ENV];
