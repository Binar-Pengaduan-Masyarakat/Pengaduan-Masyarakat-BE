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

  test: {
    client: "pg",
    connection: {
      host: process.env.TEST_DB_HOST,
      port: process.env.TEST_DB_PORT,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASSWORD,
      database: process.env.TEST_DB_NAME,
    },
    migrations: {
      directory: "./database/test/migrations",
    },
    seeds: {
      directory: "./database/test/seeds",
    },
    pool: {
      min: 0,
      max: 5,
      idleTimeoutMillis: 100,
      acquireTimeoutMillis: 1000,
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
