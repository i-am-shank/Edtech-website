// import modules =========================
const razorpay = require("razorpay");
require("dotenv").config();

// instance-handler ====================
exports.instance = new razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});
