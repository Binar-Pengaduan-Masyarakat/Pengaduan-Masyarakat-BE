const reportResult = require("../models/reportResult.model");

const getResults = async (req, res) => {
  try {
    const allResults = await reportResult.getResultsModel();
    res.json({
      message: "Data All report results were successfully obtained",
      data: allResults,
    });
  } catch (error) {
    res.json({
      message: "Data All report results failed to obtain",
    });
  }
};

const addResult = async (req, res) => {
  try {
    const allResults = await reportResult.getResultsModel();
    const resultlength = allResults.length + 1;
    const resultId = `RE${resultlength}`;
    const { reportId, userId, resultContent, resultImage } = req.body;
    const data = {
      resultId: resultId,
      reportId: reportId,
      userId: userId,
      resultContent: resultContent,
      resultImage: resultImage,
    };
    await reportResult.createResultModel(data);
    return res.json({
      message: `New Data with resultId ${resultId} Added successfully`,
    });
  } catch (error) {
    return res.json({
      message: `New Data Failed to Add Because ${error}`,
    });
  }
};

const updateResult = async (req, res) => {
  try {
    const resultId = req.params.resultId;
    const { reportId, userId, resultContent, resultImage } = req.body;
    const data = {
      reportId: reportId,
      userId: userId,
      resultContent: resultContent,
      resultImage: resultImage,
    };
    await reportResult.updateResultModel(resultId, data);
    return res.json({
      message: `Result Report Data with resultId ${resultId} Successfully updated`,
    });
  } catch (error) {
    return res.json({
      message: `Result Report Data Fails to Update Because ${error}`,
    });
  }
};

const deleteResult = async (req, res) => {
  try {
    const resultId = req.params.resultId;
    await reportResult.deleteResultModel(resultId);
    return res.json({
      message: `Data result report with resultid ${resultId} Successfully Deleted`,
    });
  } catch (error) {
    return res.json({
      message: `Report Data Fails to Delete Because Has ${error}`,
    });
  }
};
module.exports = {
  getResults,
  addResult,
  updateResult,
  deleteResult,
};
