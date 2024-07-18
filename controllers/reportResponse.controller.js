const reportResponse = require("../models/reportResponse.model");

const getResponse = async (req, res) => {
  try {
    const allresponse = await reportResponse.getResponseModel();
    return res.json({
      message: "Get Data Successfully",
      data: allresponse,
    });
  } catch (error) {
    return res.json({
      message: "Get Data has Failed",
    });
  }
};

const getResponseByReportId = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const allresponse = await reportResponse.getResponseByReportId(reportId);
    return res.json({
      message: "Get Data Successfully",
      data: allresponse,
    });
  } catch (error) {
    return res.json({
      message: "Get Data has Failed",
    });
  }
};

const createResponse = async (req, res) => {
  try {
    const allRespons = await reportResponse.getResponseModel();
    const responslength = allRespons.length + 1;
    const responseId = `RR${responslength}`;
    // const { userId, reportId } = req.params;
    const { reportId, userId } = req.body;
    const data = {
      responseId: responseId,
      reportId: reportId,
      userId: userId,
    };
    await reportResponse.createResponseModel(data);
    res.json({
      message: "Data Added Successfully",
    });
  } catch (error) {
    res.json({
      message: "Faild to add Data" + error,
    });
  }
};

const updateResponse = async (req, res) => {
  try {
    const responseId = req.params.responseId;
    const { reportId, userId } = req.body;
    const data = {
      reportId: reportId,
      userId: userId,
    };
    await reportResponse.updateResponseModel(responseId, data);
    res.json({
      message: "Data Updated Successfully",
    });
  } catch (err) {
    res.json({
      message: "Failed to Update",
    });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const responseId = req.params.responseId;
    await reportResponse.deleteResponseModel(responseId);
    res.json({
      message: "Data Deleted Successfully",
    });
  } catch (error) {
    res.json({
      message: "Failed to Delete Data",
    });
  }
};
module.exports = {
  getResponse,
  getResponseByReportId,
  createResponse,
  updateResponse,
  deleteResponse,
};
