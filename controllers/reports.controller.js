const reports = require("../models/reports.model");

const getReports = async (req, res) => {
  try {
    const allreports = await reports.getReportsModel();
    return res.json({
      message: "Get Data Success",
      data: allreports,
      length: allreports.length,
    });
  } catch (error) {
    return res.json({
      message: "Get Data Feild",
      data: {},
    });
  }
};

const getReportById = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const report = await reports.getReportByIdModel(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      message: "Get Data Success",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get Data Failed",
      error: error.message,
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
    res.json(`Add Data Success with reportId is ${reportId} `);
  } catch (error) {
    res.json(`Add Data Faild you have issue like this ${error}`);
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
      message: `Data Report with ReportId is ${reportId} Success Update`,
    });
  } catch (error) {
    res.json({
      message: "Data Field Update",
    });
  }
};

const deleteReport = async (req, res) => {
  try {
    const reportId = req.params.reportId;
    await reports.deleteReportModel(reportId);
    res.json({
      message: `Data report with id ${reportId} Deleted successfully`,
    });
  } catch (err) {
    res.json({
      error: err.message,
    });
  }
};

module.exports = {
  getReports,
  getReportById,
  addReport,
  updateReport,
  deleteReport,
};
