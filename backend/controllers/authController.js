const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { createSendToken } = require("../utils/createToken");

exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, country, email, password, passwordConfirm } =
    req.body;

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
  );

  if (!password.match(strongRegex)) {
    return next(
      new AppError(
        "Password should contain one symbol and one number and must be greather than 6."
      )
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }
  const newUser = await User.create({
    firstName,
    lastName,
    country,
    email,
    password,
    passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.hasAuthorization = catchAsync(async (req, res, next) => {
  const userProfile = await User.findById(req.params.userId);
  const authorized = await (userProfile &&
    req.user &&
    userProfile._id.toString() == req.user._id.toString());
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
});

exports.getCurrentUserProfile = catchAsync(async (req, res) => {
  const currentUserProfile = await User.findById(req.params.userId);

  res.status(200).json(currentUserProfile);
});

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status("200").json({
    message: "signed out",
  });
};
