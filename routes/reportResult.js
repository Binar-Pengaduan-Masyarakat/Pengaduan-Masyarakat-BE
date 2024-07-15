const express = require("express"),
  router = express.Router(),
  reportResultController = require("../controller/reportResultController");

router
  .get("/all", reportResultController.getResults)
  .post("/add", reportResultController.addResult)
  .put("/update/:resultId", reportResultController.updateResult)
  .delete("/del/:resultId", reportResultController.deleteResult);

module.exports = router;
