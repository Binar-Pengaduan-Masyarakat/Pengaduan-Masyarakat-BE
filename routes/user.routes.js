const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const path = require("path");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/profiles"));
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const newFileName = `profile_${Date.now()}${ext}`;
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
  // GET user details by userId
  .get("/:userId", userController.getUserProfile)

  // PUT edit user details by userId with image upload
  .put(
    "/:userId",
    upload.single("profileImage"),
    userController.updateUserProfile
  )

  // DELETE user by userId
  .delete("/:userId", userController.deleteUserProfile);

module.exports = router;
