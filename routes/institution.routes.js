const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institution.controller");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/profiles"));
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
  // GET all institutions
  .get("/", institutionController.getAllInstitutions)

  // GET institution details by userId
  .get("/:userId", institutionController.getInstitutionById)

  // PUT update institution details by userId with image upload
  .put(
    "/:userId",
    upload.single("institutionImage"),
    institutionController.updateInstitution
  )

  // DELETE institution by userId
  .delete("/:userId", institutionController.deleteInstitution);

module.exports = router;
