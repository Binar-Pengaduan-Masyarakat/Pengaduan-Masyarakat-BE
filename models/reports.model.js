const knex = require("knex")(require("../knexfile")());

const getReportsModel = async () => {
  return await knex.select("*").from("UserReport");
};

const getReportByIdModel = async (id) => {
  return await knex
    .select("*")
    .from("UserReport")
    .where({ reportId: id })
    .first();
};

const createReportsModel = async (data) => {
  return await knex("UserReport").insert(data).returning("*");
};

const updateReportModel = async (id, data) => {
  return await knex("UserReport")
    .where({ reportId: id })
    .update(data)
    .then(
      (numRowsupdate = () => {
        console.log(`${numRowsUpdated} row(s) updated`);
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

const deleteReportModel = async (id) => {
  const reportExists = await knex("UserReport").where({ reportId: id }).first();

  if (!reportExists) {
    throw new Error(`Report with ID ${id} does not exist`);
  }

  return knex("UserReport")
    .where({ reportId: id })
    .del()
    .then((numRowsDeleted) => {
      console.log(`${numRowsDeleted} row(s) deleted`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getReportsModel,
  getReportByIdModel,
  createReportsModel,
  updateReportModel,
  deleteReportModel,
};
