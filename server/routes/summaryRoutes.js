const express = require("express");
const router = express.Router();
const {
    saves,
    getSummary,
    deleteSummary,
} = require("../controllers/summaryController");
router.route("/saves").post(saves);
router.route("/getSummary").post(getSummary);
router.route("/deleteSummary").post(deleteSummary);

module.exports = router;
