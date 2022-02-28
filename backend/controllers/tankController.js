const Tank = require("../models/tankModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.tankList = catchAsync(async (req, res) => {
  const tankList = await Tank.find({});

  res.json(tankList);
});

exports.listTankByUser = catchAsync(async (req, res) => {
  const tanks = await Tank.find({ user: req.params.userId });

  res.json(tanks);
});

exports.tankById = catchAsync(async (req, res, next) => {
  const tank = await Tank.findById(req.params.tankId);

  if (!tank) {
    return next(new AppError("Tank not found.", 404));
  }

  res.status(200).json(tank);
});

exports.createTank = catchAsync(async (req, res, next) => {
  const {
    sideNumber,
    producer,
    model,
    currentModification,
    quantityAmmunition,
    mileage,
    armorFront,
    armorSide,
    armorBack,
    vintage,
    dateInCountry,
  } = req.body;

  console.log(req.body);

  const dateString = new Date(dateInCountry);

  const changedDateToISO = dateString.toISOString();
  const strDate1 = changedDateToISO.substring(0, 10);

  const currentDate = new Date().toISOString();
  const strCurrentDate = currentDate.substring(0, 10);

  const currentlyYear = new Date().getFullYear();

  const minDate = new Date(1970, 0, 2).toISOString();
  const strMinDate = minDate.substring(0, 10);
  const strVintage = vintage.substring(0, 4);

  if (Number(strVintage) > Number(currentlyYear)) {
    return next(
      new AppError(
        "The year of the tank cannot be greater than the current one.",
        400
      )
    );
  }

  if (Number(strVintage) < Number(1900)) {
    return next(new AppError("Tank is too old.", 400));
  }

  if (strDate1 > strCurrentDate) {
    return next(
      new AppError("The date cannot be greater than the current one.", 400)
    );
  }

  if (strDate1 < strMinDate) {
    return next(
      new AppError("The date cannot be smaller than the 1970-01-01", 400)
    );
  }

  const tankData = {
    user: req.params.userId,
    sideNumber,
    producer,
    model,
    currentModification,
    vintage: Number(strVintage),
    quantityAmmunition,
    dateInCountry: changedDateToISO,
    mileage,
    armor: {
      armorFront,
      armorSide,
      armorBack,
    },
  };

  const tank = await Tank.create(tankData);

  res.json(tank);
});

exports.updatetank = catchAsync(async (req, res, next) => {
  const tank = await Tank.findById(req.params.tankId);

  if (!tank) {
    return next(new AppError("Tank not found.", 404));
  }

  const {
    sideNumber,
    producer,
    model,
    currentModification,
    quantityAmmunition,
    mileage,
    armorFront,
    armorSide,
    armorBack,
    vintage,
    dateInCountry,
  } = req.body;

  const dateString = new Date(dateInCountry);

  const changedDateToISO = dateString.toISOString();
  const strDate1 = changedDateToISO.substring(0, 10);

  const currentDate = new Date().toISOString();
  const strCurrentDate = currentDate.substring(0, 10);

  const currentlyYear = new Date().getFullYear();

  const minDate = new Date(1970, 0, 2).toISOString();
  const strMinDate = minDate.substring(0, 10);
  const strVintage = vintage.substring(0, 4);

  if (Number(strVintage) > Number(currentlyYear)) {
    return next(
      new AppError(
        "The year of the tank cannot be greater than the current one.",
        400
      )
    );
  }

  if (Number(strVintage) < Number(1900)) {
    return next(new AppError("Tank is too old.", 400));
  }

  if (strDate1 > strCurrentDate) {
    return next(
      new AppError("The date cannot be greater than the current one.", 400)
    );
  }

  if (strDate1 < strMinDate) {
    return next(
      new AppError("The date cannot be smaller than the 1970-01-01", 400)
    );
  }

  const tankData = {
    user: req.params.userId,
    sideNumber,
    producer,
    model,
    currentModification,
    vintage: Number(strVintage),
    quantityAmmunition,
    dateInCountry: changedDateToISO,
    mileage,
    armor: {
      armorFront,
      armorSide,
      armorBack,
    },
    updatedAt: new Date(),
  };

  const updatedTank = await Tank.findByIdAndUpdate(
    req.params.tankId,
    tankData,
    {
      new: true,
      runValidators: true,
    }
  );

  res.json(updatedTank);

  console.log(updatedTank);
});

exports.removeTank = catchAsync(async (req, res) => {
  const tank = await Tank.findByIdAndDelete(req.params.tankId);
  return res.status(204).json(tank);
});

exports.isPresident = catchAsync(async (req, res, next) => {
  const tank = await Tank.findById(req.params.tankId);
  const authorized = await (tank &&
    req.user &&
    tank.user.toString() === req.user._id.toString());
  if (!authorized) {
    return res.status("403").json({
      error: "User is not authorized",
    });
  }
  next();
});
