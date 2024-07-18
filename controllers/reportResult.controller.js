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

const getReportResultById = async (req, res) => {
  try {
    const resultId = req.params.reportId;
    const result = await reportResult.getReportResultByIdModel(resultId); // Assuming you have this function in your model
    if (result) {
      res.json({
        message: "Get Data Successfully",
        data: result,
      });
    } else {
      res.json({
        message: "Report Result not found",
      });
    }
  } catch (error) {
    res.json({
      message: "Failed to Get Data",
    });
  }
};

const createResult = async (req, res) => {
  try {
    const { reportId, userId, resultContent, resultImage } = req.body;
    const data = {
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
    const { userId, resultContent, resultImage } = req.body;
    const data = {
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
  getReportResultById,
  createResult,
  updateResult,
  deleteResult,
};
