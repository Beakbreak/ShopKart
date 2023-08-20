const express = require("express");
const { getProducts, getProduct, getRecommendedProducts } = require("../controllers/products");

const Product = require("../models/Products");

const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(advancedResults(Product), getProducts);

router.route("/:asin").get(getProduct);

router.route("/recommended-products").get(protect, getRecommendedProducts);

module.exports = router;
