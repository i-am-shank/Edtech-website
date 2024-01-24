// import modules ===================================
const express = require("express");
const router = express.Router();

// import controllers ===================================
const {
    sendOTP,
    signUp,
    login,
    changePassword,
} = require("../controllers/authController");
const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/resetPasswordController");

// import middlewares ===================================
const { auth } = require("../middlewares/authMiddlewares");

// ==============================================
// Authentication-routes ========================
// ==============================================

// user-login (all users) ---------------
router.post("/login", login);

// user-signup (all users) ---------------
router.post("/signup", signUp);

// Sending OTP to user's mail (all users) --------------
router.post("/sendotp", sendOTP);

// change-user's-password (authorized users) ---------------
router.post("/changepassword", auth, changePassword);

// ==============================================
// Reset-password ===============================
// ==============================================

// Generate reset-password-token (all users) --------------
router.post("/reset-password-token", resetPasswordToken);

// Reset-user's-password-after-verification (all users) -------------
router.post("/reset-password", resetPassword);

// Export router ======================================
module.exports = router;
