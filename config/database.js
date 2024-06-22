const knex = require("knex");
const knexfile = require("../knexfile");
const db = knex(knexfile.develpoment);

module.exports = db;
