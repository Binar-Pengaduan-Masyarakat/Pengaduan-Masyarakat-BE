const reportResponse = require("../models/reportResponse.model");

const getRespons = async (req, res) => {
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
      message: "Data Successs Added",
    });
  } catch (error) {
    res.json({
      message: "Faild data added" + error,
    });
  }
};

const updateRespons = async (req, res) => {
  try {
    const responId = req.params.responsId;
    const { reportId, userId } = req.body;
    const data = {
      reportId: reportId,
      userId: userId,
    };
    await reportResponse.updateResponseModel(responId, data);
    res.json({
      message: "Data Success Update",
    });
  } catch (err) {
    res.json({
      message: "Data Faild Update",
    });
  }
};

const deleteRespons = async (req, res) => {
  try {
    const responId = req.params.responId;
    await reportResponse.deleteResponseModel(responId);
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
  getRespons,
  addRespons,
  updateRespons,
  deleteRespons,
};
