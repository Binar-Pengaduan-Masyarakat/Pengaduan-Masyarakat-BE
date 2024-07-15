const knex = require("knex")(require("../knexfile")());

const getResultsModel = async () => {
  return await knex.select("*").from("ReportResult");
};

const createResultModel = async (data) => {
  return await knex("ReportResult").insert(data).returning("*");
};
const updateResultModel = async (id, data) => {
  return await knex("ReportResult").where({ resultId: id }).update(data);
};
const deleteResultModel = async (id) => {
  return await knex("ReportResult").where({ resultId: id }).del();
};

module.exports = {
  getResultsModel,
  createResultModel,
  updateResultModel,
  deleteResultModel,
};
