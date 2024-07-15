const knex = require("knex")(require("../knexfile")());
const databaseCounter = require("./databaseCounter.model");

const checkUserExists = async (userId) => {
  try {
    const user = await knex("User").where({ userId }).first();
    return !!user;
  } catch (error) {
    console.error("checkUserExists error:", error);
    throw error;
  }
};

const getRoleDataset = async (roles) => {
  try {
    const roleCounts = await databaseCounter.findRoleCounts(roles);
    const labels = roleCounts.map((role) => {
      const roleName = role.roles.toLowerCase();
      return roleName.charAt(0).toUpperCase() + roleName.slice(1);
    });
    const data = roleCounts.map((role) => role.count);
    return { labels, data };
  } catch (error) {
    console.error("getRoleDataset error:", error);
    throw error;
  }
};

const getUserCategoryDataset = async () => {
  try {
    const categoryCounts = await databaseCounter.findUserCategoryCounts();
    const labels = categoryCounts.map((category) => category.categoryName);
    const data = categoryCounts.map((category) => category.userCount);
    return { labels, data };
  } catch (error) {
    console.error("getUserCategoryDataset error:", error);
    throw error;
  }
};

const getReportStatsDataset = async () => {
  try {
    const [reportCount, responseCount, resultCount] = await Promise.all([
      databaseCounter.findReportCounts(),
      databaseCounter.findResponseCounts(),
      databaseCounter.findReportResultCounts(),
    ]);

    const labels = ["Total Report", "Responded Report", "Finished Report"];
    const data = [reportCount, responseCount, resultCount];

    return { labels, data };
  } catch (error) {
    console.error("getReportStatsDataset error:", error);
    throw error;
  }
};

const getUserReportResponseDataset = async (userid) => {
  try {
    const [reportCount, responseCount, reportResultCount] = await Promise.all([
      databaseCounter.findUserCategoryReportCounts(userid),
      databaseCounter.findInstitutionResponseCounts(userid),
      databaseCounter.findReportResultCounts(userid),
    ]);

    const labels = ["UserReport", "ReportResponse", "ReportResult"];
    const data = [reportCount, responseCount, reportResultCount];

    return { labels, data };
  } catch (error) {
    console.error("getUserReportResponseDataset error:", error);
    throw error;
  }
};

module.exports = {
  checkUserExists,
  getRoleDataset,
  getUserCategoryDataset,
  getReportStatsDataset,
  getUserReportResponseDataset,
};
