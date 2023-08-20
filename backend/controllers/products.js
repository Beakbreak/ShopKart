const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Products");
const User = require("../models/User");

// @desc   Get all products
// @route  GET /api/v1/products
// @access Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc   Get single product
// @route  GET /api/v1/products/:asin
// @access Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({ asin: req.params.asin });

  if (!product) {
    return next(
      new ErrorResponse(
        `Product not found with asin of ${req.params.asin}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc   Get recommended products for a user
// @route  GET /api/v1/products/recommended-products
// @access Public
exports.getRecommendedProducts = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const recommendedASINs = user.recommendations;

  const recommendedProducts = await Product.find({ asin: { $in: recommendedASINs } });

  res.status(200).json({ success: true, data: recommendedProducts });
});

