const express = require("express");
const sameReporterController = require("../controller/sameReporter.controller");

const router = express.Router();

router.post("/same-reporter", sameReporterController.postSameReporter);
router.get(
  "/check-conditions/:reportId/:userId",
  sameReporterController.checkSameReporterConditions
);

module.exports = router;
