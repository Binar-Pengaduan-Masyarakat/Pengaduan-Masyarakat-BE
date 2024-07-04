const knex = require("knex")(require("../knexfile"));

// MENGHITUNG JUMLAH USER PADA ROLE
const findRoleCounts = async (roles) => {
  console.log("Roles:", roles);
  try {
    const results = await Promise.all(
      roles.map(async (role) => {
        const result = await knex("User").select().where({ roles: role });
        return { role, count: result.length };
      })
    );
    return results;
  } catch (error) {
    console.error("findRoleCounts error:", error);
    throw error;
  }
};

// MENGHITUNG JUMLAH USER PADA TIAP KATEGORI
const findUserCategoryCounts = async () => {
  try {
    const result = await knex("UserCategory")
      .select(
        "Category.categoryName",
        knex.raw('COUNT("UserCategory"."userId") as "userCount"')
      )
      .innerJoin("Category", "UserCategory.categoryId", "Category.categoryId")
      .groupBy("UserCategory.categoryId", "Category.categoryName");

    return result;
  } catch (error) {
    console.error("findUserCategoryCounts error:", error);
    throw error;
  }
};

// MENGHITUNG JUMLAH UserReport SECARA KESELURUHAN
const findReportCounts = async () => {
  try {
    const result = await knex("UserReport").count("reportId as count");
    return result[0].count;
  } catch (error) {
    console.error("findReportCounts error:", error);
    throw error;
  }
};

// MENGHITUNG JUMLAH ReportResponse SECARA KESELURUHAN
const findResponseCounts = async () => {
  try {
    const result = await knex("ReportResponse").count("responseId as count");
    return result[0].count;
  } catch (error) {
    console.error("findResponseCounts error:", error);
    throw error;
  }
};

// MENGHITUNG JUMLAH ReportResult SECARA KESELURUHAN
const findReportResultCounts = async (userid) => {
  try {
    let reportResultCount;
    if (userid) {
      const userCategories = await knex("UserCategory")
        .where({ userId: userid })
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

// MENGHITUNG JUMLAH ReportResponse YANG DILAKUKAN SATU INSTANSI(USERID)
const findInstitutionResponseCounts = async (userid) => {
  try {
    const institutionResponse = await knex("ReportResponse")
      .where({ userId: userid })
      .count("responseId as count");
    return institutionResponse[0].count;
  } catch (error) {
    console.error("findInstitutionResponseCounts error:", error);
    throw error;
  }
};

// MENGHITUNG JUMLAH UserReport PADA UserCategory YANG SAMA DENGAN YANG DIMILIKI INSTANSI(USERID)
const findUserCategoryReportCounts = async (userid) => {
  try {
    const userCategories = await knex("UserCategory")
      .where({ userId: userid })
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

module.exports = {
  findRoleCounts,
  findUserCategoryCounts,
  findReportCounts,
  findResponseCounts,
  findReportResultCounts,
  findInstitutionResponseCounts,
  findUserCategoryReportCounts,
};
