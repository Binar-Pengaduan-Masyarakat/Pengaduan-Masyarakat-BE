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

module.exports = {
  checkSameReporterConditions,
  postSameReporter,
};
