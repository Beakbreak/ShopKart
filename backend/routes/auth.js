const express = require("express");
const { google, googleCallback, getMe } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/google").get(google);
router.route("/google/callback").get(googleCallback);
router.route("/me").get(protect, getMe);

module.exports = router;
