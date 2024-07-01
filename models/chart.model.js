const databaseCounter = require("./databaseCounter.model");

const getRoleDataset = async (roles) => {
  try {
    const roleCounts = await databaseCounter.findRoleCounts(roles);

    const labels = roleCounts.map(({ role }) => role);
    const data = roleCounts.map(({ count }) => count);

    if (!data || !data.length) {
      console.warn("No user found");
      return { labels: [], data: [] };
    }
    console.log("User fetched successfully");
    return { labels, data };
  } catch (error) {
    console.error("getRoleDataset error:", error);
    throw error;
  }
};

const getUserCategoryDataset = async () => {
  try {
    const categoryCounts = await databaseCounter.findUserCategoryCounts();

    const labels = categoryCounts.map(({ categoryName }) => categoryName);
    const data = categoryCounts.map(({ userCount }) => userCount);

    if (!data || !data.length) {
      console.warn("No data found");
      return { labels: [], data: [] };
    }

    console.log("Category dataset fetched successfully");
    return { labels, data };
  } catch (error) {
    console.error("getUserCategoryDataset error:", error);
    throw error;
  }
};

const getReportStatsDataset = async () => {
  try {
    const reportCount = await databaseCounter.findReportCounts();
    const responseCount = await databaseCounter.findResponseCounts();
    const resultCount = await databaseCounter.findReportResultCounts();

    const labels = ["TOTAL REPORT", "RESPONDED REPORT", "FINISHED REPORT"];
    const data = [reportCount, responseCount, resultCount];

    if (!data || !data.length) {
      console.warn("No data found");
      return { labels: [], data: [] };
    }

    console.log("Report summary dataset fetched successfully");
    return { labels, data };
  } catch (error) {
    console.error("getReportStatsDataset error:", error);
    throw error;
  }
};

const getUserReportResponseDataset = async (userid) => {
  try {
    const responseCount = await databaseCounter.findInstitutionResponseCounts(
      userid
    );
    const reportCount = await databaseCounter.findUserCategoryReportCounts(
      userid
    );
    const reportResultCount = await databaseCounter.findReportResultCounts(
      userid
    );

    const labels = ["ReportResponse", "UserReport", "ReportResult"];
    const data = [responseCount, reportCount, reportResultCount];

    console.log("User report response dataset fetched successfully");
    return { labels, data };
  } catch (error) {
    console.error("getUserReportResponseDataset error:", error);
    throw error;
  }
};

module.exports = {
  getRoleDataset,
  getUserCategoryDataset,
  getReportStatsDataset,
  getUserReportResponseDataset,
};
