const express = require("express");
const { getProducts, getProduct } = require("../controllers/products");

const Product = require("../models/Products");

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(advancedResults(Product), getProducts);

router.route("/:asin").get(getProduct);

module.exports = router;
