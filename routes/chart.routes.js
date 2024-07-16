const express = require("express");
const router = express.Router();
const chartController = require("../controllers/chart.controller");

router
  // GET chartdata for total user and institution
  .get("/users/roles", chartController.getRoleDataset)

  // GET chart data for institution count on each category
  .get("/institutions/categories", chartController.getCategoryDataset)

  // GET chart data for TOTAL REPORT - RESPONDED REPORT - FINISHED REPORT
  .get("/reports/stats", chartController.getReportStatsDataset)

  // GET chart data
  // - JUMLAH UserReport YANG MASUK KE KATEGORI YANG SAMA DENGAN YANG DIMILIKI SATU INSTANSI/userId
  // - JUMLAH ReportResponse YANG DILAKUKAN OLEH SATU INSTANSI/userId
  // - JUMLAH ReportResult YANG DILAKUKAN OLEH SATU INSTANSI/userId
  .get("/institution/:userid", chartController.getUserReportResponseDataset);

module.exports = router;
