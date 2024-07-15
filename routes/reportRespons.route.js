const express = require("express"),
  route = express.Router(),
  reportResponseController = require("../controller/reportResponController");

route
  .get("/all", reportResponseController.getRespons)
  .post("/add", reportResponseController.addRespons)
  .put("/update/:responId", reportResponseController.updateRespons)
  .delete("/del/:responId", reportResponseController.deleteRespons);

module.exports = route;
