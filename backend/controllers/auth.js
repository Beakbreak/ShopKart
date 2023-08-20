const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const Product = require("../models/Products");
const passport = require("passport");
require("../passport/auth");

// @desc   Register user
// @route Get /api/v1/auth/google
exports.google = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
});

exports.googleCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, userinfo) => {
    if (err) {
      return res.redirect("/failure");
    }
    const { emails, displayName, photos } = userinfo;
    let user = await User.findOne({ email: emails[0].value });

    if (!user) {
      user = await User.create({
        name: displayName,
        email: emails[0].value,
        profilePicture: photos[0].value,
      });
    }

    const token = user.getSignedJwtToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }

    res.cookie("token", token, options);
    return res.redirect(process.env.CLIENT_APP_URL);
  })(req, res, next);
});

// @desc Get current logged in user
// @route Get /api/v1/auth/me
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  if (user.recommendations.length !== 0) {
    const recommendations = await Product.find({
      asin: { $in: user.recommendations },
    });

    // Stringify the recommendations array
    user.recommendations = JSON.stringify(recommendations);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc   Log user out / clear cookie
// @route POST /api/v1/auth/logout
exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    data: {},
  });
});
