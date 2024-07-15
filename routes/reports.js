const express = require("express");
const router = express.Router();
const reports = require("../controller/reportsController");

router.get("/all", reports.getReports);
router.post("/add", reports.addReport);
router.put("/update/:reportId", reports.updateReport);
router.delete("/del/:reportId",reports.deleteReport);

module.exports = router;
