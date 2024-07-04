const express = require("express");
const router = express.Router();
const chartController = require("../controller/chart.controller");

// CHART - JUMLAH ROLE USER DENGAN INSTITUTION
router.get("/chart/user/role", chartController.getRoleDataset);

// CHART - PERBANDINGAN JUMLAH INSTITUTION DI TIAP NAMA KATEGORI
router.get("/chart/user/category", chartController.getCategoryDataset);

// CHART - STATISTIK TOTAL REPORT - RESPONDED REPORT - FINISHED REPORT
router.get("/chart/report/summary", chartController.getReportStatsDataset);

// CHART - STATISTIK...
// - JUMLAH UserReport YANG MASUK KE KATEGORI YANG SAMA DENGAN YANG DIMILIKI SATU INSTANSI/userId
// - JUMLAH ReportResponse YANG DILAKUKAN OLEH SATU INSTANSI/userId
// - JUMLAH ReportResult YANG DILAKUKAN OLEH SATU INSTANSI/userId
router.get(
  "/chart/user/institution/:userid",
  chartController.getUserReportResponseDataset
);

module.exports = router;
