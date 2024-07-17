const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

router
  // POST create new user
  // .post("/", userController.createUserProfile)

  // GET user details by userId
  .get("/:userId", userController.getUserProfile)

  // PUT edit user details by userId
  .put("/:userId", userController.updateUserProfile)

  // DELETE user by userId
  .delete("/:userId", userController.deleteUserProfile);

module.exports = router;
