const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institution.controller");

router
  // GET all institutions
  .get("/", institutionController.getAllInstitutions)

  // POST create institution
  //   .post("/", institutionController.createInstitution)

  //   GET institution details by userId
  .get("/:userId", institutionController.getInstitutionById)

  //   PUT update institution details by userId
  .put("/:userId", institutionController.updateInstitution)

  //   DELETE institution by userId
  .delete("/:userId", institutionController.deleteInstitution);

module.exports = router;
