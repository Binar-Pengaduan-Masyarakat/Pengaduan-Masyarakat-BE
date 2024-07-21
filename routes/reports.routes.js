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
      const ext = path.extname(file.originalname);
      const newFileName = `report_${Date.now()}${ext}`;
      cb(null, newFileName);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

router
  // GET report by reportId
  .get("/:reportId", reports.getReportById)

  // PUT update report by reportId
  .put("/:reportId", upload.single("reportImage"), reports.updateReport)

  // DELETE report by reportId
  .delete("/:reportId", reports.deleteReport)

  // POST create report
  .post("/", upload.single("reportImage"), reports.addReport)

  // GET all reports
  .get("/", reports.getReports);

module.exports = router;
