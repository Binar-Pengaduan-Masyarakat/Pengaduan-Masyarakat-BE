const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router
  // POST login
  .post("/login", authController.login)

  // POST register
  .post("/register", authMiddleware.checkUserExist, authController.register)

  // GET verify email
  .get("/verify-email", authController.getVerifyEmail);

module.exports = router;
