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
    .then((numRowsUpdated) => {
      console.log(`${numRowsUpdated} row(s) updated`);
      return numRowsUpdated;
    })
    .catch((err) => {
      console.log(err);
      throw err;
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
