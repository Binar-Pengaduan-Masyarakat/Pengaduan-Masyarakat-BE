const express = require("express");
const sameReporterController = require("../controller/sameReporter.controller");
const router = express.Router();

// MEM-POST SAME REPORTER (body harus berisi reportId dan userId)
router.post("/same-reporter", sameReporterController.postSameReporter);

// MENGECEK STATUS SAME REPORTER
// - APAKAH USER SUDAH MEMPOST SAMEREPORTER PADA reportId TERSEBUT
// - APAKAH USER MEMILIKI userId YANG SAMA DENGAN PENGIRIM reportId
router.get(
  "/check-same-reporter/:reportId/:userId",
  sameReporterController.checkSameReporterConditions
);

// MENGECEK JUMLAH SAME REPORTER PADA reportId TERTENTU
router.get(
  "/same-reporter-count/:reportId",
  sameReporterController.getSameReporterCount
);

// MENGHAPUS SAME REPORTER
router.post("/delete-same-reporter", sameReporterController.deleteSameReporter);

module.exports = router;