const reports = require("../models/reports.model");

const getReports = async (req, res) => {
  try {
    const allreports = await reports.getReportsModel();
    return res.json({
      message: "Get All Data Reports Success",
      data: allreports,
      length: allreports.length,
    });
  } catch (error) {
    return res.json({
      message: "Get All Data Reports Failed",
      data: {},
    });
  }
};

const addReport = async (req, res) => {
  try {
    // const userId = req.params.userId;
    const allreports = await reports.getReportsModel();
    const reportindex = allreports.length + 1;
    const reportId = `UR${reportindex}`;
    const {
      reportContent,
      reportImage,
      categoryId,
      userId,
      district,
      subdistrict,
      address,
    } = req.body;

    const data = {
      reportId: reportId,
      reportContent: reportContent,
      reportImage: reportImage,
      categoryId: categoryId,
      userId: userId,
      district: district,
      subdistrict: subdistrict,
      address: address,
    };
    await reports.createReportsModel(data);
    res.json(`New Data with reportId ${reportId} Added successfully`);
  } catch (error) {
    res.json(`New Data Failed to Add Because ${error}`);
  }
};

const updateReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const {
      reportContent,
      reportImage,
      categoryId,
      userId,
      district,
      subdistrict,
      address,
    } = req.body;
    const data = {
      reportContent: reportContent,
      reportImage: reportImage,
      categoryId: categoryId,
      userId: userId,
      district: district,
      subdistrict: subdistrict,
      address: address,
    };
    await reports.updateReportModel(reportId, data);
    res.json({
      message: `Report Data with reportId ${reportId} Successfully updated  `,
    });
  } catch (error) {
    res.json({
      message: `Report Data Fails to Update Because ${error} `,
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await reports.deleteReportModel(reportId);
    res.json({
      message: `Data report with reportid ${reportId} Successfully Deleted`,
    });
  } catch (err) {
    res.json({
      message: `Report Data Fails to Delete Because Has ${err}`,
    });
  }
};

module.exports = {
  getReports,
  addReport,
  updateReport,
  deleteReport,
};
