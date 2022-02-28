const express = require("express");

const {
  tankList,
  listTankByUser,
  createTank,
  removeTank,
  isPresident,
  tankById,
  updatetank,
} = require("../controllers/tankController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(protect, tankList);

router.route("/:tankId").get(protect, tankById);

router.route("/by/:userId").get(protect, listTankByUser);

router.route("/:userId").post(protect, createTank);

router.route("/:tankId").delete(protect, isPresident, removeTank);

router.route("/:tankId").put(protect, isPresident, updatetank);

module.exports = router;
