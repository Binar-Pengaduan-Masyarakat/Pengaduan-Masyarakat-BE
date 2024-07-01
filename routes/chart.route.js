const express = require("express");
const router = express.Router();
const chartController = require("../controller/chart.controller");

// SEMENTARA PAKE PARAM DULU

// CHART - JUMLAH ROLE USER DENGAN INSTITUTION
router.get("/dataset/user/role", chartController.getRoleDataset);

// CHART - PERBANDINGAN JUMLAH INSTITUTION DI TIAP NAMA KATEGORI
router.get("/dataset/user/category", chartController.getCategoryDataset);

// CHART - STATISTIK TOTAL REPORT - RESPONDED REPORT - FINISHED REPORT
router.get("/dataset/report/summary", chartController.getReportStatsDataset);

// CHART
router.get(
  "/dataset/user/report/:userid",
  chartController.getUserReportResponseDataset
);

module.exports = router;
