const express = require("express");
const router = express.Router();
const reports = require("../controllers/reports.controller");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/reports"));
    },
    filename: function (req, file, cb) {
      const newFileName = `report_${Date.now()}_${file.originalname}`;
      cb(null, newFileName);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

router
  // GET all reports
  .get("/", reports.getReports)

  // POST create report
  .post("/", upload.single("reportImage"), reports.addReport)

  // PUT update report by reportId
  .put("/:reportId", reports.updateReport)

  // DELETE report by reportId
  .delete("/:reportId", reports.deleteReport)

  // GET report by reportId
  .get("/:reportId", reports.getReportById);

module.exports = router;
