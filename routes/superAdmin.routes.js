const express = require("express");
const {
  getAllUsers,
  getAllInstitutions,
  createSuperAdmin,
  createInstitution,
  assignUserCategory,
  updateUserCategory,
} = require("../controllers/superAdmin.controller");

const router = express.Router();

router
  // POST create superadmin
  .post("/", createSuperAdmin)

  // GET All users listing
  .get("/users", getAllUsers)

  // GET All institutions
  .get("/institutions", getAllInstitutions)

  // POST create institution
  .post("/institutions", createInstitution)

  // POST assign category to user
  .post("/userCategory", assignUserCategory)

  // PUT update user category
  .put("/userCategory", updateUserCategory);

module.exports = router;
