const express = require("express");
const {
  getAllUsers,
  getAllInstitutions,
  createInstitution,
} = require("../controllers/superAdmin.controller");

const router = express.Router();

router
  // GET All users listing.
  .get("/users", getAllUsers)

  // GET All institutions
  .get("/institutions", getAllInstitutions)

  // POST create institution
  .post("/institutions", createInstitution);

module.exports = router;
