const reportResult = require("../models/reportResult.model");

const getResults = async (req, res) => {
  try {
    const allResults = await reportResult.getResultsModel();
    res.json({
      message: "Get Data Successfully",
      data: allResults,
    });
  } catch (error) {
    res.json({
      message: "Failed to Get Data",
    });
  }
};

const createResult = async (req, res) => {
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
      message: "Data Added Successfully",
    });
  } catch (error) {
    return res.json({
      message: `Data Failed to be Added`,
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
      message: "Data Updated Successfully",
    });
  } catch (error) {
    return res.json({
      message: "Data Failed to be Added",
    });
  }
};

const deleteResult = async (req, res) => {
  try {
    const resultId = req.params.resultId;
    await reportResult.deleteResultModel(resultId);
    return res.json({
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    return res.json({
      message: "Data Failed to be Deleted",
    });
  }
};
module.exports = {
  getResults,
  createResult,
  updateResult,
  deleteResult,
};
