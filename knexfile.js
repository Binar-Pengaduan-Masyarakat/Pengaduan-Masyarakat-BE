// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "pengaduan-masyarakat-dev",
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
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "pengaduan-masyarakat-stg",
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
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "postgres",
      database: "pengaduan-masyarakat",
    },
    migrations: {
      directory: "./database/release/migrations",
    },
    seeds: {
      directory: "./database/release/seeds",
    },
  },
};
