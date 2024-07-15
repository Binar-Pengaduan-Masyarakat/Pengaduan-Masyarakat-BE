const knex = require("knex")(require("../knexfile")());

const getResponseModel = async () => {
  return await knex.select("*").from("ReportResponse");
};
const createResponseModel = async (data) => {
  return await knex("ReportResponse").insert(data).returning("*");
};
const updateResponseModel = async (id, data) => {
  return await knex("ReportResponse")
    .where({ responseId: id })
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
const deleteResponseModel = async (id) => {
  return await knex("ReportResponse")
    .where({ responseId: id })
    .del()
    .then(
      (numRowsupdate = () => {
        console.log(`${numRowsUpdated} row(s) updated`);
      })
    )
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  getResponseModel,
  createResponseModel,
  updateResponseModel,
  deleteResponseModel,
};
