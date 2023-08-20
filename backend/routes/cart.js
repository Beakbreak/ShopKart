const express = require("express");
const { getCart, updateCart } = require("../controllers/cart");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.route("/").get(protect, getCart).put(protect, updateCart);

module.exports = router;
