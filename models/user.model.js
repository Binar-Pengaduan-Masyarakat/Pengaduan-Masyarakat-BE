const knex = require("knex")(require("../knexfile")());

const User = {
  async findById(userId) {
    return knex("User").where({ userId }).first();
  },

  async findByEmail(email) {
    return knex("User").where({ email }).first();
  },

  async findByRole(roles) {
    return knex("User").where({ roles }).select("*");
  },

  async create(user) {
    return knex("User").insert(user).returning("*");
  },

  async update(userId, user) {
    return knex("User").where({ userId }).update(user).returning("*");
  },

  async delete(userId) {
    return knex("User").where({ userId }).del();
  },
};

module.exports = User;
