const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Cart = require("../models/Cart");

// @desc      Get cart
// @route     GET /api/v1/cart
// @access    Private
exports.getCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return next(
      new ErrorResponse(`No cart found for user ${req.user.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: cart });
});

// @desc      Update cart
// @route     PUT /api/v1/cart
// @access    Private
exports.updateCart = asyncHandler(async (req, res, next) => {
  const { items, totalAmount } = req.body;

  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    // If cart doesn't exist, create a new one
    cart = new Cart({
      items,
      totalAmount,
      user: req.user.id,
    });
  } else {
    // Update existing cart
    cart.items = items;
    cart.totalAmount = totalAmount;
  }

  await cart.save();

  res.status(200).json({ success: true, data: cart });
});
