/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DEV_DB_HOST,
      port: process.env.DEV_DB_PORT,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASSWORD,
      database: process.env.DEV_DB_NAME,
    },
    migrations: {
      directory: "./database/development/migrations",
    },
    seeds: {
      directory: "./database/development/seeds",
    },
  },

  staging: {
    client: "pg",
    connection: {
      host: process.env.STG_DB_HOST,
      port: process.env.STG_DB_PORT,
      user: process.env.STG_DB_USER,
      password: process.env.STG_DB_PASSWORD,
      database: process.env.STG_DB_NAME,
    },
    migrations: {
      directory: "./database/staging/migrations",
    },
    seeds: {
      directory: "./database/staging/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.PROD_DB_HOST,
      port: process.env.PROD_DB_PORT,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
    },
    migrations: {
      directory: "./database/production/migrations",
    },
    seeds: {
      directory: "./database/production/seeds",
    },
  },
};
