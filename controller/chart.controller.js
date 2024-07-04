const chartModel = require("../models/chart.model");
const { sendResponse, handleError } = require("../utils/responseHandler.util");

const getRoleDataset = async (req, res) => {
  try {
    const roles = ["USER", "INSTITUTION"];
    const { labels, data } = await chartModel.getRoleDataset(roles);
    sendResponse(res, 200, { labels, data });
  } catch (error) {
    handleError(res, error, "Failed to fetch role dataset");
  }
};

const getCategoryDataset = async (req, res) => {
  try {
    const { labels, data } = await chartModel.getUserCategoryDataset();
    sendResponse(res, 200, { labels, data });
  } catch (error) {
    handleError(res, error, "Failed to fetch category dataset");
  }
};

const getReportStatsDataset = async (req, res) => {
  try {
    const { labels, data } = await chartModel.getReportStatsDataset();
    sendResponse(res, 200, { labels, data });
  } catch (error) {
    handleError(res, error, "Failed to fetch report stats dataset");
  }
};

const getUserReportResponseDataset = async (req, res) => {
  try {
    const { userid } = req.params;
    const userExists = await chartModel.checkUserExists(userid);
    if (!userExists) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    const { labels, data } = await chartModel.getUserReportResponseDataset(
      userid
    );
    sendResponse(res, 200, { labels, data });
  } catch (error) {
    handleError(res, error, "Failed to fetch user report response data");
  }
};

module.exports = {
  getRoleDataset,
  getCategoryDataset,
  getReportStatsDataset,
  getUserReportResponseDataset,
};
