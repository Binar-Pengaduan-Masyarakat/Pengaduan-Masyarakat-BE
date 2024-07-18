const express = require("express"),
  route = express.Router(),
  reportResponseController = require("../controllers/reportResponse.controller");

route
  // GET all reportResponse
  .get("/", reportResponseController.getResponse)

  // POST create reportResponse
  .post("/", reportResponseController.createResponse)

  // PUT update reportResponse by responseId
  .put("/:responseId", reportResponseController.updateResponse)

  // DELETE reportResponse by responseId
  .delete("/:responseId", reportResponseController.deleteResponse)

  // GET reportResponse by reportId
  .get("/report/:reportId", reportResponseController.getResponseByReportId);

module.exports = route;
