const express = require("express");
const sameReporterController = require("../controllers/sameReporter.controller");
const router = express.Router();

router
  // GET all same reporters
  .get("/count", sameReporterController.getSameReportersCount)

  // POST create a new same reporter
  .post("/:reportId", sameReporterController.postSameReporter)

  // GET count of same reporters for a report
  .get("/count/:reportId", sameReporterController.getSameReporterCount)

  // GET check if a user has already reported the same issue
  .get("/:reportId/:userId", sameReporterController.checkSameReporterConditions)

  // POST delete a same reporter (req.body needed)
  .post("/delete/:reportId", sameReporterController.deleteSameReporter);

module.exports = router;
