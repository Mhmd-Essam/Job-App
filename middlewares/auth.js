const { catchAsync } = require("./CatchAsync");
const ApiError = require("./apiError");
const jwt = require("jsonwebtoken");
const User = require("./../models/UserModel");

exports.isAuthorized = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ApiError("user not authorized", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user= await User.findById(decoded.id);

  next();
});

