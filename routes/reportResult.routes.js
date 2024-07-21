const express = require("express");
const router = express.Router();
const reportResultController = require("../controllers/reportResult.controller");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/reportResults"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const newFileName = `result_${Date.now()}${ext}`;
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
  // GET all reportResults
  .get("/", reportResultController.getResults)

  // GET reportResult by reportId
  .get("/:reportId", reportResultController.getReportResultById)

  // POST create reportResult with image upload
  .post("/", upload.single("resultImage"), reportResultController.createResult)

  // PUT update reportResult by resultId
  .put(
    "/:resultId",
    upload.single("resultImage"),
    reportResultController.updateResult
  )

  // DELETE reportResult by resultId
  .delete("/:resultId", reportResultController.deleteResult);

module.exports = router;
