const knex = require("knex")(require("../knexfile")());

const findRoleCounts = async (roles) => {
  try {
    return await knex("User")
      .select("roles")
      .count("* as count")
      .whereIn("roles", roles)
      .groupBy("roles");
  } catch (error) {
    console.error("findRoleCounts error:", error);
    throw error;
  }
};

const findUserCategoryCounts = async () => {
  try {
    return await knex("UserCategory")
      .select(
        "Category.categoryName",
        knex.raw('COUNT("UserCategory"."userId") as "userCount"')
      )
      .innerJoin("Category", "UserCategory.categoryId", "Category.categoryId")
      .groupBy("UserCategory.categoryId", "Category.categoryName");
  } catch (error) {
    console.error("findUserCategoryCounts error:", error);
    throw error;
  }
};

const findReportCounts = async () => {
  try {
    const result = await knex("UserReport").count("* as count").first();
    return result.count;
  } catch (error) {
    console.error("findReportCounts error:", error);
    throw error;
  }
};

const findResponseCounts = async () => {
  try {
    const result = await knex("ReportResponse").count("* as count").first();
    return result.count;
  } catch (error) {
    console.error("findResponseCounts error:", error);
    throw error;
  }
};

const findReportResultCounts = async (userId) => {
  try {
    let reportResultCount;

    if (userId) {
      const userCategories = await knex("UserCategory")
        .where({ userId: userId })
        .select("categoryId");

      const categoryIds = userCategories.map((category) => category.categoryId);

      const reportIds = await knex("UserReport")
        .whereIn("categoryId", categoryIds)
        .select("reportId");

      reportResultCount = await knex("ReportResult")
        .whereIn(
          "reportId",
          reportIds.map((report) => report.reportId)
        )
        .count("* as count");
    } else {
      reportResultCount = await knex("ReportResult").count("* as count");
    }

    const totalReportResultCount = reportResultCount[0].count || 0;
    return totalReportResultCount;
  } catch (error) {
    console.error("findReportResultCounts error:", error);
    throw error;
  }
};

const findUserCategoryReportCounts = async (userId) => {
  try {
    const userCategories = await knex("UserCategory")
      .where({ userId: userId })
      .select("categoryId");

    const categoryIds = userCategories.map((category) => category.categoryId);

    const reportCounts = await knex("UserReport")
      .whereIn("categoryId", categoryIds)
      .count("reportId as count");

    const totalReportCount = reportCounts[0].count || 0;

    return totalReportCount;
  } catch (error) {
    console.error("findUserCategoryReportCounts error:", error);
    throw error;
  }
};

const findInstitutionResponseCounts = async (userId) => {
  try {
    const institutionResponse = await knex("ReportResponse")
      .where({ userId: userId })
      .count("responseId as count");
    return institutionResponse[0].count;
  } catch (error) {
    console.error("findInstitutionResponseCounts error:", error);
    throw error;
  }
};

module.exports = {
  findRoleCounts,
  findUserCategoryCounts,
  findReportCounts,
  findResponseCounts,
  findReportResultCounts,
  findInstitutionResponseCounts,
  findUserCategoryReportCounts,
};
