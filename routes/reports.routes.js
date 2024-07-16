const express = require("express");
const router = express.Router();
const reports = require("../controllers/reports.controller");

router
  // GET all reports
  .get("/", reports.getReports)

  // POST create report
  .post("/", reports.addReport)

  // PUT update report by reportId
  .put("/:reportId", reports.updateReport)

  // DELETE report by reportId
  .delete("/:reportId", reports.deleteReport);

module.exports = router;
