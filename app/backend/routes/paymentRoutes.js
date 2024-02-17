// Import modules ==============================
const express = require("express");
const router = express.Router();

// Import controllers =============================
const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail,
} = require("../controllers/paymentController");

// Import auth-middlewares =============================
const { auth, isStudent } = require("../middlewares/authMiddlewares");

// ==========================================
// Payment-routes ===========================
// ==========================================

// capture-payment (authorized student) ----------------
router.post("/capturePayment", auth, isStudent, capturePayment);
// verify-signature (all users) ----------------
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
    "/sendPaymentSuccessEmail",
    auth,
    isStudent,
    sendPaymentSuccessEmail
);

// Export router ============================
module.exports = router;
