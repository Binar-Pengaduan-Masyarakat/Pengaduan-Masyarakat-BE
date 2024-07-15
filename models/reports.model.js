const knex = require("knex")(require("../knexfile")());

const getReportsModel = async () => {
  return await knex.select("*").from("UserReport");
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
  return knex("UserReport")
    .where({ reportId: id })
    .del()
    .then(
      (numberRowsUpdate = () => {
        console.log(`${numRowsUpdated}row(s) updated `);
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getReportsModel,
  createReportsModel,
  updateReportModel,
  deleteReportModel,
};
