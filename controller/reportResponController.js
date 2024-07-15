const reportResponse = require("../models/reportResponse.model");

const getRespons = async (req, res) => {
  try {
    const allresponse = await reportResponse.getResponseModel();
    return res.json({
      message: "Data All report responses were successfully obtained",
      data: allresponse,
    });
  } catch (error) {
    return res.json({
      message: "Data All report responses failed to obtain",
    });
  }
};
const addRespons = async (req, res) => {
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
      message: `New Data with responseId ${responseId} Added successfully`,
    });
  } catch (error) {
    res.json({
      message: `New Data Failed to Add Because ${error}`,
    });
  }
};

const updateRespons = async (req, res) => {
  try {
    const responId = req.params.responId;
    const { reportId, userId } = req.body;
    const data = {
      reportId: reportId,
      userId: userId,
    };
    await reportResponse.updateResponseModel(responId, data);
    res.json({
      message: `Response Report Data with responseId ${responId} Successfully updated`,
    });
  } catch (error) {
    res.json({
      message: `Response Report Data Fails to Update Because ${error}`,
    });
  }
};

const deleteRespons = async (req, res) => {
  try {
    const responId = req.params.responId;
    await reportResponse.deleteResponseModel(responId);
    res.json({
      message: `Data response report with responseid ${responId} Successfully Deleted`,
    });
  } catch (error) {
    res.json({
      message: `Response Data Fails to Delete Because Has ${error}`,
    });
  }
};
module.exports = {
  getRespons,
  addRespons,
  updateRespons,
  deleteRespons,
};
