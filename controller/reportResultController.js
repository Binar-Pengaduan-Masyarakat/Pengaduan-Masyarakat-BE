const reportResult = require("../models/reportResult.model");

const getResults = async (req, res) => {
  try {
    const allResults = await reportResult.getResultsModel();
    res.json({
      message: "Get Data Success",
      data: allResults,
    });
  } catch (error) {
    res.json({
      message: "Get Data Faild",
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
      message: "Data Success Added",
    });
  } catch (error) {
    return res.json({
      message: `Data Failed Added Has error like ${error}`,
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
      message: "Data Success Update",
    });
  } catch (error) {
    return res.json({
      message: "Data Failed Added",
    });
  }
};

const deleteResult = async (req, res) => {
  try {
    const resultId = req.params.resultId;
    await reportResult.deleteResultModel(resultId);
    return res.json({
      message: "Data Success Delete",
    });
  } catch (error) {
    return res.json({
      message: "Data Failed Deleted",
    });
  }
};
module.exports = {
  getResults,
  addResult,
  updateResult,
  deleteResult,
};
