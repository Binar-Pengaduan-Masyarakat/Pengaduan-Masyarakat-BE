const sameReporterModel = require("../models/sameReporter.model");
const { sendResponse, handleError } = require("../utils/responseHandler.util");

const checkSameReporterConditions = async (req, res) => {
  try {
    const { reportId, userId } = req.params;
    const conditions = await sameReporterModel.checkSameReporterConditions(
      reportId,
      userId
    );
    sendResponse(res, 200, conditions);
  } catch (error) {
    handleError(res, error, "Failed to check SameReporter conditions");
  }
};

const postSameReporter = async (req, res) => {
  try {
    const { reportId, userId } = req.body;
    const newSameReporter = await sameReporterModel.createSameReporter(
      reportId,
      userId
    );
    sendResponse(res, 201, newSameReporter);
  } catch (error) {
    handleError(res, error, "Failed to post SameReporter");
  }
};

const getSameReporterCount = async (req, res) => {
  try {
    const { reportId } = req.params;
    const count = await sameReporterModel.getSameReporterCount(reportId);
    sendResponse(res, 200, { count });
  } catch (error) {
    handleError(res, error, "Failed to get SameReporter count");
  }
};

const deleteSameReporter = async (req, res) => {
  try {
    const { reportId, userId } = req.body;
    const deletedCount = await sameReporterModel.deleteSameReporter(
      reportId,
      userId
    );
    if (deletedCount === 0) {
      return sendResponse(res, 404, { message: "SameReporter not found" });
    }
    sendResponse(res, 200, { message: "SameReporter deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete SameReporter");
  }
};

module.exports = {
  checkSameReporterConditions,
  postSameReporter,
  getSameReporterCount,
  deleteSameReporter,
};
