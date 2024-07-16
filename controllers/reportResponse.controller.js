const reportResponse = require("../models/reportResponse.model");

const getResponse = async (req, res) => {
  try {
    const allresponse = await reportResponse.getResponseModel();
    return res.json({
      message: "Get Data Success",
      data: allresponse,
    });
  } catch (error) {
    return res.json({
      message: "Get Data Field",
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
      message: "Data Successs Added",
    });
  } catch (error) {
    res.json({
      message: "Faild data added" + error,
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
      message: "Data Success Update",
    });
  } catch (err) {
    res.json({
      message: "Data Faild Update",
    });
  }
};

const deleteResponse = async (req, res) => {
  try {
    const responseId = req.params.responseId;
    await reportResponse.deleteResponseModel(responseId);
    res.json({
      message: "Data Success Delete",
    });
  } catch (error) {
    res.json({
      message: "Data Faild Delete",
    });
  }
};
module.exports = {
  getResponse,
  createResponse,
  updateResponse,
  deleteResponse,
};
