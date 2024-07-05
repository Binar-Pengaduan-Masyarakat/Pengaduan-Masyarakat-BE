const { Client } = require("pg");
const knexConfig = require("../knexfile")();
const knex = require("knex")(knexConfig);

async function createDatabaseIfNotExists() {
  const { connection } = knexConfig;

  const client = new Client({
    host: connection.host,
    port: connection.port,
    user: connection.user,
    password: connection.password,
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [connection.database]
    );

    if (res.rows.length === 0) {
      await client.query(`CREATE DATABASE "${connection.database}"`);
      console.log(`Database "${connection.database}" created`);
    } else {
      console.log(`Database "${connection.database}" already exists`);
    }
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = async () => {
  await createDatabaseIfNotExists();
  await knex.migrate.latest();
};
