const express = require("express"),
  router = express.Router(),
  reportResultController = require("../controllers/reportResult.controller");

router
  // GET all reportResults
  .get("/", reportResultController.getResults)

  // POST create reportResult
  .post("/", reportResultController.createResult)

  // PUT update reportResult by resultId
  .put("/:resultId", reportResultController.updateResult)

  // DELETE reportResult by resultId
  .delete("/:resultId", reportResultController.deleteResult)

  // GET reportResult by reportId
  .get("/:reportId", reportResultController.getReportResultById);

module.exports = router;
