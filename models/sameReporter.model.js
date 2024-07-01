const knex = require("knex")(require("../knexfile"));

const checkSameReporterConditions = async (reportId, userId) => {
  try {
    const [isSubmitted, isPoster] = await Promise.all([
      knex("SameReporter").where({ reportId, userId }).first(),
      knex("UserReport").where({ reportId, userId }).first(),
    ]);

    return { isSubmitted: !!isSubmitted, isPoster: !!isPoster };
  } catch (error) {
    console.error("checkSameReporterConditions error:", error);
    throw error;
  }
};

const createSameReporter = async (reportId, userId) => {
  try {
    const { isSubmitted, isPoster } = await checkSameReporterConditions(
      reportId,
      userId
    );

    if (isPoster) {
      throw new Error("The user cannot report their own report.");
    }

    if (isSubmitted) {
      throw new Error(
        "The user has already submitted a report for this reportId."
      );
    }

    const newSameReporter = await knex("SameReporter").insert(
      { reportId, userId },
      "*"
    );
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
