const express = require("express");
const {
  register,
  login,
  getCurrentUserProfile,
  protect,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/:userId").get(protect, getCurrentUserProfile);
router.route("/logout").get(logout);

module.exports = router;
