const knex = require("knex")(require("../knexfile")());

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

    const isPoster = report.userId === userId;
    const existingSameReporter = await knex("SameReporter")
      .where({ reportId, userId })
      .first();

    if (isPoster) {
      return {
        canReport: false,
        isPoster,
        message: "You cannot report your own post as same reporter",
      };
    } else if (existingSameReporter) {
      return {
        canReport: false,
        isPoster,
        message: "You have already reported this as the same reporter",
      };
    } else {
      return {
        canReport: true,
        isPoster,
        message: "You can report this as the same reporter",
      };
    }
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

const getSameReporterCount = async (reportId) => {
  try {
    const count = await knex("SameReporter")
      .where({ reportId })
      .count("* as count")
      .first();
    return count.count;
  } catch (error) {
    console.error("getSameReporterCount error:", error);
    throw error;
  }
};

const getSameReportersCount = async () => {
  try {
    const count = await knex("SameReporter");
    return count;
  } catch (error) {
    console.error("getSameReporterCount error:", error);
    throw error;
  }
};

const deleteSameReporter = async (reportId, userId) => {
  try {
    const deletedCount = await knex("SameReporter")
      .where({ reportId, userId })
      .del();
    return deletedCount;
  } catch (error) {
    console.error("deleteSameReporter error:", error);
    throw error;
  }
};

module.exports = {
  checkSameReporterConditions,
  createSameReporter,
  getSameReporterCount,
  getSameReportersCount,
  deleteSameReporter,
};
