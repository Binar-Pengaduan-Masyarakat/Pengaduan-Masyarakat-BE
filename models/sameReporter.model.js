const knex = require("knex")(require("../knexfile"));

const checkSameReporterConditions = async (reportId, userId) => {
  try {
    const report = await knex("UserReport").where({ reportId }).first();
    if (!report) {
      throw new Error("Report not found");
    }

    const user = await knex("User").where({ userId }).first();
    if (!user) {
      throw new Error("User not found");
    }

    const existingSameReporter = await knex("SameReporter")
      .where({ reportId, userId })
      .first();

    return {
      canReport: !existingSameReporter,
      message: existingSameReporter
        ? "You have already reported this as the same reporter"
        : "You can report this as the same reporter",
    };
  } catch (error) {
    console.error("checkSameReporterConditions error:", error);
    throw error;
  }
};

const createSameReporter = async (reportId, userId) => {
  try {
    const [newSameReporter] = await knex("SameReporter")
      .insert({ reportId, userId })
      .returning("*");
    return newSameReporter;
  } catch (error) {
    console.error("createSameReporter error:", error);
    throw error;
  }
};

module.exports = {
  checkSameReporterConditions,
  createSameReporter,
};
